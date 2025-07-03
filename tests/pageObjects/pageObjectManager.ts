import { Page, expect } from '@playwright/test'
import { NavigationPage } from '../pageObjects/navigationPage'
import { FormLayoutPage } from '../pageObjects/formLayoutsPage'
import { DatePickerPage } from '../pageObjects/datePickerPage'

export class PageManager{
    private readonly page : Page
    private readonly navigationPage: NavigationPage
    private readonly formlayoutPage: FormLayoutPage
    private readonly datepickerPage: DatePickerPage

    constructor(page:Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formlayoutPage = new FormLayoutPage(this.page)
        this.datepickerPage = new DatePickerPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutPage(){
        return this.formlayoutPage
    }

    onDatePickerPage(){
        return this.datepickerPage
    }
}
