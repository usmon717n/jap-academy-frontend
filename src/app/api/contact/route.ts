import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  message?: unknown;
};

const PHONE_REGEX = /^\+?[0-9()\-\s]{7,20}$/;
const CHAT_ID_REGEX = /^-?\d+$|^@[a-zA-Z0-9_]{5,}$/;
const TELEGRAM_TIMEOUT_MS = 10_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __contactRateLimitStore: Map<string, RateLimitRecord> | undefined;
}

const rateLimitStore =
  globalThis.__contactRateLimitStore ?? new Map<string, RateLimitRecord>();

if (!globalThis.__contactRateLimitStore) {
  globalThis.__contactRateLimitStore = rateLimitStore;
}

function normalizeText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
}

function normalizeEnv(value: string | undefined): string {
  if (!value) return '';
  return value.trim().replace(/^['"]|['"]$/g, '');
}

function getClientKey(request: Request): string {
  const forwardedFor = request.headers
    .get('x-forwarded-for')
    ?.split(',')[0]
    ?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  return forwardedFor || realIp || 'unknown-client';
}

function isRateLimited(request: Request): boolean {
  const now = Date.now();

  if (rateLimitStore.size > 5000) {
    rateLimitStore.forEach((record, key) => {
      if (record.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    });
  }

  const key = getClientKey(request);
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return false;
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: 'Juda ko‘p so‘rov yuborildi. 1 daqiqadan so‘ng qayta urinib ko‘ring.' },
      { status: 429 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: 'So‘rov formati noto‘g‘ri (JSON xato).' },
      { status: 400 },
    );
  }

  try {
    const name = normalizeText(body.name);
    const phone = normalizeText(body.phone);
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Ism va telefon raqam majburiy.' },
        { status: 400 },
      );
    }

    if (name.length > 80) {
      return NextResponse.json(
        { error: 'Ism juda uzun kiritildi.' },
        { status: 400 },
      );
    }

    if (!PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: 'Telefon raqam formati noto\'g\'ri.' },
        { status: 400 },
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Xabar 1000 ta belgidan oshmasligi kerak.' },
        { status: 400 },
      );
    }

    const botToken = normalizeEnv(process.env.TELEGRAM_BOT_TOKEN);
    const chatId = normalizeEnv(process.env.TELEGRAM_CHAT_ID);
    const missingVars = [
      !botToken ? 'TELEGRAM_BOT_TOKEN' : null,
      !chatId ? 'TELEGRAM_CHAT_ID' : null,
    ].filter(Boolean) as string[];

    if (missingVars.length > 0) {
      console.error('Missing Telegram environment variables:', missingVars);
      const isDev = process.env.NODE_ENV !== 'production';
      const details = isDev ? ` (${missingVars.join(', ')})` : '';
      return NextResponse.json(
        {
          error:
            `Server sozlamalari topilmadi. .env.local ni tekshiring va dev serverni qayta ishga tushiring.${details}`,
        },
        { status: 500 },
      );
    }

    if (!CHAT_ID_REGEX.test(chatId)) {
      return NextResponse.json(
        { error: 'TELEGRAM_CHAT_ID noto‘g‘ri formatda.' },
        { status: 500 },
      );
    }

    const sentAt = new Intl.DateTimeFormat('uz-UZ', {
      timeZone: 'Asia/Tashkent',
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date());

    const telegramText = [
      'Yangi kursga yozilish so\'rovi',
      '',
      `Ism: ${name}`,
      `Telefon: ${phone}`,
      `Xabar: ${message || '-'}`,
      `Vaqt: ${sentAt}`,
    ].join('\n');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

    let telegramResponse: Response;
    try {
      telegramResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramText,
          }),
          signal: controller.signal,
        },
      );
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Telegram javobi kechikdi. Iltimos, qayta urinib ko‘ring.' },
          { status: 504 },
        );
      }

      console.error('Telegram request failed:', error);
      return NextResponse.json(
        { error: 'Telegram servisiga ulanishda xatolik yuz berdi.' },
        { status: 502 },
      );
    } finally {
      clearTimeout(timeoutId);
    }

    const telegramRaw = await telegramResponse.text();
    let telegramData: { ok?: boolean; description?: string } | null = null;
    try {
      telegramData = JSON.parse(telegramRaw) as {
        ok?: boolean;
        description?: string;
      };
    } catch {
      telegramData = null;
    }

    if (!telegramResponse.ok || !telegramData?.ok) {
      console.error('Telegram API error:', telegramData || telegramRaw);
      const isDev = process.env.NODE_ENV !== 'production';
      const description =
        isDev &&
        typeof telegramData?.description === 'string' &&
        telegramData.description.length > 0
          ? ` (${telegramData.description})`
          : '';
      return NextResponse.json(
        { error: `Xabar yuborilmadi. Bot token/chat ID ni tekshiring.${description}` },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Serverda kutilmagan xatolik yuz berdi.' },
      { status: 500 },
    );
  }
}
