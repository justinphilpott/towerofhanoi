module.exports = {
  server: {
    command: `yarn start`,
    port: 3000,
    launchTimeout: 5000
  },
  launch: {
    headless: false,
    slowMo: 20 // running it faster causes some tests to fail, and this will likely be system dependent
  }
};
