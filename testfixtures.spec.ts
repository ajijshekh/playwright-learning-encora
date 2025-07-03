import {test} from './test-options'
import {faker} from '@faker-js/faker'

test('parameterized methods', async ({pageManager}) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(/\s+/g, '')}${faker.number.int(1000)}@test.com`

    await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutPage().submitUsingTheInlineForm(randomFullName, randomEmail, false)
})