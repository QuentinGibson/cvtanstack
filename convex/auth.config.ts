import type { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      // Your Clerk Frontend API URL
      // Set CLERK_JWT_ISSUER_DOMAIN on the Convex Dashboard too:
      // https://dashboard.convex.dev → your project → Settings → Environment Variables
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
