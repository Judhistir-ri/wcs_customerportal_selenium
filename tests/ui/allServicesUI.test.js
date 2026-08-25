const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");

const getDriver = require("../../utils/driver");
const LoginPage = require("../../pages/LoginPage");
const OrderPage = require("../../pages/OrderPage");
const OrderUIPage = require("../../pages/OrderUIPage");
const DashboardPage = require("../../pages/DashboardPage");
const MyOrdersPage = require("../../pages/MyOrdersPage");
const FAQPage = require("../../pages/FAQPage");

describe("All UI Test Cases", function () {

    this.timeout(300000);

    let driver;
    let loginPage;
    let orderPage;
    let orderUIPage;
    let dashboard;
    let myOrdersPage;
    let faqPage;


    // =========================================================
    // ONE DRIVER + ONE LOGIN FOR ALL UI TEST CASES
    // =========================================================

    before(async function () {

        driver = await getDriver();

        loginPage = new LoginPage(driver);
        orderPage = new OrderPage(driver);
        orderUIPage = new OrderUIPage(driver);
        dashboard = new DashboardPage(driver);
        myOrdersPage = new MyOrdersPage(driver);
        faqPage = new FAQPage(driver);

        await loginPage.open();

        await loginPage.login(
            process.env.EMAIL,
            process.env.PASSWORD
        );

        await dashboard.waitForDashboard();

    });


    // =========================================================
    // CLOSE BROWSER AFTER ALL TEST CASES
    // =========================================================

    after(async function () {

        if (driver) {

            await driver.quit();

        }

    });


    // =========================================================
    // COMMON SERVICE NAVIGATION
    // =========================================================

    // async function openService(
    //     href,
    //     heading
    // ) {

    //     try {

    //         await driver.wait(
    //             async () => {

    //                 const loaders =
    //                     await driver.findElements(
    //                         By.css(".MuiBackdrop-root")
    //                     );

    //                 if (!loaders.length) {
    //                     return true;
    //                 }

    //                 for (const loader of loaders) {

    //                     try {

    //                         if (await loader.isDisplayed()) {
    //                             return false;
    //                         }

    //                     } catch (e) {}

    //                 }

    //                 return true;

    //             },
    //             30000
    //         );

    //     } catch (e) {}

    //     const menu =
    //         await driver.wait(
    //             until.elementLocated(
    //                 By.css(`a[href='${href}']`)
    //             ),
    //             20000
    //         );

    //     await driver.executeScript(
    //         "arguments[0].click();",
    //         menu
    //     );

    //     await driver.wait(
    //         until.elementLocated(
    //             By.xpath(heading)
    //         ),
    //         30000
    //     );

    // }

    async function openService(href, heading) {

    // ==========================================
    // RETURN TO DASHBOARD FIRST
    // ==========================================

    console.log("Returning to Dashboard...");

    await driver.get(
        "https://wcscustomerportal.azurewebsites.net/"
    );

    await dashboard.waitForDashboard();

    console.log("Dashboard loaded");


    // ==========================================
    // WAIT FOR SERVICE MENU
    // ==========================================

    const menu = await driver.wait(
        until.elementLocated(
            By.css(`a[href='${href}']`)
        ),
        30000
    );


    // ==========================================
    // CLICK SERVICE
    // ==========================================

    await driver.executeScript(
        "arguments[0].click();",
        menu
    );


    // ==========================================
    // WAIT FOR SERVICE PAGE
    // ==========================================

    await driver.wait(
        until.elementLocated(
            By.xpath(heading)
        ),
        30000
    );

    console.log(`Opened: ${href}`);
    }
    


    // =========================================================
    // COMMON DISPLAY TEST CREATOR
    // =========================================================

    function addDisplayTests(
        tests,
        getPage
    ) {

        for (const [name, target] of tests) {

            it(
                name,
                async function () {

                    const page = getPage();

                    expect(
                        await page.isDisplayed(
                            page[target]
                        )
                    ).to.equal(true);

                }
            );

        }

    }


    // =========================================================
    // 1. DASHBOARD UI
    // =========================================================

    describe(
        "Dashboard UI",
        function () {

            before(async function () {

                await dashboard.waitForDashboard();

            });


            it(
                "TC_01 Verify Dashboard URL",
                async function () {

                    const url =
                        await driver.getCurrentUrl();

                    expect(url)
                        .to.not.include("/login");

                }
            );


            addDisplayTests(

                [

                    [
                        "TC_02 Verify Home Page Menu",
                        "homeMenu"
                    ],

                    [
                        "TC_03 Verify My Orders Menu",
                        "myOrdersMenu"
                    ],

                    [
                        "TC_04 Verify New Order Menu",
                        "newOrderMenu"
                    ],

                    [
                        "TC_05 Verify US Authentication Menu",
                        "usAuthenticationMenu"
                    ],

                    [
                        "TC_06 Verify Global Authentication Menu",
                        "globalAuthenticationMenu"
                    ],

                    [
                        "TC_07 Verify Translation Service Menu",
                        "translationServiceMenu"
                    ],

                    [
                        "TC_08 Verify Visa Service Menu",
                        "visaServiceMenu"
                    ],

                    [
                        "TC_09 Verify Notary Service Menu",
                        "notaryServiceMenu"
                    ],

                    [
                        "TC_10 Verify Dispatch Service Menu",
                        "dispatchServiceMenu"
                    ],

                    [
                        "TC_11 Verify Bulk Ordering Menu",
                        "bulkOrderingMenu"
                    ],

                    [
                        "TC_12 Verify FAQ Menu",
                        "faqMenu"
                    ],

                    [
                        "TC_13 Verify Cart Menu",
                        "cartMenu"
                    ],

                    [
                        "TC_14 Verify Profile Menu",
                        "profileMenu"
                    ],

                    [
                        "TC_15 Verify Sign Out Menu",
                        "signOutMenu"
                    ],

                    [
                        "TC_17 Verify Notification Icon",
                        "notificationIcon"
                    ],

                    [
                        "TC_18 Verify FAQ Icon",
                        "infoIcon"
                    ],

                    [
                        "TC_19 Verify Header Cart Icon",
                        "cartIcon"
                    ],

                    [
                        "TC_20 Verify Account Icon",
                        "accountIcon"
                    ],

                    [
                        "TC_21 Verify US Apostille Card",
                        "usCard"
                    ],

                    [
                        "TC_22 Verify Global Authentication Card",
                        "globalCard"
                    ],

                    [
                        "TC_23 Verify Translation Service Card",
                        "translationCard"
                    ],

                    [
                        "TC_24 Verify Visa Service Card",
                        "visaCard"
                    ],

                    [
                        "TC_25 Verify Notary Service Card",
                        "notaryCard"
                    ],

                    [
                        "TC_26 Verify Dispatch Service Card",
                        "dispatchCard"
                    ],

                    [
                        "TC_27 Verify Document Share Chart",
                        "documentShareChart"
                    ],

                    [
                        "TC_28 Verify Document Volume Chart",
                        "documentVolumeChart"
                    ],

                    [
                        "TC_29 Verify WCS News Section",
                        "newsSection"
                    ],

                    [
                        "TC_30 Verify WCS Updates Section",
                        "updateSection"
                    ]

                ],

                () => dashboard

            );

        }
    );


    // =========================================================
    // 2. US AUTHENTICATION UI
    // =========================================================

    describe(
        "US Authentication UI",
        function () {

            before(async function () {

                await orderPage.openUSAuthentication();

            });


            it(
                "TC_01 Verify U.S Authentication Page URL",
                async function () {

                    const url =
                        await driver.getCurrentUrl();

                    expect(url)
                        .to.include(
                            "/orders/new/us-authentication"
                        );

                }
            );


            addDisplayTests(

                [

                    [
                        "TC_02 Verify Country Dropdown",
                        "countryDropdown"
                    ],

                    [
                        "TC_03 Verify Selected Service Field",
                        "selectedService"
                    ],

                    [
                        "TC_04 Verify Document Type Dropdown",
                        "documentDropdown"
                    ],

                    [
                        "TC_05 Verify Customer Reference Textbox",
                        "customerReference"
                    ],

                    [
                        "TC_06 Verify Process Attached Documents Radio Button",
                        "processAttachedDocuments"
                    ],

                    [
                        "TC_07 Verify Mail Original Documents Radio Button",
                        "mailOriginalDocuments"
                    ],

                    [
                        "TC_08 Verify Upload Document Control",
                        "fileInput"
                    ],

                    [
                        "TC_09 Verify Add To Cart Button",
                        "addToCartButton"
                    ],

                    [
                        "TC_10 Verify Proceed To Checkout Button",
                        "checkoutButton"
                    ],

                    [
                        "TC_13 Verify Upload Input",
                        "fileInput"
                    ],

                    [
                        "TC_18 Verify Form Container",
                        "formContainer"
                    ],

                    [
                        "TC_19 Verify Page Header",
                        "pageTitle"
                    ],

                    [
                        "TC_20 Verify Page Loads Successfully",
                        "addToCartButton"
                    ]

                ],

                () => orderUIPage

            );


            it(
                "TC_11 Verify Country Dropdown Opens",
                async function () {

                    await orderUIPage
                        .openCountryDropdown();

                    expect(
                        await orderUIPage.isDisplayed(
                            orderUIPage.countryOptions
                        )
                    ).to.equal(true);

                }
            );


            it(
                "TC_12 Verify Document Dropdown Opens",
                async function () {

                    await orderUIPage
                        .openDocumentDropdown();

                    expect(
                        await orderUIPage.isDisplayed(
                            orderUIPage.documentOptions
                        )
                    ).to.equal(true);

                }
            );


            it(
                "TC_14 Verify Customer Reference Placeholder",
                async function () {

                    const placeholder =
                        await orderUIPage.getPlaceholder(
                            orderUIPage.customerReference
                        );

                    expect(
                        placeholder
                    ).to.not.equal("");

                }
            );


            it(
                "TC_15 Verify Country Placeholder",
                async function () {

                    const label =
                        await driver.findElement(
                            By.xpath(
                                "//label[contains(text(),'Select or Type Country')]"
                            )
                        );

                    expect(
                        await label.isDisplayed()
                    ).to.equal(true);

                }
            );


            it(
                "TC_16 Verify Document Placeholder",
                async function () {

                    const label =
                        await driver.findElement(
                            By.xpath(
                                "//label[contains(text(),'Select or Type Document')]"
                            )
                        );

                    expect(
                        await label.isDisplayed()
                    ).to.equal(true);

                }
            );

        }
    );


    // =========================================================
    // 3. GLOBAL AUTHENTICATION UI
    // =========================================================

    describe(
        "Global Authentication UI",
        function () {

            before(async function () {

                await openService(
                    "/orders/new/global-authentication",
                    "//*[contains(text(),'Global Authentication (Canada, Europe, UK & Others)')]"
                );

            });


            const tests = [

                [
                    "Should display Global Authentication heading",
                    "//*[contains(text(),'Global Authentication (Canada, Europe, UK & Others)')]"
                ],

                [
                    "Should display Origin Country dropdown",
                    "//label[contains(.,'Origin Country')]"
                ],

                [
                    "Should display Destination Country dropdown",
                    "//label[contains(.,'Destination Country')]"
                ],

                [
                    "Should display Number of Documents field",
                    "//label[contains(.,'Number of Documents')]"
                ],

                [
                    "Should display Additional Comments textbox",
                    "//label[contains(.,'Additional Comments')]"
                ],

                [
                    "Should display Checkout button",
                    "//button[normalize-space()='Checkout']"
                ],

                [
                    "Should display Global Authentication information card",
                    "(//h5[contains(.,'Global Authentication')])[1]"
                ],

                [
                    "Should display description text",
                    "//*[contains(text(),'This order page is for documents')]"
                ],

                [
                    "Should display information image",
                    "//img"
                ]

            ];


            for (
                const [name, xpath]
                of tests
            ) {

                it(
                    name,
                    async function () {

                        expect(
                            await driver
                                .findElement(
                                    By.xpath(xpath)
                                )
                                .isDisplayed()
                        ).to.equal(true);

                    }
                );

            }

        }
    );


    // =========================================================
    // 4. TRANSLATION SERVICE UI
    // =========================================================

    describe(
        "Translation Service UI",
        function () {

            before(async function () {

                await openService(
                    "/orders/new/translation-service",
                    "//h5[contains(.,'Translation Service')]"
                );

            });


            const tests = [

                [
                    "Should display Translation Service heading",
                    "//h5[contains(.,'Translation Service')]"
                ],

                [
                    "Should display Original Language dropdown",
                    "//label[contains(.,'Original Language')]"
                ],

                [
                    "Should display Translated Language dropdown",
                    "//label[contains(.,'Translated Language')]"
                ],

                [
                    "Should display Add Documents upload section",
                    "//label[contains(.,'Add Documents')]"
                ],

                [
                    "Should display Add Cover Letter upload section",
                    "//label[contains(.,'Add Cover Letter')]"
                ],

                [
                    "Should display Add Shipping Label upload section",
                    "//label[contains(.,'Add Shipping Label')]"
                ],

                [
                    "Should display Additional Comments textbox",
                    "//label[contains(.,'Additional Comments')]"
                ],

                [
                    "Should display Checkout button",
                    "//button[normalize-space()='Checkout']"
                ],

                [
                    "Should display translation description",
                    "//*[contains(text(),'This service provides translation to and from English')]"
                ],

                [
                    "Should display Translation Service image",
                    "//img"
                ]

            ];


            for (
                const [name, xpath]
                of tests
            ) {

                it(
                    name,
                    async function () {

                        expect(
                            await driver
                                .findElement(
                                    By.xpath(xpath)
                                )
                                .isDisplayed()
                        ).to.equal(true);

                    }
                );

            }

        }
    );


    // =========================================================
    // 5. VISA SERVICE UI
    // =========================================================

    describe(
        "Visa Service UI",
        function () {

            before(async function () {

                await openService(
                    "/orders/new/visa-service",
                    "//h5[contains(.,'Visa Service')]"
                );

            });


            const tests = [

                [
                    "Should display Visa Service heading",
                    "//h5[contains(.,'Visa Service')]"
                ],

                [
                    "Should display Destination Country dropdown",
                    "//label[contains(.,'Destination Country')]"
                ],

                [
                    "Should display Type of Visa dropdown",
                    "//label[contains(.,'Type of Visa')]"
                ],

                [
                    "Should display Type of Passport dropdown",
                    "//label[contains(.,'Type of Passport')]"
                ],

                [
                    "Should display Origin Country of Passport dropdown",
                    "//label[contains(.,'Origin Country')]"
                ],

                [
                    "Should display Given Name field",
                    "//label[contains(.,'Given Name')]"
                ],

                [
                    "Should display Surname field",
                    "//label[contains(.,'Surname')]"
                ],

                [
                    "Should display Passport Number field",
                    "//label[contains(.,'Passport Number')]"
                ],

                [
                    "Should display Date of Issue field",
                    "//label[contains(.,'Date of Issue')]"
                ],

                [
                    "Should display Passport Validity field",
                    "//label[contains(.,'Passport Validity')]"
                ],

                [
                    "Should display Applicant State of Residence dropdown",
                    "//label[contains(.,'Applicant State')]"
                ],

                [
                    "Should display Number of Entry dropdown",
                    "//label[contains(.,'Number of Entry')]"
                ],

                [
                    "Should display Date of Departure field",
                    "//label[contains(.,'Date of Departure')]"
                ],

                [
                    "Should display Add Documents upload section",
                    "//label[contains(.,'Add Documents')]"
                ],

                [
                    "Should display Additional Comments textbox",
                    "//label[contains(.,'Additional Comments')]"
                ],

                [
                    "Should display Customer Reference field",
                    "//label[contains(.,'Customer Reference')]"
                ],

                [
                    "Should display Checkout button",
                    "//button[normalize-space()='Checkout']"
                ],

                [
                    "Should display Visa Service information card",
                    "(//h5[contains(.,'Visa Service')])[1]"
                ],

                [
                    "Should display Visa Service description",
                    "//*[contains(text(),'A properly issued business visa')]"
                ],

                [
                    "Should display Visa Service image",
                    "//img"
                ]

            ];


            for (
                const [name, xpath]
                of tests
            ) {

                it(
                    name,
                    async function () {

                        expect(
                            await driver
                                .findElement(
                                    By.xpath(xpath)
                                )
                                .isDisplayed()
                        ).to.equal(true);

                    }
                );

            }

        }
    );


    // =========================================================
    // 6. NOTARY SERVICE UI
    // =========================================================

    describe(
        "Notary Service UI",
        function () {

            before(async function () {

                await openService(
                    "/orders/new/notary-service",
                    "//h5[contains(.,'Notary Service')]"
                );

            });


            const tests = [

                [
                    "Should display Notary Service heading",
                    "//h5[contains(.,'Notary Service')]"
                ],

                [
                    "Should display Country dropdown",
                    "//label[contains(.,'Select or Type Country')]"
                ],

                [
                    "Should display Document dropdown",
                    "//label[contains(.,'Select or Type Document')]"
                ],

                [
                    "Should display Customer Reference field",
                    "//label[contains(.,'Customer Reference')]"
                ],

                [
                    "Should display Additional Services section",
                    "//*[contains(text(),'Additional Services')]"
                ],

                [
                    "Should display Pre-Scan checkbox",
                    "//*[contains(text(),'Pre-Scan')]"
                ],

                [
                    "Should display Post-Scan checkbox",
                    "//*[contains(text(),'Post-Scan')]"
                ],

                [
                    "Should display Rush checkbox",
                    "//*[contains(text(),'Rush')]"
                ],

                [
                    "Should display Upload Document section",
                    "//label[contains(.,'Upload Document')]"
                ],

                [
                    "Should display Choose File button",
                    "//button[contains(.,'Choose File')]"
                ],

                [
                    "Should display Process Attached Documents option",
                    "//*[contains(text(),'Process Attached Documents')]"
                ]

            ];


            for (
                const [name, xpath]
                of tests
            ) {

                it(
                    name,
                    async function () {

                        expect(
                            await driver
                                .findElement(
                                    By.xpath(xpath)
                                )
                                .isDisplayed()
                        ).to.equal(true);

                    }
                );

            }

        }
    );


    // =========================================================
    // 7. DISPATCH SERVICE UI
    // =========================================================

    describe(
        "Dispatch Service UI",
        function () {

            before(async function () {

                await openService(
                    "/orders/new/dispatch-service",
                    "//h6[contains(.,'Dispatch Service')]"
                );

            });


            const tests = [

                [
                    "Should display Dispatch Service heading",
                    "//h6[contains(.,'Dispatch Service')]"
                ],

                [
                    "Should display Select or Type Country dropdown",
                    "//label[contains(.,'Select or Type Country')]"
                ],

                [
                    "Should display Select or Type Document dropdown",
                    "//label[contains(.,'Select or Type Document')]"
                ],

                [
                    "Should display Customer Reference field",
                    "//label[contains(.,'Customer Reference')]"
                ],

                [
                    "Should display Additional Services section",
                    "//fieldset[.//span[contains(.,'Additional Services')]]"
                ],

                [
                    "Should display Pre-Scan option",
                    "//label[.//span[normalize-space()='Pre-Scan']]"
                ],

                [
                    "Should display Upload Document section",
                    "//label[contains(.,'Upload Document')]"
                ],

                [
                    "Should display Choose File button",
                    "//button[normalize-space()='Choose File']"
                ],

                [
                    "Should display allowed file types",
                    "//*[contains(normalize-space(.),'Allowed:') and contains(.,'PDF, DOC, DOCX')]"
                ],

                [
                    "Should display Process Attached Documents option",
                    "//label[.//span[contains(normalize-space(.),'Process Attached Documents')]]"
                ],

                [
                    "Should display Mail Original Documents to WCS office option",
                    "//label[.//span[contains(normalize-space(.),'Mail Original Documents to WCS office')]]"
                ],

                [
                    "Should display Additional Comments textbox",
                    "//label[contains(.,'Additional Comments')]"
                ],

                [
                    "Should display Add to Cart button",
                    "//button[normalize-space()='Add to Cart']"
                ],

                [
                    "Should display Checkout button",
                    "//button[normalize-space()='Checkout']"
                ],

                [
                    "Should display Dispatch Service description",
                    "//*[contains(.,'This service is for forwarding the document to the recipient')]"
                ],

                [
                    "Should display domestic or international forwarding information",
                    "//*[contains(.,'domestic or international')]"
                ],

                [
                    "Should display no other service information",
                    "//*[contains(.,'No other service will be performed')]"
                ],

                [
                    "Should display Dispatch Service image",
                    "//img"
                ]

            ];


            for (
                const [name, xpath]
                of tests
            ) {

                it(
                    name,
                    async function () {

                        expect(
                            await driver
                                .findElement(
                                    By.xpath(xpath)
                                )
                                .isDisplayed()
                        ).to.equal(true);

                    }
                );

            }


            it(
                "Should have Pre-Scan selected by default",
                async function () {

                    const preScan =
                        await driver.findElement(
                            By.xpath(
                                "//label[.//span[normalize-space()='Pre-Scan']]//input[@type='checkbox']"
                            )
                        );

                    expect(
                        await preScan.isSelected()
                    ).to.equal(true);

                }
            );


            it(
                "Should have file upload input",
                async function () {

                    const fileInput =
                        await driver.findElement(
                            By.css(
                                "input[type='file']"
                            )
                        );

                    expect(
                        await fileInput.isDisplayed()
                    ).to.equal(false);

                    expect(
                        await fileInput.isEnabled()
                    ).to.equal(true);

                }
            );

        }
    );


    // =========================================================
    // 8. MY ORDERS UI
    // =========================================================

    describe(
        "My Orders UI",
        function () {

            before(async function () {

                await myOrdersPage.open();

            });


            it(
                "should open My Orders page successfully",
                async function () {

                    expect(
                        await driver.getCurrentUrl()
                    ).to.include("/orders/all");

                    const text =
                        await myOrdersPage.getPageText();

                    expect(text)
                        .to.include(
                            "Search and Reports"
                        );

                    expect(text)
                        .to.include(
                            "My Orders"
                        );

                    expect(text)
                        .to.include(
                            "Search"
                        );

                    expect(text)
                        .to.include(
                            "Reset"
                        );

                }
            );


            it(
                "should display all available orders when Search is clicked without filters",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.search();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            // it(
            //     "should search successfully using valid Order Id",
            //     async function () {

            //         await myOrdersPage.reset();

            //         const orderId = "262133";

            //         await myOrdersPage.searchByOrderId(
            //             orderId
            //         );

            //         expect(
            //             await myOrdersPage.getPageText()
            //         ).to.include(
            //             orderId
            //         );

            //     }
            // );


            it(
                "should display no results for invalid Order Id",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.searchByOrderId(
                        "123456789"
                    );

                    expect(
                        await myOrdersPage.hasNoOrdersMessage()
                    ).to.equal(true);

                }
            );


            it(
                "should search using Document Id",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.searchByDocId(
                        "123456789"
                    );

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using Document Type",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.searchByDocumentType();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using Customer Reference",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.searchByCustomerReference(
                        "Automation"
                    );

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using PO number",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.searchByPO(
                        "PO-TEST-001"
                    );

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using Country",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.searchByCountry();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using Country Type",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.searchByCountryType();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using Order Status",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.searchByOrderStatus();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using From Date and To Date",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.searchByDateRange(
                        "08/01/2026",
                        "08/12/2026"
                    );

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using From Date only",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.enterDate(
                        "From Date",
                        "08/01/2026"
                    );

                    await myOrdersPage.search();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using To Date only",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.enterDate(
                        "To Date",
                        "08/12/2026"
                    );

                    await myOrdersPage.search();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using Order Id + Document Type",
                async function () {

                    await myOrdersPage.reset();

                    const orderId =
                        process.env.MY_ORDER_ID ||
                        "262133";

                    await myOrdersPage.enterText(
                        "Order Id",
                        orderId
                    );

                    await myOrdersPage.selectFirstOption(
                        "Select Doc Type"
                    );

                    await myOrdersPage.search();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using Order Id + Customer Reference",
                async function () {

                    await myOrdersPage.reset();

                    const orderId =
                        process.env.MY_ORDER_ID ||
                        "262133";

                    await myOrdersPage.enterText(
                        "Order Id",
                        orderId
                    );

                    await myOrdersPage.enterText(
                        "Customer Reference",
                        "Automation"
                    );

                    await myOrdersPage.search();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using Country + Order Status",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.selectFirstOption(
                        "Select or Type Country"
                    );

                    await myOrdersPage.selectFirstOption(
                        "Select Order Status"
                    );

                    await myOrdersPage.search();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should search using multiple filter combinations",
                async function () {

                    await myOrdersPage.reset();

                    const orderId =
                        process.env.MY_ORDER_ID ||
                        "262133";

                    await myOrdersPage.enterText(
                        "Order Id",
                        orderId
                    );

                    await myOrdersPage.enterDate(
                        "From Date",
                        "08/01/2026"
                    );

                    await myOrdersPage.enterDate(
                        "To Date",
                        "08/12/2026"
                    );

                    await myOrdersPage.search();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should return no results for conflicting filters",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.enterText(
                        "Order Id",
                        "262133"
                    );

                    await myOrdersPage.enterText(
                        "Customer Reference",
                        "NON_EXISTING_REFERENCE_999999"
                    );

                    await myOrdersPage.search();

                    expect(
                        await myOrdersPage.hasNoOrdersMessage()
                    ).to.equal(true);

                }
            );


            it(
                "should handle special characters in text fields",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.enterText(
                        "Customer Reference",
                        "@#$%^&*"
                    );

                    await myOrdersPage.search();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should handle empty search value",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.enterText(
                        "Order Id",
                        ""
                    );

                    await myOrdersPage.search();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should clear all filters when Reset is clicked",
                async function () {

                    await myOrdersPage.enterText(
                        "Order Id",
                        "262133"
                    );

                    await myOrdersPage.enterText(
                        "Customer Reference",
                        "Automation"
                    );

                    await myOrdersPage.reset();

                    const orderInput =
                        await myOrdersPage.getInputByLabel(
                            "Order Id"
                        );

                    const referenceInput =
                        await myOrdersPage.getInputByLabel(
                            "Customer Reference"
                        );

                    expect(
                        await orderInput.getAttribute(
                            "value"
                        )
                    ).to.equal("");

                    expect(
                        await referenceInput.getAttribute(
                            "value"
                        )
                    ).to.equal("");

                }
            );


            // it(
            //     "should click Export Report to Excel",
            //     async function () {

            //         await myOrdersPage.reset();

            //         await myOrdersPage.exportReport();

            //     }
            // );


            it(
                "should expand all orders",
                async function () {

                    await myOrdersPage.reset();

                    await myOrdersPage.expandAll();

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );


            it(
                "should allow repeated searches after Reset",
                async function () {

                    const orderId =
                        process.env.MY_ORDER_ID ||
                        "262133";

                    await myOrdersPage.reset();

                    await myOrdersPage.searchByOrderId(
                        orderId
                    );

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        orderId
                    );

                    await myOrdersPage.reset();

                    await myOrdersPage.searchByCustomerReference(
                        "Automation"
                    );

                    expect(
                        await myOrdersPage.getPageText()
                    ).to.include(
                        "My Orders"
                    );

                }
            );

        }
    );

    // =========================================================
