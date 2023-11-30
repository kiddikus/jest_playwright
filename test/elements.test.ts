import { timeStamp } from "console";
import { chromium, Page, Browser, BrowserContext } from "playwright";


describe('Learn how to work with elements', () => {

let browser: Browser;
let context : BrowserContext;
let page: Page;

beforeAll( async () => {
    browser = await chromium.launch({
        headless: false,
        channel: "chrome"
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://letcode.in/elements');
})

    test("Enter Git username", async() => {
      // const header = await page.$("nav[role='navigation']")
      // await header?.screenshot({path: Date.now() + 'screenshot.jpg'})
      const ele = await page.$("input[name='username']")
      await ele?.fill("ortonikc")
      await ele?.press("Enter")
    })

    test("Print all the repos", async() => {
       await page.waitForSelector("app-gitrepos ol li", {timeout: 5000})
       const repos = await page.$$("app-gitrepos ol li")
       console.log(repos.length)

    //    for await (const repo of repos){
    //     console.log(await repo.innerText());
    //    }

        const allUrls = await Promise.all(repos.map(async (repo, i) => {
            return await repo.innerText()
        }))
        console.log(allUrls)
      })

        afterEach(async() => {
          await page.screenshot({path: `.//screenshots/screenshot_${Date.now()}.jpg`})
        //  await page.screenshot({path: Date.now() + 'screenshot.jpg', fullPage: true})
        })

        afterAll(async () => {
       await page.close();
       await context.close();
       await browser.close();        
     })
})