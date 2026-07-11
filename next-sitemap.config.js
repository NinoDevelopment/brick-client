/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_PROD_URL,
  generateRobotsTxt: true,
  transform: async (config, path) => {
    if (
      path.startsWith('/admin') ||
      path === '/error' ||
      path === '/shopCart' ||
      path.startsWith('/order') ||
      path === '/privacyPolicy' ||
      path === '/requisites' ||
      path.includes('?') ||
      path.includes('&')
    ) {
      return null;
    }

    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
      };
    }

    if (path === '/about' || path === '/catalog') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
      };
    }

    if (path.startsWith('/product/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
      };
    }

    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
    };
  },
  additionalPaths: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_LINK}/item`);

      if (!response.ok) {
        return [];
      }

      const products = await response.json();

      return products
        .filter((product) => product.show)
        .map((product) => ({
          loc: `/product/${product._id}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        }));
    } catch {
      return [];
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*?utm_*',
          '/admin',
          '/api',
          '/shopCart',
          '/order',
          '/error',
        ],
      },
    ],
  },
  exclude: [
    '/admin*',
    '/api*',
    '/error*',
    '/shopCart',
    '/order*',
    '/privacyPolicy',
    '/requisites',
  ],
  autoLastmod: true,
};
