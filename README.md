# WCS Selenium Automation Test Project

## 1. Project Overview

This project contains Selenium WebDriver automation tests for the WCS Customer Portal.

The project uses:

- Node.js
- Selenium WebDriver
- Mocha
- Chai
- Mochawesome
- dotenv
- Google Chrome

The automation project contains:

- Functional test cases
- UI test cases
- Login test cases
- Page Object Model classes
- Selenium WebDriver configuration
- Test reports
- Test data and sample documents

---

# 2. Application Under Test

WCS Customer Portal:

https://wcscustomerportal.azurewebsites.net/

Login page:

https://wcscustomerportal.azurewebsites.net/login

---

# 3. Project Structure

```text
wcs-selenium-test/
│
├── assets/
│   └── Test documents and files
│
├── pages/
│   ├── CartCheckoutPage.js
│   ├── CartPage.js
│   ├── DashboardPage.js
│   ├── DispatchService.js
│   ├── FAQPage.js
│   ├── GlobalAuthenticationPage.js
│   ├── LoginPage.js
│   ├── MyOrdersPage.js
│   ├── NotaryService.js
│   ├── OrderPage.js
│   ├── OrderUIPage.js
│   ├── TranslationServicePage.js
│   └── VisaService.js
│
├── tests/
│   │
│   ├── all_test/
│   │   └── allFunctionalTest.test.js
│   │
│   ├── ui/
│   │   └── allServicesUI.test.js
│   │
│   └── login/
│       ├── login.test.js
│       └── loginUI.test.js
│
├── utils/
│   └── driver.js
│
├── screenshots/
│
├── mochawesome-report/
│
├── test-data/
│
├── .env
├── package.json
└── README.md
```

> The exact folders/files may change as new test cases are added.

---

# 4. Prerequisites

Before running the automation project, make sure the following are installed:

1. Node.js
2. npm
3. Google Chrome
4. VS Code or another code editor
5. Project dependencies

Check Node.js:

```powershell
node --version
```

Check npm:

```powershell
npm --version
```

Check Chrome:

```text
Open Google Chrome and verify that it is installed.
```

---

# 5. Open the Project

Open PowerShell and navigate to the project directory.

Example:

```powershell
cd "D:\new project testing\wcs-selenium-test"
```

If your project is located somewhere else, use your actual project path.

---

# 6. Install Dependencies

After opening the project, install all Node.js dependencies:

```powershell
npm install
```

This installs the dependencies defined in `package.json`.

If `node_modules` already exists but dependencies have changed, run:

```powershell
npm install
```

again.

---

# 7. Environment Variables

The project uses a `.env` file for configuration such as login credentials.

Example:

```env
BASE_URL=https://wcscustomerportal.azurewebsites.net/login
EMAIL=your-email@example.com
PASSWORD=your-password
```

Use the actual values required by your test environment.

## Important

Do not commit the `.env` file to Git if it contains real credentials.

Add this to `.gitignore`:

```text
.env
```

---

# 8. Selenium Driver

The Selenium WebDriver configuration is located in:

```text
utils/driver.js
```

The driver creates a Chrome browser and configures Selenium timeouts.

Example configuration:

```javascript
await driver.manage().setTimeouts({
    implicit: 5000,
    pageLoad: 30000,
    script: 30000
});
```

The driver is used by the test cases to:

- Open Chrome
- Navigate to the application
- Find elements
- Click buttons
- Enter text
- Upload documents
- Navigate between pages
- Verify application behavior

---

# 9. Page Object Model

The project follows the Page Object Model (POM).

The page classes are located inside:

```text
pages/
```

For example:

```text
pages/LoginPage.js
pages/GlobalAuthenticationPage.js
pages/TranslationServicePage.js
pages/VisaService.js
pages/NotaryService.js
pages/DispatchService.js
pages/CartCheckoutPage.js
```

Each page class contains locators and reusable methods for that page.

For example:

