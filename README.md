Jasmine Boilerplate ![CI](https://github.com/webdriverio/jasmine-boilerplate/workflows/CI/badge.svg?event=push)
===================

Boilerplate project to run WebdriverIO tests with Jasmine using latest ES2016 features and the page objects pattern.

## Quick Start

Choose one of the following options:

1. Download the latest stable release [here](https://github.com/webdriverio/jasmine-boilerplate/archive/master.zip) or clone the git repo — `git clone https://github.com/webdriverio/jasmine-boilerplate.git`

2. Then copy the files to your project directory (all files in `/test` and the `wdio.*.conf.js`)

3. Merge project dev dependencies with your projects dev dependencies in your `package.json`


## Features

- super simple setup
- Page Object pattern used
- ESNext ready
- Integration with [Sauce Labs](https://saucelabs.com/)
- Example using [GitHub Actions](https://github.com/features/actions)

## Allure Reporting

- Test results are written to `allure-results`
- Generate the HTML report with `npm run allure:generate`
- Run tests and create the report in one step with `npm run test:local:allure`
- The generated report is written to `allure-report`
