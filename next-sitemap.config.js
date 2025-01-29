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
  transform: async (config, path) => {
    // Remove trailing slashes for canonical consistency
    const canonicalPath = path.endsWith('/') ? path.slice(0, -1) : path;
    
    // Custom priority for different sections
    let priority = 0.7;
    if (canonicalPath === '') priority = 1.0;  // Homepage
    if (canonicalPath.startsWith('/articles')) priority = 0.9;
    if (canonicalPath.startsWith('/papers')) priority = 0.8;
    
    return {
      loc: `${config.siteUrl}${canonicalPath}`,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [
        {
          href: `${config.siteUrl}${canonicalPath}`,
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
        disallow: ['/api/', '/thank-you', '/_next/', '/static/']
      }
    ],
    additionalSitemaps: []
  }
}