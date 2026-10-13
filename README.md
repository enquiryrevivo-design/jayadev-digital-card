# Jayadev KV — TalentGrade Digital Business Card

A responsive static React + TypeScript business card.

## Features
- Click-to-call, WhatsApp, email, website and LinkedIn actions
- Downloads a vCard contact file (`.vcf`)
- Generates a QR code from the current page URL
- Share/copy page link
- Jayadev's supplied profile photo bundled with the website
- Optional replacement photo upload (stored locally in this browser)
- Responsive dark navy and blue design

## Run locally
1. Install Node.js (LTS).
2. In this folder, run `npm install`
3. Run `npm run dev`
4. Open the local URL printed by Vite.

## Deploy free with Netlify
1. Push this folder to a GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project** and connect that repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy. The QR code will point to the current hosted page URL after the site is opened at its public URL.

You can also deploy to Vercel using the Vite preset and `npm run build`, output directory `dist`.

## Before sharing
- The supplied profile photo is bundled with the site and visible to all visitors. If you replace it using the upload control, that replacement is saved only in your browser; to make a replacement public, update `public/jayadev-profile.jpg` and redeploy.
- Open the published site and test phone, WhatsApp, email, LinkedIn, Save Contact and QR code.
- For a stable QR code, avoid changing the hosting URL after printing it.
- This is a static site; it does not have a database or admin login.
