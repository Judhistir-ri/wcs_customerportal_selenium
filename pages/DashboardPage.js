const { By, until, Key } = require("selenium-webdriver");

class DashboardPage {
    constructor(driver) {
        this.driver = driver;

        // Left Menu
        this.homeMenu = By.xpath("//span[normalize-space()='Home Page']");
        // this.myOrdersMenu = By.xpath("//span[normalize-space()='My Orders']");
        this.newOrderMenu = By.xpath("//span[normalize-space()='New Order']");
        this.myOrdersMenu = By.css("a[href='/orders/all']");
        this.usAuthenticationMenu = By.xpath("//span[normalize-space()='U.S Authentication']");
        this.globalAuthenticationMenu = By.xpath("//span[contains(text(),'Global Authentication')]");
        this.translationServiceMenu = By.xpath("//span[normalize-space()='Translation Service']");
        this.visaServiceMenu = By.xpath("//span[normalize-space()='Visa Service']");
        this.notaryServiceMenu = By.xpath("//span[normalize-space()='Notary Service']");
        this.dispatchServiceMenu = By.xpath("//span[normalize-space()='Dispatch Service']");
        this.bulkOrderingMenu = By.xpath("//span[contains(text(),'Bulk Ordering')]");
        this.faqMenu = By.xpath("//span[normalize-space()='FAQ']");
        this.cartMenu = By.xpath("//span[normalize-space()='Cart']");
        this.profileMenu = By.xpath("//span[normalize-space()='Profile']");
        this.signOutMenu = By.xpath("//span[normalize-space()='Sign Out']");

        // Header
        this.searchBox = By.css("input[placeholder*='Search Order']");
        this.notificationIcon = By.xpath("//span[@aria-label='Notifications']/..");
        this.infoIcon = By.xpath("//button[@aria-label='FAQs']");
        this.cartIcon = By.xpath("//button[@aria-label='View Cart']");
        this.accountIcon = By.xpath("//button[@aria-label='Account Settings']");

        // Dashboard Cards
        this.usCard = By.xpath("//h6[contains(text(),'U.S. Apostilles')]");
        this.globalCard = By.xpath("//h6[contains(text(),'Global Authentication')]");
        this.translationCard = By.xpath("//h6[contains(text(),'Translation Service')]");
        this.visaCard = By.xpath("//h6[contains(text(),'Visa Service')]");
        this.notaryCard = By.xpath("//h6[contains(text(),'Notary Service')]");
        this.dispatchCard = By.xpath("//h6[contains(text(),'Dispatch Service')]");

        // Charts
        this.documentShareChart = By.xpath("//*[contains(text(),'Document Share')]");
        this.documentVolumeChart = By.xpath("//*[contains(text(),'Document Volume')]");

        // News
        this.newsSection = By.xpath("//h6[contains(text(),'WCS News')]");
        this.updateSection = By.xpath("//h6[contains(text(),'WCS Updates')]");
    }

    async waitForDashboard() {

    await this.driver.wait(async () => {
        return (await this.driver.getCurrentUrl()) ===
            "https://wcscustomerportal.azurewebsites.net/";
    }, 30000);

    await this.driver.wait(
        until.elementLocated(this.homeMenu),
        30000
    );

}
    

    async isDisplayed(locator) {
        try {
            const element = await this.driver.wait(
                until.elementLocated(locator),
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

    await this.driver.wait(
        until.elementIsVisible(element),
        10000
    );

    // Wait until Material UI backdrop disappears
    await this.driver.wait(async () => {
        const backdrops = await this.driver.findElements(
            By.css(".MuiBackdrop-root")
        );

        for (const backdrop of backdrops) {
            if (await backdrop.isDisplayed()) {
                return false;
            }
        }

        return true;
    }, 10000);

    await element.click();

}

  async searchOrder(orderId) {

    const input = await this.driver.wait(

        until.elementLocated(this.searchBox),

        10000

    );

    await this.driver.wait(

        until.elementIsVisible(input),

        10000

    );

    await input.clear();

    await input.sendKeys(orderId);

}

    async closeOverlay() {

    try {

        await this.driver.actions()
            .sendKeys(Key.ESCAPE)
            .perform();

        await this.driver.sleep(500);

    } catch (e) {

    }

}

    async openHome() {
        await this.click(this.homeMenu);
    }

async openMyOrders() {

    const link = await this.driver.wait(
        until.elementLocated(By.css("a[href='/orders/all']")),
        10000
    );

    await this.driver.executeScript(
        "arguments[0].scrollIntoView({block:'center'});",
        link
    );

    await this.driver.sleep(500);

    // JavaScript click
    await this.driver.executeScript(
        "arguments[0].click();",
        link
    );

    // Wait until navigation finishes
    await this.driver.wait(async () => {
        return (await this.driver.getCurrentUrl()).includes("/orders/all");
    }, 10000);

}

    async openNewOrder() {
        await this.click(this.newOrderMenu);
    }

    async openUSAuthentication() {
        await this.click(this.usAuthenticationMenu);
    }

    async openGlobalAuthentication() {
        await this.click(this.globalAuthenticationMenu);
    }

    async openTranslationService() {
        await this.click(this.translationServiceMenu);
    }

    async openVisaService() {
        await this.click(this.visaServiceMenu);
    }

    async openNotaryService() {
        await this.click(this.notaryServiceMenu);
    }

    async openDispatchService() {
        await this.click(this.dispatchServiceMenu);
    }

    async openBulkOrdering() {
        await this.click(this.bulkOrderingMenu);
    }

    async openFAQ() {
        await this.click(this.faqMenu);
    }

    async openCart() {
        await this.click(this.cartMenu);
    }

    async openProfile() {
        await this.click(this.profileMenu);
    }

    async logout() {

    const element = await this.driver.wait(
        until.elementLocated(this.signOutMenu),
        10000
    );

    await this.driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        element
    );

    await this.driver.sleep(500);

    await this.driver.executeScript(
        "arguments[0].click();",
        element
    );

}

    async openNotification() {
        await this.click(this.notificationIcon);
    }

    async openInfo() {
        await this.click(this.infoIcon);
    }

  async openHeaderCart() {

    await this.closeOverlay();

    await this.click(this.cartIcon);

}

    async openAccount() {
        await this.click(this.accountIcon);
    }
}

module.exports = DashboardPage;