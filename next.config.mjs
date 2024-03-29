/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, os: false, path: false };
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin", // "same-origin-allow-popups"
          },
        ],
      },
    ];
  },
};

export default nextConfig;
