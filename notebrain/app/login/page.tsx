'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Github } from 'lucide-react';
import { createRepoIfNotExists, fetchAndSaveRootFiles } from '@/lib/github';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if session exists
  useEffect(() => {
    if (status === 'authenticated') {
      const setupRepo = async () => {
        if (session?.accessToken) {
          const token = session.accessToken;
          const owner = session.user?.login!;
          const repo = "note-brain-data-"+ session.user.login;

          try {
            await createRepoIfNotExists({
              token,
              owner,
              repo,
              isOrg: false,
            });

            await fetchAndSaveRootFiles(owner, repo, token);

            router.push('/yourLibrary');
          } catch (err) {
            console.error("Setup error:", err);
          }
        }
      };

      setupRepo();
    }
  }, [status, router, session]);


  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#0d0d0d] rounded-2xl shadow-lg p-8 border border-gray-800">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">Welcome</h1>
        <p className="text-gray-400 text-center mb-8">Login with your GitHub account to continue</p>

        <button
          onClick={() => signIn('github')}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
        >
          <Github className="w-5 h-5" />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
