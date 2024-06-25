// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries: 3,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  
  reporter: 'html',

  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'off',
        trace: 'retain-on-failure',
        viewport: {width: 720, hegiht: 720}
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'off',
        trace: 'retain-on-failure',
        ...devices['iPhone 11 Pro'],
        permissions: ['geolocation']
      },
    },

    
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
};

module.exports = config;
