/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "app.jedwal.co" }],
        destination: "/app/:path*",
      },
    ];
  },
};

export default nextConfig;
