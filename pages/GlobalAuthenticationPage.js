const { By, until } = require("selenium-webdriver");

class GlobalAuthenticationPage {

    constructor(driver) {

        this.driver = driver;

        // Navigation
        this.newOrder = By.xpath("//span[normalize-space()='New Order']");
        this.globalAuthentication = By.css("a[href='/orders/new/global-authentication']");
        this.cart = By.xpath("//span[normalize-space()='Cart']");
        this.myOrders = By.xpath("//span[normalize-space()='My Orders']");

        // Form
        this.originCountry =
            By.xpath("//label[contains(.,'Origin Country')]/following::input[1]");

        this.destinationCountry =
            By.xpath("//label[contains(.,'Destination Country')]/following::input[1]");

        this.numberOfDocuments =
            By.xpath("//input[@type='number']");

        this.additionalComments =
            By.xpath("//textarea");

        this.fileInput =
            By.css("input[type='file']");

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

    // Give Material UI animation time to finish
    await this.driver.sleep(1000);
    }
    

    async openGlobalAuthentication() {

    await this.click(this.newOrder);

    await this.click(this.globalAuthentication);

    await this.waitLoader();

    // ==========================================
    // Check "Order Already in Cart" popup
    // ==========================================

    const existingCartAction =
        await this.handleExistingCartPopup();

    // ==========================================
    // If Go to Cart was selected
    // ==========================================

    if (existingCartAction === "GO_TO_CART") {

        console.log(
            "Existing cart selected."
        );

        return "GO_TO_CART";
    }

    // ==========================================
    // If Clear Cart was selected
    // ==========================================

    if (existingCartAction === "CLEAR_CART") {

        console.log(
            "Existing cart cleared."
        );

        await this.driver.wait(async () => {

            return (
                await this.driver.getCurrentUrl()
            ).includes(
                "/orders/new/global-authentication"
            );

        }, 30000);

        return "CLEAR_CART";
    }

    // ==========================================
    // No existing cart
    // ==========================================

    console.log(
        "No existing cart. Continuing new order."
    );

    await this.driver.wait(async () => {

        return (
            await this.driver.getCurrentUrl()
        ).includes(
            "/orders/new/global-authentication"
        );

    }, 30000);

    return "NEW_ORDER";
    }
    

    // ==========================================
    // Form
    // ==========================================

 async selectOriginCountry() {

    await this.waitUntilLoaderDisappears();

    const input = await this.find(this.originCountry);

    await this.driver.executeScript(
        "arguments[0].scrollIntoView({block:'center'});",
        input
    );

    await this.driver.sleep(500);

    await this.driver.wait(
        until.elementIsVisible(input),
        10000
    );

    await this.driver.wait(
        until.elementIsEnabled(input),
        10000
    );

    await this.driver.executeScript(
        "arguments[0].click();",
        input
    );

    await this.driver.wait(
        until.elementsLocated(
            By.xpath("//li[@role='option']")
        ),
        10000
    );

    const options = await this.driver.findElements(
        By.xpath("//li[@role='option']")
    );

    const random =
        Math.floor(Math.random() * options.length);

    const country =
        await options[random].getText();

    console.log("Origin Country :", country);

    await options[random].click();

    await this.waitUntilLoaderDisappears();

    return country;
}
    

    async selectDestinationCountry() {

    const input = await this.find(this.destinationCountry);

    await input.click();

    const options = await this.driver.wait(
        until.elementsLocated(
            By.xpath("//li[@role='option']")
        ),
        20000
    );

    const random = Math.floor(Math.random() * options.length);

    const country = await options[random].getText();

    console.log("Destination Country :", country);

    await this.driver.executeScript(
        "arguments[0].click();",
        options[random]
    );

    return country;
    }

    async enterDocumentCount(count) {

        await this.type(
            this.numberOfDocuments,
            count.toString()
        );

    }

async uploadDocuments(filePath) {

    await this.waitUntilLoaderDisappears();

    // Wait for upload input to appear
    const upload = await this.driver.wait(

        until.elementLocated(
            By.css("input[type='file']")
        ),

        30000

    );

    await this.driver.executeScript(
        "arguments[0].scrollIntoView({block:'center'});",
        upload
    );

    console.log("Uploading:", filePath);

    await upload.sendKeys(filePath);

    // Wait a few seconds for upload to complete
    await this.driver.sleep(5000);

    console.log("Upload completed");

}
    

