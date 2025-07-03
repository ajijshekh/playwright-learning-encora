import {Page} from '@playwright/test'

export class HelperBase{
    readonly page : Page

    constructor (page:Page){
        this.page = page
    }

    async waitNumberofSeconds(timeSeconds: number){
        await this.page.waitForTimeout(timeSeconds * 1000)
    }

}