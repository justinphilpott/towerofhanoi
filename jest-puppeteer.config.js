module.exports = {
  server: {
    command: `yarn start`,
    port: 3000,
    launchTimeout: 5000
  },
  launch: {
    headless: true,
    slowMo: 20 // running it faster causes some tests to fail
  }
};
