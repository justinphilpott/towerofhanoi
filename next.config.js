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
});
