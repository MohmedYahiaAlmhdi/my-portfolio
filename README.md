

Mohmed Yahia Almhdi — Portfolio
A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

Tech Stack
Framework: Next.js 16 (App Router)
Language: TypeScript
Styling: Tailwind CSS 4 + shadcn/ui
Animations: Framer Motion
Database: SQLite with Prisma ORM
Theme: Dark/Light mode support
Features
Responsive design (mobile, tablet, desktop)
Dark/Light mode toggle
Smooth scroll animations
Tech stack marquee
Interactive skill bars
Project showcase with filters
Experience timeline
Contact form with database storage
Blog section
Testimonials carousel
Scroll progress indicator
Back-to-top button
Getting Started
Prerequisites
Node.js 18+
npm or bun
Installation
git clone https://github.com/MohmedYahiaAlmhdi/my-portfolio.gitcd my-portfolionpm install
Setup Database
bash

npx prisma db push
Run Development Server
bash

npm run dev
Open http://localhost:3000 in your browser.

Project Structure
text

src/
├── app/
│   ├── api/          # API routes
│   ├── globals.css   # Global styles
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Main page
├── components/
│   ├── ui/           # shadcn/ui components
│   └── portfolio/    # Custom components
└── lib/
    ├── db.ts         # Database client
    └── utils.ts      # Utility functions
Deployment
Deploy on Vercel:

1- Push your code to GitHub
2 - Import repository on Vercel
3 - Add environment variable:

DATABASE_URL="file:./db/custom.db"

4 - Deploy

Contact
Email: mohmedyahiaalmhdi@gmail.com
GitHub: MohmedYahiaAlmhdi
LinkedIn: Mohmed Yahia Almhdi
