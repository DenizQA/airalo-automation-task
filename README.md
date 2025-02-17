# Playwright End to End automation test

End to End testing suite template using:

- Playwright https://playwright.dev/
- TypeScript https://www.typescriptlang.org/

## 🤖 Starting up

1. Install the dependencies using `npm install` or `yarn install`
2. Install the playwright using `npx playwright install`
3. Rename `env.example` to `.env.dev`
4. Add the required API credentials (`CLIENT_ID` and `CLIENT_SECRET`) to the newly created `.env.dev` file.
   ```sh
      CLIENT_ID= {your_client_id_here}
      CLIENT_SECRET= {your_client_secret_here}
   ```
5. Check out the UI test by running `npm run test:ui:env:dev`
6. Check out the API test by running `npm run test:api:env:dev`
7. Check out the all test by running `npm run test:all:env:dev`

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

**Reusable Data Setup:**

- Test data is handled through **JSON files** (`esim-data.json`), allowing multiple test sets to be added and reused across different test cases.
- The first test verifies the details of the first eSIM package for **Japan**, using the dataset `data-set1`.
- An additional **skipped** test demonstrates how to iterate over all available eSIM packages for a specific country (**Japan**) and verify each package dynamically.

**Test Structure:**

- The UI tests follow a modular approach, with functions designed for reuse and flexibility.

### API Tests

**Authentication & Token Handling**

**Why Generate the Token in global-setup for every test run?**

- The token is generated in `global-setup` only when API tests are run (or when both UI and API tests are run together). It is then stored in the `.env` file as `CLIENT_TOKEN`.
- This approach ensures the token is available for API-related tests while securely storing it in the environment file for later use. Since the token can only be generated **five times per minute**, this method guarantees it is created only when necessary (once per test run for API tests).
- The Airalo Partner API token is valid for one year, meaning it should ideally be cached or stored securely. Due to its long expiration time, there are multiple ways to handle authentication. However, I chose to generate the token before each test run to explicitly follow the task requirement: **"Ensure you have a valid OAuth2 token before making the request."**.
- In real-world scenarios, a token should be stored in environment variables (`.env`) or a secure key store and refreshed only when they expire.

**API Test Structure**

1. **Token Retrieval**: The token is generated at a global level before running API tests.
2. **Order Creation**: The test places an order for six `merhaba-7days-1gb` eSIMs via a **POST** request.
3. **eSIM Retrieval & Validation**: The test fetches the list of available eSIMs and verifies that 6 correct eSIMs exist.
   - The API returns a **paginated list** of all available eSIMs, meaning that the response might contain multiple records that are unrelated to the current order.
   - To correctly identify the eSIMs from our order, the test iterates through all returned records and **filters based on two conditions**:
     1. The `package_id` matches the package ordered.
     2. The `simable.id` matches the `data.id` from the order response.
   - By applying this filter, we extract only the eSIMs that belong to our specific order and ignore unrelated records.
4. **Assertions**:
   - **Status Codes**: Validate that responses return **200 OK**.
   - **Response Data**: Check expected fields and values (`package_id`, `quantity`, `description`, `id`).
   - **Order Consistency**: Ensure the retrieved eSIMs have the same details as those specified in the order request.
   - **Record Count Verification**: Confirm that exactly six eSIMs are returned for our order.
   - **Detailed Validation**: Each retrieved eSIM is checked against the expected order details (`package_id`, `quantity`, `description`) to ensure full accuracy.
