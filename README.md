# Playwright End to End automation test

End to End testing suite template using:

- Playwright https://playwright.dev/
- TypeScript https://www.typescriptlang.org/

## 🤖 Starting up

1. Install the dependencies using `npm install` or `yarn install`
2. Install the playwright using `npx playwright install`
3. Rename `env.example` to `.env.dev`
4. Check out the UI test by running the `npm run env:dev:ui:test`
5. Check out the API test by running the `npm run env:dev:api:test`

## 📁 Structure

```sh
 |- utils # Configuration file/s
 |- test-data # json files with the data used for the tests
 |- pages # Sets of pages for the applications
 |- tests # Here is the magic 🧙‍♂️
```

## 📜 Pages

For the suite template I chose to follow the PageObjects pattern in order to encapsulate each pages internal structure and responsibilities inside its own highly cohesive file.

That means that for each page we would define a new Page file for my needs. We should not confuse the Page files we create with actual pages in the application. We can think of Pages as a lightweight concept of a **view**, which is the set of cohesive elements living under a known browser location.

## 🔬 Using data-test-id to target elements

Playwright provides all the goodies of a selector engine, so as to make it really easy to target elements on the document. As a general guideline for querying inside our tests/Page objects:

1. Prefer user-facing and rarely changing attributes like `roles`, input `types` etc.
2. Use `data-test-id` responsibly.
3. There is no one-size-fits-all.

## 👔 Test configuration

The test suite is configured to run in the development environment (`dev`). Users can add different `.env` files to configure various environments or login data as needed. This flexibility allows for easy switching between different setups without modifying the code.

Only the Chrome browser is enabled in the configuration. There is a possibility to enable all browsers.
