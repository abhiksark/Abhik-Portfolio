module.exports = {
  siteUrl: 'https://www.abhik.xyz',
  generateRobotsTxt: true,
  // exclude: ['/thank-you', '/api/*', '/_next/*', '/static/*'],
  priority: 0.7,
  changefreq: 'daily',
  sitemapBaseFileName: 'sitemap',
  outDir: 'public',
  generateIndexSitemap: true,
  trailingSlash: false,
  transform: async (config, path) => {
    // Always remove trailing slashes and clean the path
    const cleanPath = path.replace(/\/+/g, '/').replace(/\/$/, '');
    
    // Custom priority for different sections
    let priority = 0.7;
    if (cleanPath === '') priority = 1.0;  // Homepage
    if (cleanPath.startsWith('/articles')) priority = 0.9;
    if (cleanPath.startsWith('/papers')) priority = 0.8;
    
    return {
      loc: `${config.siteUrl}${cleanPath}`,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `${config.siteUrl}${cleanPath}`,
          hreflang: 'en'
        }
      ]
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    additionalSitemaps: [
      'https://www.abhik.xyz/sitemap.xml'
    ]
  }
}