```javascript
await loginPage.enterEmail(email);
await loginPage.enterPassword(password);
await loginPage.clickLogin();
```

This keeps the test files cleaner and makes locators easier to maintain.

---

# 10. Test Types

There are three main categories of tests.

## 10.1 Functional Tests

Functional tests verify complete business flows.

Example:

```text
Login
   ↓
Open Service
   ↓
Fill Service Form
   ↓
Upload Documents
   ↓
Checkout
   ↓
Cart
   ↓
Shipping
   ↓
Refund Policy
   ↓
Payment
   ↓
Confirmation
   ↓
Verify Order Number
```

---

## 10.2 UI Tests

UI tests verify the presence and behavior of UI elements.

Examples:

- Page headings
- Buttons
- Navigation links
- Form fields
- Service links
- Dashboard elements
- My Orders elements
- FAQ elements

---

## 10.3 Login Tests

Login tests verify authentication behavior.

Examples:

- Valid login
- Invalid email
- Invalid password
- Invalid credentials
- Empty fields
- Password behavior
- Login page UI

---

# 11. Main Functional Test File

The main functional test file is:

```text
tests/all_test/allFunctionalTest.test.js
```

This file contains the combined functional test cases.

The functional suite is designed so that the browser is initialized once and the login is performed once before the service tests run.

The test cases then execute using the same authenticated browser session.

---

# 12. Functional Test Cases

The functional suite contains the service flows available in the project.

Typical test cases include:

```text
1. Complete US Authentication Order
2. Add multiple US Authentication documents and complete order
3. Complete Global Authentication Order
4. Complete Translation Service Order
5. Complete Visa Service Order
6. Complete Notary Service Order
7. Complete Dispatch Service Order
8. Add multiple Dispatch Service documents and complete order
```

The exact test names should be checked in:

```text
tests/all_test/allFunctionalTest.test.js
```

because test names can change when the test suite is updated.

---

# 13. Run All Functional Test Cases

Run:

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js
```

To run with Mochawesome:

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --reporter mochawesome
```

Example successful result:

```text
8 passing
```

---

# 14. Run All UI Test Cases

The combined UI test file is:

```text
tests/ui/allServicesUI.test.js
```

Run:

```powershell
npx mocha .\tests\ui\allServicesUI.test.js
```

Or with Mochawesome:

```powershell
npx mocha .\tests\ui\allServicesUI.test.js --reporter mochawesome
```

---

# 15. Run Login Functional Tests

Login functional tests are located in:

```text
tests/login/login.test.js
```

Run:

```powershell
npx mocha .\tests\login\login.test.js
```

Or:

```powershell
npx mocha .\tests\login\login.test.js --reporter mochawesome
```

---

# 16. Run Login UI Tests

Login UI tests are located in:

```text
tests/login/loginUI.test.js
```

Run:

```powershell
npx mocha .\tests\login\loginUI.test.js
```

Or:

```powershell
npx mocha .\tests\login\loginUI.test.js --reporter mochawesome
```

---

# 17. Run All Test Files at Once

If the `package.json` contains the test script:

```json
"test": "mocha tests/**/*.test.js --reporter mochawesome"
```

then all test files can be executed using:

```powershell
npm test
```

or:

```powershell
npm run test
```

This runs the test files matching:

```text
tests/**/*.test.js
```

---

# 18. Run an Individual Functional Test Case

Mocha allows a specific test case to be selected using `--grep`.

For example, to run only the Translation Service test:

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Translation Service Order"
```

With Mochawesome:

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Translation Service Order" --reporter mochawesome
```

---

# 19. Run Only Global Authentication

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Global Authentication Order"
```

---

# 20. Run Only Translation Service

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Translation Service Order"
```

---

# 21. Run Only Visa Service

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Visa Service Order"
```

---

# 22. Run Only Notary Service

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Notary Service Order"
```

---

# 23. Run Only Dispatch Service

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Dispatch Service Order"
```

---

# 24. Run Only US Authentication

Use the exact test name from the test file.

Example:

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete US Authentication"
```

