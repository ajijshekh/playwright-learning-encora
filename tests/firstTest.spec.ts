/* import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator Elements',async({page}) =>{
    // by ID
    await page.locator('#inputEmail1').click()
}) */


import { test, expect } from '@playwright/test';
import { filter } from 'rxjs-compat/operator/filter';

test.beforeEach(async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('Forms')).toBeVisible()
  await page.getByText('Forms').click()

  await expect(page.getByText('Form Layouts')).toBeVisible()
  await page.getByText('Form Layouts').click()

})
/* test ('navigate to few pages',async ({page}) => {
  await expect(page.getByText('Forms')).toBeVisible();
  await page.getByText('Forms').click();

  await expect(page.getByText('Form Layouts')).toBeVisible();
  await page.getByText('Form Layouts').click();
})*/
test('Locator Elements', async ({ page }) => {

  await expect(page.locator('#inputEmail1')).toBeVisible();
  await page.locator('#inputEmail1').click();
})
test ('User facing locators', async({page}) => {
  await page.getByRole('textbox',{name: "Email"}).first().click()
  await page.getByRole('button',{name: "Sign in"}).first().click()

  await page.getByLabel('Email').first().click()
  await page.getByText('Using the Grid').click()
  await page.getByPlaceholder('Jane Doe').click()
  await page.getByTestId('SignIn').click
  await page.getByTitle('IoT Dashboard').click()
})

test ('User locator using child elements', async ({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
  await page.locator('nb-card').getByRole('button',{name: "Sign in"}).first().click()
})

test ('Parents locatore', async ({page}) => {
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name:"Email"}).click()

  await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name:"Email"}).click()
  await page.locator('nb-card').filter({has: page.locator ('.status-danger')}).getByRole('textbox', {name:"Password"}).click()

  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name:"Email"}).click()

  // This is Xpath locator - Not Recommended by Playwright
  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name:"Email"}).click()
})

test ('Reuse locatores', async({page}) => {
  const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
  const emailField = basicForm.getByRole('textbox', {name:"Email"})
  await emailField.fill('ajij.shekh@encora.com')
  await basicForm.getByRole('textbox', {name:"Password"}).fill('ajij@123')
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('ajij.shekh@encora.com')
})

test ('Extracting values', async({page}) => {
  // single test value
  const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  // all text values
  const allRadiobuttonlabels = await page.locator('nb-radio').allTextContents()
  expect(allRadiobuttonlabels).toContain("Option 1")

  // input value
  const emailField = basicForm.getByRole('textbox', {name:"Email"})
  await emailField.fill('ajij.shekh@encora.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('ajij.shekh@encora.com')

  const placeholdervalue = await emailField.getAttribute('placeholder')
  expect(placeholdervalue).toEqual('Email')
})

test ('Assertions', async({page}) => {
  const basicFormbutton = page.locator('nb-card').filter({hasText: "Basic Form"}).locator('button')

  // General Assertion
  const value = 5;
  expect(value).toEqual(5)

  const text = await basicFormbutton.textContent()
  expect(text).toEqual("Submit")

  // Locator Assertion
  await expect(basicFormbutton).toHaveText('Submit')

  // Soft Locator Assertion
  await expect.soft(basicFormbutton).toHaveText('Submit')
  await basicFormbutton.click()
})