import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import ENV from '../../utils/env';

/**
 * Retrieves an OAuth2 access token using client credentials.
 *
 * @param apiContext - The Playwright API request context.
 * @returns A promise that resolves to the access token string.
 * @throws An error if the token retrieval fails.
 */
export async function postToken(apiContext: APIRequestContext): Promise<string> {
  const tokenUrl = `${ENV.BASE_API_URL}/v2/token`;
  let response: APIResponse;

  try {
    response = await apiContext.post(tokenUrl, {
      headers: { Accept: 'application/json' },
      form: {
        client_id: ENV.CLIENT_ID as string,
        client_secret: ENV.CLIENT_SECRET as string,
        grant_type: 'client_credentials',
      },
    });
  } catch (error) {
    throw new Error(`API call failed for token endpoint ${tokenUrl}. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  if (!response.ok()) {
    throw new Error(`Failed to retrieve token. Status: ${response.status()}`);
  }

  const responseBody = await response.json();

  // Validate the structure of the response
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('access_token');

  return responseBody.data.access_token;
}
