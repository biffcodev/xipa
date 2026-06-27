export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
// `placeholder` keeps `next build` working before the real project is wired.
// Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local / Vercel to your project id.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
