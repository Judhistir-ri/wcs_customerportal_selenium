const { expect } = require("chai");
const { By, Key } = require("selenium-webdriver");
require("dotenv").config();

const getDriver = require("../../utils/driver");
const LoginPage = require("../../pages/LoginPage");

describe("WCS Login UI Test Cases", function () {

    this.timeout(120000);

    let driver;
    let login;

    before(async () => {

        driver = await getDriver();

        login = new LoginPage(driver);

        await login.open();

    });

    after(async () => {

        await driver.quit();

    });

    // =====================================
    // UI TEST CASES
    // =====================================

    // it("TC_UI_001 - Verify Login Page Title", async () => {

    //     const title = await driver.getTitle();

    //     expect(title).to.not.equal("");

    // });

    it("TC_UI_002 - Verify Login Form is Displayed", async () => {

        const form = await driver.findElement(
            By.xpath("//h5[contains(text(),'Sign In')]")
        );

        expect(await form.isDisplayed()).to.equal(true);

    });

    it("TC_UI_003 - Verify Email Textbox", async () => {

        const email = await driver.findElement(
            By.css("input[placeholder='Email Address']")
        );

        expect(await email.isDisplayed()).to.equal(true);

    });

    it("TC_UI_004 - Verify Password Textbox", async () => {

        const password = await driver.findElement(
            By.css("input[placeholder='Password']")
        );

        expect(await password.isDisplayed()).to.equal(true);

    });

    it("TC_UI_005 - Verify Email Placeholder", async () => {

        const email = await driver.findElement(
            By.css("input[placeholder='Email Address']")
        );

        expect(await email.getAttribute("placeholder"))
            .to.equal("Email Address");

    });

    it("TC_UI_006 - Verify Password Placeholder", async () => {

        const password = await driver.findElement(
            By.css("input[placeholder='Password']")
        );

        expect(await password.getAttribute("placeholder"))
            .to.equal("Password");

    });

    it("TC_UI_007 - Verify Sign In Button", async () => {

        const button = await driver.findElement(
            By.xpath("//button[normalize-space()='Sign In']")
        );

        expect(await button.isDisplayed()).to.equal(true);

    });

    it("TC_UI_008 - Verify Sign In Button Enabled", async () => {

        const button = await driver.findElement(
            By.xpath("//button[normalize-space()='Sign In']")
        );

        expect(await button.isEnabled()).to.equal(true);

    });

    it("TC_UI_009 - Verify Sign Up Link", async () => {

        const signup = await driver.findElement(
            By.xpath("//a[contains(text(),'Sign Up Now')]")
        );

        expect(await signup.isDisplayed()).to.equal(true);

    });

    it("TC_UI_010 - Verify Forgot Password Link", async () => {

        const forgot = await driver.findElement(
            By.xpath("//*[contains(text(),'Forgot password')]")
        );

        expect(await forgot.isDisplayed()).to.equal(true);

    });

    it("TC_UI_011 - Verify Password Masking", async () => {

        const password = await driver.findElement(
            By.css("input[placeholder='Password']")
        );

        expect(await password.getAttribute("type"))
            .to.equal("password");

    });

    it("TC_UI_012 - Verify Password Visibility Icon", async () => {

        const icon = await driver.findElement(
            By.xpath("//button[@type='button']")
        );

        expect(await icon.isDisplayed()).to.equal(true);

    });

    it("TC_UI_013 - Verify Password Visibility Toggle", async () => {

        const password = await driver.findElement(
            By.css("input[placeholder='Password']")
        );

        const icon = await driver.findElement(
            By.xpath("//button[@type='button']")
        );

        expect(await password.getAttribute("type"))
            .to.equal("password");

        await icon.click();

        expect(await password.getAttribute("type"))
            .to.equal("text");

    });

    it("TC_UI_014 - Verify Email Field Accepts Input", async () => {

        const email = await driver.findElement(
            By.css("input[placeholder='Email Address']")
        );

        await email.sendKeys("automation@test.com");

        expect(await email.getAttribute("value"))
            .to.equal("automation@test.com");

    });

    it("TC_UI_015 - Verify Password Field Accepts Input", async () => {

        const password = await driver.findElement(
            By.css("input[placeholder='Password']")
        );

        await password.sendKeys("Password123");

        expect(await password.getAttribute("value"))
            .to.equal("Password123");

    });

    it("TC_UI_016 - Verify CAPTCHA is Displayed", async () => {

        const captcha = await driver.findElement(
            By.xpath("//iframe[contains(@title,'reCAPTCHA')]")
        );

        expect(await captcha.isDisplayed()).to.equal(true);

    });

    it("TC_UI_017 - Verify Login URL", async () => {

        const url = await driver.getCurrentUrl();

        expect(url).to.include("/login");

    });

    it("TC_UI_018 - Verify Refresh Keeps User on Login Page", async () => {

        await driver.navigate().refresh();

        const url = await driver.getCurrentUrl();

        expect(url).to.include("/login");

    });

    it("TC_UI_019 - Verify TAB Navigation", async () => {

        const email = await driver.findElement(
            By.css("input[placeholder='Email Address']")
        );

        await email.click();

        await email.sendKeys(Key.TAB);

    });

    it("TC_UI_020 - Verify WCS Logo", async () => {

        const logo = await driver.findElement(
            By.xpath("//img")
        );

        expect(await logo.isDisplayed()).to.equal(true);

    });

});