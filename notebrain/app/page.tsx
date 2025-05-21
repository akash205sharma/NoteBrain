'use client';

import { FileText, Github, ShieldCheck, History, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();



  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          🧠 Welcome to <span className="text-blue-500">NoteBrain</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mt-4">
          The smartest way to write, save, and organize your notes — directly into your GitHub repository.
        </p>
        <div className="mt-8">
          <Button
            onClick={() => router.push("/yourLibrary")}
            className="bg-black border text-white font-semibold px-6 mx-5 py-3 rounded-lg hover:bg-neutral-800 transition-colors duration-200"
          >
            Try Without Signin
          </Button>
          <Button
            onClick={() => router.push("/login")}
            className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            <Github className="w-5 h-5 mr-2" />
            Sign in with GitHub
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-[#0d0d0d] border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">🛠 Features</h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <FeatureCard
            icon={<FileText className="w-6 h-6 text-blue-400" />}
            title="Markdown Editing"
            description="Write notes using powerful markdown syntax with instant preview."
          />
          <FeatureCard
            icon={<Github className="w-6 h-6 text-blue-400" />}
            title="GitHub Integration"
            description="Store and manage your notes directly in your GitHub repo."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-blue-400" />}
            title="Secure Login"
            description="Authenticate safely using GitHub OAuth — no extra passwords needed."
          />
          <FeatureCard
            icon={<History className="w-6 h-6 text-blue-400" />}
            title="Version Control"
            description="Every change is tracked via Git — revert or review at any time."
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6 text-blue-400" />}
            title="Clean, Minimal UI"
            description="Focus on what matters — a distraction-free writing experience."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-6 border-t border-gray-800">
        © {new Date().getFullYear()} NoteBrain — Built for devs who love writing.
      </footer>
    </main>

  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
