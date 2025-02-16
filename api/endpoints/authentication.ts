import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import ENV from '../../utils/env';

/**
 * Post and retrieve an authentication token.
 *
 * @param apiContext - The API context object.
 * @returns The authentication token.
 */
export async function postToken(apiContext: APIRequestContext): Promise<string> {
  let postTokenResponse: APIResponse;
  const loginTokenUrl = `${ENV.BASE_API_URL}/token`;

  try {
    postTokenResponse = await apiContext.post(loginTokenUrl, {
      headers: { Accept: 'application/json' },
      form: {
        client_id: ENV.CLIENT_ID as string,
        client_secret: ENV.CLIENT_SECRET as string,
        grant_type: 'client_credentials',
      },
    });

    // Check if the response is OK (status in the range 200-299)
    if (!postTokenResponse.ok()) {
      // If not OK, throw an error with a descriptive message
      throw new Error(`Failed to retrieve token. Status: ${postTokenResponse.status()}`);
    }
  } catch (error) {
    // Handle errors in the API call
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed on API call to ${loginTokenUrl}. ${errorMessage}`);
  }
  const responseBody = await postTokenResponse.json();

  // Assertions to ensure the response body contains the expected data
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('access_token');

  // Return the access token
  return responseBody.data.access_token;
}
