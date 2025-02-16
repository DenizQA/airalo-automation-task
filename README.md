# Playwright End to End automation test

End to End testing suite template using:

- Playwright https://playwright.dev/
- TypeScript https://www.typescriptlang.org/

## 🤖 Starting up

1. Install the dependencies using `npm install` or `yarn install`
2. Install the playwright using `npx playwright install`
3. Rename `env.example` to `.env.dev`
4. Check out the UI test by running `npm run test:ui:env:dev`
5. Check out the API test by running `npm run test:api:env:dev`

## 🔑 Generating an Authentication Token

**Why generating token every time?**
Since the token is valid for one year, generating it automatically for every test run would not be efficient. Instead, a one-time manual generation ensures that the token remains valid for an extended period. This method reduces the overhead of regenerating the token repeatedly, especially in CI/CD environments.

## 📁 Structure

```sh
 |- utils       # Configuration file/s
 |- test-data   # JSON files with the data used for the tests
 |- page        # Sets of pages for the applications
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

**Authentication & Token Handling**

**Why Generate the Token in beforeAll?**

- The Airalo Partner API token is valid for one year, meaning it should ideally be cached or stored securely.
- However, the task explicitly requires verifying a valid token before every request, so the simplest approach is generating it in beforeAll for this test suite.
- In real-world scenarios, a token should be stored in environment variables (.env) or a secure key store and refreshed only when expired.

**API Test Structure**

1. Token Retrieval: The token is generated before the tests begin.
2. Order Creation: The test orders six merhaba-7days-1gb eSIMs via a POST request.
3. eSIM Retrieval & Validation: The test fetches the eSIM list and asserts that six correct eSIMs exist.
4. Assertions:
   - Status codes are validated (200 OK for successful responses)
   - Response bodies are checked for expected fields and values

This approach ensures API tests are efficient, maintainable, and compliant with the given task constraints.