If the test name is different, copy the exact name from:

```text
tests/all_test/allFunctionalTest.test.js
```

---

# 25. Run One UI Test

You can also use `--grep` with the UI test file.

Example:

```powershell
npx mocha .\tests\ui\allServicesUI.test.js --grep "Translation Service UI"
```

To run a specific UI test:

```powershell
npx mocha .\tests\ui\allServicesUI.test.js --grep "Should display Translation Service heading"
```

Another example:

```powershell
npx mocha .\tests\ui\allServicesUI.test.js --grep "Global Authentication"
```

---

# 26. Run One Login Test

Example:

```powershell
npx mocha .\tests\login\login.test.js --grep "login successfully"
```

For an invalid email test:

```powershell
npx mocha .\tests\login\login.test.js --grep "invalid email"
```

For an invalid password test:

```powershell
npx mocha .\tests\login\login.test.js --grep "invalid password"
```

Use the exact test name if the `--grep` value does not match.

---

# 27. CAPTCHA

The WCS login page contains a CAPTCHA.

When a functional test needs to log in, Selenium cannot automatically solve the CAPTCHA.

The normal flow is:

```text
Open Login Page
      ↓
Enter Email
      ↓
Enter Password
      ↓
Solve CAPTCHA Manually
      ↓
Click Sign In
      ↓
Wait for Dashboard
      ↓
Continue Test
```

When the test prints:

```text
Solve CAPTCHA manually...
```

solve the CAPTCHA in the Chrome browser.

Do not close Chrome while the test is running.

---

# 28. Login Flow

The login page object is:

```text
pages/LoginPage.js
```

The normal login flow is:

```javascript
await loginPage.open();

await loginPage.enterEmail(email);

await loginPage.enterPassword(password);

await loginPage.clickLogin();
```

The test then waits for the application dashboard.

---

# 29. Translation Service Flow

Translation Service supports two directions:

```text
English → Other Language
```

and:

```text
Other Language → English
```

It does not support:

```text
Other Language → Other Language
```

## Translation Logic

If Original Language is:

```text
English
```

then the user can select another language as the Translated Language.

If Original Language is anything other than:

```text
English
```

then the Translated Language automatically becomes:

```text
English
```

Example:

```text
English → Spanish
```

is allowed.

```text
Spanish → English
```

is allowed.

```text
Spanish → French
```

is not allowed.

---

# 30. Translation Service Order Flow

The Translation Service functional test performs:

```text
Open Translation Service
       ↓
Select Original Language
       ↓
Select Translated Language
       ↓
Upload Document
       ↓
Upload Cover Letter (optional)
       ↓
Upload Shipping Label (optional)
       ↓
Enter Additional Comments (optional)
       ↓
Checkout
       ↓
Cart
       ↓
Shipping
       ↓
Refund Policy
       ↓
Payment
       ↓
Confirmation
       ↓
Verify Order Number
```

The main document is required.

The Cover Letter is optional.

The Shipping Label is optional.

Additional Comments are optional.

---

# 31. Existing Cart Handling

The application can display:

```text
Order Already in Cart

You already have an order in your cart.
Please choose one of the options below to continue.
```

When this popup appears, the test should handle the existing cart before continuing.

Possible options are:

```text
Go to Cart
Clear Cart
```

If the test needs to start a new order, the existing cart can be cleared.

---

# 32. Notary Service Flow

The Notary Service test follows the application flow:

```text
Open Notary Service
       ↓
Handle Existing Cart
       ↓
Select Country
       ↓
Select Document
       ↓
Enter Required Information
       ↓
Upload Required Document
       ↓
Select Additional Options
       ↓
Checkout
       ↓
Cart
       ↓
Shipping
       ↓
Refund Policy
       ↓
Payment
       ↓
Confirmation
       ↓
Verify Order Number
```

The exact required fields should be checked in:

```text
pages/NotaryService.js
```

---

# 33. Global Authentication Flow

