import {test, expect} from '@playwright/test'
import { delay } from 'rxjs-compat/operator/delay'
import { timeout } from 'rxjs-compat/operator/timeout'

test.describe.configure({mode: 'parallel'})

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test.describe('From Layouts Page', () => {
    test.describe.configure({retries: 0})
    test.describe.configure({mode: 'serial'})

    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layout').click()
    })

    test ('input fields', async({page}, testInfo) => {
        if(testInfo.retry){
            // do something (Add your whatever you perform)
        }
        const usingTheGridEmailInputfield = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name: "Email"})
        await usingTheGridEmailInputfield.fill('ajij.shekh@encora.com')
        await usingTheGridEmailInputfield.clear()
        await usingTheGridEmailInputfield.pressSequentially('ajij.shekh1@encora.com', {delay:500})
    
        // Generic assertion
        const inputvalue = await usingTheGridEmailInputfield.inputValue()
        expect(inputvalue).toEqual('ajij.shekh1@encora.com')

        // Locator assertion
        await expect(usingTheGridEmailInputfield).toHaveValue('ajij.shekh1@encora.com')
    })

    test.only('radio buttons', async({page}) => {
        const usingTheGridFormRadiobutton = page.locator('nb-card', {hasText: "Using the Grid"})
        // await usingTheGridFormRadiobutton.getByLabel('Option 1').check({force: true})
        await usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 2"}).check({force: true})
        const radioStatus = await usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 1"}).isChecked()
        await expect(usingTheGridFormRadiobutton).toHaveScreenshot({maxDiffPixels: 250})
      //  expect(radioStatus).toBeTruthy()
      //  await expect(usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 1"})).toBeChecked()

     //   await usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 2"}).check({force: true})
     //   expect(await usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
     //   expect(await usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
    })

})

test ('Checkboxes', async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()

        await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
        await page.getByRole('checkbox', {name:"Prevent arising of duplicate toast",}).check({force: true})

        const allboxes = page.getByRole('checkbox')
        for(const boxes of await allboxes.all()){
            await boxes.check({force: true})
            expect(await boxes.isChecked()).toBeTruthy()
        }

        const allboxes1 = page.getByRole('checkbox')
        for(const boxes1 of await allboxes1.all()){
            await boxes1.uncheck({force: true})
            expect(await boxes1.isChecked()).toBeFalsy()
        }
})

test ('Lists and dropdowns', async({page}) => {
    const droDownMenu = page.locator('ngx-header nb-select')
    await droDownMenu.click()

    page.getByRole('list') // when the list has UL tag
    page.getByRole('listitem') // when the list has LI tag

    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await droDownMenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate")
            await droDownMenu.click()
    }
})

test ('tootips', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipid = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await toolTipid.getByRole('button', {name: "Top"}).hover()

    page.getByRole("tooltip") // if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test ('Dialog box', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })
    await page.getByRole('table').locator('tr', {hasText:"mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test ('Smart Tables', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1. Get the row by any test in this row
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'}).locator('.nb-edit').click()
   // await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('43')
    await page.locator('.nb-checkmark').click()

    // 2. Get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowId = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowId.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('arsh@gmail.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowId.locator('td').nth(5)).toHaveText('arsh@gmail.com')

    // 3. Filter the table throw Age field
    const ages = ["20", "30", "40", "200"]

    for (let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')
        for(let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent()
            if(age == "200"){
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            }else{
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test ('Date Picker', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const selectDateOnDatePicker =  page.getByPlaceholder('Form Picker')
    await selectDateOnDatePicker.click()

    let date = new Date()
    date.setDate(date.getDate() + 365)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const datetoAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calanderMonthandYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

    while(!calanderMonthandYear.includes(expectedMonthAndYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calanderMonthandYear = await page.locator('nb-calendar-view-mode').textContent()

    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact:true}).click()
    await expect(selectDateOnDatePicker).toHaveValue(datetoAssert)
})

test ('Slider', async ({page}) => {

    // Update attribute
    const tempGuage = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGuage.evaluate(node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await tempGuage.click() 

    // Mouse Movment
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x,y)
    await page.mouse.down()
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)
    await page.mouse.up()
    await expect(tempBox).toContainText('30')
})