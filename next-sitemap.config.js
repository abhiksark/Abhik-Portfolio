module.exports = {
  siteUrl: 'https://www.abhik.xyz',
  generateRobotsTxt: true,
  exclude: ['/thank-you', '/api/*'],
  priority: 0.7,
  sitemapSize: 5000,
  changefreq: 'daily',
  transform: async (config, path) => {
    // Custom priority for different pages
    let priority = 0.7;
    if (path === '/') priority = 1.0;
    if (path.startsWith('/articles/')) priority = 0.9;
    if (path.startsWith('/papers/')) priority = 0.8;
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}