The Global Authentication functional test follows the service form and then continues to checkout.

General flow:

```text
Login
   ↓
Open Global Authentication
   ↓
Fill Required Fields
   ↓
Upload Required Documents
   ↓
Checkout
   ↓
Cart
   ↓
Shipping
   ↓
Refund Policy
   ↓
Payment
   ↓
Confirmation
   ↓
Verify Order Number
```

---

# 34. Visa Service Flow

The Visa Service test follows the Visa Service form and checkout flow.

General flow:

```text
Login
   ↓
Open Visa Service
   ↓
Fill Required Information
   ↓
Upload Required Documents
   ↓
Checkout
   ↓
Cart
   ↓
Shipping
   ↓
Refund Policy
   ↓
Payment
   ↓
Confirmation
   ↓
Verify Order Number
```

---

# 35. Dispatch Service Flow

Dispatch Service supports document upload and ordering.

General flow:

```text
Login
   ↓
Open Dispatch Service
   ↓
Select Required Options
   ↓
Upload Documents
   ↓
Checkout
   ↓
Cart
   ↓
Shipping
   ↓
Refund Policy
   ↓
Payment
   ↓
Confirmation
   ↓
Verify Order Number
```

The project also contains a multiple-document Dispatch Service test.

---

# 36. Payment Flow

After a service is added to the cart, the test continues to the cart/checkout page.

General flow:

```text
Service Form
    ↓
Checkout
    ↓
Cart
    ↓
Select Shipping
    ↓
Accept Refund Policy
    ↓
Select Payment Method
```

If the selected payment method requires card information:

```text
Enter Card Details
    ↓
Checkout & Pay
    ↓
Confirmation
```

If the selected payment method does not require card information:

```text
Checkout From Cart
    ↓
Confirm Pay Later
    ↓
Confirmation
```

The exact behavior depends on the payment method returned by the application.

---

# 37. Order Confirmation

After payment/order completion, the test waits for the confirmation page.

The test then retrieves the order number.

The order number must not be empty.

Example validation:

```javascript
expect(orderNumber).to.not.equal("");
```

This verifies that the order was successfully created.

---

# 38. My Orders

The My Orders page can be used to verify existing orders.

General flow:

```text
Login
   ↓
My Orders
   ↓
Search/View Order
   ↓
Verify Order Information
```

The corresponding page object is:

```text
pages/MyOrdersPage.js
```

---

# 39. UI Test Flow

The combined UI suite is:

```text
tests/ui/allServicesUI.test.js
```

The UI suite creates the browser and logs in once in the `before` hook.

The tests then verify different pages and services.

General flow:

```text
Start Test
   ↓
Open Browser
   ↓
Login Once
   ↓
Dashboard UI
   ↓
Service UI Tests
   ↓
My Orders UI
   ↓
Other UI Tests
   ↓
Close Browser
```

---

# 40. Important Difference: before / beforeEach

The project may use both `before` and `beforeEach`.

## before

Runs once before all tests in a suite.

Example:

```javascript
before(async function () {
    driver = await getDriver();

    await loginPage.login(email, password);
});
```

This is useful when multiple tests should share one login session.

---

## beforeEach

Runs before every test.

Example:

```javascript
beforeEach(async function () {
    driver = await getDriver();
});
```

This creates a new setup for every test.

If login is inside `beforeEach`, the login process can happen multiple times.

---

# 41. Why Combined Functional Tests Use One Login

The combined functional suite is designed to avoid logging in separately for every service.

Instead:

```text
Start
  ↓
Login Once
  ↓
US Authentication
  ↓
Global Authentication
  ↓
Translation
  ↓
Visa
  ↓
Notary
  ↓
Dispatch
  ↓
End
```

This saves execution time and avoids unnecessary repeated CAPTCHA solving.

---

# 42. Common Selenium Errors

## ElementNotInteractableError

Example:

```text
ElementNotInteractableError:
element not interactable
```

This means Selenium found the element but could not interact with it.

