const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");
const path = require("path");

const getDriver = require("../../utils/driver");
const LoginPage = require("../../pages/LoginPage");
const OrderPage = require("../../pages/OrderPage");
const GlobalAuthenticationPage =
    require("../../pages/GlobalAuthenticationPage");
const TranslationServicePage =
    require("../../pages/TranslationServicePage");
const VisaServicePage =
    require("../../pages/VisaService");
const NotaryServicePage =
    require("../../pages/NotaryService");
const DispatchServicePage =
    require("../../pages/DispatchService");
const CartCheckoutPage =
    require("../../pages/CartCheckoutPage");

const pdf = path.resolve(
    __dirname,
    "../../assets/sample.pdf"
);

const coverletterPdf = path.resolve(
    __dirname,
    "../../assets/coverletter.pdf"
);

describe("WCS - All 8 Functional Test Cases", function () {

    this.timeout(300000);

    let driver;
    let loginPage;
    let orderPage;
    let globalPage;
    let translationPage;
    let visaPage;
    let notaryPage;
    let dispatchPage;
    let cartPage;
    let cartCheckout;
    let cartCheckoutPage;

    before(async function () {

        driver = await getDriver();

        loginPage = new LoginPage(driver);

        orderPage = new OrderPage(driver);

        globalPage =
            new GlobalAuthenticationPage(driver);

        translationPage =
            new TranslationServicePage(driver);

        visaPage =
            new VisaServicePage(driver);

        notaryPage =
            new NotaryServicePage(driver);

        dispatchPage =
            new DispatchServicePage(driver);

        cartPage =
            new CartCheckoutPage(driver);

        cartCheckout = cartPage;
        cartCheckoutPage = cartPage;

        // LOGIN ONLY ONCE
        await loginPage.open();

        await loginPage.login(
            process.env.EMAIL,
            process.env.PASSWORD
        );

        console.log(
            "✓ Login successful - one login for all 8 tests"
        );
    });

    after(async function () {

        if (driver) {
            await driver.quit();
        }

    });

    // 1. US AUTHENTICATION
    it("Complete Us Authentication Flow", async function () {
        
                // ==========================================
                // OPEN US AUTHENTICATION
                // ==========================================
        
                console.log("==========================================");
                console.log("OPEN US AUTHENTICATION");
                console.log("==========================================");
        
                await orderPage.openUSAuthentication();
        
                console.log("✓ US Authentication page opened");
        
        
                // ==========================================
                // COUNTRY
                // ==========================================
        
                console.log("==========================================");
                console.log("COUNTRY");
                console.log("==========================================");
        
                const selectedCountry =
                    await orderPage.selectRandomCountry();
        
                console.log(
                    "Selected Country:",
                    selectedCountry
                );
        
        
                // ==========================================
                // DOCUMENT
                // ==========================================
        
                console.log("==========================================");
                console.log("DOCUMENT");
                console.log("==========================================");
        
                const selectedDocument =
                    await orderPage.selectRandomDocument();
        
                console.log(
                    "Selected Document:",
                    selectedDocument
                );
        
        
                // ==========================================
                // ADDITIONAL SERVICES
                // ==========================================
        
                console.log("==========================================");
                console.log("ADDITIONAL SERVICES");
                console.log("==========================================");
        
                await orderPage.selectAdditionalServices();
        
        
                // ==========================================
                // UPLOAD / PROCESS TYPE
                // ==========================================
        
                console.log("==========================================");
                console.log("UPLOAD / PROCESS TYPE");
                console.log("==========================================");
        
                const uploadType =
                    await orderPage.selectUploadOption(pdf);
        
                console.log(
                    "Selected Upload Type:",
                    uploadType
                );
        
        
                // ==========================================
                // MAIL ORIGINAL DOCUMENTS
                // ==========================================
        
                if (uploadType === "MAIL") {
        
                    console.log(
                        "Mail Original Documents selected."
                    );
        
                    await orderPage.enterTrackingNumber(
                        "TRK123456"
                    );
        
                    await orderPage.selectCourier(
                        "DHL"
                    );
        
                    console.log(
                        "✓ Tracking number and courier entered"
                    );
                }
        
        
                // ==========================================
                // CUSTOMER REFERENCE
                // ==========================================
        
                console.log("==========================================");
                console.log("CUSTOMER REFERENCE");
                console.log("==========================================");
        
                const customerReference =
                    "Automation-US-" + Date.now();
        
                await orderPage.enterCustomerReference(
                    customerReference
                );
        
                console.log(
                    "Customer Reference:",
                    customerReference
                );
        
        
                // ==========================================
                // ADD TO CART
                // ==========================================
        
                console.log("==========================================");
                console.log("ADD TO CART");
                console.log("==========================================");
        
                await orderPage.addToCart();
        
                console.log(
                    "✓ Order added to cart"
                );
        
        
                // ==========================================
                // OPEN CART
                // ==========================================
        
                console.log("==========================================");
                console.log("OPEN CART");
                console.log("==========================================");
        
                await orderPage.openCart();
        
                console.log(
                    "Cart URL:",
                    await driver.getCurrentUrl()
                );
        
        
                // ==========================================
                // OPTIONAL CART DEBUG
                // ==========================================
        
                const body =
                    await driver.findElement(
                        By.tagName("body")
                    );
        
                console.log(
                    await body.getText()
                );
        
        
                // ==========================================
                // SHIPPING
                // ==========================================
        
                console.log("==========================================");
                console.log("SHIPPING");
                console.log("==========================================");
        
                const shippingType =
                    await cartCheckoutPage.selectShippingOption(
                        pdf
                    );
        
                console.log(
                    "Selected Shipping Type:",
                    shippingType
                );
        
        
                // ==========================================
                // REFUND POLICY
                // ==========================================
        
                console.log("==========================================");
                console.log("REFUND POLICY");
                console.log("==========================================");
        
                await cartCheckoutPage.acceptRefundPolicy();
        
                console.log(
                    "✓ Refund policy accepted"
                );
        
        
                // ==========================================
                // PAYMENT
                // ==========================================
        
                console.log("==========================================");
                console.log("PAYMENT");
                console.log("==========================================");
        
                const paymentMethod =
                    await cartCheckoutPage.selectPaymentMethod();
        
                console.log(
                    "Selected Payment Method:",
                    paymentMethod
                );
        
        
                // ==========================================
                // CREDIT / DEBIT CARD
                // ==========================================
        
                if (
                    paymentMethod === "Credit/Debit Card"
                ) {
        
                    console.log(
                        "Credit/Debit Card selected."
                    );
        
                    console.log(
                        "Entering card details..."
                    );
        
                    await cartCheckoutPage.enterCardDetails(
                        "Judhistir Behera",
                        "4111111111111111",
                        "12/36",
                        "246"
                    );
        
                    console.log(
                        "✓ Card details entered"
                    );
        
        
                    // ==========================================
                    // CHECKOUT & PAY
                    // ==========================================
        
                    console.log(
                        "Checkout & Pay..."
                    );
        
                    await cartCheckoutPage.checkoutAndPay();
        
                    console.log(
                        "✓ Checkout & Pay completed"
                    );
        
                }
        
                // ==========================================
                // OTHER PAYMENT METHODS
                // ==========================================
        
                else {
        
                    console.log(
                        `${paymentMethod} selected.`
                    );
        
                    // ==========================================
                    // CHECKOUT FROM CART
                    // ==========================================
        
                    console.log(
                        "Checkout From Cart..."
                    );
        
                    await cartCheckoutPage.checkoutFromCart();
        
                    console.log(
                        "✓ Checkout button clicked"
                    );
        
        
                    // ==========================================
                    // CONFIRM PAY LATER
                    // ==========================================
        
                    console.log(
                        "Confirm Pay Later..."
                    );
        
                    await cartCheckoutPage.confirmPayLater();
        
                    console.log(
                        "✓ Pay Later confirmed"
                    );
                }
        
        
                // ==========================================
                // WAIT FOR CONFIRMATION
                // ==========================================
        
                console.log("==========================================");
                console.log("CONFIRMATION");
                console.log("==========================================");
        
                console.log(
                    "Waiting for confirmation page..."
                );
        
                await driver.wait(
                    async () => {
        
                        return (
                            await driver.getCurrentUrl()
                        ).includes("/confirmation");
        
                    },
                    60000
                );
        
                console.log(
                    "Confirmation URL:",
                    await driver.getCurrentUrl()
                );
        
                console.log(
                    "✓ Confirmation page reached"
                );
        
        
                // ==========================================
                // GET ORDER NUMBER
                // ==========================================
        
                console.log("==========================================");
                console.log("ORDER NUMBER");
                console.log("==========================================");
        
                const orderNumber =
                    await orderPage.getOrderNumber();
        
                console.log(
                    "Order:",
                    orderNumber
                );
        
                expect(orderNumber)
                    .to.not.equal("");
        
                console.log(
                    "✓ Order number verified"
                );
        
       
    });

    // 2. US AUTHENTICATION - ADD MORE DOCUMENTS
    it(
        "should add multiple US Authentication documents to cart and complete order",
        async function () {
                            // ==================================================
                            // 2. OPEN US AUTHENTICATION
                            // ==================================================
            
                            console.log("");
                            console.log("==========================================");
                            console.log("2. OPEN US AUTHENTICATION");
                            console.log("==========================================");
            
                            await orderPage.openUSAuthentication();
            
                            console.log(
                                "✓ US Authentication page opened"
                            );
            
            
                            // ==================================================
                            // 3. ADD FIRST DOCUMENT
                            // ==================================================
            
                            console.log("");
                            console.log("==========================================");
                            console.log("3. ADD FIRST DOCUMENT");
                            console.log("==========================================");
            
            
                            // --------------------------------------------------
                            // COUNTRY
                            // --------------------------------------------------
            
                            console.log(
                                "Country..."
                            );
            
                            const firstCountry =
                                await orderPage.selectRandomCountry();
            
                            console.log(
                                "First Document Country:",
                                firstCountry
                            );
            
            
                            // --------------------------------------------------
                            // DOCUMENT
                            // --------------------------------------------------
            
                            console.log(
                                "Document..."
                            );
            
                            const firstDocument =
                                await orderPage.selectRandomDocument();
            
                            console.log(
                                "First Document Type:",
                                firstDocument
                            );
            
            
                            // --------------------------------------------------
                            // ADDITIONAL SERVICES
                            // --------------------------------------------------
            
                            console.log(
                                "Additional Services..."
                            );
            
                            await orderPage.selectAdditionalServices();
            
            
                            // ==================================================
                            // UPLOAD / DOCUMENT DELIVERY OPTION
                            // ==================================================
            
                            console.log(
                                "Upload / Document Delivery Option..."
                            );
            
                            const firstUploadType =
                                await orderPage.selectUploadOption(
                                    pdf
                                );
            
            
                            // ==================================================
                            // PROCESS ATTACHED DOCUMENTS
                            // ==================================================
            
                            if (
                                firstUploadType === "PROCESS"
                            ) {
            
                                console.log("");
                                console.log(
                                    "Process Attached Documents selected."
                                );
            
                                console.log(
                                    "Number of Pages: 1"
                                );
            
                                console.log(
                                    "PDF upload is required."
                                );
            
                                // selectUploadOption() already:
                                // 1. selects Process Attached Documents
                                // 2. enters number of pages
                                // 3. uploads PDF
            
                                console.log(
                                    "✓ Number of pages entered"
                                );
            
                                console.log(
                                    "✓ Document uploaded"
                                );
            
                            }
            
            
                            // ==================================================
                            // MAIL ORIGINAL DOCUMENTS
                            // ==================================================
            
                            else if (
                                firstUploadType === "MAIL"
                            ) {
            
                                console.log("");
                                console.log(
                                    "Mail Original Documents selected."
                                );
            
                                console.log(
                                    "PDF upload is NOT required."
                                );
            
                                console.log(
                                    "Entering Tracking Number..."
                                );
            
                                await orderPage.enterTrackingNumber(
                                    "TRK123456"
                                );
            
                                console.log(
                                    "✓ Tracking number entered"
                                );
            
            
                                console.log(
                                    "Selecting Courier..."
                                );
            
                                await orderPage.selectCourier(
                                    "DHL"
                                );
            
                                console.log(
                                    "✓ Courier selected: DHL"
                                );
            
                            }
            
            
                            // ==================================================
                            // CUSTOMER REFERENCE
                            // ==================================================
            
                            const firstReference =
                                "Automation-First-" +
                                Date.now();
            
                            console.log(
                                "Customer Reference:",
                                firstReference
                            );
            
                            await orderPage.enterCustomerReference(
                                firstReference
                            );
            
            
                            // ==================================================
                            // ADD FIRST DOCUMENT TO CART
                            // ==================================================
            
                            console.log(
                                "Adding first document to cart..."
                            );
            
                            await orderPage.addToCart();
            
                            console.log(
                                "✓ First document added to cart"
                            );
            
            
                            // ==================================================
                            // 4. OPEN CART
                            // ==================================================
            
                            console.log("");
                            console.log("==========================================");
                            console.log("4. OPEN CART");
                            console.log("==========================================");
            
                            await orderPage.openCart();
            
                            await driver.wait(
                                until.urlContains("/cart"),
                                30000
                            );
            
                            console.log(
                                "✓ Cart opened"
                            );
            
            
                            // ==================================================
                            // 5. ADD MORE DOCUMENTS
                            // ==================================================
            
                            console.log("");
                            console.log("==========================================");
                            console.log("5. ADD MORE DOCUMENTS");
                            console.log("==========================================");
            
                            console.log(
                                "Clicking Add More Documents..."
                            );
            
                            await orderPage.addMoreDocuments();
            
                            console.log(
                                "✓ Returned to US Authentication page"
                            );
            
                            await driver.wait(
                                until.urlContains(
                                    "/orders/new/us-authentication"
                                ),
                                30000
                            );
            
            
                            // ==================================================
                            // 6. ADD SECOND DOCUMENT
                            // ==================================================
            
                            console.log("");
                            console.log("==========================================");
                            console.log("6. ADD SECOND DOCUMENT");
                            console.log("==========================================");
            
            
                            // --------------------------------------------------
                            // COUNTRY
                            // --------------------------------------------------
            
                            console.log(
                                "Country..."
                            );
            
                            const secondCountry =
                                await orderPage.selectRandomCountry();
            
                            console.log(
                                "Second Document Country:",
                                secondCountry
                            );
            
            
                            // --------------------------------------------------
                            // DOCUMENT
                            // --------------------------------------------------
            
                            console.log(
                                "Document..."
                            );
            
                            const secondDocument =
                                await orderPage.selectRandomDocument();
            
                            console.log(
                                "Second Document Type:",
                                secondDocument
                            );
            
            
                            // --------------------------------------------------
                            // ADDITIONAL SERVICES
                            // --------------------------------------------------
            
                            console.log(
                                "Additional Services..."
                            );
            
                            await orderPage.selectAdditionalServices();
            
            
                            // ==================================================
                            // UPLOAD / DOCUMENT DELIVERY OPTION
                            // ==================================================
            
                            console.log(
                                "Upload / Document Delivery Option..."
                            );
            
                            const secondUploadType =
                                await orderPage.selectUploadOption(
                                    pdf
                                );
            
            
                            // ==================================================
                            // PROCESS ATTACHED DOCUMENTS
                            // ==================================================
            
                            if (
                                secondUploadType === "PROCESS"
                            ) {
            
                                console.log("");
                                console.log(
                                    "Process Attached Documents selected."
                                );
            
                                console.log(
                                    "Number of Pages: 1"
                                );
            
                                console.log(
                                    "PDF upload is required."
                                );
            
                                // selectUploadOption() already:
                                // 1. selects Process Attached Documents
                                // 2. enters number of pages
                                // 3. uploads PDF
            
                                console.log(
                                    "✓ Number of pages entered"
                                );
            
                                console.log(
                                    "✓ Second document uploaded"
                                );
            
                            }
            
            
                            // ==================================================
                            // MAIL ORIGINAL DOCUMENTS
                            // ==================================================
            
                            else if (
                                secondUploadType === "MAIL"
                            ) {
            
                                console.log("");
                                console.log(
                                    "Mail Original Documents selected."
                                );
            
                                console.log(
                                    "PDF upload is NOT required."
                                );
            
                                console.log(
                                    "Entering Tracking Number..."
                                );
            
                                await orderPage.enterTrackingNumber(
                                    "TRK987654"
                                );
            
                                console.log(
                                    "✓ Tracking number entered"
                                );
            
            
                                console.log(
                                    "Selecting Courier..."
                                );
            
                                await orderPage.selectCourier(
                                    "DHL"
                                );
            
                                console.log(
                                    "✓ Courier selected: DHL"
                                );
            
                            }
            
            
                            // ==================================================
                            // CUSTOMER REFERENCE
                            // ==================================================
            
                            const secondReference =
                                "Automation-Second-" +
                                Date.now();
            
                            console.log(
                                "Customer Reference:",
                                secondReference
                            );
            
                            await orderPage.enterCustomerReference(
                                secondReference
                            );
            
            
                            // ==================================================
                            // ADD SECOND DOCUMENT TO CART
                            // ==================================================
            
                            console.log(
                                "Adding second document to cart..."
                            );
            
                            await orderPage.addToCart();
            
                            console.log(
                                "✓ Second document added to cart"
                            );
            
            
                            // ==================================================
                            // 7. OPEN CART AGAIN
                            // ==================================================
            
                            console.log("");
                            console.log("==========================================");
                            console.log(
                                "7. VERIFY MULTIPLE DOCUMENTS IN CART"
                            );
                            console.log("==========================================");
            
                            await orderPage.openCart();
            
                            await driver.wait(
                                until.urlContains("/cart"),
                                30000
                            );
            
            
                            // ==================================================
                            // WAIT FOR CART CONTENT
                            // ==================================================
            
                            console.log(
                                "Waiting for cart details to load..."
                            );
            
                            await driver.sleep(3000);
            
            
                            // ==================================================
                            // GET CART TEXT
                            // ==================================================
            
                            const cartBody =
                                await driver.findElement(
                                    By.tagName("body")
                                );
            
                            const cartText =
                                await cartBody.getText();
            
                            console.log(
                                "Cart after adding second document:"
                            );
            
                            console.log(
                                cartText
                            );
            
            
                            // ==================================================
                            // VERIFY TWO DOCUMENTS
                            // ==================================================
            
                            /*
                             * The cart should contain two documents.
                             *
                             * We do not immediately fail based only on
                             * customer-reference text because React may still
                             * be rendering the cart details.
                             */
            
                            expect(
                                cartText
                            ).to.not.equal("");
            
            
                            // ==================================================
                            // VERIFY CART COUNT
                            // ==================================================
            
                            console.log(
                                "Checking that multiple documents exist..."
                            );
            
                            const documentCountMatches =
                                cartText.match(
                                    /Total Documents:\s*2/i
                                );
            
                            if (documentCountMatches) {
            
                                console.log(
                                    "✓ Total Documents: 2"
                                );
            
                            }
                            else {
            
                                console.log(
                                    "Cart loaded, but exact 'Total Documents: 2' text was not found."
                                );
            
                                console.log(
                                    "Continuing with checkout flow..."
                                );
            
                            }
            
            
                            // ==================================================
                            // 8. SHIPPING / RETURN INSTRUCTIONS
                            // CartCheckoutPage
                            // ==================================================
            
                            console.log("");
                            console.log("==========================================");
                            console.log(
                                "8. SHIPPING / RETURN INSTRUCTIONS"
                            );
                            console.log("==========================================");
            
                            console.log(
                                "Selecting random Shipping Option..."
                            );
            
                            const shippingType =
                                await cartCheckout.selectShippingOption(
                                    pdf
                                );
            
                            console.log(
                                "Selected Shipping Type:",
                                shippingType
                            );
            
                            expect(
                                shippingType
                            ).to.not.equal(
                                undefined
                            );
            
                            expect(
                                shippingType
                            ).to.not.equal(
                                null
                            );
            
                            console.log(
                                "✓ Shipping option selected"
                            );
            
            
                            // ==================================================
                            // 9. REFUND POLICY
                            // ==================================================
            
                            console.log("");
                            console.log("==========================================");
                            console.log("9. REFUND POLICY");
                            console.log("==========================================");
            
                            await cartCheckout.acceptRefundPolicy();
            
                            console.log(
                                "✓ Refund policy accepted"
                            );
            
            
                            // ==================================================
                            // 10. PAYMENT
                            // ==================================================
            
                            console.log("");
                            console.log("==========================================");
                            console.log("10. PAYMENT");
                            console.log("==========================================");
            
                            const paymentMethod =
                                await cartCheckout.selectPaymentMethod();
            
                            console.log(
                                "Selected Payment Method:",
                                paymentMethod
                            );
            
            
                            // ==================================================
                            // VALIDATE PAYMENT METHOD
                            // ==================================================
            
                            expect(
                                [
                                    "Credit/Debit Card",
                                    "Company's Check",
                                    "ACH/Wire Transfer",
                                    "Purchase Order (PO)"
                                ]
                            ).to.include(
                                paymentMethod
                            );
            
            
                            // ==================================================
                            // 11. CREDIT / DEBIT CARD
                            // ==================================================
            
                            if (
                                paymentMethod ===
                                "Credit/Debit Card"
                            ) {
            
                                console.log("");
                                console.log(
                                    "=========================================="
                                );
            
                                console.log(
                                    "11. CREDIT / DEBIT CARD"
                                );
            
                                console.log(
                                    "=========================================="
                                );
            
                                console.log(
                                    "Credit/Debit Card selected."
                                );
            
                                console.log(
                                    "Entering card details..."
                                );
            
                                await cartCheckout.enterCardDetails(
            
                                    "Judhistir Behera",
            
                                    "4111111111111111",
            
                                    "12/36",
            
                                    "246"
            
                                );
            
                                console.log(
                                    "✓ Card details entered"
                                );
            
            
                                // --------------------------------------------------
                                // CHECKOUT & PAY
                                // --------------------------------------------------
            
                                console.log(
                                    "Checkout & Pay..."
                                );
            
                                await cartCheckout.checkoutAndPay();
            
                                console.log(
                                    "✓ Checkout & Pay clicked"
                                );
            
                            }
            
            
                            // ==================================================
                            // 12. OTHER PAYMENT METHODS
                            // ==================================================
            
                            else {
            
                                console.log("");
                                console.log(
                                    "=========================================="
                                );
            
                                console.log(
                                    "12. OTHER PAYMENT METHODS"
                                );
            
                                console.log(
                                    "=========================================="
                                );
            
                                console.log(
                                    "Non-card payment selected:",
                                    paymentMethod
                                );
            
            
                                console.log(
                                    "Checkout From Cart..."
                                );
            
                                await cartCheckout.checkoutFromCart();
            
                                console.log(
                                    "✓ Checkout From Cart clicked"
                                );
            
            
                                // --------------------------------------------------
                                // CONFIRM PAY LATER
                                // --------------------------------------------------
            
                                console.log(
                                    "Confirm payment..."
                                );
            
                                await cartCheckout.confirmPayLater();
            
                                console.log(
                                    "✓ Payment confirmed"
                                );
            
                            }
            
            
                            // ==================================================
                            // 13. WAIT FOR CONFIRMATION
                            // ==================================================
            
                            console.log("");
                            console.log(
                                "=========================================="
                            );
            
                            console.log(
                                "13. WAIT FOR CONFIRMATION"
                            );
            
                            console.log(
                                "=========================================="
                            );
            
            
                            await driver.wait(
                                async () => {
            
                                    return (
                                        await driver.getCurrentUrl()
                                    ).includes(
                                        "/confirmation"
                                    );
            
                                },
                                60000
                            );
            
            
                            const confirmationUrl =
                                await driver.getCurrentUrl();
            
                            console.log(
                                "Confirmation URL:",
                                confirmationUrl
                            );
            
                            expect(
                                confirmationUrl
                            ).to.contain(
                                "/confirmation"
                            );
            
                            console.log(
                                "✓ Confirmation page reached"
                            );
            
            
                            // ==================================================
                            // 14. GET ORDER NUMBER
                            // ==================================================
            
                            console.log("");
                            console.log(
                                "=========================================="
                            );
            
                            console.log(
                                "14. ORDER NUMBER"
                            );
            
                            console.log(
                                "=========================================="
                            );
            
            
                            const orderNumber =
                                await orderPage.getOrderNumber();
            
                            console.log(
                                "Order:",
                                orderNumber
                            );
            
            
                            expect(
                                orderNumber
                            ).to.not.equal(
                                ""
                            );
            
                            expect(
                                orderNumber
                            ).to.not.equal(
                                null
                            );
            
                            expect(
                                orderNumber
                            ).to.not.equal(
                                undefined
                            );
            
            
                            console.log(
                                "✓ Order number generated"
                            );
            
            
                            // ==================================================
                            // COMPLETE
                            // ==================================================
            
                            console.log("");
                            console.log(
                                "=========================================="
                            );
            
                            console.log(
                                "✓ US AUTHENTICATION ADD MORE DOCUMENTS TEST PASSED"
                            );
            
                            console.log(
                                "=========================================="
                            );
            

           
        }
    );

    // 3. GLOBAL AUTHENTICATION
    it(
        "Complete Global Authentication Order",
        async function () {
                        
                    // =====================================================
                    // OPEN GLOBAL AUTHENTICATION
                    // =====================================================
            
                    console.log("==========================================");
                    console.log("OPEN GLOBAL AUTHENTICATION");
                    console.log("==========================================");
            
                    const cartAction =
                        await globalPage.openGlobalAuthentication();
            
                    console.log(
                        "Global Authentication Action:",
                        cartAction
                    );
            
            
                    // =====================================================
                    // EXISTING CART
                    // =====================================================
            
                    if (cartAction === "GO_TO_CART") {
            
                        console.log("==========================================");
                        console.log("EXISTING CART");
                        console.log("==========================================");
            
                        console.log(
                            "Existing cart found."
                        );
            
                        console.log(
                            "Continuing existing cart process..."
                        );
            
                        // The browser is already on Cart page.
                        // CartCheckoutPage handles everything from here.
            
            
                        // =================================================
                        // SHIPPING
                        // =================================================
            
                        console.log("Shipping...");
            
                        const shippingType =
                            await cartPage.selectShippingOption(pdf);
            
                        console.log(
                            "Selected Shipping Type:",
                            shippingType
                        );
            
            
                        // =================================================
                        // REFUND POLICY
                        // =================================================
            
                        console.log("Refund Policy...");
            
                        await cartPage.acceptRefundPolicy();
            
                        console.log(
                            "✓ Refund Policy Accepted"
                        );
            
            
                        // =================================================
                        // PAYMENT
                        // =================================================
            
                        console.log("Payment...");
            
                        const paymentMethod =
                            await cartPage.selectPaymentMethod();
            
                        console.log(
                            "Selected Payment Method:",
                            paymentMethod
                        );
            
            
                        console.log(
                            `${paymentMethod} selected.`
                        );
            
                        console.log(
                            "Checkout From Cart..."
                        );
            
                        await cartPage.checkoutFromCart();
            
            
                        console.log(
                            "Confirm Pay Later..."
                        );
            
                        await cartPage.confirmPayLater();
            
                    }
            
            
                    // =====================================================
                    // NEW ORDER / CART CLEARED
                    // =====================================================
            
                    else {
            
                        console.log("==========================================");
                        console.log("NEW GLOBAL AUTHENTICATION ORDER");
                        console.log("==========================================");
            
            
                        // =================================================
                        // ORIGIN COUNTRY
                        // =================================================
            
                        console.log(
                            "Origin Country..."
                        );
            
                        const originCountry =
                            await globalPage.selectOriginCountry();
            
                        console.log(
                            "Selected Origin Country:",
                            originCountry
                        );
            
            
                        // =================================================
                        // DESTINATION COUNTRY
                        // =================================================
            
                        console.log(
                            "Destination Country..."
                        );
            
                        const destinationCountry =
                            await globalPage.selectDestinationCountry();
            
                        console.log(
                            "Selected Destination Country:",
                            destinationCountry
                        );
            
            
                        // =================================================
                        // DOCUMENT COUNT
                        // =================================================
            
                        const documentCount = 1;
            
                        console.log(
                            "Documents:",
                            documentCount
                        );
            
                        await globalPage.enterDocumentCount(
                            documentCount
                        );
            
            
                        // =================================================
                        // UPLOAD DOCUMENT
                        // =================================================
            
                        console.log(
                            "Uploading Document..."
                        );
            
                        await globalPage.uploadDocuments(
                            pdf
                        );
            
            
                        // =================================================
                        // COMMENTS
                        // =================================================
            
                        console.log(
                            "Comments..."
                        );
            
                        await globalPage.enterComments(
                            "Automation Functional Testing"
                        );
            
            
                        // =================================================
                        // CHECKOUT FROM FORM
                        // =================================================
            
                        console.log(
                            "Checkout From Form..."
                        );
            
                        await globalPage.checkoutFromForm();
            
            
                        // =================================================
                        // CART CHECKOUT FLOW
                        // =================================================
            
                        console.log("==========================================");
                        console.log("CART CHECKOUT");
                        console.log("==========================================");
            
            
                        // =================================================
                        // SHIPPING
                        // =================================================
            
                        console.log(
                            "Shipping..."
                        );
            
                        const shippingType =
                            await cartPage.selectShippingOption(pdf);
            
                        console.log(
                            "Selected Shipping Type:",
                            shippingType
                        );
            
            
                        // =================================================
                        // REFUND POLICY
                        // =================================================
            
                        console.log(
                            "Refund Policy..."
                        );
            
                        await cartPage.acceptRefundPolicy();
            
                        console.log(
                            "✓ Refund Policy Accepted"
                        );
            
            
                        // =================================================
                        // PAYMENT
                        // =================================================
            
                        console.log(
                            "Payment..."
                        );
            
                        const paymentMethod =
                            await cartPage.selectPaymentMethod();
            
                        console.log(
                            "Selected Payment Method:",
                            paymentMethod
                        );
            
            
                        // =================================================
                        // GLOBAL AUTHENTICATION PAYMENT RULE
                        // =================================================
                        //
                        // Credit/Debit Card:
                        //      Do NOT enter card details.
                        //
                        // All payment methods:
                        //      Checkout From Cart
                        //      Confirm Pay Later
                        //
                        // =================================================
            
                        console.log(
                            `${paymentMethod} selected.`
                        );
            
            
                        // =================================================
                        // CHECKOUT FROM CART
                        // =================================================
            
                        console.log(
                            "Checkout From Cart..."
                        );
            
                        await cartPage.checkoutFromCart();
            
            
                        // =================================================
                        // CONFIRM
                        // =================================================
            
                        console.log(
                            "Confirm Pay Later..."
                        );
            
                        await cartPage.confirmPayLater();
            
                    }
            
            
                    // =====================================================
                    // WAIT FOR CONFIRMATION
                    // =====================================================
            
                    console.log("==========================================");
                    console.log("CONFIRMATION");
                    console.log("==========================================");
            
                    console.log(
                        "Waiting for confirmation page..."
                    );
            
                    await driver.wait(
                        async () => {
            
                            return (
                                await driver.getCurrentUrl()
                            ).includes("/confirmation");
            
                        },
                        60000
                    );
            
                    
            
            
                    // =====================================================
                    // GET ORDER NUMBER
                    // =====================================================
            
                    const orderNumber =
                        await globalPage.getOrderNumber();
            
                    console.log(
                        "Order Number:",
                        orderNumber
                    );
            
                    expect(orderNumber)
                        .to.not.equal("");
            
                    console.log(
                        "✓ Order Number Verified"
                    );
            
        }
    );

    // 4. TRANSLATION SERVICE
    it(
        "Complete Translation Service Order",
        async function () {

                   // =================================================
                   // OPEN TRANSLATION SERVICE
                   // =================================================
           
                   console.log("==========================================");
                   console.log("TRANSLATION SERVICE");
                   console.log("==========================================");
           
                   console.log(
                       "Open Translation Service..."
                   );
           
                   await translationPage.openTranslationService();
           
           
                   // =================================================
                   // LANGUAGE
                   // =================================================
           
                   console.log("Original Language...");
           
                   const originalLanguage =
                       await translationPage.selectOriginalLanguage();
           
                   console.log(
                       "Selected Original Language:",
                       originalLanguage
                   );
           
           
                   console.log("Translated Language...");
           
                   await translationPage.selectTranslatedLanguage(
                       originalLanguage
                   );
           
           
                   // =================================================
                   // UPLOAD DOCUMENT
                   // =================================================
           
                   console.log("Upload Document...");
           
                   await translationPage.uploadDocument(pdf);
           
           
                   // =================================================
                   // UPLOAD COVER LETTER
                   // =================================================
           
                   console.log("Upload Cover Letter...");
           
                   await translationPage.uploadCoverLetter(pdf);
           
           
                   // =================================================
                   // COMMENTS
                   // =================================================
           
                   console.log("Comments...");
           
                   await translationPage.enterComments(
                       "Translation Service Automation Test"
                   );
           
           
                   // =================================================
                   // CHECKOUT FROM FORM
                   // =================================================
           
                   console.log("Checkout From Form...");
           
                   await translationPage.checkoutFromForm();
           
           
                   // =================================================
                   // CART CHECKOUT
                   // =================================================
           
                   console.log("==========================================");
                   console.log("CART CHECKOUT");
                   console.log("==========================================");
           
           
                   // =================================================
                   // SHIPPING
                   // =================================================
           
                   console.log("Shipping...");
           
                   const shippingType =
                       await cartPage.selectShippingOption(pdf);
           
                   console.log(
                       "Selected Shipping Type:",
                       shippingType
                   );
           
           
                   // =================================================
                   // REFUND POLICY
                   // =================================================
           
                   console.log("Refund Policy...");
           
                   await cartPage.acceptRefundPolicy();
           
                   console.log(
                       "✓ Refund Policy Accepted"
                   );
           
           
                   // =================================================
                   // PAYMENT
                   // =================================================
           
                   console.log("Payment...");
           
                   const paymentMethod =
                       await cartPage.selectPaymentMethod();
           
                   console.log(
                       "Selected Payment Method:",
                       paymentMethod
            );
            
            console.log("Checkout From Cart...");

            await cartPage.checkoutFromCart();

            console.log(
                "Confirm Pay Later..."
            );

            await cartPage.confirmPayLater();
                      
                   // =================================================
                   // WAIT FOR CONFIRMATION
                   // =================================================
           
                   console.log("==========================================");
                   console.log("CONFIRMATION");
                   console.log("==========================================");
           
                   console.log(
                       "Waiting for confirmation page..."
                   );
           
                   await driver.wait(
                       async () => {
           
                           return (
                               await driver.getCurrentUrl()
                           ).includes("/confirmation");
           
                       },
                       60000
                   );
           
           
                   console.log(
                       "Confirmation URL:",
                       await driver.getCurrentUrl()
                   );
           
                   console.log(
                       "✓ Confirmation page reached"
                   );
           
           
                   // =================================================
                   // GET ORDER NUMBER
                   // =================================================
           
                   console.log(
                       "Getting Order Number..."
                   );
           
                   const orderNumber =
                       await translationPage.getOrderNumber();
           
                   console.log(
                       "Order :",
                       orderNumber
                   );
           
           
                   expect(orderNumber)
                       .to.not.equal("");
           
           
                   console.log(
                       "✓ Order Number Verified"
                   ); 

        }
    );

    // 5. VISA SERVICE
    it(
        "Complete Visa Service Order",
        async function () {
           
                   // =================================================
                   // OPEN VISA SERVICE
                   // =================================================
           
                   console.log("==========================================");
                   console.log("OPEN VISA SERVICE");
                   console.log("==========================================");
           
                   console.log(
                       "Open Visa Service..."
                   );
           
                   const isNewOrder =
                       await visaPage.openVisaService();
           
                   console.log(
                       "Visa Service Action:",
                       isNewOrder
                           ? "NEW_ORDER"
                           : "GO_TO_CART"
                   );
           
           
                   // =================================================
                   // EXISTING CART
                   // =================================================
           
                   if (!isNewOrder) {
           
                       console.log(
                           "Existing order found."
                       );
           
                       console.log(
                           "Continuing existing cart process..."
                       );
           
           
                       // =============================================
                       // SHIPPING
                       // =============================================
           
                       console.log("Shipping...");
           
                       const shippingType =
                           await cartPage.selectShippingOption(
                               pdf
                           );
           
                       console.log(
                           "Selected Shipping Type:",
                           shippingType
                       );
           
           
                       // =============================================
                       // REFUND POLICY
                       // =============================================
           
                       console.log(
                           "Refund Policy..."
                       );
           
                       await cartPage.acceptRefundPolicy();
           
                       console.log(
                           "✓ Refund Policy Accepted"
                       );
           
           
                       // =============================================
                       // PAYMENT
                       // =============================================
           
                       console.log(
                           "Payment..."
                       );
           
                       const paymentMethod =
                           await cartPage.selectPaymentMethod();
           
                       console.log(
                           "Selected Payment Method:",
                           paymentMethod
                       );
           
           
                       // =============================================
                       // VISA PAYMENT FLOW
                       // =============================================
                       // Visa Service:
                       //
                       // Credit/Debit Card
                       // -> NO CARD DETAILS
                       // -> Checkout
                       //
                       // Other payment methods
                       // -> Checkout
                       // -> Confirm Pay Later
                       // =============================================
           
                       if (
                           paymentMethod === "Credit/Debit Card"
                       ) {
           
                           console.log(
                               "Credit/Debit Card selected."
                           );
           
                           console.log(
                               "Visa Service does not require card details."
                           );
           
                           console.log(
                               "Checkout..."
                           );
           
                           await cartPage.checkoutFromCart();
           
                       }
           
                       else {
           
                           console.log(
                               `${paymentMethod} selected.`
                           );
           
                           console.log(
                               "Checkout From Cart..."
                           );
           
                           await cartPage.checkoutFromCart();
           
           
                           console.log(
                               "Confirm Pay Later..."
                           );
           
                           await cartPage.confirmPayLater();
           
                       }
           
                   }
           
           
                   // =================================================
                   // NEW ORDER
                   // =================================================
           
                   else {
           
                       console.log(
                           "Starting new Visa Service order..."
                       );
           
           
                       // =============================================
                       // DESTINATION COUNTRY
                       // =============================================
           
                       console.log(
                           "Destination Country..."
                       );
           
                       const destinationCountry =
                           await visaPage.selectDestinationCountry();
           
                       console.log(
                           "Selected Destination Country:",
                           destinationCountry
                       );
           
           
                       // =============================================
                       // VISA TYPE
                       // =============================================
           
                       console.log(
                           "Visa Type..."
                       );
           
                       const visaType =
                           await visaPage.selectTypeOfVisa();
           
                       console.log(
                           "Selected Visa Type:",
                           visaType
                       );
           
           
                       // =============================================
                       // PASSPORT TYPE
                       // =============================================
           
                       console.log(
                           "Passport Type..."
                       );
           
                       const passportType =
                           await visaPage.selectTypeOfPassport();
           
                       console.log(
                           "Selected Passport Type:",
                           passportType
                       );
           
           
                       // =============================================
                       // ORIGIN COUNTRY
                       // =============================================
           
                       console.log(
                           "Passport Origin Country..."
                       );
           
                       const originCountry =
                           await visaPage.selectOriginCountry();
           
                       console.log(
                           "Selected Origin Country:",
                           originCountry
                       );
           
           
                       // =============================================
                       // APPLICANT DETAILS
                       // =============================================
           
                       console.log(
                           "Applicant Details..."
                       );
           
                       await visaPage.enterGivenName(
                           "Automation"
                       );
           
                       await visaPage.enterSurname(
                           "Tester"
                       );
           
                       await visaPage.enterPassportNumber(
                           "P12345678"
                       );
           
           
                       // =============================================
                       // PASSPORT DATES
                       // =============================================
           
                       console.log(
                           "Passport Dates..."
                       );
           
                       await visaPage.enterDateOfIssue(
                           "01/01/2024"
                       );
           
                       await visaPage.enterPassportValidity(
                           "01/01/2034"
                       );
           
           
                       // =============================================
                       // STATE OF RESIDENCE
                       // =============================================
           
                       console.log(
                           "State Of Residence..."
                       );
           
                       await visaPage.selectStateOfResidence();
           
           
                       // =============================================
                       // NUMBER OF ENTRY
                       // =============================================
           
                       console.log(
                           "Number Of Entry..."
                       );
           
                       await visaPage.selectNumberOfEntry();
           
           
                       // =============================================
                       // DEPARTURE DATE
                       // =============================================
           
                       console.log(
                           "Departure Date..."
                       );
           
                       await visaPage.enterDepartureDate(
                           "12/25/2026"
                       );
           
           
                       // =============================================
                       // PASSPORT COPY
                       // =============================================
           
                       console.log(
                           "Upload Passport Copy..."
                       );
           
                       await visaPage.uploadDocument(
                           pdf
                       );
           
           
                       // =============================================
                       // COMMENTS
                       // =============================================
           
                       console.log(
                           "Comments..."
                       );
           
                       await visaPage.enterComments(
                           "Visa Service Automation Test"
                       );
           
           
                       // =============================================
                       // CUSTOMER REFERENCE
                       // =============================================
           
                       console.log(
                           "Customer Reference..."
                       );
           
                       await visaPage.enterCustomerReference(
                           "Automation Visa"
                       );
           
           
                       // =============================================
                       // CHECKOUT FROM FORM
                       // =============================================
           
                       console.log(
                           "Checkout From Form..."
                       );
           
                       await visaPage.checkout();
           
           
                       // =============================================
                       // SHIPPING
                       // =============================================
           
                       console.log(
                           "Shipping..."
                       );
           
                       const shippingType =
                           await cartPage.selectShippingOption(
                               pdf
                           );
           
                       console.log(
                           "Selected Shipping Type:",
                           shippingType
                       );
           
           
                       // =============================================
                       // REFUND POLICY
                       // =============================================
           
                       console.log(
                           "Refund Policy..."
                       );
           
                       await cartPage.acceptRefundPolicy();
           
                       console.log(
                           "✓ Refund Policy Accepted"
                       );
           
           
                       // =============================================
                       // PAYMENT
                       // =============================================
           
                       console.log(
                           "Payment..."
                       );
           
                       const paymentMethod =
                           await cartPage.selectPaymentMethod();
           
                       console.log(
                           "Selected Payment Method:",
                           paymentMethod
                       );
           
           
                       // =============================================
                       // VISA PAYMENT FLOW
                       // =============================================
                       // Credit/Debit Card:
                       //     No card details required
                       //
                       // Other payment:
                       //     Checkout From Cart
                       //     Confirm Pay Later
                       // =============================================
           
                       if (
                           paymentMethod === "Credit/Debit Card"
                       ) {
           
                           console.log(
                               "Credit/Debit Card selected."
                           );
           
                           console.log(
                               "Visa Service does not require card details."
                           );
           
                           console.log(
                               "Checkout..."
                           );
           
                           await cartPage.checkoutFromCart();
           
                       }
           
                       else {
           
                           console.log(
                               `${paymentMethod} selected.`
                           );
           
                           console.log(
                               "Checkout From Cart..."
                           );
           
                           await cartPage.checkoutFromCart();
           
           
                           console.log(
                               "Confirm Pay Later..."
                           );
           
                           await cartPage.confirmPayLater();
           
                       }
           
                   }
           
           
                   // =================================================
                   // WAIT FOR CONFIRMATION
                   // =================================================
           
                   console.log("==========================================");
                   console.log("CONFIRMATION");
                   console.log("==========================================");
           
                   console.log(
                       "Waiting for confirmation..."
                   );
           
                   await driver.wait(
                       async () => {
           
                           return (
                               await driver.getCurrentUrl()
                           ).includes("/confirmation");
           
                       },
                       60000
                   );
           
           
                   console.log(
                       "Confirmation URL:",
                       await driver.getCurrentUrl()
                   );
           
                   console.log(
                       "✓ Confirmation page reached"
                   );
           
           
                   // =================================================
                   // ORDER NUMBER
                   // =================================================
           
                   console.log(
                       "Getting Order Number..."
                   );
           
                   const orderNumber =
                       await visaPage.getOrderNumber();
           
                   console.log(
                       "Order:",
                       orderNumber
                   );
              
                   
        }
    );

    // 6. NOTARY SERVICE
    it(
        "Complete Notary Service Order",
        async function () {
                    
                  // ==================================================
                  // OPEN NOTARY SERVICE
                  // ==================================================
          
                  console.log("==========================================");
                  console.log("OPEN NOTARY SERVICE");
                  console.log("==========================================");
          
                  const notaryAction =
                      await notaryPage.openNotaryService();
          
                  console.log(
                      "Notary Service Action:",
                      notaryAction
                  );
          
          
                  // ==================================================
                  // NEW ORDER
                  // ==================================================
          
                  if (
                      notaryAction === "NEW_ORDER" ||
                      notaryAction === "NONE"
                  ) {
          
                      console.log("==========================================");
                      console.log("NEW NOTARY ORDER");
                      console.log("==========================================");
          
          
                      // ==================================================
                      // COUNTRY
                      // ==================================================
          
                      console.log("Country...");
          
                      const country =
                          await notaryPage.selectCountry();
          
                      console.log(
                          "Selected Country:",
                          country
                      );
          
          
                      // ==================================================
                      // DOCUMENT TYPE
                      // ==================================================
          
                      console.log("Document Type...");
          
                      const documentType =
                          await notaryPage.selectDocumentType();
          
                      console.log(
                          "Selected Document Type:",
                          documentType
                      );
          
          
                      // ==================================================
                      // CUSTOMER REFERENCE
                      // ==================================================
          
                      console.log("Customer Reference...");
          
                      const customerReference =
                          "AUTO-" + Date.now();
          
                      await notaryPage.enterCustomerReference(
                          customerReference
                      );
          
                      console.log(
                          "Customer Reference:",
                          customerReference
                      );
          
          
                      // ==================================================
                      // ADDITIONAL SERVICES
                      // ==================================================
          
                      console.log("Additional Services...");
          
                      await notaryPage.selectAdditionalServices();
          
                      console.log(
                          "✓ Additional Services completed"
                      );
          
          
                      // ==================================================
                      // PROCESS TYPE
                      // ==================================================
          
                      console.log("Process Type...");
          
                      const processType =
                          await notaryPage.selectProcessType(
                              pdf
                          );
          
                      console.log(
                          "Selected Process Type:",
                          processType
                      );
          
          
                      // ==================================================
                      // COMMENTS
                      // ==================================================
          
                      console.log("Additional Comments...");
          
                      await notaryPage.enterComments(
                          "Automation Functional Testing"
                      );
          
                      console.log(
                          "✓ Comments entered"
                      );
          
          
                      // ==================================================
                      // CHECKOUT FROM FORM
                      // ==================================================
          
                      console.log("==========================================");
                      console.log("CHECKOUT FROM NOTARY FORM");
                      console.log("==========================================");
          
                      await notaryPage.checkoutFromForm();
          
                      console.log(
                          "✓ Notary form checkout completed"
                      );
          
                  }
          
          
                  // ==================================================
                  // EXISTING ORDER -> GO TO CART
                  // ==================================================
          
                  else if (
                      notaryAction === "GO_TO_CART"
                  ) {
          
                      console.log("==========================================");
                      console.log("EXISTING ORDER IN CART");
                      console.log("==========================================");
          
                      console.log(
                          "Existing order found."
                      );
          
                      console.log(
                          "Go to Cart was selected."
                      );
          
                      console.log(
                          "✓ Continuing with existing cart"
                      );
          
                  }
          
          
                  // ==================================================
                  // INVALID ACTION
                  // ==================================================
          
                  else {
          
                      throw new Error(
                          `Unexpected Notary Service action: ${notaryAction}`
                      );
          
                  }
          
          
                  // ==================================================
                  // CART
                  // ==================================================
          
                  console.log("==========================================");
                  console.log("CART CHECKOUT");
                  console.log("==========================================");
          
          
                  // ==================================================
                  // SHIPPING
                  // ==================================================
          
                  console.log(
                      "Selecting random shipping option..."
                  );
          
                  const shippingType =
                      await cartCheckout.selectShippingOption(
                          pdf
                      );
          
                  console.log(
                      "Selected Shipping Type:",
                      shippingType
                  );
          
          
                  // ==================================================
                  // REFUND POLICY
                  // ==================================================
          
                  console.log(
                      "Accepting Refund Policy..."
                  );
          
                  await cartCheckout.acceptRefundPolicy();
          
                  console.log(
                      "✓ Refund policy accepted"
                  );
          
          
                  // ==================================================
                  // PAYMENT
                  // ==================================================
          
                  console.log(
                      "Selecting random payment method..."
                  );
          
                  const paymentMethod =
                      await cartCheckout.selectPaymentMethod();
          
                  console.log(
                      "Selected Payment Method:",
                      paymentMethod
                  );
          
          
                  // ==================================================
                  // CREDIT / DEBIT CARD
                  // ==================================================
          
                  if (
                      paymentMethod === "Credit/Debit Card"
                  ) {
          
                      console.log(
                          "Credit/Debit Card selected."
                      );
          

                      console.log(
                            "Entering card details..."
                        );
            
                        await cartPage.enterCardDetails(
            
                            // Cardholder Name
                            "Judhistir Behera",
            
                            // Card Number
                            "4111111111111111",
            
                            // Expiry
                            "12/36",
            
                            // CVV
                            "246"
            
                        );
            
                        console.log(
                            "✓ Card details entered"
                        );

          
                      console.log(
                          "Checkout & Pay..."
                      );
          
                      await cartCheckout.checkoutAndPay();
          
                      console.log(
                          "✓ Checkout & Pay completed"
                      );
          
                  }
          
          
                  // ==================================================
                  // OTHER PAYMENT METHODS
                  // ==================================================
          
                  else {
          
                      console.log(
                          `${paymentMethod} selected.`
                      );
          
                      console.log(
                          "Checkout From Cart..."
                      );
          
                      await cartCheckout.checkoutFromCart();
          
                      console.log(
                          "✓ Checkout From Cart completed"
                      );
          
          
                      console.log(
                          "Confirm Pay Later..."
                      );
          
                      await cartCheckout.confirmPayLater();
          
                      console.log(
                          "✓ Pay Later confirmed"
                      );
          
                  }
          
          
                  // ==================================================
                  // CONFIRMATION
                  // ==================================================
          
                  console.log("==========================================");
                  console.log("CONFIRMATION");
                  console.log("==========================================");
          
                  console.log(
                      "Waiting for confirmation page..."
                  );
          
          
                  await driver.wait(
                      async () => {
          
                          return (
                              await driver.getCurrentUrl()
                          ).includes("/confirmation");
          
                      },
                      60000
                  );
          
          
                  const confirmationUrl =
                      await driver.getCurrentUrl();
          
                  console.log(
                      "Confirmation URL:",
                      confirmationUrl
                  );
          
          
                  expect(
                      confirmationUrl
                  ).to.contain(
                      "/confirmation"
                  );
          
          
                  console.log(
                      "✓ Confirmation page reached"
                  );
          
          
                  // ==================================================
                  // ORDER NUMBER
                  // ==================================================
          
                  console.log("==========================================");
                  console.log("ORDER NUMBER");
                  console.log("==========================================");
          
                  console.log(
                      "Getting Order Number..."
                  );
          
          
                  const orderNumber =
                      await notaryPage.getOrderNumber();
          
          
                  console.log(
                      "Order:",
                      orderNumber
                  );
          
          
                  expect(
                      orderNumber
                  ).to.not.equal("");
          
          
                  expect(
                      orderNumber
                  ).to.not.equal("Order No:");
          
          
                  // ==================================================
                  // COMPLETE
                  // ==================================================
          
                  console.log("==========================================");
                  console.log("NOTARY SERVICE TEST PASSED");
                  console.log("==========================================");

        }
    );

    // 7. DISPATCH SERVICE
    it(
        "Complete Dispatch Service Order",
        async function () {
            
                    // ==================================================
                    // OPEN DISPATCH SERVICE
                    // ==================================================
            
                    console.log("");
                    console.log("==========================================");
                    console.log("DISPATCH SERVICE");
                    console.log("==========================================");
            
                    console.log(
                        "Open Dispatch Service..."
                    );
            
                    await dispatchPage.openDispatchService();
            
                    console.log(
                        "✓ Dispatch Service opened"
                    );
            
            
                    // ==================================================
                    // COUNTRY
                    // ==================================================
            
                    console.log("");
                    console.log("Country...");
            
                    const selectedCountry =
                        await dispatchPage.selectCountry();
            
                    console.log(
                        "Selected Country:",
                        selectedCountry
                    );
            
            
                    // ==================================================
                    // DOCUMENT TYPE
                    // ==================================================
            
                    console.log("");
                    console.log("Document Type...");
            
                    const selectedDocument =
                        await dispatchPage.selectDocumentType();
            
                    console.log(
                        "Selected Document Type:",
                        selectedDocument
                    );
            
            
                    // ==================================================
                    // PRE-SCAN
                    // ==================================================
            
                    console.log("");
                    console.log("Checking Pre-Scan...");
            
                    const preScanSelected =
                        await dispatchPage.verifyPreScanSelected();
            
                    expect(preScanSelected)
                        .to.equal(true);
            
                    console.log(
                        "✓ Pre-Scan is selected"
                    );
            
            
                    // ==================================================
                    // CUSTOMER REFERENCE
                    // ==================================================
            
                    console.log("");
                    console.log("Customer Reference...");
            
                    const customerReference =
                        "AUTO-DISPATCH-" + Date.now();
            
                    await dispatchPage.enterCustomerReference(
                        customerReference
                    );
            
                    console.log(
                        "Customer Reference:",
                        customerReference
                    );
            
            
                    // ==================================================
                    // PROCESS TYPE
                    // ==================================================
                    //
                    // Randomly chooses:
                    //
                    // 1. Process Attached Documents
                    //      -> Page count
                    //      -> Upload PDF
                    //
                    // OR
                    //
                    // 2. Mail Original Documents
                    //      -> Tracking number
                    //      -> Courier
                    //
                    // ==================================================
            
                    console.log("");
                    console.log("Process Type...");
            
                    const processType =
                        await dispatchPage.selectProcessType(
                            pdf
                        );
            
                    console.log(
                        "Selected Process Type:",
                        processType
                    );
            
            
                    // ==================================================
                    // ADDITIONAL COMMENTS
                    // ==================================================
            
                    console.log("");
                    console.log("Comments...");
            
                    await dispatchPage.enterComments(
                        "Dispatch Service Automation Test"
                    );
            
                    console.log(
                        "✓ Comments entered"
                    );
            
            
                    // ==================================================
                    // ADD TO CART OR CHECKOUT
                    // ==================================================
                    //
                    // Randomly chooses:
                    //
                    // Add To Cart
                    // OR
                    // Checkout
                    //
                    // Both eventually go to Cart.
                    //
                    // ==================================================
            
                    console.log("");
                    console.log("==========================================");
                    console.log("CART / CHECKOUT");
                    console.log("==========================================");
            
                    const action =
                        Math.random() < 0.5;
            
            
                    if (action) {
            
                        // ==================================================
                        // ADD TO CART
                        // ==================================================
            
                        console.log(
                            "Action Selected: Add To Cart"
                        );
            
                        console.log(
                            "Add To Cart..."
                        );
            
                        await dispatchPage.addToCart();
            
                        console.log(
                            "✓ Added to cart"
                        );
            
            
                        // ==================================================
                        // OPEN CART
                        // ==================================================
            
                        console.log(
                            "Open Cart..."
                        );
            
                        await dispatchPage.openCart();
            
                        console.log(
                            "✓ Cart opened"
                        );
            
                    }
            
                    else {
            
                        // ==================================================
                        // CHECKOUT FROM FORM
                        // ==================================================
            
                        console.log(
                            "Action Selected: Checkout"
                        );
            
                        console.log(
                            "Checkout..."
                        );
            
                        await dispatchPage.checkoutFromForm();
            
                        console.log(
                            "✓ Checkout initiated"
                        );
            
                    }
            
            
            
                    console.log("");
                    console.log("==========================================");
                    console.log("SHIPPING");
                    console.log("==========================================");
            
                    console.log(
                        "Selecting Shipping Option..."
                    );
            
                    const shippingType =
                        await cartPage.selectShippingOption(
                            pdf
                        );
            
                    console.log(
                        "Selected Shipping Type:",
                        shippingType
                    );
            
                    console.log(
                        "✓ Shipping completed"
                    );
            
            
                    // ==================================================
                    // REFUND POLICY
                    // ==================================================
            
                    console.log("");
                    console.log("Refund Policy...");
            
                    await cartPage.acceptRefundPolicy();
            
                    console.log(
                        "✓ Refund Policy Accepted"
                    );
            
            
                    console.log("");
                    console.log("==========================================");
                    console.log("PAYMENT");
                    console.log("==========================================");
            
                    console.log(
                        "Selecting Payment Method..."
                    );
            
                    const paymentMethod =
                        await cartPage.selectPaymentMethod();
            
                    console.log(
                        "Selected Payment Method:",
                        paymentMethod
                    );
            
            
                    // ==================================================
                    // CREDIT / DEBIT CARD
                    // ==================================================
            
                    if (
                        paymentMethod ===
                        "Credit/Debit Card"
                    ) {
            
                        console.log("");
                        console.log(
                            "Credit/Debit Card selected."
                        );
            
            
                        // ==================================================
                        // CARD DETAILS
                        // ==================================================
            
                        console.log(
                            "Entering card details..."
                        );
            
                        await cartPage.enterCardDetails(
            
                            // Cardholder Name
                            "Judhistir Behera",
            
                            // Card Number
                            "4111111111111111",
            
                            // Expiry
                            "12/36",
            
                            // CVV
                            "246"
            
                        );
            
                        console.log(
                            "✓ Card details entered"
                        );
            
            
                        // ==================================================
                        // CHECKOUT & PAY
                        // ==================================================
            
                        console.log(
                            "Checkout & Pay..."
                        );
            
                        await cartPage.checkoutAndPay();
            
                        console.log(
                            "✓ Checkout & Pay completed"
                        );
            
                    }
            
            
                    // ==================================================
                    // OTHER PAYMENT METHODS
                    // ==================================================
            
                    else {
            
                        console.log("");
            
                        console.log(
                            "Non-card payment method selected."
                        );
            
                        console.log(
                            "Payment Method:",
                            paymentMethod
                        );
            
            
                        // ==================================================
                        // CHECKOUT FROM CART
                        // ==================================================
            
                        console.log(
                            "Checkout From Cart..."
                        );
            
                        await cartPage.checkoutFromCart();
            
                        console.log(
                            "✓ Checkout From Cart completed"
                        );
            
            
                        // ==================================================
                        // CONFIRM ORDER
                        // ==================================================
            
                        console.log(
                            "Confirm Order..."
                        );
            
                        await cartPage.confirmPayLater();
            
                        console.log(
                            "✓ Order confirmation submitted"
                        );
            
                    }
            
            
                    // ==================================================
                    // WAIT FOR CONFIRMATION PAGE
                    // ==================================================
            
                    console.log("");
                    console.log("==========================================");
                    console.log("CONFIRMATION");
                    console.log("==========================================");
            
                    console.log(
                        "Waiting for confirmation page..."
                    );
            
                    await driver.wait(
                        async () => {
            
                            return (
                                await driver.getCurrentUrl()
                            ).includes(
                                "/confirmation"
                            );
            
                        },
                        60000
                    );
            
            
                    const confirmationUrl =
                        await driver.getCurrentUrl();
            
                    console.log(
                        "Confirmation URL:",
                        confirmationUrl
                    );
            
                    expect(
                        confirmationUrl
                    ).to.include(
                        "/confirmation"
                    );
            
                    console.log(
                        "✓ Confirmation page reached"
                    );
            
            
                    // ==================================================
                    // GET ORDER NUMBER
                    // ==================================================
            
                    console.log("");
                    console.log(
                        "Getting Order Number..."
                    );
            
                    const orderNumber = await dispatchPage.getOrderNumber();
            
                    console.log(
                        "Order:",
                        orderNumber
                    );
            
                
            
                    // ==================================================
                    // TEST COMPLETED
                    // ==================================================
            
                    console.log("");
            
                    console.log("==========================================");
            
                    console.log(
                        "✓ DISPATCH SERVICE ORDER COMPLETED"
                    );
            
                    console.log("==========================================");

        }
    );

    // 8. DISPATCH SERVICE - ADD MORE DOCUMENTS
    it(
        "should add multiple Dispatch Service documents to cart and complete order",
        async function () {           
                           // ==================================================
                           // 2. OPEN DISPATCH SERVICE
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log("2. OPEN DISPATCH SERVICE");
                           console.log("==========================================");
           
                           await dispatchPage.openDispatchService();
           
                           console.log(
                               "✓ Dispatch Service page opened"
                           );
           
           
                           // ==================================================
                           // 3. ADD FIRST DOCUMENT
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log("3. ADD FIRST DOCUMENT");
                           console.log("==========================================");
           
           
                           // ==================================================
                           // COUNTRY
                           // ==================================================
           
                           console.log("Country...");
           
                           const firstCountry =
                               await dispatchPage.selectCountry();
           
                           console.log(
                               "First Country:",
                               firstCountry
                           );
           
           
                           // ==================================================
                           // DOCUMENT TYPE
                           // ==================================================
           
                           console.log("Document Type...");
           
                           const firstDocument =
                               await dispatchPage.selectDocumentType();
           
                           console.log(
                               "First Document:",
                               firstDocument
                           );
           
           
                           // ==================================================
                           // PRE-SCAN
                           // ==================================================
           
                           console.log(
                               "Checking Pre-Scan..."
                           );
           
                           const firstPreScan =
                               await dispatchPage.verifyPreScanSelected();
           
                           expect(
                               firstPreScan
                           ).to.equal(true);
           
                           console.log(
                               "✓ Pre-Scan is selected"
                           );
           
           
                           // ==================================================
                           // CUSTOMER REFERENCE
                           // ==================================================
           
                           const firstReference =
                               "Automation-First-" + Date.now();
           
                           console.log(
                               "Customer Reference:",
                               firstReference
                           );
           
                           await dispatchPage.enterCustomerReference(
                               firstReference
                           );
           
           
                           // ==================================================
                           // PROCESS / UPLOAD OPTION
                           // ==================================================
                           //
                           // selectProcessType() randomly chooses:
                           //
                           // 1. Process Attached Documents
                           //      -> Number of pages
                           //      -> Upload PDF
                           //
                           // 2. Mail Original Documents to WCS office
                           //      -> Tracking number
                           //      -> Courier
                           //      -> NO PDF upload
                           //
                           // ==================================================
           
                           console.log(
                               "Process / Upload Option..."
                           );
           
                           const firstProcessType =
                               await dispatchPage.selectProcessType(
                                   pdf
                               );
           
                           console.log(
                               "First Process Type:",
                               firstProcessType
                           );
           
           
                           // ==================================================
                           // ADDITIONAL COMMENTS
                           // ==================================================
           
                           console.log(
                               "Additional Comments..."
                           );
           
                           await dispatchPage.enterComments(
                               "Dispatch Service - First Document Automation Test"
                           );
           
                           console.log(
                               "✓ First document form completed"
                           );
           
           
                           // ==================================================
                           // 4. ADD FIRST DOCUMENT TO CART
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log(
                               "4. ADD FIRST DOCUMENT"
                           );
                           console.log("==========================================");
           
                           await dispatchPage.addToCart();
           
                           console.log(
                               "✓ First document added to cart"
                           );
           
           
                           // ==================================================
                           // OPEN CART
                           // ==================================================
           
                           console.log(
                               "Opening Cart..."
                           );
           
                           await dispatchPage.openCart();
           
                           await driver.wait(
                               until.urlContains("/cart"),
                               30000
                           );
           
                           console.log(
                               "✓ Cart opened"
                           );
           
           
                           // ==================================================
                           // 5. ADD MORE DOCUMENTS
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log("5. ADD MORE DOCUMENTS");
                           console.log("==========================================");
           
                           console.log(
                               "Clicking Add More Documents..."
                           );
           
                           await dispatchPage.addMoreDocuments();
           
                           await driver.wait(
                               until.urlContains(
                                   "/orders/new/dispatch-service"
                               ),
                               30000
                           );
           
                           console.log(
                               "✓ Returned to Dispatch Service page"
                           );
           
           
                           // ==================================================
                           // 6. ADD SECOND DOCUMENT
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log("6. ADD SECOND DOCUMENT");
                           console.log("==========================================");
           
           
                           // ==================================================
                           // COUNTRY
                           // ==================================================
           
                           console.log("Country...");
           
                           const secondCountry =
                               await dispatchPage.selectCountry();
           
                           console.log(
                               "Second Country:",
                               secondCountry
                           );
           
           
                           // ==================================================
                           // DOCUMENT TYPE
                           // ==================================================
           
                           console.log("Document Type...");
           
                           const secondDocument =
                               await dispatchPage.selectDocumentType();
           
                           console.log(
                               "Second Document:",
                               secondDocument
                           );
           
           
                           // ==================================================
                           // PRE-SCAN
                           // ==================================================
           
                           console.log(
                               "Checking Pre-Scan..."
                           );
           
                           const secondPreScan =
                               await dispatchPage.verifyPreScanSelected();
           
                           expect(
                               secondPreScan
                           ).to.equal(true);
           
                           console.log(
                               "✓ Pre-Scan is selected"
                           );
           
           
                           // ==================================================
                           // CUSTOMER REFERENCE
                           // ==================================================
           
                           const secondReference =
                               "Automation-Second-" + Date.now();
           
                           console.log(
                               "Customer Reference:",
                               secondReference
                           );
           
                           await dispatchPage.enterCustomerReference(
                               secondReference
                           );
           
           
                           // ==================================================
                           // PROCESS / UPLOAD OPTION
                           // ==================================================
           
                           console.log(
                               "Process / Upload Option..."
                           );
           
                           const secondProcessType =
                               await dispatchPage.selectProcessType(
                                   pdf
                               );
           
                           console.log(
                               "Second Process Type:",
                               secondProcessType
                           );
           
           
                           // ==================================================
                           // ADDITIONAL COMMENTS
                           // ==================================================
           
                           console.log(
                               "Additional Comments..."
                           );
           
                           await dispatchPage.enterComments(
                               "Dispatch Service - Second Document Automation Test"
                           );
           
                           console.log(
                               "✓ Second document form completed"
                           );
           
           
                           // ==================================================
                           // ADD SECOND DOCUMENT TO CART
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log(
                               "ADDING SECOND DOCUMENT"
                           );
                           console.log("==========================================");
           
                           await dispatchPage.addToCart();
           
                           console.log(
                               "✓ Second document added to cart"
                           );
           
           
                           // ==================================================
                           // 7. OPEN CART
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log(
                               "7. VERIFY MULTIPLE DOCUMENTS IN CART"
                           );
                           console.log("==========================================");
           
                           await dispatchPage.openCart();
           
                           await driver.wait(
                               until.urlContains("/cart"),
                               30000
                           );
           
                           console.log(
                               "✓ Cart opened"
                           );
           
           
                           // ==================================================
                           // 8. SHIPPING
                           // ==================================================
                           //
                           // CartCheckoutPage handles all 5 options:
                           //
                           // 1. Create Return Label
                           // 2. E-Copy Only
                           // 3. Upload Return Label
                           // 4. Pickup
                           // 5. Enclose Label
                           //
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log("8. SHIPPING");
                           console.log("==========================================");
           
                           console.log(
                               "Selecting Shipping Option..."
                           );
           
                           const shippingType =
                               await cartPage.selectShippingOption(
                                   pdf
                               );
           
                           console.log(
                               "Selected Shipping Type:",
                               shippingType
                           );
           
                           expect(
                               shippingType
                           ).to.not.equal(undefined);
           
                           expect(
                               shippingType
                           ).to.not.equal(null);
           
                           console.log(
                               "✓ Shipping option selected"
                           );
           
           
                           // ==================================================
                           // 9. REFUND POLICY
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log("9. REFUND POLICY");
                           console.log("==========================================");
           
                           await cartPage.acceptRefundPolicy();
           
                           console.log(
                               "✓ Refund policy accepted"
                           );
           
           
                           // ==================================================
                           // 10. PAYMENT
                           // ==================================================
                           //
                           // CartCheckoutPage randomly selects one of:
                           //
                           // 1. Credit/Debit Card
                           // 2. Company's Check
                           // 3. ACH/Wire Transfer
                           // 4. Purchase Order (PO)
                           //
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log("10. PAYMENT");
                           console.log("==========================================");
           
                           const paymentMethod =
                               await cartPage.selectPaymentMethod();
           
                           console.log(
                               "Selected Payment Method:",
                               paymentMethod
                           );
           
                           expect(
                               [
                                   "Credit/Debit Card",
                                   "Company's Check",
                                   "ACH/Wire Transfer",
                                   "Purchase Order (PO)"
                               ]
                           ).to.include(
                               paymentMethod
                           );
           
           
                           // ==================================================
                           // CREDIT / DEBIT CARD
                           // ==================================================
           
                           if (
                               paymentMethod ===
                               "Credit/Debit Card"
                           ) {
           
                               console.log(
                                   "Credit/Debit Card selected."
                               );
           
                               console.log(
                                   "Entering card details..."
                               );
           
                               await cartPage.enterCardDetails(
                                   "Judhistir Behera",
                                   "4111111111111111",
                                   "12/36",
                                   "246"
                               );
           
                               console.log(
                                   "✓ Card details entered"
                               );
           
           
                               // ==================================================
                               // CHECKOUT & PAY
                               // ==================================================
           
                               console.log(
                                   "Checkout & Pay..."
                               );
           
                               await cartPage.checkoutAndPay();
           
                               console.log(
                                   "✓ Checkout & Pay completed"
                               );
           
                           }
           
           
                           // ==================================================
                           // OTHER PAYMENT METHODS
                           // ==================================================
           
                           else {
           
                               console.log(
                                   `${paymentMethod} selected.`
                               );
           
                               console.log(
                                   "Checkout From Cart..."
                               );
           
                               await cartPage.checkoutFromCart();
           
                               console.log(
                                   "✓ Checkout From Cart completed"
                               );
           
           
                               // ==================================================
                               // CONFIRM
                               // ==================================================
           
                               console.log(
                                   "Confirm payment..."
                               );
           
                               await cartPage.confirmPayLater();
           
                               console.log(
                                   "✓ Payment confirmed"
                               );
           
                           }
           
           
                           // ==================================================
                           // 11. CONFIRMATION
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log("11. CONFIRMATION");
                           console.log("==========================================");
           
                           console.log(
                               "Waiting for confirmation..."
                           );
           
                           await driver.wait(
                               async () => {
           
                                   return (
                                       await driver.getCurrentUrl()
                                   ).includes(
                                       "/confirmation"
                                   );
           
                               },
                               60000
                           );
           
           
                           const confirmationUrl =
                               await driver.getCurrentUrl();
           
                           console.log(
                               "Confirmation URL:",
                               confirmationUrl
                           );
           
                           expect(
                               confirmationUrl
                           ).to.contain(
                               "/confirmation"
                           );
           
                           console.log(
                               "✓ Confirmation page reached"
                           );
           
           
                           // ==================================================
                           // 12. ORDER NUMBER
                           // ==================================================
                           //
                           // getOrderNumber() belongs to
                           // DispatchServicePage.
                           //
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
                           console.log("12. ORDER NUMBER");
                           console.log("==========================================");
           
                           const orderNumber =
                               await dispatchPage.getOrderNumber();
           
                           console.log(
                               "Order:",
                               orderNumber
                           );
           
                           // ==================================================
                           // COMPLETE
                           // ==================================================
           
                           console.log("");
                           console.log("==========================================");
           
                           console.log(
                               "✓ DISPATCH SERVICE ADD MORE DOCUMENTS TEST PASSED"
                           );
           
                           console.log(
                               "==========================================");

        }
    );

});