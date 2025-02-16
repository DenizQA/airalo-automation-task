import { test, BrowserContext } from '@playwright/test';
import * as HomeLandingPage from '../../page/home/landing.page';
import * as HomePackageDetailsPage from '../../page/home/package-details.page';
import * as BasePage from '../../page/base.page';
import PackageData from '../../test-data/package-data.json';
import ENV from '../../utils/env';

let context: BrowserContext;
const location = 'Japan';

// Define the structure of each data set (using a mapped type)
type PackageDataSet = {
  title: string;
  coverage: string;
  data: string;
  validity: string;
  price: string;
};

// Define the possible keys for PackageData (e.g., "data-set1", "data-set2", ...)
type PackageDataKeys = `data-set${number}`;

// Explicitly tell TypeScript the type of the PackageData object
const packageData: Record<PackageDataKeys, PackageDataSet> = PackageData;

// Test suite for Salary Insights
test.describe('Package Details test set 1', () => {
  // Before all tests
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
  });

  // Before each test
  test.beforeEach(async ({ page }) => {
    // Block the cookie banner script from loading
    await page.route('**/otBannerSdk.js', async (route) => {
      await route.abort();
    });

    // Navigate to the URL
    await page.goto(ENV.BASE_URL as string);
  });

  test('Verify the first eSIM Package Details for Japan (Airalo)', async ({ page }) => {
    const dataSet = PackageData['data-set1'];

    // Search and select the desired country
    await page.waitForLoadState('load');
    await HomeLandingPage.searchAndSelectCountry(page, location);

    // Choose the first eSIM package and ○n Click on "Buy Now."
    await BasePage.clickOnButton(page, 'Buy now', 0);

    // Verify the Package Details page elements
    await HomePackageDetailsPage.verifyPackagePageElements(page, dataSet.title, dataSet.coverage, dataSet.data, dataSet.validity, dataSet.price);
  });

  // TEST EXAMPLE HOW TO REUSE THE EXISTING FUNCTIONS TO TEST ALL THE PACKAGES UNDER ONE COUNTRY (JAPAN)
  test.skip('Verify eSIM Package Details for multiple packages (Japan)', async ({ page }) => {
    // Search and select the desired country
    await page.waitForLoadState('load');
    await HomeLandingPage.searchAndSelectCountry(page, location);

    // Loop through the test data
    for (let i = 0; i < Object.keys(packageData).length; i++) {
      const dataSetKey = `data-set${i + 1}` as PackageDataKeys; // Create the dynamic key
      const dataSet = packageData[dataSetKey]; // Access the dataset using the dynamic key

      // Choose the eSIM package based on the index
      await BasePage.clickOnButton(page, 'Buy now', i);

      // Verify the Package Details page elements using the data-set for the current package
      await HomePackageDetailsPage.verifyPackagePageElements(page, dataSet.title, dataSet.coverage, dataSet.data, dataSet.validity, dataSet.price);

      // Close the package modal
      await HomePackageDetailsPage.clickOnCloseIcon(page);
    }
  });
});
