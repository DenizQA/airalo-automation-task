import { APIRequestContext, APIResponse } from '@playwright/test';
import ENV from '../../utils/env';

/**
 * Fetches a paginated list of eSIMs with optional inclusion of related resources.
 *
 * @param apiContext - The Playwright API request context.
 * @param token - The OAuth2 access token.
 * @param page - The page number to fetch.
 * @param include - Comma-separated list of related resources to include in the response.
 * @returns A promise that resolves to the API response containing the eSIM list.
 * @throws An error if the API request fails.
 */
export async function getEsimList(apiContext: APIRequestContext, token: string, page: number, include: string): Promise<APIResponse> {
  const url = `${ENV.BASE_API_URL}/v2/sims`;

  const response = await apiContext.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: { page, include },
  });

  if (!response.ok()) {
    throw new Error(`Failed to fetch eSIM list. Status: ${response.status()}`);
  }

  return response;
}
