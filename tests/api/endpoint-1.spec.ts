import { test, request, expect, APIRequestContext } from '@playwright/test';
import { orderEsim } from '../../api/endpoints/order-esim';

test.describe('Order eSIM API Tests', () => {
  let apiContext: APIRequestContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext();
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('Order 6 "merhaba-7days-1gb" eSIMs successfully', async () => {
    const response = await orderEsim(apiContext, 'merhaba-7days-1gb', 'test: merhaba-7days-1gb', 6);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.data.package_id).toEqual('merhaba-7days-1gb');
  });
});
