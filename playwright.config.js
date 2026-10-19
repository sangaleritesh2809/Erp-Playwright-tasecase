// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for */
  timeout: 90000,
  /* Run tests sequentially so only 1 browser opens */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Only 1 browser tab/window at a time */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,

    /* Delay each action by 1000ms so login is easy to follow visually */
    launchOptions: {
      slowMo: 1000,
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects - Login runs first, Group runs second with login skipped */
  projects: [
    {
      name: 'login',
      testMatch: /.*Login\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'group',
      testMatch: /.*Group\.spec\.js/,
      dependencies: ['login'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
      },
    },
    {
      name: 'menu',
      testMatch: /.*Menu\.spec\.js/,
      dependencies: ['login'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
      },
    },
    {
      name: 'hrms',
      testMatch: /.*HrmsConfiguration\.spec\.js/,
      dependencies: ['login'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

