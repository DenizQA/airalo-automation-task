import { test } from '@playwright/test';
import * as homeLandingPage from '../../page/home/landing.page';
import * as homeEsimPackageDetailsPage from '../../page/home/esim-package-details.page';
import * as basePage from '../../page/base.page';
import esimData from '../../test-data/esim-data.json';
import ENV from '../../utils/env';

const location = 'Japan';

test.describe('eSIM Package Details TEST SET', () => {
  test.beforeEach(async ({ page }) => {
    // Block the cookie banner script from loading
    await page.route('**/otBannerSdk.js', (route) => route.abort());

    // Navigate to the URL and ensure it's fully loaded
    await page.goto(ENV.BASE_URL as string);
    await page.waitForLoadState('load');
  });

  test('Verify the first eSIM Package Details for Japan (Airalo)', async ({ page }) => {
    const dataSet = esimData['data-set1'];

    // Search and select the desired country
    await homeLandingPage.searchAndSelectCountry(page, location);
    await page.waitForLoadState('domcontentloaded');

    // Click the first "Buy now" button
    await basePage.clickOnButton(page, 'Buy now', 0);

    // Verify package details
    await homeEsimPackageDetailsPage.verifyPackagePageElements(page, dataSet.title, dataSet.coverage, dataSet.data, dataSet.validity, dataSet.price);
  });

  // TEST EXAMPLE HOW TO REUSE THE EXISTING FUNCTIONS TO TEST ALL THE PACKAGES UNDER ONE COUNTRY (JAPAN)
  test.skip('Verify eSIM Package Details for multiple packages (Japan)', async ({ page }) => {
    await homeLandingPage.searchAndSelectCountry(page, location);
    await page.waitForLoadState('domcontentloaded');

    let index = 0;
    for (const key of Object.keys(esimData)) {
      const dataSet = esimData[key as keyof typeof esimData];

      try {
        await basePage.clickOnButton(page, 'Buy now', index);
        await page.waitForLoadState('networkidle');

        await homeEsimPackageDetailsPage.verifyPackagePageElements(page, dataSet.title, dataSet.coverage, dataSet.data, dataSet.validity, dataSet.price);

        await homeEsimPackageDetailsPage.clickOnCloseIcon(page);
      } catch (error) {
        console.error(`Error verifying package ${dataSet.title}:`, error);
      }

      index++;
    }
  });
});
