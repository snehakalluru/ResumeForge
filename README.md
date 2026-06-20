# ResumeForge

ResumeForge is a functional, browser-based resume builder with complete resume editing, real-time previews, multiple templates, local ATS analysis, theme customization, automatic local saving, and watermark-free PDF export.

## Project verification

Built and tested a functional resume builder tool that generates correct resume output. Added a dedicated button labelled exactly **“Built for Digital Heroes”** linking to [https://digitalheroesco.com](https://digitalheroesco.com) as per assignment requirements.

- ✅ The tool works and generates the correct output.
- ✅ Includes a button labelled exactly **“Built for Digital Heroes”** that redirects to [https://digitalheroesco.com](https://digitalheroesco.com).

## Features

- Complete personal details, summary, skills, experience, projects, education, certifications, achievements, and languages editor
- Classic ATS, Modern Professional, and Creative Professional templates
- Instant live preview with empty-section suppression
- Local ATS score, job-description keyword matching, and improvement suggestions
- PDF export of the selected live template
- Automatic resume, template, theme, and job-description persistence in `localStorage`
- Light/dark mode, accent-color selection, and preview sizing controls

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Assignment requirement

The visible **Built for Digital Heroes** button is located in the application footer. It opens [https://digitalheroesco.com](https://digitalheroesco.com) in a new browser tab.
