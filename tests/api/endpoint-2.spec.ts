import { test, expect } from '@playwright/test';
import { getEsimList } from '../../api/endpoints/get-esim-list';

test('GET eSIMs List', async ({ request }) => {
  const response = await getEsimList(request);

  // Check response status
  expect(response.status()).toBe(200);

  // Parse JSON response
  const responseBody = await response.json();
  console.log('eSIMs List:', responseBody);

  // Additional assertions
  expect(responseBody.package_id).toEqual('merhaba-7days-1g');
});
