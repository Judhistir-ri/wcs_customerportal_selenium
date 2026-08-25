const { By, until } = require("selenium-webdriver");

class NotaryServicePage {

    constructor(driver) {

        this.driver = driver;

        // ===========================
        // Navigation
        // ===========================

        this.newOrder =
            By.xpath("//span[normalize-space()='New Order']");

        this.notaryService =
            By.css("a[href='/orders/new/notary-service']");

        this.cart =
            By.xpath("//span[normalize-space()='Cart']");

        this.myOrders =
            By.xpath("//span[normalize-space()='My Orders']");


        // ===========================
        // Form
        // ===========================

        this.country =
            By.xpath(
                "//label[contains(text(),'Select or Type Country')]/following::input[1]"
            );

        this.documentType =
            By.xpath(
                "//label[contains(.,'Document')]/following::input[1]"
            );

        this.customerReference =
            By.xpath(
                "//input[@placeholder='Enter reference number']"
            );

        this.fileInput =
            By.css("input[type='file']");

        this.comments =
            By.xpath("//textarea");

        this.trackingNumber =
            By.xpath(
                "//label[contains(.,'Tracking number to WCS')]/following::input[1]"
            );

        this.courier =
            By.xpath(
                "//label[contains(.,'Courier')]/following::input[1]"
            );


        // ===========================
        // Cart
        // ===========================

        this.checkoutButton =
            By.xpath("//button[normalize-space()='Checkout']");

        this.addToCartButton =
            By.xpath(
                "//button[contains(normalize-space(.),'Add to Cart')]"
            );

        this.addMoreDocumentsButton =
            By.xpath(
                "//button[normalize-space()='Add More Documents']"
            );

        this.confirmPayLaterBtn =
            By.xpath(
                "//button[contains(.,'Confirm') or contains(.,'Pay Later')]"
            );

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

        const element =
            await this.find(locator);

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

        const element =
            await this.find(locator);

        await element.clear();

        await element.sendKeys(value);

    }


    // ==================================================
    // Loader
    // ==================================================

    async waitLoader() {

        try {

            await this.driver.wait(
                async () => {

                    const loaders =
                        await this.driver.findElements(
                            By.css(".MuiBackdrop-root")
                        );

                    for (const loader of loaders) {

                        try {

                            if (await loader.isDisplayed()) {
                                return false;
                            }

                        } catch (e) {}

                    }

                    return true;

                },
                30000
            );

        } catch (e) {}

    }


    async waitUntilLoaderDisappears() {

        await this.driver.wait(
            async () => {

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

            },
            30000
        );

        await this.driver.sleep(1000);

    }


    // ==================================================
    // Navigation
    // ==================================================

    async openNotaryService() {

        console.log(
            "Open Notary Service..."
        );

        await this.click(
            this.newOrder
        );

        await this.click(
            this.notaryService
        );

        await this.waitLoader();


        // ==============================================
        // CHECK EXISTING CART
        // ==============================================

        const cartAction =
            await this.handleExistingCartPopup();


        // ==============================================
        // EXISTING CART -> GO TO CART
        // ==============================================

        if (
            cartAction === "GO_TO_CART"
        ) {

            console.log(
                "Existing cart found. Going to cart..."
            );

            return "GO_TO_CART";

        }


        // ==============================================
        // EXISTING CART -> CLEAR CART
        // ==============================================

        if (
            cartAction === "NEW_ORDER"
        ) {

            console.log(
                "Existing cart cleared."
            );

        }


        // ==============================================
        // NEW ORDER PAGE
        // ==============================================

        await this.driver.wait(
            async () => {

                return (
                    await this.driver.getCurrentUrl()
                ).includes(
                    "/orders/new/notary-service"
                );

            },
            30000
        );


        await this.waitUntilLoaderDisappears();

        console.log(
            "✓ Notary Service page opened"
        );

        return "NEW_ORDER";

    }


    // ==================================================
    // Existing Cart Popup
    // ==================================================

