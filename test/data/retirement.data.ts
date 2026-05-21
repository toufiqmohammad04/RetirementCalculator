export interface RetirementFormData {
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

export const requiredFields: Readonly<RetirementFormData> = {
    currentAge: '40',
    retirementAge: '56',
    currentIncome: '100000',
    currentTotalSavings: '500000',
    currentAnnualSavings: '10',
    savingsIncreaseRate: '0.25',
    socialSecurityBenefits: true,
    relationshipMarried: true
}

export const fullFormFields: Readonly<RetirementFormData> = {
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

export interface DefaultValuesData {
    additionalIncome: string
    retirementDuration: string
    includeInflation: boolean
    expectedInflationRate: string
    retirementAnnualIncome: string
    preRetirementRoi: string
    postRetirementRoi: string
}

export const defaultValues: Readonly<DefaultValuesData> = {
    additionalIncome: '500',
    retirementDuration: '20',
    includeInflation: true,
    expectedInflationRate: '3',
    retirementAnnualIncome: '75',
    preRetirementRoi: '8',
    postRetirementRoi: '5'
}

// Factory helper to create modified copies of the base fixtures without mutating them
export function withOverrides<T>(base: Readonly<T>, overrides: Partial<T>): T {
    return Object.assign({}, base, overrides) as T
}
