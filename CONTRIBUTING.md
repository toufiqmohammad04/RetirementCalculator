Contributing
============

Thank you for improving the Retirement Calculator test suite. Please follow these simple guidelines.

1. Code style
   - Run `npm run lint` before committing.
   - Keep TypeScript types up-to-date; run `npm run typecheck`.

2. Tests
   - Add new page interactions under `test/pageobjects/`.
   - Add specs under `test/specs/` and reuse fixtures from `test/data/`.

3. Commits and PRs
   - Use clear commit messages (imperative tense).
   - Open a PR targeting `main`; CI will run lint/typecheck/tests.

4. Sensitive data
   - Do not commit secrets or credentials. Put them in environment variables.

5. Artifacts
   - Allure artifacts are generated under `allure-report/` and `allure-results/` and are gitignored.

If you're unsure about changes, open a draft PR and request a review.
