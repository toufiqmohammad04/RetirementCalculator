import { config as sharedConfig } from './wdio.shared.conf.js'

const headless = process.env.HEADLESS !== 'false'
const chromeArgs = ['disable-gpu']
if (headless) {
    chromeArgs.unshift('headless')
}

export const config: WebdriverIO.Config = {
    ...sharedConfig,
    ...{
        capabilities: [{
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: chromeArgs
            }
        }]
    }
}
