# Test info

- Name: input fields
- Location: C:\Users\Ajij.Shekh\OneDrive - ENCORA\Desktop\GitRepo\pw-practice-app\tests\testMobile.spec.ts:4:6

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4201/
Call log:
  - navigating to "http://localhost:4201/", waiting until "load"

    at C:\Users\Ajij.Shekh\OneDrive - ENCORA\Desktop\GitRepo\pw-practice-app\tests\testMobile.spec.ts:5:20
```

# Test source

```ts
   1 | import {test, expect} from '@playwright/test'
   2 |
   3 |
   4 |  test ('input fields', async({page}, testInfo) => {
>  5 |         await page.goto('/')
     |                    ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4201/
   6 |         // This below click event related to open Sidebar menu toggle
   7 |         if(testInfo.project.name == 'mobile'){
   8 |                 await page.locator('.sidebar-toggle').click()
   9 |         } 
  10 |         await page.getByText('Forms').click()
  11 |         await page.getByText('Form Layout').click()
  12 |         if(testInfo.project.name == 'mobile'){
  13 |                 await page.locator('.sidebar-toggle').click()
  14 |         } 
  15 |         const usingTheGridEmailInputfield = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name: "Email"})
  16 |         await usingTheGridEmailInputfield.fill('ajij.shekh@encora.com')
  17 |         await usingTheGridEmailInputfield.clear()
  18 |         await usingTheGridEmailInputfield.pressSequentially('ajij.shekh1@encora.com')
  19 |
  20 |     })
```