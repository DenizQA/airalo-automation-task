# Playwright End to End automation test

End to End testing suite template using:

- Playwright https://playwright.dev/
- TypeScript https://www.typescriptlang.org/

## 🤖 Starting up

1. Install the dependencies using `npm install` or `yarn install`
2. Install the playwright using `npx playwright install`
3. Rename `env.example` to `.env.dev`
4. Check out the UI test by running `npm run env:dev:ui:test`
5. Check out the API test by running `npm run env:dev:api:test`

## 🔑 Generating an Authentication Token

The authentication token used for API requests is valid for one year. To generate a new token, follow these steps:

1. **Run the Token Generation Script**
Execute the following command to generate a new token:

   ```sh
   npm run generate-token
   ```

   This command will generate a new token and store it temporarily in a file located at:

   ```sh
   api/.auth.json
   ```


2. **Manually Update the `.env` File**
Once the token is generated, open the `.env` file and copy the generated token from the `api/.auth.json` file. Paste it under the following key:

   ```sh
   CLIENT_TOKEN=your_generated_token_here
   ```

**Why Manual Token Generation?**
Since the token is valid for one year, generating it automatically for every test run would not be efficient. Instead, a one-time manual generation ensures that the token remains valid for an extended period. This method reduces the overhead of regenerating the token repeatedly, especially in CI/CD environments.

## 📁 Structure

```sh
 |- utils       # Configuration file/s
 |- test-data   # JSON files with the data used for the tests
 |- pages       # Sets of pages for the applications
 |- tests       # Here is the magic 🧙‍♂️
 |- api         # API-related scripts and temporary auth storage
```

## 📜 Pages

For the suite template, we follow the PageObjects pattern to encapsulate each page's internal structure and responsibilities inside its own highly cohesive file.
Each page has its own dedicated Page file. Note that Page files do not necessarily correspond directly to application pages but rather represent logical **views** in the application.

## 🔬 Using data-test-id to target elements

Playwright provides a powerful selector engine for targeting elements. As a general guideline for querying elements inside our tests/Page objects:

1. Prefer user-facing and rarely changing attributes like `roles`, input `types`, etc.
2. Use `data-test-id` responsibly.
3. There is no one-size-fits-all approach.

## 👔 Test configuration

The test suite is configured to run in the development environment (`dev`). Users can add different `.env` files to configure various environments or login data as needed.
This flexibility allows for easy switching between different setups without modifying the code.

Only the Chrome browser is enabled in the configuration. Other browsers can be enabled if needed.

## 🧩 Test Approach

### UI Tests

**Reusable Data Setup:** Test data is handled through JSON files, allowing multiple test sets to be added and reused across different tests. The first test uses test-set 1 as required, and an additional skipped test shows how to test all packages for a specific country or location.
**Test Structure:** The UI tests follow a modular approach, with functions designed for reuse and flexibility.

### API Tests

**Description:** (Will be added once the API tests are in place.)
