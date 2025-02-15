import { Page, expect } from '@playwright/test';

// Element Selectors
export const getElementByHeadingName = (page: Page, text: string, index: number) => page.getByRole('heading', { name: `${text}` }).nth(index);
export const buttonElement = (page: Page, text: string, index: number) => page.getByRole('button', { name: `${text}` }).nth(index);

// Functions
export async function verifyHeadingTextDisplayed(page: Page, text: string, index: number) {
  await expect(getElementByHeadingName(page, text, index)).toBeVisible();
}

export async function verifyTextDisplayed(page: Page, text: string) {
  await expect(page.getByText(text)).toBeVisible();
}

export async function clickOnButton(page: Page, name: string, elementNo: number) {
  await buttonElement(page, name, elementNo).click();
}