    async enterComments(text) {

        await this.type(
            this.additionalComments,
            text
        );

    }

    
    async checkoutFromForm() {

    const btn = await this.driver.wait(

        until.elementLocated(
            By.xpath("//button[normalize-space()='Checkout']")
        ),

        30000

    );

    await this.driver.executeScript(
        "arguments[0].scrollIntoView({block:'center'});",
        btn
    );

    await this.driver.executeScript(
        "arguments[0].click();",
        btn
    );

    await this.waitLoader();

    }
    
    

    // ==========================================
    // Confirmation
    // ==========================================

    async getOrderNumber() {

        const order = await this.find(

            By.xpath("//*[contains(text(),'Order No')]")

        );

        return await order.getText();

    }

    async openMyOrders() {

        await this.click(this.myOrders);

    }

    async getLatestOrder() {

        const order = await this.find(

            By.xpath("(//*[contains(text(),'Order ID')])[1]")

        );

        return await order.getText();

    }
    
    async handleExistingCartPopup() {

    try {

        // ==========================================
        // Wait for popup
        // ==========================================

        const popup =
            await this.driver.wait(
                until.elementLocated(
                    By.xpath(
                        "//h2[contains(normalize-space(),'Order Already in Cart')]"
                    )
                ),
                5000
            );

        if (!(await popup.isDisplayed())) {

            return null;
        }

        console.log(
            "Order already in cart popup displayed."
        );

        // ==========================================
        // Two available options
        // ==========================================

        const options = [
            "GO_TO_CART",
            "CLEAR_CART"
        ];

        // ==========================================
        // Randomly select one
        // ==========================================

        const selected =
            options[
                Math.floor(
                    Math.random() * options.length
                )
            ];

        console.log(
            "Existing Cart Option Selected:",
            selected
        );

        // ==========================================
        // GO TO CART
        // ==========================================

        if (selected === "GO_TO_CART") {

            const goToCart =
                await this.driver.wait(
                    until.elementLocated(
                        By.xpath(
                            "//button[normalize-space()='Go to Cart']"
                        )
                    ),
                    10000
                );

            await this.driver.executeScript(
                "arguments[0].scrollIntoView({block:'center'});",
                goToCart
            );

            await this.driver.executeScript(
                "arguments[0].click();",
                goToCart
            );

            await this.waitLoader();

            await this.driver.wait(
                until.urlContains("/cart"),
                30000
            );

            console.log(
                "Redirected to existing cart:",
                await this.driver.getCurrentUrl()
            );

            return "GO_TO_CART";
        }

        // ==========================================
        // CLEAR CART
        // ==========================================

        const clearCart =
            await this.driver.wait(
                until.elementLocated(
                    By.xpath(
                        "//button[normalize-space()='Clear Cart']"
                    )
                ),
                10000
            );

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            clearCart
        );

        await this.driver.executeScript(
            "arguments[0].click();",
            clearCart
        );

        // ==========================================
        // Wait popup to disappear
        // ==========================================

        await this.driver.wait(async () => {

            const dialogs =
                await this.driver.findElements(
                    By.xpath(
                        "//h2[contains(normalize-space(),'Order Already in Cart')]"
                    )
                );

            return dialogs.length === 0;

        }, 30000);

        await this.waitLoader();

        console.log(
            "Cart cleared successfully."
        );

        return "CLEAR_CART";

    } catch (e) {

        console.log(
            "No existing cart popup."
        );

        return null;
    }
    }
    
    
    // async goToExistingCart() {

    // try {

    //     const popup = await this.driver.wait(
    //         until.elementLocated(
    //             By.xpath("//h2[contains(normalize-space(),'Order Already in Cart')]")
    //         ),
    //         5000
    //     );

    //     if (await popup.isDisplayed()) {

    //         console.log("Opening existing cart...");

    //         const btn = await this.driver.findElement(
    //             By.xpath("//button[normalize-space()='Go to Cart']")
    //         );

    //         await this.driver.executeScript(
    //             "arguments[0].click();",
    //             btn
    //         );

    //         await this.waitLoader();

    //     }

    // } catch (e) {

    //     console.log("No existing cart.");

    // }

    // }

}

module.exports = GlobalAuthenticationPage;