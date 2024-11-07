/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  readonly CLERK_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    Clerk?: any;
  }
  interface CustomJwtSessionClaims {
    roles: string[];
  }
}

declare namespace App {
  interface Locals {
    userId: string;
    isAdmin: boolean;
  }
}
