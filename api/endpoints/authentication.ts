import { expect, request } from '@playwright/test';
import ENV from '../../utils/env';

/**
 * Retrieves an OAuth2 access token using client credentials.
 *
 * @returns A promise that resolves to the access token string.
 * @throws An error if the token retrieval fails.
 */
export async function postToken(): Promise<string> {
  const tokenUrl = `${ENV.BASE_API_URL}/v2/token`;
  const apiContext = await request.newContext();
  let response;

  response = await apiContext.post(tokenUrl, {
    headers: { Accept: 'application/json' },
    form: {
      client_id: ENV.CLIENT_ID as string,
      client_secret: ENV.CLIENT_SECRET as string,
      grant_type: 'client_credentials',
    },
  });

  if (!response.ok()) {
    throw new Error(`Failed to retrieve token. Status: ${response.status()}`);
  }

  const responseBody = await response.json();

  // Assertions to ensure the response body contains the expected data
  expect(responseBody).toBeDefined();
  expect(responseBody.data).toHaveProperty('access_token');
  expect(typeof responseBody.data.access_token).toBe('string');
  expect(responseBody.data.access_token.length).toBeGreaterThan(0);

  return responseBody.data.access_token;
}
