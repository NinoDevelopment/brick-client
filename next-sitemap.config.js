/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_PROD_URL,
  generateRobotsTxt: true,
  transform: async (config, path) => {
    if (path.startsWith('/admin') || path === '/error' || path.includes('?') || path.includes('&')) {
      return null
    }

    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
      };
    }

    if (path === '/about') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
      };
    }

    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*?*',
          '/admin',
          '/api',
          '/_next',
        ],
      },
    ],
    additionalSitemaps: [process.env.NEXT_PUBLIC_PROD_URL + '/sitemap.xml'],
  },
  exclude: [
    '/admin*',
    '/api*',
    '/error*',
  ],
  autoLastmod: true,
};
