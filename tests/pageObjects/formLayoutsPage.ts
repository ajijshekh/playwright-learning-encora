import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutPage extends HelperBase{
    
    constructor(page: Page){
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email:string, password:string, optionText:string)
    {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name:"Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name:"Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name:optionText}).check({force:true})
        await usingTheGridForm.getByRole('button').click() 
    }

    /**
     * This method fill out the Inline form with user credentials
     * @param name - Should be first and last name
     * @param email  - Should be email for the test user
     * @param rememberme - True or False if user session to be safed
     */

    async submitUsingTheInlineForm(name:string, email:string, rememberme:boolean)
    {
        const usingTheInlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await usingTheInlineForm.getByRole('textbox', {name:"Jane Doe"}).fill(name)
        await usingTheInlineForm.getByRole('textbox', {name:"email"}).fill(email)
        if(rememberme)
            await usingTheInlineForm.getByRole('checkbox').check({force:true})
        await usingTheInlineForm.getByRole('button').click()
    }
}