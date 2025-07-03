import {test, expect} from '@playwright/test'


 test ('input fields', async({page}, testInfo) => {
        await page.goto('/')
        // This below click event related to open Sidebar menu toggle
        if(testInfo.project.name == 'mobile'){
                await page.locator('.sidebar-toggle').click()
        } 
        await page.getByText('Forms').click()
        await page.getByText('Form Layout').click()
        if(testInfo.project.name == 'mobile'){
                await page.locator('.sidebar-toggle').click()
        } 
        const usingTheGridEmailInputfield = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name: "Email"})
        await usingTheGridEmailInputfield.fill('ajij.shekh@encora.com')
        await usingTheGridEmailInputfield.clear()
        await usingTheGridEmailInputfield.pressSequentially('ajij.shekh1@encora.com')

    })