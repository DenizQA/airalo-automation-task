import { Page } from '@playwright/test';

// Element Selectors
export const buttonElement = (page: Page, text: string, index: number) => page.getByRole('button', { name: `${text}` }).nth(index);

// Functions
export async function clickOnButton(page: Page, name: string, elementNo: number) {
  await buttonElement(page, name, elementNo).click();
}
