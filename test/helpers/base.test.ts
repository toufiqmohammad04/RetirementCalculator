import RetirementPage from '../pageobjects/retirement.page.js'

export function withBaseSetup() {
    beforeEach(async () => {
        await RetirementPage.open()
        await RetirementPage.acceptCookies()
    })

    // place for global teardown if needed in future
    afterAll(async () => {
        // do not forcibly delete the session here to avoid interfering with WDIO lifecycle
    })
}

export default withBaseSetup
