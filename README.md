# JAP Academy — Frontend (Next.js 14)

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env and configure variables
cp .env.example .env.local

# 3. Start dev server
npm run dev
```

Frontend runs on `http://localhost:3000`

## Vercel Deployment

1. Push this repo to GitHub
2. Import project on Vercel (vercel.com/new)
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` — optional Railway backend URL (if used)
   - `TELEGRAM_BOT_TOKEN` — BotFather orqali olingan bot token
   - `TELEGRAM_CHAT_ID` — xabar tushadigan chat/group ID
4. Deploy — Vercel auto-detects Next.js

## Telegram Contact Integration

`/contact` sahifadagi forma `POST /api/contact` orqali Telegram botga xabar yuboradi.

1. Telegram'da `@BotFather` orqali bot yarating va token oling.
2. Xabar tushadigan chat ID ni aniqlang:
   - botga private chatda yozing yoki botni guruhga qo'shing
   - `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` orqali `chat.id` ni toping
3. `.env.local` ichida quyidagilarni to'ldiring:
   - `TELEGRAM_BOT_TOKEN=...`
   - `TELEGRAM_CHAT_ID=...`
4. Dev yoki productionda forma yuborib tekshiring.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, features |
| `/tests` | Topics list |
| `/tests/[id]` | Test taking (shuffled options, timer, no instant feedback) |
| `/result` | Test result + certificate download |
| `/about` | About JAP Academy |
| `/contact` | Course enrollment form |
| `/admin` | Admin panel (requires ADMIN role) |

## Features

- **Shuffled options** — every test attempt randomizes option order per question
- **Timer** — starts at 00:00 when test begins, shown on certificate
- **No instant feedback** — correct/incorrect only shown after submission
- **Certificate** — downloadable HTML with student name, score, time, academy stamp
- **Notifications** — daily test reminders (backend cron sends at 09:00)
- **Admin panel** — full CRUD for topics, questions, contact requests
- **Auth** — JWT-based registration/login with role-based access
