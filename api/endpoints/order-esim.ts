import { APIRequestContext, APIResponse } from '@playwright/test';
import ENV from '../../utils/env';

export async function orderEsim(apiContext: APIRequestContext, packageId: string, orderDescription: string, quantity: number): Promise<APIResponse> {
  return apiContext.post(`${ENV.BASE_API_URL}/orders`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${ENV.CLIENT_TOKEN}`,
    },
    data: {
      package_id: packageId,
      quantity: quantity,
      description: orderDescription,
    },
  });
}
