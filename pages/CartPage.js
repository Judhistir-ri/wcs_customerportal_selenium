const { By, until } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;

        // Empty Cart
        this.emptyCartTitle = By.xpath("//h4[contains(text(),'Cart is empty') or contains(text(),'Authentication Cart is empty')]");

        this.addDocumentsBtn = By.xpath("//button[contains(.,'Add Documents')]");

        // Cart Items
        this.cartItems = By.css("[class*='MuiCard-root']");

        // Checkout
        this.checkoutBtn = By.xpath("//button[contains(.,'Checkout')]");

        // Delete Cart Item
        this.removeBtn = By.xpath("//button[contains(@aria-label,'delete') or contains(@title,'Delete')]");

        // Cart badge
        this.cartBadge = By.xpath("//span[contains(@class,'MuiBadge-badge')]");

        // Cart icon
        this.cartIcon = By.xpath("//a[contains(@href,'/cart')]");
    }

    async open() {
        await this.driver.get(
            "https://wcscustomerportal.azurewebsites.net/cart?service=us-authentication"
        );

        await this.driver.wait(async () => {
            const url = await this.driver.getCurrentUrl();
            return url.includes("/cart");
        }, 15000);
    }

    async clickAddDocuments() {
        await this.driver.wait(
            until.elementLocated(this.addDocumentsBtn),
            10000
        );

        await this.driver.findElement(this.addDocumentsBtn).click();
    }

    async isEmptyCartVisible() {
        try {
            await this.driver.wait(
                until.elementLocated(this.emptyCartTitle),
                5000
            );
            return true;
        } catch {
            return false;
        }
    }

    async getCartItemCount() {
        const items = await this.driver.findElements(this.cartItems);
        return items.length;
    }

    async clickCheckout() {
        await this.driver.wait(
            until.elementLocated(this.checkoutBtn),
            10000
        );

        await this.driver.findElement(this.checkoutBtn).click();
    }

    async getBadgeCount() {
        try {
            return await this.driver.findElement(this.cartBadge).getText();
        } catch {
            return "0";
        }
    }
}

module.exports = CartPage;