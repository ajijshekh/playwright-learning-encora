# Test info

- Name: Date Picker
- Location: C:\Users\Ajij.Shekh\OneDrive - ENCORA\Desktop\GitRepo\pw-practice-app\tests\uiComponent.spec.ts:165:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4201/
Call log:
  - navigating to "http://localhost:4201/", waiting until "load"

    at C:\Users\Ajij.Shekh\OneDrive - ENCORA\Desktop\GitRepo\pw-practice-app\tests\uiComponent.spec.ts:8:16
```

# Test source

```ts
   1 | import {test, expect} from '@playwright/test'
   2 | import { delay } from 'rxjs-compat/operator/delay'
   3 | import { timeout } from 'rxjs-compat/operator/timeout'
   4 |
   5 | test.describe.configure({mode: 'parallel'})
   6 |
   7 | test.beforeEach(async({page}) => {
>  8 |     await page.goto('/')
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4201/
   9 | })
   10 |
   11 | test.describe('From Layouts Page', () => {
   12 |   //  test.describe.configure({retries: 2})
   13 | //  test.describe.configure({mode: 'serial'})
   14 |
   15 |     test.beforeEach(async({page}) => {
   16 |         await page.getByText('Forms').click()
   17 |         await page.getByText('Form Layout').click()
   18 |     })
   19 |
   20 |     test ('input fields', async({page}, testInfo) => {
   21 |         if(testInfo.retry){
   22 |             // do something (Add your whatever you perform)
   23 |         }
   24 |         const usingTheGridEmailInputfield = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name: "Email"})
   25 |         await usingTheGridEmailInputfield.fill('ajij.shekh@encora.com')
   26 |         await usingTheGridEmailInputfield.clear()
   27 |         await usingTheGridEmailInputfield.pressSequentially('ajij.shekh1@encora.com', {delay:500})
   28 |     
   29 |         // Generic assertion
   30 |         const inputvalue = await usingTheGridEmailInputfield.inputValue()
   31 |         expect(inputvalue).toEqual('ajij.shekh1@encora.com')
   32 |
   33 |         // Locator assertion
   34 |         await expect(usingTheGridEmailInputfield).toHaveValue('ajij.shekh1@encora.com')
   35 |     })
   36 |
   37 |     test ('radio buttons', async({page}) => {
   38 |         const usingTheGridFormRadiobutton = page.locator('nb-card', {hasText: "Using the Grid"})
   39 |         // await usingTheGridFormRadiobutton.getByLabel('Option 1').check({force: true})
   40 |         await usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 1"}).check({force: true})
   41 |         const radioStatus = await usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 1"}).isChecked()
   42 |         expect(radioStatus).toBeTruthy()
   43 |         await expect(usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 1"})).toBeChecked()
   44 |
   45 |         await usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 2"}).check({force: true})
   46 |         expect(await usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
   47 |         expect(await usingTheGridFormRadiobutton.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
   48 |     })
   49 |
   50 | })
   51 |
   52 | test ('Checkboxes', async({page}) => {
   53 |         await page.getByText('Modal & Overlays').click()
   54 |         await page.getByText('Toastr').click()
   55 |
   56 |         await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
   57 |         await page.getByRole('checkbox', {name:"Prevent arising of duplicate toast",}).check({force: true})
   58 |
   59 |         const allboxes = page.getByRole('checkbox')
   60 |         for(const boxes of await allboxes.all()){
   61 |             await boxes.check({force: true})
   62 |             expect(await boxes.isChecked()).toBeTruthy()
   63 |         }
   64 |
   65 |         const allboxes1 = page.getByRole('checkbox')
   66 |         for(const boxes1 of await allboxes1.all()){
   67 |             await boxes1.uncheck({force: true})
   68 |             expect(await boxes1.isChecked()).toBeFalsy()
   69 |         }
   70 | })
   71 |
   72 | test ('Lists and dropdowns', async({page}) => {
   73 |     const droDownMenu = page.locator('ngx-header nb-select')
   74 |     await droDownMenu.click()
   75 |
   76 |     page.getByRole('list') // when the list has UL tag
   77 |     page.getByRole('listitem') // when the list has LI tag
   78 |
   79 |     const optionList = page.locator('nb-option-list nb-option')
   80 |     await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
   81 |     await optionList.filter({hasText: "Cosmic"}).click()
   82 |
   83 |     const header = page.locator('nb-layout-header')
   84 |     await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
   85 |
   86 |     const colors = {
   87 |         "Light": "rgb(255, 255, 255)",
   88 |         "Dark": "rgb(34, 43, 69)",
   89 |         "Cosmic": "rgb(50, 50, 89)",
   90 |         "Corporate": "rgb(255, 255, 255)"
   91 |     }
   92 |
   93 |     await droDownMenu.click()
   94 |     for(const color in colors){
   95 |         await optionList.filter({hasText: color}).click()
   96 |         await expect(header).toHaveCSS('background-color', colors[color])
   97 |         if(color != "Corporate")
   98 |             await droDownMenu.click()
   99 |     }
  100 | })
  101 |
  102 | test ('tootips', async ({page}) => {
  103 |     await page.getByText('Modal & Overlays').click()
  104 |     await page.getByText('Tooltip').click()
  105 |
  106 |     const toolTipid = page.locator('nb-card', {hasText: "Tooltip Placements"})
  107 |     await toolTipid.getByRole('button', {name: "Top"}).hover()
  108 |
```