/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Sanity
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      // Vercel Blob
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      // Supabase
      {
        protocol: "https",
        hostname: "ammisqfdfibrdiggrnio.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
