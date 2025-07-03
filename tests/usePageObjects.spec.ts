import {test, expect} from '@playwright/test'
import {PageManager} from './pageObjects/pageObjectManager'
import {faker} from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test ('navigate to form page @smoke', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toasterPage()
    await pm.navigateTo().tooltipsPage()
})

test('parameterized methods @block', async ({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(/\s+/g, '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.Username, process.env.Password, 'Option 1')
    // This below code use for full FormLayoutPage screenshot
    await page.screenshot({path: 'screenshots/formLayoutPage.png'})

    // Below code capture the screenshot in binary format in log section
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))

    await pm.onFormLayoutPage().submitUsingTheInlineForm(randomFullName, randomEmail, true)
    // This below code use for Specific section capture the screenshot
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})

    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommandDatePickerDateFromToday(5)
    await pm.onDatePickerPage().selectDatePickerRangeFromToday(5,10)
})

test.only ('testing with argos ci', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await argosScreenshot(page, "form layouts page");
    await pm.navigateTo().datePickerPage()
    await argosScreenshot(page, "date picker page");
    await pm.navigateTo().smartTablePage()
    await argosScreenshot(page, "smart table page");
})