Possible reasons:

- Element is hidden
- Element is disabled
- Element is covered by another element
- Page is still loading
- Modal is open
- Dropdown is open
- React has not finished rendering
- Wrong matching element was selected

---

# 43. ElementClickInterceptedError

Example:

```text
ElementClickInterceptedError:
element click intercepted
```

This means another element is covering the element Selenium tried to click.

For example:

```text
Email input
    ↓
Dropdown/list/modal covering input
```

Possible solutions:

- Wait for the popup/loader to disappear
- Close the popup
- Scroll the element into view
- Re-locate the element
- Use an appropriate explicit wait

---

# 44. TimeoutError

Example:

```text
TimeoutError:
Waiting for element to be located
```

This means Selenium could not find the expected element before the timeout expired.

Check:

1. Is the correct page open?
2. Is the locator correct?
3. Is a loader displayed?
4. Is a popup displayed?
5. Did the application redirect?
6. Did React finish rendering?
7. Is the element inside an iframe?
8. Is the element conditionally displayed?

---

# 45. StaleElementReferenceError

Example:

```text
StaleElementReferenceError
```

This usually happens when the application re-renders an element after Selenium already located it.

React applications can replace DOM elements during rendering.

A common solution is to locate the element again before interacting with it.

---

# 46. CAPTCHA and Login Errors

If the login test fails before the dashboard loads, first check:

```text
1. Is the login page open?
2. Is the email field visible?
3. Is the password field visible?
4. Was the CAPTCHA solved?
5. Was the Sign In button clicked?
6. Did the application redirect?
7. Are the credentials correct?
```

---

# 47. Chrome Console Errors

During Selenium execution you may see Chrome messages such as:

```text
PHONE_REGISTRATION_ERROR
```

or:

```text
DEPRECATED_ENDPOINT
```

These are Chrome/Google background service messages.

They are not automatically the reason the Selenium test failed.

Always look at the actual Mocha failure:

```text
ElementNotInteractableError
TimeoutError
ElementClickInterceptedError
StaleElementReferenceError
AssertionError
```

The actual Mocha error and stack trace should be used to diagnose the test failure.

---

# 48. How to Debug a Failed Test

When a test fails, first look at:

```text
1. Test name
2. Error type
3. Locator
4. Timeout
5. File name
6. Line number
```

Example:

```text
TimeoutError:
Waiting for element to be located
By(xpath, //...)
Wait timed out after 30000ms
```

Then check the referenced page object.

For example:

```text
pages/TranslationServicePage.js
```

Check the locator that was used at the failing line.

---

# 49. Running Tests in VS Code

Open the project in VS Code.

Open:

```text
Terminal → New Terminal
```

Then run:

```powershell
npm install
```

After installation, run the required test.

For all functional tests:

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js
```

For all UI tests:

```powershell
npx mocha .\tests\ui\allServicesUI.test.js
```

---

# 50. Recommended Daily Test Commands

## Run all functional tests

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js
```

## Run all UI tests

```powershell
npx mocha .\tests\ui\allServicesUI.test.js
```

## Run login tests

```powershell
npx mocha .\tests\login\login.test.js
```

## Run login UI tests

```powershell
npx mocha .\tests\login\loginUI.test.js
```

## Run all tests

```powershell
npm test
```

---

# 51. Recommended Development Workflow

When creating or modifying a test:

### Step 1

Open the relevant Page Object.

Example:

```text
pages/TranslationServicePage.js
```

### Step 2

Check the locator.

### Step 3

Check the test file.

Example:

```text
tests/all_test/allFunctionalTest.test.js
```

### Step 4

Run only that test using `--grep`.

Example:

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Translation Service Order"
```

### Step 5

If the test passes, run the complete functional suite:

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js
```

### Step 6

After all functional tests pass, run the UI suite:

```powershell
npx mocha .\tests\ui\allServicesUI.test.js
```

---

# 52. Test Execution Summary

The project can be executed at three levels.

