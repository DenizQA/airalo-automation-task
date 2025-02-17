import dotenv from 'dotenv';
import fs from 'fs';
import { postToken } from '../api/endpoints/authentication';

async function globalSetup() {
  if (process.env.test_env) {
    dotenv.config({
      path: `.env.${process.env.test_env}`,
      override: true,
    });
  }

  // Check if tests are API-based, if so, retrieve an access token
  if (!process.env.TEST_TYPE || process.env.TEST_TYPE === 'api') {
    const accessToken = await postToken();
    const envPath = `.env.${process.env.test_env ?? 'default'}`;

    // Read existing environment file content (if it exists)
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

    // Define regex to check if CLIENT_TOKEN already exists in the file
    const accessTokenRegex = /^CLIENT_TOKEN=.*$/m;

    if (accessTokenRegex.test(envContent)) {
      envContent = envContent.replace(accessTokenRegex, `CLIENT_TOKEN=${accessToken}`);
    } else {
      envContent += `\nCLIENT_TOKEN=${accessToken}\n`;
    }

    fs.writeFileSync(envPath, envContent, { encoding: 'utf8' });
  }
}

export default globalSetup;
