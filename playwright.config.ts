import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

/*const { EyesFixture } = require('@applitools/eyes-playwright/fixture');

export default defineConfig({

  // Below configuration use for Applitools Visualizations
    testDir: './tests',
    reporter: '@applitools/eyes-playwright/reporter',
    use: {
        baseURL: 'http://localhost:4200',
        viewport: {height: 720, width: 1200}
    },
    projects: [
      {
        name: 'chromium',
        use: {...devices['Desktop Chrome']},
      },
    ],
}); */


export default defineConfig<TestOptions>({

// Additional configuration

  timeout: 40000,
  //globalTimeout: 60000,
  expect:{
    timeout: 2000,
    toMatchSnapshot: {maxDiffPixels:50}
  },
  retries: 1, 
  reporter: [

        process.env.CI ? ["dot"] : ["list"],

    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
        //token: "argos_666bf9e8de55989acd9efc01c656f7f9a1",
      },
    ],
              ['json', {outputFile: 'test-results/jsonReport.json'}],
              ['junit', {outputFile: 'test-results/junitReport.xml'}],
             // ['allure-playwright'],
              ['html']
            ],
  
  use: {
     globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
     //baseURL: 'http://localhost:4200/',
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
     baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
        : process.env.STAGING == '1' ? 'http://localhost:4202/'
        : 'http://localhost:4200/', 
    actionTimeout: 5000,
    navigationTimeout: 8000,
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
   }
  }, 

  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200'
       },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
        video: {
          mode: 'on',
          size: {width: 1920, height: 1080}
        },
      },
    }, 
    {
      name: 'chromium',
    },
    
    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: {width: 1920, height: 1080}
      }
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
          ...devices['iPhone 13 Pro']
      }
    }   
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200'
  }

}); 