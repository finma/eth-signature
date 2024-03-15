/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, os: false, path: false };
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
