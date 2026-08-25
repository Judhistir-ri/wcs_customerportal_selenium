const { expect } = require("chai");

const getDriver = require("../../utils/driver");

const LoginPage = require("../../pages/LoginPage");

describe("Login Module", function () {

    this.timeout(180000);

    let driver;
    let login;

    beforeEach(async () => {

        driver = await getDriver();

        login = new LoginPage(driver);

        await login.open();

    });

    afterEach(async () => {

        await driver.quit();

    });

    it("Should login successfully", async () => {

        await login.enterEmail(process.env.EMAIL);

        await login.enterPassword(process.env.PASSWORD);

        console.log("Solve the CAPTCHA manually...");

        await driver.sleep(30000);

        await login.clickLogin();

    });

    it("Should not login with invalid email", async () => {

    await login.enterEmail("wrong@gmail.com");

    await login.enterPassword(process.env.PASSWORD);

    console.log("Solve CAPTCHA");

    await driver.sleep(30000);

    await login.clickLogin();

    const message = await login.getErrorMessage();

    expect(message).to.equal("Invalid email or password");

    });
    
    it("Should not login with invalid password", async () => {

    await login.enterEmail(process.env.EMAIL);

    await login.enterPassword("WrongPassword123");

    console.log("Solve CAPTCHA");

    await driver.sleep(30000);

    await login.clickLogin();

    const message = await login.getErrorMessage();

    expect(message).to.equal("Invalid email or password");

    });
    
    it("Should not login with invalid credentials", async () => {

    await login.enterEmail("abc@gmail.com");

    await login.enterPassword("abc123");

    console.log("Solve CAPTCHA");

    await driver.sleep(30000);

    await login.clickLogin();

    const message = await login.getErrorMessage();

    expect(message).to.equal("Invalid email or password");

    });
    
    it("Should not login with empty password", async () => {

    await login.enterEmail(process.env.EMAIL);

    console.log("Solve CAPTCHA");

    await driver.sleep(30000);

    await login.clickLogin();

    const message = await login.getErrorMessage();

    expect(message).to.equal("Invalid email or password");

    });
    
    it("Should not login with empty email and password", async () => {

    console.log("Solve CAPTCHA");

    await driver.sleep(30000);

    await login.clickLogin();

   const message = await login.getErrorMessage();

    expect(message).to.equal("Invalid email or password");

    });
    
    it("Should reject password with different case", async () => {

    await login.enterEmail(process.env.EMAIL);

    await login.enterPassword("REDINTEGRO@321");

    console.log("Solve CAPTCHA");

    await driver.sleep(30000);

    await login.clickLogin();

    const message = await login.getErrorMessage();

    expect(message).to.equal("Invalid email or password");

    });
    

});