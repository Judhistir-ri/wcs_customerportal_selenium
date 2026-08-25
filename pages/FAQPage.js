const { By, until } = require("selenium-webdriver");

class FAQPage {

    constructor(driver) {
        this.driver = driver;

        // ==========================================
        // URL
        // ==========================================

        this.url =
            "https://wcscustomerportal.azurewebsites.net/faq";


        // ==========================================
        // Search
        // ==========================================

        this.searchInput = By.css(
            'input[placeholder="Search questions or keywords..."]'
        );


        // ==========================================
        // FAQ Accordion Questions
        // ==========================================

        this.accordionButtons = By.css(
            'button[aria-expanded]'
        );
    }


    // ==================================================
    // Open FAQ
    // ==================================================

    async openFAQ() {

        await this.driver.get(this.url);

        await this.driver.wait(
            until.elementLocated(this.searchInput),
            30000
        );

        await this.driver.wait(
            async () => {

                const input =
                    await this.driver.findElement(
                        this.searchInput
                    );

                return await input.isDisplayed();

            },
            30000
        );

        console.log("✓ FAQ page opened");
    }


    // ==================================================
    // Get Search Input
    // ==================================================

    async getSearchInput() {

        return await this.driver.wait(
            until.elementLocated(
                this.searchInput
            ),
            10000
        );
    }


    // ==================================================
    // Search FAQ
    // ==================================================

    async searchQuestion(text) {

        const input =
            await this.getSearchInput();

        await input.click();

        await input.clear();

        if (text !== undefined && text !== null) {

            await input.sendKeys(text);

        }

        // Give React time to update filtered FAQ list
        await this.driver.sleep(500);

    }


    // ==================================================
    // Clear Search
    // ==================================================

    async clearSearch() {

        const input =
            await this.getSearchInput();

        await input.click();

        await input.clear();

        // Trigger input/change if necessary
        await input.sendKeys("");

        await this.driver.sleep(500);
    }


    // ==================================================
    // Get Search Value
    // ==================================================

    async getSearchValue() {

        const input =
            await this.getSearchInput();

        return await input.getAttribute(
            "value"
        );
    }


    // ==================================================
    // Get All Accordion Buttons
    // ==================================================

    async getAllAccordionButtons() {

        return await this.driver.findElements(
            this.accordionButtons
        );
    }


    // ==================================================
    // Get Visible FAQ Questions
    // ==================================================

    async getVisibleQuestions() {

        const buttons =
            await this.getAllAccordionButtons();

        const questions = [];

        for (const button of buttons) {

            try {

                if (await button.isDisplayed()) {

                    const text =
                        (
                            await button.getText()
                        ).trim();

                    if (text) {

                        questions.push(text);

                    }

                }

            } catch (error) {

                // Ignore stale/removed elements
            }
        }

        return questions;
    }


    // ==================================================
    // Get Number Of Visible Questions
    // ==================================================

    async getVisibleQuestionCount() {

        const questions =
            await this.getVisibleQuestions();

        return questions.length;
    }


    // ==================================================
    // Find Question By Exact Text
    // ==================================================

    async findQuestion(questionText) {

        const xpath = `//button[
            @aria-expanded and
            .//p[normalize-space()=${this.toXPathString(questionText)}]
        ]`;

        return await this.driver.wait(
            until.elementLocated(
                By.xpath(xpath)
            ),
            10000
        );
    }


    // ==================================================
    // Expand Question
    // ==================================================

    async expandQuestion(questionText) {

        const button =
            await this.findQuestion(
                questionText
            );

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            button
        );

        await this.driver.wait(
            until.elementIsVisible(button),
            10000
        );

        const expanded =
            await button.getAttribute(
                "aria-expanded"
            );

        if (expanded !== "true") {

            await button.click();

        }

        // Wait until accordion is expanded
        await this.driver.wait(
            async () => {

                return (
                    await button.getAttribute(
                        "aria-expanded"
                    )
                ) === "true";

            },
            10000
        );

        console.log(
            `✓ Expanded: ${questionText}`
        );

        return button;
    }


    // ==================================================
    // Collapse Question
    // ==================================================

    async collapseQuestion(questionText) {

        const button =
            await this.findQuestion(
                questionText
            );

        const expanded =
            await button.getAttribute(
                "aria-expanded"
            );

        if (expanded === "true") {

            await button.click();

        }

        await this.driver.wait(
            async () => {

                return (
                    await button.getAttribute(
                        "aria-expanded"
                    )
                ) === "false";

            },
            10000
        );

        console.log(
            `✓ Collapsed: ${questionText}`
        );
    }


    // ==================================================
    // Check If Question Is Expanded
    // ==================================================

    async isQuestionExpanded(questionText) {

        const button =
            await this.findQuestion(
                questionText
            );

        return (
            await button.getAttribute(
                "aria-expanded"
            )
        ) === "true";
    }


    // ==================================================
    // Get Answer Of Question
    // ==================================================

    async getAnswer(questionText) {

        const button =
            await this.findQuestion(
                questionText
            );

        const expanded =
            await button.getAttribute(
                "aria-expanded"
            );

        if (expanded !== "true") {

            await this.expandQuestion(
                questionText
            );
        }

        /*
         * The FAQ structure shown in your screenshot is:
         *
         * h3
         *   button
         *
         * div.MuiCollapse-root
         *   div
         *     div[role="region"]
         *       p
         *
         * We locate the region relative to the
         * accordion button instead of using generated
         * MUI class names.
         */

        const answerLocator = By.xpath(
            `//button[
                @aria-expanded and
                .//p[normalize-space()=${this.toXPathString(questionText)}]
            ]
            /ancestor::h3[1]
            /following-sibling::div[@role="region"][1]//p`
        );

        const answers =
            await this.driver.findElements(
                answerLocator
            );

        if (answers.length === 0) {

            return "";

        }

        return (
            await answers[0].getText()
        ).trim();
    }


    // ==================================================
    // Verify Question Exists
    // ==================================================

    async questionExists(questionText) {

        const xpath = `//button[
            @aria-expanded and
            .//p[normalize-space()=${this.toXPathString(questionText)}]
        ]`;

        const elements =
            await this.driver.findElements(
                By.xpath(xpath)
            );

        for (const element of elements) {

            try {

                if (await element.isDisplayed()) {

                    return true;

                }

            } catch (error) {

                // Ignore stale element
            }
        }

        return false;
    }


    // ==================================================
    // Verify Question Does Not Exist
    // ==================================================

    async questionDoesNotExist(questionText) {

        return !(await this.questionExists(
            questionText
        ));
    }


    // ==================================================
    // Get All Questions With Their State
    // ==================================================

    async getQuestionsWithState() {

        const buttons =
            await this.getAllAccordionButtons();

        const result = [];

        for (const button of buttons) {

            try {

                if (!(await button.isDisplayed())) {
                    continue;
                }

                const text =
                    (
                        await button.getText()
                    ).trim();

                if (!text) {
                    continue;
                }

                const expanded =
                    await button.getAttribute(
                        "aria-expanded"
                    );

                result.push({
                    question: text,
                    expanded: expanded === "true"
                });

            } catch (error) {

                // Ignore stale elements
            }
        }

        return result;
    }


    // ==================================================
    // XPath String Helper
    // ==================================================

    toXPathString(value) {

        if (!value.includes("'")) {

            return `'${value}'`;

        }

        if (!value.includes('"')) {

            return `"${value}"`;

        }

        const parts =
            value.split("'");

        return (
            "concat('" +
            parts.join("',\"'\",'") +
            "')"
        );
    }
}

module.exports = FAQPage;