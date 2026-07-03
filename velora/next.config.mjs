/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",   // allow all HTTPS hostnames
      },
    ],
  },
};

export default nextConfig;
