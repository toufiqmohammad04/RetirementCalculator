Retirement Calculator E2E tests
================================

This repository contains an enterprise-style WebdriverIO + Jasmine test suite for the Securian Retirement Calculator.

Quick start
-----------

1. Install dependencies:

```bash
npm install
```

2. Run typecheck and lint (recommended before running tests):

```bash
npm run typecheck
npm run lint
```

3. Run the retirement test locally (single spec):

```bash
npm run test:local
```

4. Run tests and generate Allure HTML report in one step:

```bash
npm run test:local:allure
npm run allure:open
```

Notes
-----

- Test spec: `test/specs/retirement.spec.ts` (uses Page Object Model and shared fixtures).
- Page objects live in `test/pageobjects/` and test helpers in `test/helpers/`.
- Test data fixtures are in `test/data/retirement.data.ts`.
- Allure outputs: `allure-results/` (raw) and `allure-report/` (HTML). These are gitignored.

Continuous Integration
----------------------

The repository includes a GitHub Actions workflow at `.github/workflows/ci.yaml` which runs tests on push and pull requests. The workflow runs typecheck, lint, the local test, generates the Allure report and uploads it as an artifact.

Contributing
------------

See `CONTRIBUTING.md` for developer guidelines.

Contact
-------

Repository: https://github.com/toufiqmohammad04/RetirementCalculator

