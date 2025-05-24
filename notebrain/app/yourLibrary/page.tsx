'use client'

import CrepeEditor from '@/components/CrepeEditor'
import { useState } from 'react'


export default function HomePage() {

  const [markdown, setMarkdown] = useState('')


  const markdownContent = `
# 🧠 Welcome to **NoteBrain**


> The smartest way to write, save, and organize your notes — directly in your GitHub repository.\
> Built for developers. Powered by Markdown. Secured by GitHub.


<br />

### 🛠 Ready to begin?

Just open or create a file from the sidebar to get started.

***

> 🚀 Tip: Your notes are written in **Markdown**, so you can format them beautifully — and access them anytime, anywhere.

***
<br />

## ✨ Key Features

| Feature               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| 📝 **Markdown Editor** | Clean, distraction-free writing with live preview support.                  |
| 🔒 **Secure GitHub Login** | Login safely via GitHub OAuth — no extra credentials needed.              |
| 🗃️ **Repo-based Storage** | Notes are stored as files in your GitHub repo — portable and versioned.     |
| ⏳ **Version History** | Automatically tracks all changes via Git commits.                           |
| 🧩 **Minimal UI**      | Simple, dark-themed interface for maximum focus and clarity.               |

---

## 🚀 How It Works

1. **Login with GitHub** using the secure OAuth flow.
2. **Select or create a GitHub repo** where your notes will be stored.
3. Start writing in **Markdown** with real-time updates.
4. All your changes are **auto-pushed to GitHub** with commit history.

---

## 🔧 Tech Stack

\`\`\`ts
// Powered by the modern web
{
  frontend: "Next.js + Tailwind CSS",
  auth: "NextAuth.js with GitHub Provider",
  storage: "GitHub Repos (via GitHub API)",
  editor: "Markdown + Live Preview",
  hosting: "Vercel + GitHub Pages (optional)"
}
\`\`\`

---

## 🛡️ Why Use NoteBrain?

- ✅ **No Vendor Lock-in** — Your notes are yours, stored in your GitHub
- 🔁 **Auto Version Control** — Restore, rollback, or compare changes anytime
- 🌍 **Accessible Anywhere** — From any device that can access GitHub
- 🧙‍♂️ **Developer-Centric** — Designed to feel like a natural extension of your workflow



## 💬 Community & Support

- 🧪 [Open Issues & Discussions](https://github.com/your-repo/issues)
- 🌟 [Star the Repo](https://github.com/your-repo) if you find it helpful
- ✍️ Contribute by submitting features, issues, or pull requests

---

## 🔐 Get Started Now

\`\`\`bash
1. Click “Login with GitHub”
2. Create or select a repo (we suggest \`note-brain-data\`)
3. Start writing. It’s that simple.
\`\`\`

> 🧠 Built for developers who think in markdown and organize in Git.
`;


  return (
    <main className="text-white text-xl m-5">
      <CrepeEditor initial={markdownContent} onChange={(value) => setMarkdown(value)}  />
    </main>
  )
}

