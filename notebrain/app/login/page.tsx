"use client"
import { signIn, signOut, useSession } from "next-auth/react";


export default function login() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button className="cursor-pointer" onClick={() => signIn("github")}>Login with GitHub</button>
      ) : (
        <div>
          <p>Welcome, {session.user?.name}</p>
          <button className="cursor-pointer" onClick={() => signOut()}>Logout</button>
        </div>
      )}

    </div>
  );
}

