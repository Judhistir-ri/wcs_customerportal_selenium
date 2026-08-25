const { By, until } = require("selenium-webdriver");

class DispatchServicePage {

    constructor(driver) {

        this.driver = driver;

        // ==================================================
        // Navigation
        // ==================================================

        this.newOrder =
            By.xpath("//span[normalize-space()='New Order']");

        this.dispatchService =
            By.css("a[href='/orders/new/dispatch-service']");

        this.cart =
            By.xpath("//span[normalize-space()='Cart']");

        this.myOrders =
            By.xpath("//span[normalize-space()='My Orders']");


        // ==================================================
        // Dispatch Service Form
        // ==================================================

        this.country = By.xpath(
            "//label[contains(.,'Select or Type Country')]/following::input[1]"
        );

        this.documentType = By.xpath(
            "//label[contains(.,'Select or Type Document')]/following::input[1]"
        );

        this.customerReference =
            By.xpath("//input[@placeholder='Enter reference number']");

        this.comments =
            By.xpath("//textarea");

        // Upload file
        this.fileInput =
            By.css("input[type='file']");

        // Number of pages
        this.pageCount =
            By.xpath("//input[@type='number']");

        // Tracking number
        this.trackingNumber = By.xpath(
            "//label[contains(.,'Tracking number to WCS')]/following::input[1]"
        );

        // Courier
        this.courier = By.xpath(
            "//label[contains(.,'Courier')]/following::input[1]"
        );


        // ==================================================
        // Buttons
        // ==================================================

        this.addToCartButton =
            By.xpath("//button[normalize-space()='Add to Cart']");

        this.checkoutButton =
            By.xpath("//button[normalize-space()='Checkout']");


        // ==================================================
        // Cart
        // ==================================================

        this.checkoutCartBtn =
            By.xpath("//button[contains(.,'Checkout')]");


    }


    // ==================================================
    // Generic Methods
    // ==================================================

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


    // ==================================================
    // Loader
    // ==================================================

