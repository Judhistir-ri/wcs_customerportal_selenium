const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("dotenv").config();

async function getDriver() {

    const options = new chrome.Options();

    options.addArguments("--start-maximized");

    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    await driver.manage().setTimeouts({
        implicit: 5000,
        pageLoad: 30000,
        script: 30000
    });

    return driver;
}

module.exports = getDriver;