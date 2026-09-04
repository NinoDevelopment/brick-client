/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kzk.ooo" }],
        destination: "https://kzk.ooo/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
