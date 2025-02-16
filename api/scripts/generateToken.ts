import { request } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { postToken } from '../endpoints/authentication';

// Stores the token
const AUTH_FILE = path.resolve(__dirname, '../.auth.json');

/**
 * Generates and saves an authentication token.
 */
async function generateToken() {
  const apiContext = await request.newContext();

  try {
    console.log('Requesting new token...');

    // Reusing your existing postToken function
    const token = await postToken(apiContext);

    const tokenData = { token, generatedAt: new Date().toISOString() };

    // Save token to file
    fs.writeFileSync(AUTH_FILE, JSON.stringify(tokenData, null, 2));

    console.log(`✅ Token saved successfully: ${AUTH_FILE}`);
  } catch (error) {
    console.error(`❌ Error generating token: ${(error as Error).message}`);
    process.exit(1);
  }
}

generateToken();
