import { APIRequestContext, APIResponse } from '@playwright/test';
import ENV from '../../utils/env';

/**
 * Creates an order for eSIMs.
 *
 * @param apiContext - The Playwright API request context.
 * @param token - The OAuth2 access token.
 * @param packageId - The identifier for the eSIM package.
 * @param orderDescription - A description for the order.
 * @param quantity - The number of eSIMs to order (default is 1).
 * @returns A promise that resolves to the API response from the order creation request.
 * @throws An error if the API request fails.
 */
export async function orderEsim(apiContext: APIRequestContext, token: string, packageId: string, orderDescription: string, quantity: number = 1): Promise<APIResponse> {
  const url = `${ENV.BASE_API_URL}/v2/orders`;

  const response = await apiContext.post(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      package_id: packageId,
      quantity,
      description: orderDescription,
    },
  });

  if (!response.ok()) {
    throw new Error(`Failed to create order. Status: ${response.status()}`);
  }

  return response;
}
