const { By, until } = require("selenium-webdriver");

class TranslationServicePage {

    constructor(driver) {

        this.driver = driver;

        // Navigation
        this.newOrder =
            By.xpath("//span[normalize-space()='New Order']");

        this.translationService =
            By.css("a[href='/orders/new/translation-service']");

        this.myOrders =
            By.xpath("//span[normalize-space()='My Orders']");

        // Form
        this.originalLanguage =
            By.xpath(
                "//label[contains(.,'Original Language')]/following::input[1]"
            );

        this.translatedLanguage =
            By.xpath(
                "//label[contains(.,'Translated Language')]/following::input[1]"
            );

        this.documentUpload =
            By.xpath("(//input[@type='file'])[1]");

        this.coverLetterUpload =
            By.xpath("(//input[@type='file'])[2]");

        this.shippingLabelUpload =
            By.xpath("(//input[@type='file'])[3]");

        this.additionalComments =
            By.xpath("//textarea");

        this.checkoutButton =
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

        const textbox =
            await this.find(locator);

        await textbox.clear();

        await textbox.sendKeys(value);
    }


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


    // ==========================================
    // Navigation
    // ==========================================

    async openTranslationService() {

        await this.click(this.newOrder);

        await this.click(this.translationService);

        await this.waitLoader();

        await this.handleExistingOrderPopup();
    }


    async handleExistingOrderPopup() {

        try {

            const popup =
                await this.driver.wait(
                    until.elementLocated(
                        By.xpath(
                            "//*[contains(text(),'Order Already in Cart')]"
                        )
                    ),
                    5000
                );

            if (await popup.isDisplayed()) {

                console.log(
                    "Order already exists. Clearing cart..."
                );

                const clearBtn =
                    await this.driver.findElement(
                        By.xpath(
                            "//button[normalize-space()='Clear Cart']"
                        )
                    );

                await this.driver.executeScript(
                    "arguments[0].click();",
                    clearBtn
                );

                await this.waitUntilLoaderDisappears();

                console.log("Cart cleared.");
            }

        } catch (e) {

            console.log("No existing cart.");
        }
    }


    // ==========================================
    // Language
    // ==========================================

    async selectOriginalLanguage() {

        await this.waitUntilLoaderDisappears();

        const input =
            await this.find(this.originalLanguage);

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            input
        );

        await this.driver.sleep(500);

        // Open Original Language dropdown
        await this.driver.executeScript(
            "arguments[0].click();",
            input
        );

        // Wait for MUI dropdown/listbox
        await this.driver.wait(
            until.elementLocated(
                By.xpath(
                    "//ul[@role='listbox']"
                )
            ),
            10000
        );

        const options =
            await this.driver.wait(
                until.elementsLocated(
                    By.xpath(
                        "//ul[@role='listbox']//li[@role='option']"
                    )
                ),
                20000
            );

        const languages = [];

        for (const option of options) {

            const text =
                (await option.getText()).trim();

            if (text !== "") {
                languages.push(text);
            }
        }

        if (languages.length === 0) {

            throw new Error(
                "No Original Language options found."
            );
        }

        // Random Original Language
        const randomLanguage =
            languages[
                Math.floor(
                    Math.random() * languages.length
                )
            ];

        console.log(
            "Original Language:",
            randomLanguage
        );

        await this.driver.findElement(
            By.xpath(
                `//ul[@role='listbox']//li[@role='option' and normalize-space()='${randomLanguage}']`
            )
        ).click();

        await this.waitUntilLoaderDisappears();

        return randomLanguage;
    }


    async selectTranslatedLanguage(originalLanguage) {

        // ==========================================
        // NON-ENGLISH → ENGLISH AUTOMATICALLY
        // ==========================================

        if (originalLanguage !== "English") {

            console.log(
                "Translated Language: English (Auto)"
            );

            return "English";
        }


        // ==========================================
        // ENGLISH → RANDOM NON-ENGLISH LANGUAGE
        // ==========================================

        await this.waitUntilLoaderDisappears();

        const input =
            await this.find(this.translatedLanguage);

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            input
        );

        await this.driver.sleep(500);

        // Open Translated Language dropdown
        await this.driver.executeScript(
            "arguments[0].click();",
            input
        );

        // Wait for MUI dropdown/listbox
        await this.driver.wait(
            until.elementLocated(
                By.xpath(
                    "//ul[@role='listbox']"
                )
            ),
            10000
        );

        const options =
            await this.driver.wait(
                until.elementsLocated(
                    By.xpath(
                        "//ul[@role='listbox']//li[@role='option']"
                    )
                ),
                20000
            );

        const languages = [];

        for (const option of options) {

            const text =
                (await option.getText()).trim();

            // English must not be selected
            if (
                text !== "" &&
                text !== "English"
            ) {
                languages.push(text);
            }
        }

        if (languages.length === 0) {

            throw new Error(
                "No non-English Translated Language options found."
            );
        }

        // Random translated language
        const translated =
            languages[
                Math.floor(
                    Math.random() * languages.length
                )
            ];

        console.log(
            "Translated Language:",
            translated
        );

        await this.driver.findElement(
            By.xpath(
                `//ul[@role='listbox']//li[@role='option' and normalize-space()='${translated}']`
            )
        ).click();

        await this.waitUntilLoaderDisappears();

        return translated;
    }


    // ==========================================
    // Upload
    // ==========================================

    // REQUIRED
    async uploadDocument(file) {

        const upload =
            await this.find(
                this.documentUpload
            );

        await upload.sendKeys(file);

        await this.driver.sleep(3000);
    }


    // OPTIONAL
    async uploadCoverLetter(file) {

        const upload =
            await this.find(
                this.coverLetterUpload
            );

        await upload.sendKeys(file);

        await this.driver.sleep(3000);
    }


    // OPTIONAL
    async uploadShippingLabel(file) {

        const upload =
            await this.find(
                this.shippingLabelUpload
            );

        await upload.sendKeys(file);

        await this.driver.sleep(3000);
    }


    // OPTIONAL
    async enterComments(text) {

        await this.type(
            this.additionalComments,
            text
        );
    }


    // ==========================================
    // Checkout
    // ==========================================

    async checkoutFromForm() {

        await this.click(
            this.checkoutButton
        );

        await this.waitLoader();
    }


    // ==========================================
    // Confirmation
    // ==========================================

    async getOrderNumber() {

        const order =
            await this.find(
                By.xpath(
                    "//*[contains(text(),'Order No')]"
                )
            );

        return await order.getText();
    }


    async openMyOrders() {

        await this.click(
            this.myOrders
        );
    }


    async getLatestOrder() {

        const order =
            await this.find(
                By.xpath(
                    "(//*[contains(text(),'Order ID')])[1]"
                )
            );

        return await order.getText();
    }
}


module.exports = TranslationServicePage;