    async handleExistingCartPopup() {

        try {

            console.log(
                "Checking for existing cart..."
            );


            const popup =
                await this.driver.wait(
                    until.elementLocated(
                        By.xpath(
                            "//*[contains(normalize-space(.),'already have an order in your cart')]"
                        )
                    ),
                    5000
                );


            if (
                await popup.isDisplayed()
            ) {

                console.log(
                    "Existing cart detected."
                );


                // ==========================================
                // RANDOMLY CHOOSE
                // 0 = CLEAR CART
                // 1 = GO TO CART
                // ==========================================

                const random =
                    Math.floor(
                        Math.random() * 2
                    );


                // ==========================================
                // CLEAR CART
                // ==========================================

                if (
                    random === 0
                ) {

                    console.log(
                        "Existing Cart Action: CLEAR CART"
                    );


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


                    await this.driver.wait(
                        until.elementIsVisible(
                            clearCart
                        ),
                        10000
                    );


                    await this.driver.executeScript(
                        "arguments[0].click();",
                        clearCart
                    );


                    await this.waitLoader();

                    await this.waitUntilLoaderDisappears();


                    console.log(
                        "✓ Cart cleared."
                    );


                    return "NEW_ORDER";

                }


                // ==========================================
                // GO TO CART
                // ==========================================

                else {

                    console.log(
                        "Existing Cart Action: GO TO CART"
                    );


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


                    await this.driver.wait(
                        until.elementIsVisible(
                            goToCart
                        ),
                        10000
                    );


                    await this.driver.executeScript(
                        "arguments[0].click();",
                        goToCart
                    );


                    await this.waitLoader();


                    await this.driver.wait(
                        async () => {

                            return (
                                await this.driver.getCurrentUrl()
                            ).includes("/cart");

                        },
                        30000
                    );


                    console.log(
                        "✓ Existing cart opened."
                    );


                    return "GO_TO_CART";

                }

            }

        } catch (e) {

            console.log(
                "No Existing Cart"
            );

        }


        return "NONE";

    }


    // ==================================================
    // Country
    // ==================================================

    async selectCountry() {

        await this.waitLoader();

        const input =
            await this.find(
                this.country
            );

        await this.driver.wait(
            until.elementIsVisible(input),
            10000
        );

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            input
        );

        await this.driver.sleep(800);

        await input.click();


        await this.driver.wait(
            until.elementsLocated(
                By.xpath("//li[@role='option']")
            ),
            10000
        );


        const options =
            await this.driver.findElements(
                By.xpath("//li[@role='option']")
            );


        if (options.length === 0) {

            throw new Error(
                "No country options found."
            );

        }


        const random =
            Math.floor(
                Math.random() * options.length
            );


        const country =
            await options[random].getText();


