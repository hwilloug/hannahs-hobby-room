/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  // Remove Clerk-related env vars
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    // Empty window interface
  }
}

declare namespace App {
  interface Locals {
    // Empty locals interface
  }
}
