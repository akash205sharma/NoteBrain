// types/next-auth.d.ts or in your app folder

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      login?: string; // GitHub username
    };
  }

  interface User {
    accessToken?: string;
  }

  // interface User {
  //   login?: string;
  // }

  interface JWT {
    accessToken?: string;
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    login?: string;
  }
}