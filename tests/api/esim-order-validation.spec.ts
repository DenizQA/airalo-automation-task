import { test, expect } from '@playwright/test';
import { getEsimList } from '../../api/endpoints/get-esim-list';
import { orderEsim } from '../../api/endpoints/order-esim';
import esimOrderData from '../../test-data/esim-order-data.json';

const testData = esimOrderData.merhaba_7days_1gb;

test.describe('eSIM Ordering and Validation API Tests', () => {
  test('Order and Validate eSIMs', async ({ request }) => {
    // Step 1: Order 6 "merhaba-7days-1gb" eSIMs
    const orderResponse = await orderEsim(request, testData.packageId, testData.description, testData.quantity);

    // Validate order creation response
    expect(orderResponse.status()).toBe(200);
    const orderData = await orderResponse.json();
    expect(orderData.data.package_id).toBe(testData.packageId);
    expect(orderData.data.quantity).toBe(testData.quantity);
    expect(orderData.data.description).toBe(testData.description);

    const orderId = orderData.data.id;

    // Step 2: Fetch the list of eSIMs
    const esimListResponse = await getEsimList(request, 1, 'order.user');
    expect(esimListResponse.status()).toBe(200);
    const esimListData = await esimListResponse.json();

    // Filter eSIMs for this order based on package_id and order id
    const orderedEsims = esimListData.data.filter((esim: any) => esim.simable.package_id === testData.packageId && esim.simable.id === orderId);

    // Ensure exactly 6 eSIMs from our order are returned
    expect(orderedEsims).toHaveLength(testData.quantity);

    // Validate that each eSIM has the correct order details
    orderedEsims.forEach((esim: any) => {
      expect(esim.simable.package_id).toBe(testData.packageId);
      expect(esim.simable.description).toBe(testData.description);
      expect(esim.simable.quantity).toBe(testData.quantity);
    });
  });
});
