import Page from './page.js'

const baseUrl = 'https://www.securian.com/insights-tools/retirement-calculator.html'

interface RetirementFormData {
    currentAge: string
    retirementAge: string
    currentIncome: string
    spouseIncome?: string
    currentTotalSavings: string
    currentAnnualSavings: string
    savingsIncreaseRate: string
    socialSecurityBenefits: boolean
    relationshipMarried: boolean
    socialSecurityOverride?: string
}

interface DefaultValuesData {
    additionalIncome: string
    retirementDuration: string
    includeInflation: boolean
    expectedInflationRate: string
    retirementAnnualIncome: string
    preRetirementRoi: string
    postRetirementRoi: string
}

class RetirementPage extends Page {
    get currentAge () { return $('#current-age') }
    get retirementAge () { return $('#retirement-age') }
    get currentIncome () { return $('#current-income') }
    get spouseIncome () { return $('#spouse-income') }
    get currentTotalSavings () { return $('#current-total-savings') }
    get currentAnnualSavings () { return $('#current-annual-savings') }
    get savingsIncreaseRate () { return $('#savings-increase-rate') }
    get socialSecurityYesLabel () { return $('label[for="yes-social-benefits"]') }
    get socialSecurityNoLabel () { return $('label[for="no-social-benefits"]') }
    get socialSecurityOverride () { return $('#social-security-override') }
    get married () { return $('#married') }
    get marriedLabel () { return $('label[for="married"]') }
    get defaultValuesLink () { return $('a[data-bs-toggle="modal"][data-bs-target="#default-values-modal"]') }
    get cookieAcceptButton () { return $('#onetrust-accept-btn-handler') }
    get cookieAllowAllButton () { return $('button[id*="onetrust-accept"]') }
    get cookieDismissButton () { return $('button[id*="onetrust-close"]') }
    get defaultValuesModal () { return $('#default-values-modal') }
    get additionalIncome () { return $('#additional-income') }
    get retirementDuration () { return $('#retirement-duration') }
    get includeInflationYesLabel () { return $('label[for="include-inflation"]') }
    get expectedInflationRate () { return $('#expected-inflation-rate') }
    get retirementAnnualIncome () { return $('#retirement-annual-income') }
    get preRetirementRoi () { return $('#pre-retirement-roi') }
    get postRetirementRoi () { return $('#post-retirement-roi') }
    get saveDefaultValuesButton () { return $('button[onclick="savePersonalizedValues();"]') }
    get calculateButton () { return $('button[data-tag-id="submit"]') }
    get resultsSection () { return $('#calculator-results-section') }
    get resultMessage () { return $('#result-message') }

    open () {
        return browser.url(baseUrl)
    }

    async setField (element: any, value: string) {
        await element.waitForDisplayed()
        await element.scrollIntoView()
        try { await element.click() } catch (e) {}
        try { await element.clearValue() } catch (e) {}
        await element.setValue(value)
        const val = await element.getValue()
        if ((val === '' || val === undefined) && value !== '') {
            // try to update via DOM using element id as a fallback
            const id = await element.getAttribute('id')
            if (id) {
                await (browser as any).execute((elId: string, v: string) => {
                    const el = document.getElementById(elId) as HTMLInputElement | null
                    if (el) {
                        el.value = v
                        el.dispatchEvent(new Event('input', { bubbles: true }))
                        el.dispatchEvent(new Event('change', { bubbles: true }))
                    }
                }, id, value)
                await (browser as any).execute((elId: string) => { const el = document.getElementById(elId) as HTMLElement | null; if (el && (el as any).blur) (el as any).blur() }, id)
            }
        }
        await browser.pause(100)
    }

    async fillRequiredFields (data: RetirementFormData) {
        await this.currentAge.waitForDisplayed()
        await this.setField(this.currentAge, data.currentAge)

        await this.setField(this.retirementAge, data.retirementAge)

        await this.setField(this.currentIncome, data.currentIncome)

        if (data.spouseIncome !== undefined) {
            await this.setField(this.spouseIncome, data.spouseIncome)
        }

        await this.setField(this.currentTotalSavings, data.currentTotalSavings)

        await this.setField(this.currentAnnualSavings, data.currentAnnualSavings)

        await this.setField(this.savingsIncreaseRate, data.savingsIncreaseRate)

        await this.setSocialSecurityBenefits(data.socialSecurityBenefits)
        await this.setRelationshipStatus(data.relationshipMarried)

        if (data.socialSecurityBenefits && data.socialSecurityOverride) {
            await this.socialSecurityOverride.waitForDisplayed()
            await this.setField(this.socialSecurityOverride, data.socialSecurityOverride)
        }
    }

    async setSocialSecurityBenefits (enabled: boolean) {
        const label = enabled ? this.socialSecurityYesLabel : this.socialSecurityNoLabel
        await label.scrollIntoView()
        await label.waitForClickable()
        await label.click()
        await browser.pause(200)
    }

    async setRelationshipStatus (married: boolean) {
        const isChecked = await this.married.isSelected()
        if (married !== isChecked) {
            await this.marriedLabel.scrollIntoView()
            await this.marriedLabel.waitForClickable()
            await this.marriedLabel.click()
        }
    }

    async openDefaultValuesModal () {
        await this.defaultValuesLink.scrollIntoView()
        await this.defaultValuesLink.waitForClickable()
        await this.defaultValuesLink.click()
        // wait for a known field inside the modal to appear
        await this.additionalIncome.waitForDisplayed()
    }

    async fillDefaultValues (data: DefaultValuesData) {
        await this.setField(this.additionalIncome, data.additionalIncome)

        await this.setField(this.retirementDuration, data.retirementDuration)

        if (data.includeInflation) {
            await this.includeInflationYesLabel.scrollIntoView()
            await this.includeInflationYesLabel.waitForClickable()
            await this.includeInflationYesLabel.click()
            // wait for expected inflation input to become visible
            await this.expectedInflationRate.waitForDisplayed()
        }

        await this.setField(this.expectedInflationRate, data.expectedInflationRate)

        await this.setField(this.retirementAnnualIncome, data.retirementAnnualIncome)

        await this.setField(this.preRetirementRoi, data.preRetirementRoi)

        await this.setField(this.postRetirementRoi, data.postRetirementRoi)
    }

    async saveDefaultValues () {
        await this.saveDefaultValuesButton.scrollIntoView()
        await this.saveDefaultValuesButton.waitForClickable()
        await this.saveDefaultValuesButton.click()
        await this.defaultValuesModal.waitForDisplayed({ reverse: true })
    }

    async submit () {
        await this.calculateButton.scrollIntoView()
        await this.calculateButton.waitForClickable()
        await this.calculateButton.click()
    }

    async getResultMessage () {
        await this.resultsSection.waitForDisplayed({ timeout: 30000 })
        await this.resultMessage.waitForDisplayed({ timeout: 30000 })
        await browser.waitUntil(async () => {
            const txt = await this.resultMessage.getText()
            return !!txt && txt.trim().length > 0
        }, { timeout: 30000, timeoutMsg: 'Result message did not appear or was empty' })
        return this.resultMessage.getText()
    }

    async isSocialSecurityOverrideVisible () {
        return await this.socialSecurityOverride.isExisting() && await this.socialSecurityOverride.isDisplayed()
    }

    async acceptCookies () {
        const buttons = [this.cookieAcceptButton, this.cookieAllowAllButton, this.cookieDismissButton]
        for (const button of buttons) {
            if (await button.isExisting() && await button.isDisplayed()) {
                await button.scrollIntoView()
                await button.click()
                return
            }
        }
    }
}

export default new RetirementPage()
