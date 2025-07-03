import {test, expect} from '@playwright/test'


test('Applitools Visual Test', async({page}, testInfo) => {
    console.log(`Running: ${testInfo.project.name} - ${testInfo.title}`);
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})