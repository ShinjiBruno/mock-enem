/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://enem.dev/**")],
  },
};

export default nextConfig;
