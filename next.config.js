/** @type {import('next').NextConfig} */
const staticMediaCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=604800, stale-while-revalidate=2592000",
  },
];

const nextConfig = {
  agentRules: false,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  async headers() {
    return [
      { source: "/videos/:path*", headers: staticMediaCache },
      { source: "/other/:path*", headers: staticMediaCache },
      { source: "/icons/:path*", headers: staticMediaCache },
      { source: "/Logo.svg", headers: staticMediaCache },
      { source: "/Logo-dark.svg", headers: staticMediaCache },
      { source: "/favicon.svg", headers: staticMediaCache },
    ];
  },
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
