import RetirementPage from '../pageobjects/retirement.page.js'

const requiredFields = {
    currentAge: '40',
    retirementAge: '56',
    currentIncome: '100000',
    currentTotalSavings: '500000',
    currentAnnualSavings: '10',
    savingsIncreaseRate: '0.25',
    socialSecurityBenefits: true,
    relationshipMarried: true
}

const fullFormFields = {
    currentAge: '40',
    retirementAge: '56',
    currentIncome: '100000',
    spouseIncome: '75000',
    currentTotalSavings: '500000',
    currentAnnualSavings: '10',
    savingsIncreaseRate: '2',
    socialSecurityBenefits: true,
    relationshipMarried: true,
    socialSecurityOverride: '4000'
}

const defaultValues = {
    additionalIncome: '500',
    retirementDuration: '20',
    includeInflation: true,
    expectedInflationRate: '3',
    retirementAnnualIncome: '75',
    preRetirementRoi: '8',
    postRetirementRoi: '5'
}

describe('Securian retirement calculator', () => {
    beforeEach(async () => {
        await RetirementPage.open()
        await RetirementPage.acceptCookies()
    })

    it('Test 1: submit required fields and verify the message', async () => {
        await RetirementPage.fillRequiredFields(requiredFields)
        await RetirementPage.submit()

        const resultText = await RetirementPage.getResultMessage()
        console.log('Result message:', resultText)
        await expect(resultText).toContain('Congratulations! You are exceeding your retirement goals. You are saving an extra $833 a month.')
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

        const expectedMessage = 'In order to retire by 56, you might need to consider increasing your monthly savings by $1,476 a month.'
        if (!resultText.includes(expectedMessage)) {
            console.log('Different message observed in Test 4:', resultText)
        }
        await expect(resultText).toContain(expectedMessage)
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
        await expect(resultText).toContain('In order to retire by 56, you might need to consider increasing your monthly savings by $1,192 a month.')
    })

})
