# Test info

- Name: navigate to form page @smoke
- Location: C:\Users\Ajij.Shekh\OneDrive - ENCORA\Desktop\GitRepo\pw-practice-app\tests\usePageObjects.spec.ts:9:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4201/
Call log:
  - navigating to "http://localhost:4201/", waiting until "load"

    at C:\Users\Ajij.Shekh\OneDrive - ENCORA\Desktop\GitRepo\pw-practice-app\tests\usePageObjects.spec.ts:6:16
```

# Test source

```ts
   1 | import {test, expect} from '@playwright/test'
   2 | import {PageManager} from './pageObjects/pageObjectManager'
   3 | import {faker} from '@faker-js/faker'
   4 |
   5 | test.beforeEach(async({page}) => {
>  6 |     await page.goto('/')
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4201/
   7 | })
   8 |
   9 | test ('navigate to form page @smoke', async ({page}) => {
  10 |     const pm = new PageManager(page)
  11 |     await pm.navigateTo().formLayoutsPage()
  12 |     await pm.navigateTo().datePickerPage()
  13 |     await pm.navigateTo().smartTablePage()
  14 |     await pm.navigateTo().toasterPage()
  15 |     await pm.navigateTo().tooltipsPage()
  16 | })
  17 |
  18 | test('parameterized methods @block', async ({page}) => {
  19 |     const pm = new PageManager(page)
  20 |     const randomFullName = faker.person.fullName()
  21 |     const randomEmail = `${randomFullName.replace(/\s+/g, '')}${faker.number.int(1000)}@test.com`
  22 |
  23 |     await pm.navigateTo().formLayoutsPage()
  24 |     await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.Username, process.env.Password, 'Option 1')
  25 |     // This below code use for full FormLayoutPage screenshot
  26 |     await page.screenshot({path: 'screenshots/formLayoutPage.png'})
  27 |
  28 |     // Below code capture the screenshot in binary format in log section
  29 |     const buffer = await page.screenshot()
  30 |     console.log(buffer.toString('base64'))
  31 |
  32 |     await pm.onFormLayoutPage().submitUsingTheInlineForm(randomFullName, randomEmail, true)
  33 |     // This below code use for Specific section capture the screenshot
  34 |     await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})
  35 |
  36 |     await pm.navigateTo().datePickerPage()
  37 |     await pm.onDatePickerPage().selectCommandDatePickerDateFromToday(5)
  38 |     await pm.onDatePickerPage().selectDatePickerRangeFromToday(5,10)
  39 | })
```