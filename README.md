# suno-arch

> Describe your song. Get a ready-to-use Suno prompt.

A Gemini-powered web app that generates structured Suno AI prompts from a natural language description. Includes a visual interface with style knobs, tag buttons for metatags, and a lyrics editor — everything you need to craft the perfect Suno input.

## Features

- 🎛️ Style sliders (weirdness, audio influence, style intensity)
- 🏷️ One-click Suno metatag insertion (verse, chorus, bridge…)
- 📋 Copy-ready style prompt + lyrics output
- ⚡ Powered by Gemini API

## Stack

React · TypeScript · Vite · Gemini API

## Run locally

**Prerequisites:** Node.js, a Gemini API key

```bash
npm install
cp .env.local.example .env.local  # add your GEMINI_API_KEY
npm run dev
```

## Live demo

[Open in AI Studio](https://ai.studio/apps/c01fc4ea-70ca-43dd-ab14-5ab7c761402a)
