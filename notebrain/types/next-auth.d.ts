// types/next-auth.d.ts or in your app folder

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
  }
}
