import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL)

  await expect(page.getByText('Button Triggering AJAX Request')).toBeVisible()
  await page.getByText('Button Triggering AJAX Request').click()

})
  
test ('auto waiting', async ({page}) => {
    const succssButton = page.locator('.bg-success')
    //await succssButton.click()
    //const text = await succssButton.textContent()

    //await succssButton.waitFor({state: "attached"})
    //const text = await succssButton.allTextContents()

    await expect(succssButton).toHaveText('Data loaded with AJAX get request.',{timeout: 20000})
})

test.skip ('alternative waits', async({page})=> {
    const succssButton = page.locator('.bg-success')

    // wait for element
    await page.waitForSelector('.bg-success')

    const text = await succssButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test.skip ('timeout', async({page}) => {
   // test.setTimeout(10000)
   test.slow() 
   const successButton = page.locator(".bg-success")
    await successButton.click()
})