const { By, until, Key } = require("selenium-webdriver");

class MyOrdersPage {

    constructor(driver) {

        this.driver = driver;

        // ==========================================
        // URL
        // ==========================================

        this.url =
            "https://wcscustomerportal.azurewebsites.net/orders/all";


        // ==========================================
        // Buttons
        // ==========================================

        this.searchButton =
            By.xpath("//button[normalize-space()='Search']");

        this.resetButton =
            By.xpath("//button[normalize-space()='Reset']");

        this.exportButton =
            By.xpath(
                "//button[contains(normalize-space(),'Export Report to Excel')]"
            );

        this.expandAllButton =
            By.xpath(
                "//button[contains(normalize-space(),'Expand All')]"
            );


        // ==========================================
        // Order Result
        // ==========================================

        this.orderRows =
            By.xpath(
                "//*[contains(normalize-space(),'Order ID:')]"
            );


        // ==========================================
        // No Result
        // ==========================================

        this.noOrdersMessage =
            By.xpath(
                "//*[contains(normalize-space(),'No orders match your current filters')]"
            );


        // ==========================================
        // Pagination
        // ==========================================

        this.nextPageButton =
            By.xpath(
                "//button[@aria-label='Go to next page']"
            );

        this.previousPageButton =
            By.xpath(
                "//button[@aria-label='Go to previous page']"
            );


        // ==========================================
        // Rows Per Page
        // ==========================================

        this.rowsPerPage =
            By.xpath(
                "//*[contains(normalize-space(),'Rows per page:')]"
            );
    }


    // =====================================================
    // OPEN MY ORDERS
    // =====================================================

    async open() {

        await this.driver.get(this.url);

        await this.driver.wait(
            until.urlContains("/orders/all"),
            30000
        );

        await this.driver.wait(
            until.elementLocated(
                By.xpath(
                    "//h6[contains(normalize-space(),'Search and Reports')]"
                )
            ),
            30000
        );

        console.log(
            "✓ My Orders page opened"
        );
    }


    // =====================================================
    // FIND INPUT BY LABEL
    // =====================================================

    async getInputByLabel(labelText) {

        return await this.driver.wait(

            until.elementLocated(

                By.xpath(
                    `//label[normalize-space()='${labelText}']/following::input[1]`
                )

            ),

            15000
        );
    }


    // =====================================================
    // ENTER TEXT FIELD
    // =====================================================

    async enterText(labelText, value) {

        const input =
            await this.getInputByLabel(labelText);

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            input
        );

        await input.click();

        await input.sendKeys(
            Key.CONTROL,
            "a"
        );

        await input.sendKeys(
            value
        );
    }


    // =====================================================
    // CLEAR FIELD
    // =====================================================

    async clearField(labelText) {

        const input =
            await this.getInputByLabel(labelText);

        await input.click();

        await input.sendKeys(
            Key.CONTROL,
            "a"
        );

        await input.sendKeys(
            Key.BACK_SPACE
        );
    }


    // =====================================================
    // SELECT MUI AUTOCOMPLETE
    // =====================================================

    async selectAutocomplete(
        labelText,
        optionText = null
    ) {

        const input =
            await this.getInputByLabel(labelText);

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            input
        );

        await input.click();

        await this.driver.sleep(500);


        // ---------------------------------------------
        // If a specific option is requested
        // ---------------------------------------------

        if (optionText) {

            await input.sendKeys(
                optionText
            );

            await this.driver.sleep(700);

            const option =
                await this.driver.wait(

                    until.elementLocated(
                        By.xpath(
                            `//li[@role='option' and normalize-space()='${optionText}']`
                        )
                    ),

                    10000
                );

            await option.click();

            return optionText;
        }


        // ---------------------------------------------
        // Otherwise choose first available option
        // ---------------------------------------------

        const options =
            await this.driver.wait(

                until.elementsLocated(
                    By.xpath(
                        "//li[@role='option' and not(@aria-disabled='true')]"
                    )
                ),

                10000
            );

        if (!options.length) {

            throw new Error(
                `No options available for ${labelText}`
            );
        }


        const selected =
            await options[
                Math.floor(
                    Math.random() * options.length
                )
            ];

        const text =
            await selected.getText();

        await selected.click();

        console.log(
            `${labelText}: ${text}`
        );

        return text;
    }


    // =====================================================
    // SELECT FIRST AUTOCOMPLETE OPTION
    // =====================================================

    async selectFirstOption(labelText) {

        return await this.selectAutocomplete(
            labelText
        );
    }


    // =====================================================
    // ENTER DATE
    // =====================================================

    // =====================================================
// ENTER DATE
// Supports MUI DatePicker segmented input
// =====================================================

