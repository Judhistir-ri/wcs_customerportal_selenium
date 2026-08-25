const { By, until } = require("selenium-webdriver");

class OrderUIPage {

    constructor(driver) {

        this.driver = driver;

        // Page
        this.pageTitle =
            By.xpath("//*[contains(text(),'U.S. Apostilles and Legalizations')]");
        this.formContainer =
    By.xpath("//*[contains(text(),'Upload Document')]/ancestor::div[contains(@class,'MuiGrid')][1]");

        // Form Fields
        this.countryDropdown =
            By.xpath("//label[contains(text(),'Select or Type Country')]/following::input[1]");

        this.selectedService =
            By.xpath("//label[contains(text(),'Selected Service')]/following::input[1]");

        this.documentDropdown =
            By.xpath("(//input[@role='combobox'])[2]");

        this.customerReference =
            By.xpath("//input[contains(@placeholder,'reference')]");

        // Upload Section
        this.processAttachedDocuments =
            By.xpath("//*[contains(text(),'Process Attached Documents')]");

        this.mailOriginalDocuments =
            By.xpath("//*[contains(text(),'Mail Original Documents')]");

        this.fileInput =
    By.xpath("//button[contains(.,'Choose File')]");

        // Buttons
        this.addToCartButton =
            By.xpath("//button[contains(.,'Add to Cart')]");

        this.checkoutButton =
            By.xpath("//button[contains(.,'Checkout')]");

        // Dropdown Options
        this.countryOptions =
            By.xpath("//ul[@role='listbox']");

        this.documentOptions =
            By.xpath("//ul[@role='listbox']//li");

    }

    // ======================================
    // Common Methods
    // ======================================

    async isDisplayed(locator) {

        try {

            const element = await this.driver.wait(
                until.elementLocated(locator),
                10000
            );

            await this.driver.wait(
                until.elementIsVisible(element),
                10000
            );

            return await element.isDisplayed();

        } catch {

            return false;

        }

    }

    async click(locator) {

        const element = await this.driver.wait(
            until.elementLocated(locator),
            10000
        );

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            element
        );

        await this.driver.sleep(300);

        await this.driver.executeScript(
            "arguments[0].click();",
            element
        );

    }

    async getPlaceholder(locator) {

        const element = await this.driver.wait(
            until.elementLocated(locator),
            10000
        );

        return await element.getAttribute("placeholder");

    }

    async isDisabled(locator) {

        const element = await this.driver.wait(
            until.elementLocated(locator),
            10000
        );

        return !(await element.isEnabled());

    }

    async getText(locator) {

        const element = await this.driver.wait(
            until.elementLocated(locator),
            10000
        );

        return await element.getText();

    }

    async getValue(locator) {

        const element = await this.driver.wait(
            until.elementLocated(locator),
            10000
        );

        return await element.getAttribute("value");

    }

    async getOptionCount(locator) {

        await this.driver.wait(
            until.elementsLocated(locator),
            10000
        );

        const options = await this.driver.findElements(locator);

        return options.length;

    }

    async openCountryDropdown() {

        await this.click(this.countryDropdown);

    }

    async openDocumentDropdown() {

        await this.click(this.documentDropdown);

    }

    async isCountryDropdownWorking() {

        await this.openCountryDropdown();

        return await this.isDisplayed(this.countryOptions);

    }

    async isDocumentDropdownWorking() {

        await this.openDocumentDropdown();

        return await this.isDisplayed(this.documentOptions);

    }

}

module.exports = OrderUIPage;