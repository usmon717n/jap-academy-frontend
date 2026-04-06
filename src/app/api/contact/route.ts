import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  message?: unknown;
};

const PHONE_REGEX = /^\+?[0-9()\-\s]{7,20}$/;

function normalizeText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

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

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Missing Telegram environment variables');
      return NextResponse.json(
        { error: 'Server sozlamalari topilmadi.' },
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

    const telegramResponse = await fetch(
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
      },
    );

    const telegramData = await telegramResponse.json().catch(() => null);

    if (!telegramResponse.ok || !telegramData?.ok) {
      console.error('Telegram API error:', telegramData);
      return NextResponse.json(
        { error: 'Xabar yuborilmadi. Keyinroq qayta urinib ko\'ring.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Noto\'g\'ri so\'rov yuborildi.' },
      { status: 400 },
    );
  }
}
