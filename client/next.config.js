/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // pathname: "http://localhost:2003/public/uploads/**",
        protocol: "http",
        hostname: "localhost",
        port: "2003",
        pathname: "",
      },
    ],
  },
};

export default nextConfig;
