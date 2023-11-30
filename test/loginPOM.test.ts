import { Browser, BrowserContext, Page, chromium } from "playwright";
import Env from "..//utils/enviroments";
import CommonPage from "../page/Common.page";
import HeaderPage from "../Page/Header.page";
import LoginPage from "../Page/Login.page";
//import  data from "../data/Data.cred.json"
import ReporterUtils from "..//utils/reporterUtils";

const data = require("../data/Data.cred.json")
declare const page: Page;
declare const reporter: any;

describe("POM tests", () =>{
    // let browser: Browser;
    // let context : BrowserContext;
    // let page: Page;
    
    //my pages
    let header: HeaderPage;
    let login: LoginPage;
    let common: CommonPage;

    beforeAll( async () => {
        // browser = await chromium.launch({     
        //     headless: false,
        //     channel: "chrome"
        // });
        // context = await browser.newContext();
        // page = await context.newPage();
        await page.goto(Env.test);
        header = new HeaderPage(page);
        login = new LoginPage(page);
        common = new CommonPage(page);
    })

    test("Login with POM, possitive", async() => {
        await reporter
         .description("allure test")
         .severity("Critical")
         .story("first");
             await reporter.startStep("open site")
        expect(page.url()).toBe("https://letcode.in/")
            await  reporter.endStep("site is opened")
            await  reporter.startStep("login")
        await header.clickLogIn();
        expect(page.url()).toBe("https://letcode.in/signin")
        // const screen = await page.screenshot()
        // await reporter.addAtachment("user", screen, "image/png")
        ReporterUtils.screenshot("signin")
             await reporter.endStep("login is done")
             await reporter.startStep("enter cred")
        await login.enterUserName(data.email)
        await login.enterUserPass(data.pass)
        await login.clickLoginBtn()
             await reporter.endStep("cred is done")
             await reporter.startStep("loging out")
        const toaster = await common.toaster;        
        expect(await toaster?.textContent()).toContain("Welcome")
        await header.clickLogOut()
        await page.mouse.move(1,  1)
             await reporter.endStep("log out")
    })

    test("another", async() => {
        expect(page.url()).toBe("https://letcode.in/")
        await header.clickLogIn()
        expect(page.url()).toBe("https://letcode.in/signin")
        await login.login("koushikc350@gmail.com", "Pass123$");     
       
    })
    // afterAll(async () => {
    //     await page.close();
    //     await context.close();
    //     await browser.close();        
    //   })
})