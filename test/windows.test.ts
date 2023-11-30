import { chromium, Page, Browser, BrowserContext } from "playwright";


describe('Learn how to handle windows', () => {

let browser: Browser;
let context : BrowserContext;
let page: Page;

beforeAll( async () => {
    browser = await chromium.launch({
        headless: false
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://letcode.in/windows');
})

    test("Home page", async() => {
        console.log(await page.title())
        expect(await page.title()).toBe("Window handling - LetCode")
    })

    test("Single page", async() => {   
      const [newWindow] = await Promise.all([
        context.waitForEvent("page"),
        await page.click("#home")
      ])
      await newWindow.waitForLoadState()
      expect(newWindow.url()).toContain("test")
      await newWindow.click('"Log in"')
      //await newWindow.waitForNavigation()
      expect(await newWindow.url()).toContain("signin")
      await newWindow.close()
    //   await page.bringToFront()
    //   await page.click('"LetXPath"')
    //   await newWindow.close();
      })

      test("Multiple handling", async() => {   
        const [multiple] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#multi")
        ])
        await multiple.waitForLoadState()
        const pages = await multiple.context().pages()
        console.log(pages.length)
        await pages.forEach(page => {
            console.log(page.url())
        })
            pages[1].on("dialog", (dialog) => {
            dialog.accept();
            })
            await pages[1]?.click("id=accept");
        })

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close(); 
     })
})