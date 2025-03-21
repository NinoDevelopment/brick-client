/** @type {import('next-sitemap').IConfig} */
// eslint-disable-next-line
module.exports = {
  // eslint-disable-next-line no-undef
  siteUrl: process.env.NEXT_PUBLIC_PROD_URL,
  generateRobotsTxt: true,
  transform: async (config, path) => {
    if (path.startsWith('/admin') || path === '/error') {
      return undefined
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
        allow: ['/'], // Разрешаем доступ ко всем страницам
        disallow: ['/admin/auth', '/admin', '/error']
      },
    ],
    // eslint-disable-next-line no-undef
    additionalSitemaps: [process.env.NEXT_PUBLIC_PROD_URL + '/sitemap.xml'],
  },
};
