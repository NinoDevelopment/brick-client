const fs = require('fs');
const path = require('path');

const CYR_MAP = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

const slugify = (value) => {
  const transliterated = String(value)
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/,/g, '')
    .split('')
    .map((char) => CYR_MAP[char] ?? char)
    .join('');

  return transliterated
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
};

const readSlugs = (filePath, fallback) => {
  try {
    const file = fs.readFileSync(filePath, 'utf8');
    return [...file.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
  } catch {
    return fallback;
  }
};

const getDeliveryCitySlugs = () =>
  readSlugs(path.join(__dirname, 'src/constants/deliveryCities.ts'), [
    'nizhny-novgorod',
    'dzerzhinsk',
    'arzamas',
    'bor',
    'balakhna',
    'kstovo',
    'bogorodsk',
    'gorodets',
    'sarov',
  ]);

const getCatalogSlugs = () =>
  readSlugs(path.join(__dirname, 'src/constants/catalogCategories.ts'), [
    'ryadovoy',
    'oblitsovochnyy',
  ]);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_PROD_URL || 'https://kzk.ooo',
  generateRobotsTxt: true,
  transform: async (config, pathName) => {
    if (
      pathName.startsWith('/admin') ||
      pathName === '/error' ||
      pathName === '/shopCart' ||
      pathName.startsWith('/order') ||
      pathName === '/privacyPolicy' ||
      pathName === '/consent' ||
      pathName === '/requisites' ||
      pathName.includes('?') ||
      pathName.includes('&')
    ) {
      return null;
    }

    const now = new Date().toISOString();

    if (pathName === '/') {
      return {
        loc: pathName,
        lastmod: now,
        changefreq: 'daily',
        priority: 1.0,
      };
    }

    if (
      pathName === '/about' ||
      pathName === '/catalog' ||
      pathName.startsWith('/catalog/')
    ) {
      return {
        loc: pathName,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9,
      };
    }

    if (pathName.startsWith('/product/') || pathName.startsWith('/delivery/')) {
      return {
        loc: pathName,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8,
      };
    }

    if (pathName === '/gallery' || pathName === '/faq') {
      return {
        loc: pathName,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.7,
      };
    }

    return {
      loc: pathName,
      lastmod: now,
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
      ...getCatalogSlugs().map((slug) => ({
        loc: `/catalog/${slug}`,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: now,
      })),
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
          loc: `/product/${slugify(product.name) || product._id}`,
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
    '/consent',
    '/requisites',
  ],
  autoLastmod: true,
};
