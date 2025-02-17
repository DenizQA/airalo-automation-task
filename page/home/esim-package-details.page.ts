import { expect, Page } from '@playwright/test';

const infoListElement = (page: Page, testId: string, text: string) => page.getByTestId('sim-detail-info-list').getByTestId(testId).getByText(text);

// Element Selectors
export const operatorTitle = (page: Page, text: string) => page.getByTestId('sim-detail-operator-title').getByText(text);
export const coverageElement = (page: Page, text: string) => infoListElement(page, 'COVERAGE-value', text);
export const dataElement = (page: Page, text: string) => infoListElement(page, 'DATA-value', text);
export const validityElement = (page: Page, text: string) => infoListElement(page, 'VALIDITY-value', text);
export const priceElement = (page: Page, text: string) => infoListElement(page, 'PRICE-value', text);
export const closeIcon = (page: Page) => page.locator('.sim-detail-close');

// Functions
export async function verifyPackagePageElements(page: Page, title: string, coverage: string, data: string, validity: string, price: string) {
  await expect(operatorTitle(page, title)).toBeVisible();
  await expect(coverageElement(page, coverage)).toBeVisible();
  await expect(dataElement(page, data)).toBeVisible();
  await expect(validityElement(page, validity)).toBeVisible();
  await expect(priceElement(page, price)).toBeVisible();
}

export async function clickOnCloseIcon(page: Page) {
  await closeIcon(page).click();
}
