import { Page, expect } from "@playwright/test";

export class DatePickerPage{
    private readonly page : Page

    constructor (page : Page){
        this.page = page
    }

    async selectCommandDatePickerDateFromToday(numberOfDaysFromToday: number)
    {
        const selectDateOnDatePicker = this.page.getByPlaceholder('Form Picker')
        await selectDateOnDatePicker.click()
        const dateToAssert = await this.selectDateIntheCalender(numberOfDaysFromToday)
        await expect(selectDateOnDatePicker).toHaveValue(dateToAssert)
    }

    async selectDatePickerRangeFromToday(startDayFromToday: number, endDayFromToday: number)
    {
        const calenderInputField = this.page.getByPlaceholder('Range Picker')
        await calenderInputField.click()
        const dateToAssertstart = await this.selectDateIntheCalender(startDayFromToday)
        const dateToAssertend = await this.selectDateIntheCalender(endDayFromToday)
        const dateToAssert = `${dateToAssertstart} - ${dateToAssertend}`
        await expect(calenderInputField).toHaveValue(dateToAssert)
    }

    private async selectDateIntheCalender(numberOfDaysFromToday: number)
    {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calanderMonthandYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

        while (!calanderMonthandYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calanderMonthandYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).first().click()
        return dateToAssert
    }
}