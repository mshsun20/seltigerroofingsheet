/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5052",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.seltigerroofingsheets.com",
        pathname: "/api/uploads/**",
      },
    ],
  },
};

export default nextConfig;