    async waitLoader() {

        try {

            await this.driver.wait(async () => {

                const loaders =
                    await this.driver.findElements(
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

        } catch (e) {}

    }


    async waitUntilLoaderDisappears() {

        await this.driver.wait(async () => {

            const loaders =
                await this.driver.findElements(
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


    // ==================================================
    // Navigation
    // ==================================================

    async openDispatchService() {

        console.log("Open Dispatch Service...");

        await this.click(this.newOrder);

        await this.click(this.dispatchService);

        await this.waitLoader();

        await this.handleExistingCartPopup();

        await this.driver.wait(async () => {

            return (
                await this.driver.getCurrentUrl()
            ).includes("/orders/new/dispatch-service");

        }, 30000);

    }


    // ==================================================
    // Existing Cart
    // ==================================================

    async handleExistingCartPopup() {

        try {

            const popup = await this.driver.wait(

                until.elementLocated(
                    By.xpath(
                        "//h2[contains(.,'Order Already in Cart')]"
                    )
                ),

                5000
            );

            if (await popup.isDisplayed()) {

                console.log("Order already exists.");

                const clearCart =
                    await this.driver.findElement(
                        By.xpath(
                            "//button[normalize-space()='Clear Cart']"
                        )
                    );

                await this.driver.executeScript(
                    "arguments[0].click();",
                    clearCart
                );

                await this.waitLoader();

            }

        } catch (e) {

            console.log("No Existing Cart");

        }

    }


    // ==================================================
    // Country
    // ==================================================

    async selectCountry() {

        console.log("Country...");

        await this.waitLoader();

        const input =
            await this.find(this.country);

        await this.driver.wait(
            until.elementIsVisible(input),
            10000
        );

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            input
        );

        await this.driver.sleep(500);

        await input.click();

        await this.driver.wait(

            until.elementsLocated(
                By.xpath("//li[@role='option']")
            ),

            20000
        );

        const options =
            await this.driver.findElements(
                By.xpath("//li[@role='option']")
            );

        if (options.length === 0) {
            throw new Error("No country options found");
        }

        const random =
            Math.floor(
                Math.random() * options.length
            );

        const country =
            await options[random].getText();

        console.log("Country :", country);

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            options[random]
        );

        await this.driver.sleep(300);

        await this.driver.executeScript(
            "arguments[0].click();",
            options[random]
        );

        await this.waitLoader();

        return country;

    }


    // ==================================================
    // Document Type
    // ==================================================

    async selectDocumentType() {

        console.log("Document...");

        const input =
            await this.find(this.documentType);

        await this.driver.wait(
            until.elementIsVisible(input),
            10000
        );

        await input.click();

        await this.driver.wait(

            until.elementsLocated(
                By.xpath("//li[@role='option']")
            ),

            20000
        );

        const options =
            await this.driver.findElements(
                By.xpath("//li[@role='option']")
            );

        if (options.length === 0) {
            throw new Error("No document type options found");
        }

        const random =
            Math.floor(
                Math.random() * options.length
            );

        const document =
            await options[random].getText();

        console.log("Document :", document);

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            options[random]
        );

        await this.driver.sleep(300);

        await this.driver.executeScript(
            "arguments[0].click();",
            options[random]
        );

        await this.waitLoader();

        return document;

    }

    // ==================================================
// Add More Documents
// ==================================================

async addMoreDocuments() {

    console.log("Add More Documents...");

    const addMoreDocumentsButton =
        By.xpath("//button[normalize-space()='Add More Documents']");

    await this.click(addMoreDocumentsButton);

    await this.waitLoader();

    await this.driver.wait(
        async () => {
            return (
                await this.driver.getCurrentUrl()
            ).includes("/orders/new/dispatch-service");
        },
        30000
    );

    await this.driver.sleep(1500);

    console.log(
        "✓ Returned to Dispatch Service page"
    );
}


    // ==================================================
    // Customer Reference
    // ==================================================

    async enterCustomerReference(reference) {

        console.log("Customer Reference...");

        await this.type(
            this.customerReference,
            reference
        );

    }


    // ==================================================
    // Additional Service
    // ==================================================

    async verifyPreScanSelected() {

        console.log("Checking Pre-Scan...");

        const preScan = await this.driver.findElement(
            By.xpath(
                "//label[contains(.,'Pre-Scan')]//input[@type='checkbox']"
            )
        );

        return await preScan.isSelected();

    }


    // ==================================================
    // Process Type
    //
    // Randomly selects:
    //
    // 1. Process Attached Documents
    // 2. Mail Original Documents to WCS office
    // ==================================================

    async selectProcessType(file) {

        const random =
            Math.floor(Math.random() * 2);

        if (random === 0) {

            // ==========================================
            // Process Attached Documents
            // ==========================================

            console.log(
                "Process : Process Attached Documents"
            );

            const radio =
                await this.driver.findElement(
                    By.xpath(
                        "//span[contains(.,'Process Attached Documents')]"
                    )
                );

            await this.driver.executeScript(
                "arguments[0].scrollIntoView({block:'center'});",
                radio
            );

            await this.driver.executeScript(
                "arguments[0].click();",
                radio
            );

            await this.driver.sleep(500);

            // Random number of pages
            const pages =
                Math.floor(Math.random() * 10) + 1;

            await this.enterPageCount(pages);

            // Upload document
            await this.uploadDocument(file);

            return "Process Attached Documents";

        } else {

            // ==========================================
            // Mail Original Documents
            // ==========================================

            console.log(
                "Process : Mail Original Documents to WCS office"
            );

            const radio =
                await this.driver.findElement(
                    By.xpath(
                        "//span[contains(.,'Mail Original Documents to WCS office')]"
                    )
                );

            await this.driver.executeScript(
                "arguments[0].scrollIntoView({block:'center'});",
                radio
            );

            await this.driver.executeScript(
                "arguments[0].click();",
                radio
            );

            await this.driver.sleep(1000);

            // Tracking number
            await this.enterTrackingNumber(
                "TRK" + Date.now()
            );

            // Random courier
            await this.selectCourier();

            return "Mail Original Documents to WCS office";

        }

    }


    // ==================================================
    // Upload Document
    // ==================================================

    async uploadDocument(file) {

        console.log("Uploading :", file);

        const input =
            await this.find(this.fileInput);

        await input.sendKeys(file);

        await this.driver.sleep(2000);

        console.log("Upload Completed");

    }


    // ==================================================
    // Number Of Pages
    // ==================================================

    async enterPageCount(number) {

        console.log("Pages :", number);

        await this.type(
            this.pageCount,
            number.toString()
        );

    }


    // ==================================================
    // Tracking Number
    // ==================================================

    async enterTrackingNumber(number) {

        console.log("Tracking Number...");

        const textbox =
            await this.driver.wait(
                until.elementLocated(
                    this.trackingNumber
                ),
                30000
            );

        await this.driver.wait(
            until.elementIsVisible(textbox),
            10000
        );

        await textbox.clear();

        await textbox.sendKeys(number);

    }


    // ==================================================
    // Courier
    // ==================================================

    async selectCourier() {

        console.log("Courier...");

        const input =
            await this.find(this.courier);

        await this.driver.wait(
            until.elementIsVisible(input),
            10000
        );

        await input.click();

        await this.driver.wait(

            until.elementsLocated(
                By.xpath("//li[@role='option']")
            ),

            20000
        );

        const options =
            await this.driver.findElements(
                By.xpath("//li[@role='option']")
            );

        if (options.length === 0) {
            throw new Error("No courier options found");
        }

        const random =
            Math.floor(
                Math.random() * options.length
            );

        const courier =
            await options[random].getText();

        console.log("Courier :", courier);

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            options[random]
        );

        await this.driver.executeScript(
            "arguments[0].click();",
            options[random]
        );

        await this.waitLoader();

        return courier;

    }


    // ==================================================
    // Additional Comments
    // ==================================================

    async enterComments(text) {

        console.log("Additional Comments...");

        await this.type(
            this.comments,
            text
        );

    }


    // ==================================================
    // Add To Cart
    // ==================================================

    async addToCart() {

        console.log("Add To Cart...");

        await this.click(
            this.addToCartButton
        );

        await this.waitLoader();

        await this.driver.sleep(2000);

        console.log("Added To Cart");

    }


    // ==================================================
    // Open Cart
    // ==================================================

    async openCart() {

        console.log("Open Cart...");

        await this.click(
            this.cart
        );

        await this.waitLoader();

        await this.driver.wait(async () => {

            return (
                await this.driver.getCurrentUrl()
            ).includes("/cart");

        }, 30000);

        console.log(
            "Cart URL:",
            await this.driver.getCurrentUrl()
        );

    }


    // ==================================================
    // Checkout From Dispatch Form
    // ==================================================

    async checkoutFromForm() {

        console.log("Checkout From Form...");

        await this.click(
            this.checkoutButton
        );

        await this.waitLoader();

        await this.driver.sleep(2000);

        await this.driver.wait(async () => {

            return (
                await this.driver.getCurrentUrl()
            ).includes("/cart");

        }, 30000);

        console.log(
            "Checkout redirected to:",
            await this.driver.getCurrentUrl()
        );

    }

    // ==================================================
    // Order Number
    // ==================================================

    async getOrderNumber() {

        const order =
            await this.find(

                By.xpath(
                    "//*[contains(text(),'Order No')]"
                )

            );

        const orderText =
            await order.getText();

        console.log(
            "Order :",
            orderText
        );

        return orderText;

    }


    // ==================================================
    // My Orders
    // ==================================================

    async openMyOrders() {

        console.log("Open My Orders...");

        await this.click(
            this.myOrders
        );

        await this.waitLoader();

    }


    
    async getLatestOrder(orderNumber) {

    const orderId =
        orderNumber
            .replace("Order No:", "")
            .trim();

    console.log(
        "Searching My Orders for Order ID:",
        orderId
    );

    // Wait until My Orders page is loaded
    await this.driver.wait(
        until.urlContains("/orders"),
        30000
    ).catch(() => {});

    // Give React time to render the order list
    await this.driver.sleep(2000);

    // Find elements containing the exact order ID
    const elements =
        await this.driver.findElements(
            By.xpath(
                `//*[contains(normalize-space(.), '${orderId}')]`
            )
        );

    console.log(
        "Matching elements found:",
        elements.length
    );

    for (const element of elements) {

        try {

            const text =
                await element.getText();

            console.log(
                "Checking element:",
                text.substring(0, 200)
            );

            if (
                text.includes(orderId)
            ) {

                return text;

            }

        } catch (e) {

            // Element may have disappeared because
            // React refreshed the page.
        }

    }

    return "";
    }
    

}


module.exports = DispatchServicePage;