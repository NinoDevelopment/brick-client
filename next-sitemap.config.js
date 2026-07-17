const fs = require('fs');
const path = require('path');

const getDeliveryCitySlugs = () => {
  try {
    const file = fs.readFileSync(
      path.join(__dirname, 'src/constants/deliveryCities.ts'),
      'utf8',
    );
    return [...file.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
  } catch {
    return [
      'dzerzhinsk',
      'arzamas',
      'bor',
      'balakhna',
      'kstovo',
      'bogorodsk',
      'gorodets',
      'sarov',
    ];
  }
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_PROD_URL,
  generateRobotsTxt: true,
  transform: async (config, pathName) => {
    if (
      pathName.startsWith('/admin') ||
      pathName === '/error' ||
      pathName === '/shopCart' ||
      pathName.startsWith('/order') ||
      pathName === '/privacyPolicy' ||
      pathName === '/requisites' ||
      pathName.includes('?') ||
      pathName.includes('&')
    ) {
      return null;
    }

    if (pathName === '/') {
      return {
        loc: pathName,
        changefreq: 'daily',
        priority: 1.0,
      };
    }

    if (pathName === '/about' || pathName === '/catalog') {
      return {
        loc: pathName,
        changefreq: 'daily',
        priority: 0.9,
      };
    }

    if (pathName.startsWith('/product/') || pathName.startsWith('/delivery/')) {
      return {
        loc: pathName,
        changefreq: 'weekly',
        priority: 0.8,
      };
    }

    if (pathName === '/gallery' || pathName === '/faq') {
      return {
        loc: pathName,
        changefreq: 'weekly',
        priority: 0.7,
      };
    }

    return {
      loc: pathName,
      changefreq: 'daily',
      priority: 0.7,
    };
  },
  additionalPaths: async () => {
    const now = new Date().toISOString();

    const staticExtra = [
      {
        loc: '/gallery',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: now,
      },
      {
        loc: '/faq',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: now,
      },
      ...getDeliveryCitySlugs().map((slug) => ({
        loc: `/delivery/${slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: now,
      })),
    ];

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_LINK}/item`);

      if (!response.ok) {
        return staticExtra;
      }

      const products = await response.json();

      const productPaths = products
        .filter((product) => product.show)
        .map((product) => ({
          loc: `/product/${product._id}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: now,
        }));

      return [...staticExtra, ...productPaths];
    } catch {
      return staticExtra;
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
