const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withPWA({
  webpack5: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Replace React with Preact
    Object.assign(config.resolve.alias, {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    });
    return config;
  },
}));