async enterDate(dateType, date) {

    console.log(`Entering ${dateType}: ${date}`);

    // Validate date format
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
        throw new Error(
            `Invalid date format: ${date}. Expected MM/DD/YYYY`
        );
    }

    const [month, day, year] = date.split("/");

    // -------------------------------------------------
    // Find the visible MUI date field container
    // -------------------------------------------------

    const groupLocator = By.xpath(
        `//label[normalize-space()='${dateType}']` +
        `/following-sibling::div[@role='group']`
    );

    const group = await this.driver.wait(
        until.elementLocated(groupLocator),
        10000
    );

    await this.driver.executeScript(
        "arguments[0].scrollIntoView({block:'center'});",
        group
    );

    await this.driver.sleep(300);

    // -------------------------------------------------
    // Click the visible date field
    // NOT the hidden input
    // -------------------------------------------------

    await group.click();

    await this.driver.sleep(300);

    // -------------------------------------------------
    // Use keyboard actions on the ACTIVE MUI field.
    //
    // Important:
    // We don't keep a WebElement reference while typing.
    // This avoids React/MUI stale element problems.
    // -------------------------------------------------

    const actions = this.driver.actions({
        async: true
    });

    // Select current segment
    await actions
        .keyDown(Key.CONTROL)
        .sendKeys("a")
        .keyUp(Key.CONTROL)
        .perform();

    await this.driver.sleep(200);

    // Type Month
    await this.driver.actions({
        async: true
    })
        .sendKeys(month)
        .perform();

    await this.driver.sleep(300);

    // Type Day
    await this.driver.actions({
        async: true
    })
        .sendKeys(day)
        .perform();

    await this.driver.sleep(300);

    // Type Year
    await this.driver.actions({
        async: true
    })
        .sendKeys(year)
        .perform();

    await this.driver.sleep(500);

    // -------------------------------------------------
    // Press TAB to commit the date
    // -------------------------------------------------

    await this.driver.actions({
        async: true
    })
        .sendKeys(Key.TAB)
        .perform();

    await this.driver.sleep(800);

    console.log(
        `✓ ${dateType} entered successfully: ${date}`
    );
    }
    
    async selectDate(dateType, date) {

    console.log(`Selecting ${dateType}: ${date}`);

    const [month, day, year] = date.split("/");

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const monthName = monthNames[parseInt(month, 10) - 1];

    // Find date field
    const groupLocator = By.xpath(
        `//label[normalize-space()='${dateType}']` +
        `/following-sibling::div[@role='group']`
    );

    const group = await this.driver.wait(
        until.elementLocated(groupLocator),
        10000
    );

    await this.driver.executeScript(
        "arguments[0].scrollIntoView({block:'center'});",
        group
    );

    // Click calendar icon inside this date field
    const calendarButton = await group.findElement(
        By.xpath(".//button[@aria-label='Choose date']")
    );

    await calendarButton.click();

    await this.driver.sleep(500);

    // -------------------------------------------------
    // Wait for calendar
    // -------------------------------------------------

    await this.driver.wait(
        until.elementLocated(
            By.xpath(
                `//*[contains(@class,'MuiPickersCalendarHeader')]`
            )
        ),
        5000
    );

    // -------------------------------------------------
    // Select month/year
    // -------------------------------------------------

    // Current calendar header
    let header = await this.driver.findElement(
        By.xpath(
            `//*[contains(@class,'MuiPickersCalendarHeader')]`
        )
    );

    let headerText = await header.getText();

    console.log(`Calendar currently shows: ${headerText}`);

    // -------------------------------------------------
    // If needed, navigate months
    // -------------------------------------------------

    const targetMonthIndex = parseInt(month, 10) - 1;
    const targetYear = parseInt(year, 10);

    while (true) {

        header = await this.driver.findElement(
            By.xpath(
                `//*[contains(@class,'MuiPickersCalendarHeader')]`
            )
        );

        headerText = await header.getText();

        if (
            headerText.includes(monthName) &&
            headerText.includes(year)
        ) {
            break;
        }

        // Click next month
        const nextButton = await this.driver.findElement(
            By.xpath(
                `//button[@aria-label='Next month']`
            )
        );

        await nextButton.click();

        await this.driver.sleep(300);
    }

    // -------------------------------------------------
    // Click day
    // -------------------------------------------------

    const dayButton = await this.driver.wait(
        until.elementLocated(
            By.xpath(
                `//button[@role='gridcell' and ` +
                `normalize-space()='${parseInt(day, 10)}']`
            )
        ),
        5000
    );

    await dayButton.click();

    await this.driver.sleep(800);

    console.log(
        `✓ ${dateType} selected: ${date}`
    );
    }
    
    


    // =====================================================
    // CLICK SEARCH
    // =====================================================

    async search() {

        const button =
            await this.driver.wait(

                until.elementLocated(
                    this.searchButton
                ),

                10000
            );

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            button
        );

        await button.click();

        // Give React/API time to update
        await this.driver.sleep(2000);

        console.log(
            "✓ Search executed"
        );
    }


    // =====================================================
    // CLICK RESET
    // =====================================================

    async reset() {

        const button =
            await this.driver.wait(

                until.elementLocated(
                    this.resetButton
                ),

                10000
            );

        await button.click();

        await this.driver.sleep(1500);

        console.log(
            "✓ Search filters reset"
        );
    }


    // =====================================================
    // GET ORDER RESULT TEXT
    // =====================================================

    async getOrderResultsText() {

        const body =
            await this.driver.findElement(
                By.tagName("body")
            );

        return await body.getText();
    }


    // =====================================================
    // CHECK RESULT EXISTS
    // =====================================================

    async hasOrders() {

        const noOrders =
            await this.driver.findElements(
                this.noOrdersMessage
            );

        if (noOrders.length > 0) {
            return false;
        }


        // Look for actual order headers
        const orders =
            await this.driver.findElements(
                By.xpath(
                    "//*[contains(normalize-space(),'Order ID:')]"
                )
            );

        return orders.length > 0;
    }


    // =====================================================
    // CHECK NO RESULTS
    // =====================================================

    async hasNoOrdersMessage() {

        const elements =
            await this.driver.findElements(
                this.noOrdersMessage
            );

        return elements.length > 0;
    }


    // =====================================================
    // GET ORDER IDS
    // =====================================================

    async getOrderIds() {

        const elements =
            await this.driver.findElements(

                By.xpath(
                    "//*[contains(normalize-space(),'Order ID:')]"
                )

            );

        const orderIds = [];

        for (const element of elements) {

            const text =
                await element.getText();

            const match =
                text.match(
                    /Order ID:\s*(\d+)/
                );

            if (match) {

                orderIds.push(
                    match[1]
                );
            }
        }

        return orderIds;
    }


    // =====================================================
    // SEARCH BY ORDER ID
    // =====================================================

    async searchByOrderId(orderId) {

        await this.enterText(
            "Order Id",
            orderId
        );

        await this.search();
    }


    // =====================================================
    // SEARCH BY DOCUMENT ID
    // =====================================================

    async searchByDocId(docId) {

        await this.enterText(
            "Doc Id",
            docId
        );

        await this.search();
    }


    // =====================================================
    // SEARCH BY CUSTOMER REFERENCE
    // =====================================================

    async searchByCustomerReference(reference) {

        await this.enterText(
            "Customer Reference",
            reference
        );

        await this.search();
    }


    // =====================================================
    // SEARCH BY PO
    // =====================================================

    async searchByPO(po) {

        await this.enterText(
            "PO#",
            po
        );

        await this.search();
    }


    // =====================================================
    // SEARCH BY COUNTRY
    // =====================================================

    async searchByCountry() {

        const country =
            await this.selectFirstOption(
                "Select or Type Country"
            );

        await this.search();

        return country;
    }


    // =====================================================
    // SEARCH BY DOCUMENT TYPE
    // =====================================================

    async searchByDocumentType() {

        const documentType =
            await this.selectFirstOption(
                "Select Doc Type"
            );

        await this.search();

        return documentType;
    }


    // =====================================================
    // SEARCH BY COUNTRY TYPE
    // =====================================================

    async searchByCountryType() {

        const countryType =
            await this.selectFirstOption(
                "Select Country Type"
            );

        await this.search();

        return countryType;
    }


    // =====================================================
    // SEARCH BY ORDER STATUS
    // =====================================================

    async searchByOrderStatus() {

        const status =
            await this.selectFirstOption(
                "Select Order Status"
            );

        await this.search();

        return status;
    }


    // =====================================================
    // SEARCH BY DATE RANGE
    // =====================================================

    // async searchByDateRange(
    //     fromDate,
    //     toDate
    // ) {

    //     await this.enterDate(
    //         "From Date",
    //         fromDate
    //     );

    //     await this.enterDate(
    //         "To Date",
    //         toDate
    //     );

    //     await this.search();
    // }

    async searchByDateRange(fromDate, toDate) {

    console.log(
        `Searching Date Range: ${fromDate} -> ${toDate}`
    );

    await this.reset();

    // -------------------------------
    // From Date
    // -------------------------------

    await this.enterDate(
        "From Date",
        fromDate
    );

    // -------------------------------
    // To Date
    // -------------------------------

    await this.enterDate(
        "To Date",
        toDate
    );

    // -------------------------------
    // Search
    // -------------------------------

    await this.search();

    console.log(
        "✓ Date range search executed"
    );
    }
    


    // =====================================================
    // EXPORT REPORT
    // =====================================================

    async exportReport() {

        const button =
            await this.driver.wait(

                until.elementLocated(
                    this.exportButton
                ),

                10000
            );

        await button.click();

        await this.driver.sleep(2000);

        console.log(
            "✓ Export Report clicked"
        );
    }


    // =====================================================
    // EXPAND ALL
    // =====================================================

    async expandAll() {

        const button =
            await this.driver.wait(

                until.elementLocated(
                    this.expandAllButton
                ),

                10000
            );

        await button.click();

        await this.driver.sleep(1000);

        console.log(
            "✓ Expand All clicked"
        );
    }


    // =====================================================
    // GET PAGE TEXT
    // =====================================================

    async getPageText() {

        const body =
            await this.driver.findElement(
                By.tagName("body")
            );

        return await body.getText();
    }
}

module.exports = MyOrdersPage;