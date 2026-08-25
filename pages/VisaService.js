const { By, until } = require("selenium-webdriver");

class VisaServicePage {

    constructor(driver) {

        this.driver = driver;

        // ==========================================
        // Navigation
        // ==========================================

        this.newOrder =
            By.xpath("//span[normalize-space()='New Order']");

        this.visaService =
            By.css("a[href='/orders/new/visa-service']");

        this.cart =
            By.xpath("//span[normalize-space()='Cart']");

        this.myOrders =
            By.xpath("//span[normalize-space()='My Orders']");

        // ==========================================
        // Form
        // ==========================================

        this.destinationCountry =
            By.xpath("//label[contains(.,'Destination Country')]/following::input[1]");

        this.typeOfVisa =
            By.xpath("//label[contains(.,'Type of Visa')]/following::input[1]");

        this.typeOfPassport =
            By.xpath("//label[contains(.,'Type of Passport')]/following::input[1]");

        this.originCountry =
            By.xpath("//label[contains(.,'Origin Country')]/following::input[1]");

        this.givenName =
            By.xpath("//label[contains(.,'Given Name')]/following::input[1]");

        this.surname =
            By.xpath("//label[contains(.,'Surname')]/following::input[1]");

        this.passportNumber =
            By.xpath("//label[contains(.,'Passport Number')]/following::input[1]");

        this.dateOfIssue =
            By.xpath("//label[contains(.,'Date of Issue')]/following::input[1]");

        this.passportValidity =
            By.xpath("//label[contains(.,'Passport Validity')]/following::input[1]");

        this.stateOfResidence =
            By.xpath("//label[contains(.,'Applicant State')]/following::input[1]");

        this.numberOfEntry =
            By.xpath("//label[contains(.,'Number of Entry')]/following::input[1]");

        this.departureDate =
            By.xpath("//label[contains(.,'Date of Departure')]/following::input[1]");

        this.fileInput =
            By.css("input[type='file']");

        this.additionalComments =
            By.xpath("//textarea");

        this.expectedDateCheckbox =
            By.css("input[type='checkbox']");

        this.expectedDate =
            By.xpath("//label[contains(.,'Expected')]/following::input[1]");

        this.customerReference =
            By.xpath("//label[contains(.,'Customer Reference')]/following::input[1]");

        // ==========================================
        // Checkout
        // ==========================================

        this.checkoutBtn =
            By.xpath("//button[normalize-space()='Checkout']");

    }

    // ==========================================
    // Generic Methods
    // ==========================================

    async find(locator) {

        return await this.driver.wait(

            until.elementLocated(locator),

            30000

        );

    }

    async click(locator) {

        const element = await this.find(locator);

        await this.driver.executeScript(

            "arguments[0].scrollIntoView({block:'center'});",

            element

        );

        await this.driver.wait(

            until.elementIsVisible(element),

            10000

        );

        await this.driver.executeScript(

            "arguments[0].click();",

            element

        );

    }

    async type(locator, value) {

        const element = await this.find(locator);

        await element.clear();

        await element.sendKeys(value);

    }

    async waitLoader() {

        try {

            await this.driver.wait(async () => {

                const loaders = await this.driver.findElements(

                    By.css(".MuiBackdrop-root")

                );

                if (loaders.length === 0) return true;

                for (const loader of loaders) {

                    if (await loader.isDisplayed()) {

                        return false;

                    }

                }

                return true;

            }, 30000);

        } catch (e) {}

    }

    async waitUntilLoaderDisappears() {

        await this.driver.wait(async () => {

            const loaders = await this.driver.findElements(

                By.css(".MuiBackdrop-root")

            );

            if (loaders.length === 0) {

                return true;

            }

            for (const loader of loaders) {

                try {

                    if (await loader.isDisplayed()) {

                        return false;

                    }

                } catch (e) {}

            }

            return true;

        }, 30000);

        await this.driver.sleep(1000);

    }

    // ==========================================
    // Navigation
    // ==========================================

    async openVisaService() {

    await this.click(this.newOrder);

    await this.click(this.visaService);

    await this.waitLoader();

    const result = await this.handleExistingCartPopup();

    if (result === "CART") {

        console.log("Already in Cart.");

        return false;

    }

    await this.driver.wait(async () => {

        return (
            await this.driver.getCurrentUrl()
        ).includes("/orders/new/visa-service");

    },30000);

    return true;

}

    // ==========================================
    // Destination Country
    // ==========================================

    async selectDestinationCountry() {

        await this.waitUntilLoaderDisappears();

        const input = await this.find(this.destinationCountry);

        await this.driver.executeScript(

            "arguments[0].scrollIntoView({block:'center'});",

            input

        );

        await input.click();

        const options = await this.driver.wait(

            until.elementsLocated(

                By.xpath("//li[@role='option']")

            ),

            20000

        );

        const random =
            Math.floor(Math.random() * options.length);

        const value =
            await options[random].getText();

        console.log("Destination Country :", value);

        await this.driver.executeScript(

            "arguments[0].click();",

            options[random]

        );

        return value;

    }

    // ==========================================
    // Type Of Visa
    // ==========================================

    async selectTypeOfVisa() {

        const input = await this.find(this.typeOfVisa);

        await input.click();

        const options = await this.driver.wait(

            until.elementsLocated(

                By.xpath("//li[@role='option']")

            ),

            20000

        );

        const random =
            Math.floor(Math.random() * options.length);

        const visa =
            await options[random].getText();

        console.log("Visa Type :", visa);

        await this.driver.executeScript(

            "arguments[0].click();",

            options[random]

        );

        return visa;

    }

    // ==========================================
    // Type Of Passport
    // ==========================================