        console.log(
            "Country :",
            country
        );


        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            options[random]
        );

        await this.driver.sleep(500);


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

        console.log(
            "Document Type..."
        );


        const input =
            await this.find(
                this.documentType
            );


        await input.click();


        const options =
            await this.driver.wait(
                until.elementsLocated(
                    By.xpath(
                        "//li[@role='option']"
                    )
                ),
                20000
            );


        if (options.length === 0) {

            throw new Error(
                "No document type options found."
            );

        }


        const random =
            Math.floor(
                Math.random() * options.length
            );


        const document =
            await options[random].getText();


        console.log(
            "Document :",
            document
        );


        await options[random].click();


        return document;

    }


    // ==================================================
    // Add More Documents
    // ==================================================

    async addMoreDocuments() {

        console.log(
            "Add More Documents..."
        );


        await this.click(
            this.addMoreDocumentsButton
        );


        await this.waitLoader();


        await this.driver.wait(
            async () => {

                return (
                    await this.driver.getCurrentUrl()
                ).includes(
                    "/orders/new/notary-service"
                );

            },
            30000
        );


        await this.driver.sleep(1500);


        console.log(
            "✓ Returned to Notary Service page"
        );

    }


    // ==================================================
    // Customer Reference
    // ==================================================

    async enterCustomerReference(
        reference
    ) {

        console.log(
            "Customer Reference..."
        );


        await this.type(
            this.customerReference,
            reference
        );

    }


    // ==================================================
    // Additional Services
    // ==================================================

    async selectAdditionalServices() {

        console.log(
            "Additional Services..."
        );


        const services = [
            "Pre-Scan",
            "Post-Scan",
            "Rush"
        ];


        const count =
            Math.floor(
                Math.random() * 4
            );


        const shuffled =
            services.sort(
                () => 0.5 - Math.random()
            );


        const selected =
            shuffled.slice(
                0,
                count
            );


        for (
            const service of selected
        ) {

            const checkbox =
                await this.driver.findElement(
                    By.xpath(
                        `//span[contains(text(),'${service}')]`
                    )
                );


            await this.driver.executeScript(
                "arguments[0].click();",
                checkbox
            );

        }


        console.log(
            "Selected :",
            selected.join(", ") || "None"
        );

    }


    // ==================================================
    // Process Type
    // ==================================================

    async selectProcessType(pdf) {

        const random =
            Math.floor(
                Math.random() * 2
            );


        // ==============================================
        // PROCESS ATTACHED DOCUMENTS
        // ==============================================

        if (
            random === 0
        ) {

            console.log(
                "Process : Process Attached Documents"
            );


            const radio =
                await this.driver.wait(
                    until.elementLocated(
                        By.xpath(
                            "//span[contains(text(),'Process Attached Documents')]"
                        )
                    ),
                    30000
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


            // PDF is required for this option

            await this.uploadDocument(
                pdf
            );


            await this.waitLoader();


            console.log(
                "Process Attached Documents selected."
            );


            return "PROCESS";

        }


        // ==============================================
        // MAIL ORIGINAL DOCUMENTS
        // ==============================================

        else {

            console.log(
                "Process : Mail Original Documents"
            );


            const radio =
                await this.driver.wait(
                    until.elementLocated(
                        By.xpath(
                            "//span[contains(text(),'Mail Original Documents')]"
                        )
                    ),
                    30000
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


            // Tracking number required

            await this.enterTrackingNumber(
                "TRK" + Date.now()
            );


            // Courier required

            await this.selectCourier();


            await this.waitLoader();

            await this.driver.sleep(1500);


            console.log(
                "Mail Original Documents selected."
            );


            // No PDF upload for MAIL option

            return "MAIL";

        }

    }


    // ==================================================
    // Upload Document
    // ==================================================

    async uploadDocument(file) {

        console.log(
            "Uploading :",
            file
        );


        const input =
            await this.find(
                this.fileInput
            );


        await input.sendKeys(
            file
        );


        await this.driver.sleep(
            2000
        );


        console.log(
            "Upload Completed"
        );

    }


    // ==================================================
    // Tracking Number
    // ==================================================

    async enterTrackingNumber(
        number
    ) {

        console.log(
            "Tracking Number..."
        );


        const textbox =
            await this.driver.wait(
                until.elementLocated(
                    this.trackingNumber
                ),
                30000
            );


        await this.driver.wait(
            until.elementIsVisible(
                textbox
            ),
            10000
        );


        await textbox.clear();

        await textbox.sendKeys(
            number
        );

    }


    // ==================================================
    // Courier
    // ==================================================

    async selectCourier() {

        console.log(
            "Courier..."
        );


        const input =
            await this.find(
                this.courier
            );


        await input.click();


        const options =
            await this.driver.wait(
                until.elementsLocated(
                    By.xpath(
                        "//li[@role='option']"
                    )
                ),
                20000
            );


        if (options.length === 0) {

            throw new Error(
                "No courier options found."
            );

        }


        const random =
            Math.floor(
                Math.random() * options.length
            );


        const courier =
            await options[random].getText();


        console.log(
            "Courier :",
            courier
        );


        await options[random].click();

    }


    // ==================================================
    // Comments
    // ==================================================

    async enterComments(text) {

        console.log(
            "Comments..."
        );


        await this.type(
            this.comments,
            text
        );

    }


    // ==================================================
    // Add To Cart
    // ==================================================

    async addToCart() {

        console.log(
            "Add To Cart..."
        );


        await this.waitLoader();


        const addToCartButton =
            await this.driver.wait(
                until.elementLocated(
                    this.addToCartButton
                ),
                30000
            );


        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            addToCartButton
        );


        await this.driver.wait(
            until.elementIsVisible(
                addToCartButton
            ),
            10000
        );


        await this.driver.executeScript(
            "arguments[0].click();",
            addToCartButton
        );


        await this.waitLoader();


        await this.driver.sleep(
            2000
        );


        console.log(
            "Add To Cart completed."
        );

    }


    // ==================================================
    // Open Cart
    // ==================================================

    async openCart() {

        console.log(
            "Open Cart..."
        );


        await this.click(
            this.cart
        );


        await this.waitLoader();


        await this.driver.wait(
            async () => {

                return (
                    await this.driver.getCurrentUrl()
                ).includes("/cart");

            },
            30000
        );

    }


    // ==================================================
    // Checkout From Form
    // ==================================================

    async checkoutFromForm() {

        console.log(
            "Checkout..."
        );


        await this.click(
            this.checkoutButton
        );


        console.log(
            "Current URL:",
            await this.driver.getCurrentUrl()
        );


        await this.driver.sleep(
            5000
        );


        console.log(
            "URL After Click:",
            await this.driver.getCurrentUrl()
        );


        const body =
            await this.driver.findElement(
                By.tagName("body")
            );


        console.log(
            await body.getText()
        );


        await this.waitLoader();


        await this.driver.wait(
            async () => {

                return (
                    await this.driver.getCurrentUrl()
                ).includes("/cart");

            },
            30000
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


        return await order.getText();

    }


    // ==================================================
    // My Orders
    // ==================================================

    async openMyOrders() {

        await this.click(
            this.myOrders
        );

    }


    async getLatestOrder(
        orderNumber
    ) {

        const orderId =
            orderNumber
                .replace(
                    "Order No:",
                    ""
                )
                .trim();


        const order =
            await this.find(
                By.xpath(
                    `//*[contains(normalize-space(),'${orderId}')]`
                )
            );


        return await order.getText();

    }

}


module.exports = NotaryServicePage;