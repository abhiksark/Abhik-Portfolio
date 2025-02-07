module.exports = {
  siteUrl: 'https://www.abhik.xyz',
  generateRobotsTxt: true,
  exclude: ['/thank-you', '/api/*', '/_next/*', '/static/*'],
  priority: 0.7,
  sitemapSize: 7000, // Increased to handle all URLs in one file
  changefreq: 'daily',
  sitemapBaseFileName: 'sitemap', // The base name for the sitemap
  outDir: 'public', // Output directory
  generateIndexSitemap: false, // Disable index sitemap generation
  trailingSlash: false, // Explicitly disable trailing slashes
  transform: async (config, path) => {
    // Always remove trailing slashes
    const cleanPath = path.replace(/\/*$/, '');
    
    // Custom priority for different sections
    let priority = 0.7;
    if (cleanPath === '') priority = 1.0;  // Homepage
    if (cleanPath.startsWith('/articles')) priority = 0.9;
    if (cleanPath.startsWith('/papers')) priority = 0.8;
    
    return {
      loc: `${config.siteUrl}${cleanPath}`,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
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
        allow: '/',
        disallow: ['/api', '/thank-you', '/_next', '/static']
      }
    ],
    additionalSitemaps: []
  }
}