## Level 1 – Individual Test

Run one test case:

```powershell
npx mocha <test-file> --grep "<test-name>"
```

## Level 2 – Test Suite

Run one complete test file:

```powershell
npx mocha <test-file>
```

Example:

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js
```

## Level 3 – Entire Project

Run all test files:

```powershell
npm test
```

---

# 53. Quick Command Reference

| Purpose | Command |
|---|---|
| Install dependencies | `npm install` |
| Run everything | `npm test` |
| All functional tests | `npx mocha .\tests\all_test\allFunctionalTest.test.js` |
| All functional + report | `npx mocha .\tests\all_test\allFunctionalTest.test.js --reporter mochawesome` |
| All UI tests | `npx mocha .\tests\ui\allServicesUI.test.js` |
| All UI + report | `npx mocha .\tests\ui\allServicesUI.test.js --reporter mochawesome` |
| Login functional | `npx mocha .\tests\login\login.test.js` |
| Login UI | `npx mocha .\tests\login\loginUI.test.js` |
| One functional test | `npx mocha <file> --grep "<test name>"` |
| One UI test | `npx mocha <file> --grep "<test name>"` |

---

# 54. Example Complete Test Run

From the project root:

```powershell
npm install
```

Then:

```powershell
npx mocha .\tests\login\loginUI.test.js
```

Then:

```powershell
npx mocha .\tests\ui\allServicesUI.test.js
```

Then:

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js
```

Or run everything:

```powershell
npm test
```

---

# 55. Test Result

A successful test run will show something similar to:

```text
8 passing
```

If there are failures:

```text
6 passing
2 failing
```

Read the failure section below the result.

Example:

```text
1) WCS - All Functional Test Cases
   Complete Translation Service Order:
   TimeoutError: Waiting for element to be located...
```

The test name tells which test failed.

The error tells why Selenium stopped.

The file and line number tell where the failure occurred.

---

# 56. Mochawesome Report

When using:

```powershell
--reporter mochawesome
```

the project generates a report.

Typical location:

```text
mochawesome-report/
```

The report provides a visual summary of the test execution.

It can be used to check:

- Passed tests
- Failed tests
- Test duration
- Error messages
- Stack traces

---

# 57. Important Notes

1. Make sure Chrome is installed before running Selenium.
2. Make sure `.env` contains the correct test credentials.
3. Make sure test documents exist in the expected location.
4. Do not close Chrome while a test is running.
5. CAPTCHA must be solved manually when required.
6. Check the existing cart before rerunning order tests.
7. If a test fails during an order, check whether an order remains in the cart.
8. Use `--grep` when debugging a single test.
9. Use the Page Object files when updating locators.
10. Do not commit real credentials to Git.

---

# 58. Final Recommended Commands

### Install project

```powershell
npm install
```

### Run all tests

```powershell
npm test
```

### Run all functional tests

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js
```

### Run all UI tests

```powershell
npx mocha .\tests\ui\allServicesUI.test.js
```

### Run login tests

```powershell
npx mocha .\tests\login\login.test.js
```

### Run login UI tests

```powershell
npx mocha .\tests\login\loginUI.test.js
```

### Run Translation Service only

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Translation Service Order"
```

### Run Notary Service only

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Notary Service Order"
```

### Run Visa Service only

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Visa Service Order"
```

### Run Dispatch Service only

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js --grep "Complete Dispatch Service Order"
```

---

# 59. Summary

The WCS Selenium automation project uses Selenium WebDriver with Mocha and the Page Object Model.

The main execution options are:

```text
Individual Test
      ↓
--grep "<test name>"

Complete Test File
      ↓
npx mocha <test-file>

Complete Project
      ↓
npm test
```

For normal development:

```powershell
npm install
```

then:

```powershell
npx mocha .\tests\all_test\allFunctionalTest.test.js
```

and:

```powershell
npx mocha .\tests\ui\allServicesUI.test.js
```

For a complete project run:

```powershell
npm test
```