    async selectTypeOfPassport() {

        const input = await this.find(this.typeOfPassport);

        await input.click();

        const options = await this.driver.wait(

            until.elementsLocated(

                By.xpath("//li[@role='option']")

            ),

            20000

        );

        const random =
            Math.floor(Math.random() * options.length);

        const passport =
            await options[random].getText();

        console.log("Passport Type :", passport);

        await this.driver.executeScript(

            "arguments[0].click();",

            options[random]

        );

        return passport;

    }

    // ==========================================
    // Origin Country Of Passport
    // ==========================================

    async selectOriginCountry() {

        const input = await this.find(this.originCountry);

        await input.click();

        const options = await this.driver.wait(

            until.elementsLocated(

                By.xpath("//li[@role='option']")

            ),

            20000

        );

        const random =
            Math.floor(Math.random() * options.length);

        const country =
            await options[random].getText();

        console.log("Origin Country :", country);

        await this.driver.executeScript(

            "arguments[0].click();",

            options[random]

        );

        return country;

    }

    // ==========================================
    // Name
    // ==========================================

    async enterGivenName(name) {

        await this.type(this.givenName, name);

    }

    async enterSurname(name) {

        await this.type(this.surname, name);

    }

    // ==========================================
    // Passport Number
    // ==========================================

    async enterPassportNumber(number) {

        await this.type(this.passportNumber, number);

    }
        // ==========================================
    // Date Of Issue
    // ==========================================

    async enterDateOfIssue(date = "01/01/2024") {

        await this.type(this.dateOfIssue, date);

    }

    // ==========================================
    // Passport Validity
    // ==========================================

    async enterPassportValidity(date = "01/01/2034") {

        await this.type(this.passportValidity, date);

    }

    // ==========================================
    // Applicant State Of Residence
    // ==========================================

    async selectStateOfResidence() {

        const input = await this.find(this.stateOfResidence);

        await input.click();

        const options = await this.driver.wait(

            until.elementsLocated(
                By.xpath("//li[@role='option']")
            ),

            20000

        );

        const random =
            Math.floor(Math.random() * options.length);

        const state =
            await options[random].getText();

        console.log("State :", state);

        await this.driver.executeScript(

            "arguments[0].click();",

            options[random]

        );

        return state;

    }

    // ==========================================
    // Number Of Entry
    // ==========================================

    async selectNumberOfEntry() {

        const input = await this.find(this.numberOfEntry);

        await input.click();

        const options = await this.driver.wait(

            until.elementsLocated(
                By.xpath("//li[@role='option']")
            ),

            20000

        );

        const random =
            Math.floor(Math.random() * options.length);

        const entry =
            await options[random].getText();

        console.log("Entry :", entry);

        await this.driver.executeScript(

            "arguments[0].click();",

            options[random]

        );

        return entry;

    }

    // ==========================================
    // Departure Date
    // ==========================================

    async enterDepartureDate(date = "10/10/2026") {

        await this.type(this.departureDate, date);

    }

    // ==========================================
    // Upload Document
    // ==========================================

    async uploadDocument(file) {

        const upload =
            await this.find(this.fileInput);

        console.log("Uploading :", file);

        await upload.sendKeys(file);

        await this.driver.sleep(5000);

        console.log("Upload Completed");

    }

    // ==========================================
    // Additional Comments
    // ==========================================

    async enterComments(text) {

        await this.type(
            this.additionalComments,
            text
        );

    }

    // ==========================================
    // Expected Date
    // ==========================================

    async selectExpectedDate(date = "12/10/2026") {

        const random = Math.floor(Math.random() * 2);

        if (random === 0) {

            console.log("Expected Date : Skip");

            return;

        }

        console.log("Expected Date : Selected");

        await this.click(this.expectedDateCheckbox);

        await this.type(
            this.expectedDate,
            date
        );

    }

    // ==========================================
    // Customer Reference
    // ==========================================

    async enterCustomerReference(text) {

        await this.type(
            this.customerReference,
            text
        );

    }

    // ==========================================
    // Checkout From Form
    // ==========================================

    async checkout() {

        await this.click(this.checkoutBtn);

        await this.waitLoader();

    }

    // ==========================================
    // Existing Cart Popup
    // ==========================================

    async handleExistingCartPopup() {

    try {

        const popup = await this.driver.wait(

            until.elementLocated(
                By.xpath("//*[contains(text(),'already have an order in your cart')]")
            ),

            5000

        );

        if (await popup.isDisplayed()) {

            const random = Math.floor(Math.random() * 2);

            if (random === 0) {

                console.log("Clearing Cart...");

                await this.driver.findElement(
                    By.xpath("//button[contains(.,'Clear Cart')]")
                ).click();

                await this.waitLoader();

                return "CLEAR";

            } else {

                console.log("Go To Cart...");

                await this.driver.findElement(
                    By.xpath("//button[contains(.,'Go to Cart')]")
                ).click();

                await this.waitLoader();

                return "CART";

            }

        }

    } catch (e) {

        return "NONE";

    }

}

    // ==========================================
    // Order Number
    // ==========================================

    async getOrderNumber() {

        const order = await this.find(

            By.xpath("//*[contains(text(),'Order No')]")

        );

        return await order.getText();

    }

    // ==========================================
    // My Orders
    // ==========================================

    async openMyOrders() {

        await this.click(this.myOrders);

    }


    async getLatestOrder(orderNumber) {

    const orderId =
        orderNumber.replace("Order No:", "").trim();

    console.log("Searching My Orders for:", orderId);

    const order = await this.find(

        By.xpath(
            `//*[contains(normalize-space(),'${orderId}')]`
        )

    );

    return await order.getText();

}

}

module.exports = VisaServicePage;