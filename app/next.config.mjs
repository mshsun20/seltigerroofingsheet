/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    turbopackFileSystemCacheForDev: true,
  }
};

export default nextConfig;
