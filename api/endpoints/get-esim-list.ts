import { APIRequestContext, APIResponse } from '@playwright/test';
import ENV from '../../utils/env';

/**
 * Fetches the list of eSIMs.
 *
 * @param apiContext - The API request context.
 * @returns The response from the API.
 */
export async function getEsimList(apiContext: APIRequestContext): Promise<APIResponse> {
  const esimListUrl = `${ENV.BASE_API_URL}/sims`;

  const response = await apiContext.get(esimListUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${ENV.CLIENT_TOKEN}`,
    },
  });

  return response;
}
