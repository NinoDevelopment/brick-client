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
    remotePatterns: [
      { protocol: "https", hostname: "kzk.ooo" },
      { protocol: "https", hostname: "**.kzk.ooo" },
    ],
  },
  async headers() {
    return [
      { source: "/videos/:path*", headers: staticMediaCache },
      { source: "/other/:path*", headers: staticMediaCache },
      { source: "/icons/:path*", headers: staticMediaCache },
      { source: "/og/:path*", headers: staticMediaCache },
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
      {
        source: "/catalog/stroitelnyy",
        destination: "/catalog/ryadovoy",
        permanent: true,
      },
      {
        source: "/catalog/stroitelny",
        destination: "/catalog/ryadovoy",
        permanent: true,
      },
      {
        source: "/catalog/keramicheskiy",
        destination: "/catalog/ryadovoy",
        permanent: true,
      },
      {
        source: "/catalog/litsevoy",
        destination: "/catalog/oblitsovochnyy",
        permanent: true,
      },
      {
        source: "/catalog/licevoy",
        destination: "/catalog/oblitsovochnyy",
        permanent: true,
      },
      {
        source: "/catalog/oblicovochnyy",
        destination: "/catalog/oblitsovochnyy",
        permanent: true,
      },
      {
        source: "/catalog/fasadnyy",
        destination: "/catalog/oblitsovochnyy",
        permanent: true,
      },
      {
        source: "/catalog/krasnyy",
        destination: "/catalog/oblitsovochnyy",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
