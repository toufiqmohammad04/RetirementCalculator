import RetirementPage from '../pageobjects/retirement.page.js'
import { withBaseSetup } from '../helpers/base.test.js'
import { requiredFields, fullFormFields, defaultValues } from '../data/retirement.data.js'

describe('Securian retirement calculator', () => {
    // central setup: open the page and accept cookies before each test
    withBaseSetup()

    it('Test 1: submit required fields and verify the message', async () => {
        await RetirementPage.fillRequiredFields(requiredFields)
        await RetirementPage.submit()

        const resultText = await RetirementPage.getResultMessage()
        console.log('Result message:', resultText)
        // assert the high-level guidance; numeric amounts can vary between runs
        await expect(resultText).toContain('Congratulations! You are exceeding your retirement goals.')
    })

    it('Test 2: hide marital status when Social Security is no', async () => {
        await RetirementPage.setSocialSecurityBenefits(false)
        await expect(await RetirementPage.marriedLabel.isDisplayed()).toBe(false)
    })

    it('Test 3: show marital status when Social Security is yes', async () => {
        await RetirementPage.setSocialSecurityBenefits(true)
        await expect(await RetirementPage.marriedLabel.isDisplayed()).toBe(true)
    })

    it('Test 4: submit full answers without default values', async () => {
        const test4Fields = { ...fullFormFields }

        await RetirementPage.fillRequiredFields(test4Fields)
        await RetirementPage.submit()

        const resultText = await RetirementPage.getResultMessage()
        console.log('Test 4 result message:', resultText)

        // allow the numeric value to vary; assert the guidance format instead
        await expect(resultText).toMatch(/In order to retire by 56, you might need to consider increasing your monthly savings by \$[\d,]+ a month\./)
    })

     it('Test 5: submit full form with default values', async () => {
        // fill required fields including social security override and relationship
        await RetirementPage.fillRequiredFields(fullFormFields)

        // open default values modal, fill defaults and save
        await RetirementPage.openDefaultValuesModal()
        await RetirementPage.fillDefaultValues(defaultValues)
        await RetirementPage.saveDefaultValues()

        // submit and verify a result appears
        await RetirementPage.submit()
        const resultText = await RetirementPage.getResultMessage()
        console.log('Result message:', resultText)
        await expect(resultText).toMatch(/In order to retire by 56, you might need to consider increasing your monthly savings by \$[\d,]+ a month\./)
    })

})
