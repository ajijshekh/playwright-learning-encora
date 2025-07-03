# Test info

- Name: Parents locatore
- Location: C:\Users\Ajij.Shekh\OneDrive - ENCORA\Desktop\GitRepo\pw-practice-app\tests\firstTest.spec.ts:57:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4201/
Call log:
  - navigating to "http://localhost:4201/", waiting until "load"

    at C:\Users\Ajij.Shekh\OneDrive - ENCORA\Desktop\GitRepo\pw-practice-app\tests\firstTest.spec.ts:19:14
```

# Test source

```ts
   1 | /* import {test} from '@playwright/test'
   2 |
   3 | test.beforeEach(async({page}) => {
   4 |     await page.goto('http://localhost:4200/')
   5 |     await page.getByText('Forms').click()
   6 |     await page.getByText('Form Layouts').click()
   7 | })
   8 |
   9 | test('Locator Elements',async({page}) =>{
   10 |     // by ID
   11 |     await page.locator('#inputEmail1').click()
   12 | }) */
   13 |
   14 |
   15 | import { test, expect } from '@playwright/test';
   16 | import { filter } from 'rxjs-compat/operator/filter';
   17 |
   18 | test.beforeEach(async ({ page }) => {
>  19 |   await page.goto('/')
      |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4201/
   20 |
   21 |   await expect(page.getByText('Forms')).toBeVisible()
   22 |   await page.getByText('Forms').click()
   23 |
   24 |   await expect(page.getByText('Form Layouts')).toBeVisible()
   25 |   await page.getByText('Form Layouts').click()
   26 |
   27 | })
   28 | /* test ('navigate to few pages',async ({page}) => {
   29 |   await expect(page.getByText('Forms')).toBeVisible();
   30 |   await page.getByText('Forms').click();
   31 |
   32 |   await expect(page.getByText('Form Layouts')).toBeVisible();
   33 |   await page.getByText('Form Layouts').click();
   34 | })*/
   35 | test('Locator Elements', async ({ page }) => {
   36 |
   37 |   await expect(page.locator('#inputEmail1')).toBeVisible();
   38 |   await page.locator('#inputEmail1').click();
   39 | })
   40 | test ('User facing locators', async({page}) => {
   41 |   await page.getByRole('textbox',{name: "Email"}).first().click()
   42 |   await page.getByRole('button',{name: "Sign in"}).first().click()
   43 |
   44 |   await page.getByLabel('Email').first().click()
   45 |   await page.getByText('Using the Grid').click()
   46 |   await page.getByPlaceholder('Jane Doe').click()
   47 |   await page.getByTestId('SignIn').click
   48 |   await page.getByTitle('IoT Dashboard').click()
   49 | })
   50 |
   51 | test ('User locator using child elements', async ({page}) => {
   52 |   await page.locator('nb-card nb-radio :text-is("Option 1")').click()
   53 |   await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
   54 |   await page.locator('nb-card').getByRole('button',{name: "Sign in"}).first().click()
   55 | })
   56 |
   57 | test ('Parents locatore', async ({page}) => {
   58 |   await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
   59 |   await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name:"Email"}).click()
   60 |
   61 |   await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name:"Email"}).click()
   62 |   await page.locator('nb-card').filter({has: page.locator ('.status-danger')}).getByRole('textbox', {name:"Password"}).click()
   63 |
   64 |   await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name:"Email"}).click()
   65 |
   66 |   // This is Xpath locator - Not Recommended by Playwright
   67 |   await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name:"Email"}).click()
   68 | })
   69 |
   70 | test ('Reuse locatores', async({page}) => {
   71 |   const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
   72 |   const emailField = basicForm.getByRole('textbox', {name:"Email"})
   73 |   await emailField.fill('ajij.shekh@encora.com')
   74 |   await basicForm.getByRole('textbox', {name:"Password"}).fill('ajij@123')
   75 |   await basicForm.locator('nb-checkbox').click()
   76 |   await basicForm.getByRole('button').click()
   77 |
   78 |   await expect(emailField).toHaveValue('ajij.shekh@encora.com')
   79 | })
   80 |
   81 | test ('Extracting values', async({page}) => {
   82 |   // single test value
   83 |   const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
   84 |   const buttonText = await basicForm.locator('button').textContent()
   85 |   expect(buttonText).toEqual('Submit')
   86 |
   87 |   // all text values
   88 |   const allRadiobuttonlabels = await page.locator('nb-radio').allTextContents()
   89 |   expect(allRadiobuttonlabels).toContain("Option 1")
   90 |
   91 |   // input value
   92 |   const emailField = basicForm.getByRole('textbox', {name:"Email"})
   93 |   await emailField.fill('ajij.shekh@encora.com')
   94 |   const emailValue = await emailField.inputValue()
   95 |   expect(emailValue).toEqual('ajij.shekh@encora.com')
   96 |
   97 |   const placeholdervalue = await emailField.getAttribute('placeholder')
   98 |   expect(placeholdervalue).toEqual('Email')
   99 | })
  100 |
  101 | test ('Assertions', async({page}) => {
  102 |   const basicFormbutton = page.locator('nb-card').filter({hasText: "Basic Form"}).locator('button')
  103 |
  104 |   // General Assertion
  105 |   const value = 5;
  106 |   expect(value).toEqual(5)
  107 |
  108 |   const text = await basicFormbutton.textContent()
  109 |   expect(text).toEqual("Submit")
  110 |
  111 |   // Locator Assertion
  112 |   await expect(basicFormbutton).toHaveText('Submit')
  113 |
  114 |   // Soft Locator Assertion
  115 |   await expect.soft(basicFormbutton).toHaveText('Submit')
  116 |   await basicFormbutton.click()
  117 | })
```