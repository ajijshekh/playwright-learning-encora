import test from "@playwright/test";

test('This is first test',({page}) => {
    page.goto('http://localhost:4200/')
})