// FAQ UI
// =========================================================

describe(
    "FAQ UI",
    function () {

        before(async function () {

            // Return to Dashboard first
            await driver.get(
                "https://wcscustomerportal.azurewebsites.net/"
            );

            await dashboard.waitForDashboard();

            // Open FAQ
            await faqPage.openFAQ();

            await driver.wait(
                until.urlContains("/faq"),
                30000
            );

            // Wait for FAQ search box
            await driver.wait(
                async () => {

                    try {

                        const input =
                            await faqPage.getSearchInput();

                        return await input.isDisplayed();

                    } catch (error) {

                        return false;

                    }

                },
                30000
            );

        });


        beforeEach(async function () {

            await driver.navigate().refresh();

            await driver.wait(
                until.urlContains("/faq"),
                30000
            );

            await driver.wait(
                async () => {

                    try {

                        const input =
                            await faqPage.getSearchInput();

                        return await input.isDisplayed();

                    } catch (error) {

                        return false;

                    }

                },
                30000
            );

            try {

                const input =
                    await faqPage.getSearchInput();

                const currentValue =
                    await input.getAttribute("value");

                if (
                    currentValue !== null &&
                    currentValue !== ""
                ) {

                    await faqPage.clearSearch();

                }

            } catch (error) {

                console.log(
                    "FAQ search reset warning:",
                    error.message
                );

            }

        });


        it(
            "should open FAQ page successfully",
            async function () {

                const url =
                    await driver.getCurrentUrl();

                expect(url)
                    .to.contain("/faq");

            }
        );


        it(
            "should display FAQ search bar",
            async function () {

                const input =
                    await faqPage.getSearchInput();

                expect(
                    await input.isDisplayed()
                ).to.equal(true);

            }
        );


        it(
            "should display correct search placeholder",
            async function () {

                const input =
                    await faqPage.getSearchInput();

                const placeholder =
                    await input.getAttribute(
                        "placeholder"
                    );

                expect(placeholder)
                    .to.equal(
                        "Search questions or keywords..."
                    );

            }
        );


        it(
            "should search FAQ using exact question",
            async function () {

                const question =
                    "How can I be a customer of WCS?";

                await faqPage.searchQuestion(
                    question
                );

                const exists =
                    await faqPage.questionExists(
                        question
                    );

                expect(exists)
                    .to.equal(true);

            }
        );


        it(
            "should search FAQ using partial question",
            async function () {

                await faqPage.searchQuestion(
                    "customer"
                );

                const questions =
                    await faqPage.getVisibleQuestions();

                expect(
                    questions.length
                ).to.be.greaterThan(0);

                const found =
                    questions.some(
                        question =>
                            question
                                .toLowerCase()
                                .includes("customer")
                    );

                expect(found)
                    .to.equal(true);

            }
        );


        it(
            "should search FAQ case-insensitively",
            async function () {

                await faqPage.searchQuestion(
                    "CUSTOMER"
                );

                const questions =
                    await faqPage.getVisibleQuestions();

                expect(
                    questions.length
                ).to.be.greaterThan(0);

            }
        );


        it(
            "should search FAQ using lowercase text",
            async function () {

                await faqPage.searchQuestion(
                    "customer"
                );

                const questions =
                    await faqPage.getVisibleQuestions();

                expect(
                    questions.length
                ).to.be.greaterThan(0);

            }
        );


        it(
            "should search FAQ using payment keyword",
            async function () {

                await faqPage.searchQuestion(
                    "payment"
                );

                const questions =
                    await faqPage.getVisibleQuestions();

                expect(
                    questions.length
                ).to.be.greaterThan(0);

            }
        );


        it(
            "should search FAQ using shipping keyword",
            async function () {

                await faqPage.searchQuestion(
                    "shipping"
                );

                const questions =
                    await faqPage.getVisibleQuestions();

                expect(
                    questions.length
                ).to.be.greaterThan(0);

            }
        );


        it(
            "should search FAQ using document keyword",
            async function () {

                await faqPage.searchQuestion(
                    "document"
                );

                const questions =
                    await faqPage.getVisibleQuestions();

                expect(
                    questions.length
                ).to.be.greaterThan(0);

            }
        );


        it(
            "should handle search with no matching result",
            async function () {

                await faqPage.searchQuestion(
                    "XYZ_NON_EXISTING_FAQ_123456"
                );

                const questions =
                    await faqPage.getVisibleQuestions();

                expect(
                    questions.length
                ).to.equal(0);

            }
        );


        it(
            "should handle numeric search input",
            async function () {

                await faqPage.searchQuestion(
                    "123456789"
                );

                const value =
                    await faqPage.getSearchValue();

                expect(value)
                    .to.equal("123456789");

            }
        );


        it(
            "should handle special characters in search",
            async function () {

                await faqPage.searchQuestion(
                    "@#$%^&*"
                );

                const value =
                    await faqPage.getSearchValue();

                expect(value)
                    .to.equal("@#$%^&*");

            }
        );


        it(
            "should handle search input containing spaces",
            async function () {

                await faqPage.searchQuestion(
                    "   customer   "
                );

                const value =
                    await faqPage.getSearchValue();

                expect(value)
                    .to.contain("customer");

            }
        );


        it(
            "should clear search and restore FAQ list",
            async function () {

                await faqPage.searchQuestion(
                    "payment"
                );

                const filteredCount =
                    await faqPage.getVisibleQuestionCount();

                expect(
                    filteredCount
                ).to.be.greaterThan(0);

                await faqPage.clearSearch();

                const allCount =
                    await faqPage.getVisibleQuestionCount();

                expect(
                    allCount
                ).to.be.greaterThanOrEqual(
                    filteredCount
                );

            }
        );


        it(
            "should expand FAQ question",
            async function () {

                await faqPage.clearSearch();

                const question =
                    "How can I be a customer of WCS?";

                await faqPage.expandQuestion(
                    question
                );

                const expanded =
                    await faqPage.isQuestionExpanded(
                        question
                    );

                expect(expanded)
                    .to.equal(true);

            }
        );


        it(
            "should collapse expanded FAQ question",
            async function () {

                const question =
                    "How can I be a customer of WCS?";

                await faqPage.expandQuestion(
                    question
                );

                await faqPage.collapseQuestion(
                    question
                );

                const expanded =
                    await faqPage.isQuestionExpanded(
                        question
                    );

                expect(expanded)
                    .to.equal(false);

            }
        );

    }
);

});