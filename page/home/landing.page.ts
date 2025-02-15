import { Page } from '@playwright/test';

// Element Selectors
export const searchDataInputField = (page: Page) => page.getByTestId('search-input');
export const countryNameDropdownElement = (page: Page, text: string) => page.locator('.country-name').getByText(text);

// Functions
export async function searchAndSelectCountry(page: Page, country: string) {
  await searchDataInputField(page).fill(country);
  await countryNameDropdownElement(page, country).click();
}
