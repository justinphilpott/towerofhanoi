const withPWA = require('next-pwa')

module.exports = withPWA({
  webpack5: true,
  pwa: {
    dest: 'public'
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });

    return config;
  },
});
