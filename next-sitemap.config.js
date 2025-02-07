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
    // Always remove trailing slashes and clean the path
    const cleanPath = path.replace(/\/+/g, '/').replace(/\/$/, '');
    
    // Custom priority for different sections
    let priority = 0.7;
    if (cleanPath === '') priority = 1.0;  // Homepage
    if (cleanPath.startsWith('/articles')) priority = 0.9;
    if (cleanPath.startsWith('/papers')) priority = 0.8;
    
    // Format the date consistently
    const lastmod = config.autoLastmod 
      ? new Date().toISOString()
      : new Date().toISOString();
    
    return {
      loc: `${config.siteUrl}${cleanPath}`,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: lastmod,
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
  },
  // Additional formatting options
  xmlOptions: {
    xmlDeclaration: true,
    xslUrl: undefined,
    noindex: undefined,
    xml: {
      encoding: 'UTF-8',
      xmlnsNews: 'http://www.google.com/schemas/sitemap-news/0.9',
      xmlnsXhtml: 'http://www.w3.org/1999/xhtml',
      xmlnsMobile: 'http://www.google.com/schemas/sitemap-mobile/1.0',
      xmlnsImage: 'http://www.google.com/schemas/sitemap-image/1.1',
      xmlnsVideo: 'http://www.google.com/schemas/sitemap-video/1.1'
    }
  }
}