import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'tests/e2e/integration',
    globalSetup: './tests/e2e/integration/utils/hooks/setup.ts',
    globalTeardown: './tests/e2e/integration/utils/hooks/teardown.ts',
    timeout: 90000,
    /* Run tests in files in parallel todo: enable in production */
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'https://localhost:3000',
        trace: 'on-first-retry',
        ignoreHTTPSErrors: true,
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    /* Run your local dev server before starting the tests */
    webServer: {
        command: 'npm run dev',
        url: 'https://localhost:3000',
        reuseExistingServer: !process.env.CI,
        ignoreHTTPSErrors: true,
    },
});
