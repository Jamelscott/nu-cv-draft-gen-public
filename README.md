# Nu CV Draft Generator

A Next.js application that uses Google's Gemini AI to generate a personalized cover letter draft based on your resume and a job description. The goal is to give you a strong, tailored starting point, not a finished product. You're expected to review, refine, and make it your own before sending.

## Features

- Generates a tailored first draft based on your resume and a job description
- Optional additional context field to guide the AI (e.g. why you're interested, specific skills to highlight)
- Fully editable output, refine the draft directly in the app before copying
- One-click copy to clipboard once you're happy with the result

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Gemini API](https://aistudio.google.com) (`gemini-2.5-flash`)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/job-application-app.git
cd job-application-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and add your Gemini API key:

```bash
cp .env.example .env
```

Then open `.env` and replace the placeholder with your key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

> Get a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Resume Text** — Paste the plain text of your resume into the first field.
2. **Job Description** — Paste the full job posting into the second field.
3. **Additional Context** _(optional)_ — Add any extra info you want the AI to consider (e.g. a personal note, specific achievements, or why you're excited about the role).
4. Click **Generate Cover Letter**.
5. **Read and edit the output** — the generated letter is a draft, not a final product. Personalise the tone, fix any inaccuracies, and make sure it sounds like you.
6. Once you're satisfied, click **Copy** and paste it into your application.

> ⚠️ **Important:** AI-generated cover letters should always be reviewed and edited before sending. Treat the output as a scaffold — a well-structured starting point that saves time, not something to blindly copy and paste.

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/new). After connecting your repo, add the `GEMINI_API_KEY` environment variable in your Vercel project settings.

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Google Gemini API Docs](https://ai.google.dev/gemini-api/docs)
