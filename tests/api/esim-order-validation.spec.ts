import { test, expect } from '@playwright/test';
import { getEsimList } from '../../api/endpoints/get-esim-list';
import { orderEsim } from '../../api/endpoints/order-esim';
import { postToken } from '../../api/endpoints/authentication';
import EsimOrderData from '../../test-data/esim-order-data.json';

const testData = EsimOrderData.merhaba_7days_1gb;
let accessToken: string;

test.describe('eSIM Ordering and Validation API Tests', () => {
  test.beforeAll(async ({ request }) => {
    // Retrieve the OAuth2 token once before running the tests
    accessToken = await postToken(request);
  });

  test('Order and Validate eSIMs', async ({ request }) => {
    // Step 1: Order 6 "merhaba-7days-1gb" eSIMs
    const orderResponse = await orderEsim(request, accessToken, testData.packageId, testData.description, testData.quantity);

    // Validate order creation response
    expect(orderResponse.status()).toBe(200);
    const orderData = await orderResponse.json();
    expect(orderData.data.package_id).toBe(testData.packageId);
    expect(orderData.data.quantity).toBe(testData.quantity);
    expect(orderData.data.description).toBe(testData.description);

    const orderId = orderData.data.id; // More descriptive name

    // Step 2: Fetch the list of eSIMs
    const esimListResponse = await getEsimList(request, accessToken, 1, 'order.user');
    expect(esimListResponse.status()).toBe(200);
    const esimListData = await esimListResponse.json();

    // Filter eSIMs for this order based on package_id and order id
    const orderedEsims = esimListData.data.filter((esim: any) => esim.simable.package_id === testData.packageId && esim.simable.id === orderId);

    // Ensure exactly 6 eSIMs from our order are returned
    expect(orderedEsims).toHaveLength(testData.quantity);

    // Validate that each eSIM has the correct package slug
    orderedEsims.forEach((esim: any) => {
      expect(esim.simable.package_id).toBe(testData.packageId);
    });
  });
});
