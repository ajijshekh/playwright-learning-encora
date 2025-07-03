# Test info

- Name: parameterized methods
- Location: C:\Users\Ajij.Shekh\OneDrive - ENCORA\Desktop\GitRepo\pw-practice-app\testfixtures.spec.ts:4:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4201/
Call log:
  - navigating to "http://localhost:4201/", waiting until "load"

    at Object.formLayoutPage (C:\Users\Ajij.Shekh\OneDrive - ENCORA\Desktop\GitRepo\pw-practice-app\test-options.ts:14:20)
```

# Test source

```ts
   1 | import {test as base} from '@playwright/test'
   2 | import {PageManager} from '../pw-practice-app/tests/pageObjects/pageObjectManager'
   3 |
   4 | export type TestOptions = {
   5 |     globalsQaUrl: string
   6 |     formLayoutPage: string
   7 |     pageManager: PageManager
   8 | }
   9 |
  10 | export const test = base.extend<TestOptions>({
  11 |     globalsQaUrl:['', {option:true}],
  12 |
  13 |     formLayoutPage: async({page}, use) => {
> 14 |         await page.goto('/')
     |                    ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4201/
  15 |         await page.getByText('Forms').click()
  16 |         await page.getByText('Form Layouts').click()
  17 |         await use('')
  18 |         console.log('Tear Down')
  19 |     },
  20 |
  21 |     pageManager: async({page, formLayoutPage}, use) => {
  22 |         const pm = new PageManager(page)
  23 |         await use(pm)
  24 |     }
  25 | })
```