import { chromium, Page, Browser, BrowserContext } from "playwright";


describe('Learn how to handle dropdowns', () => {

let browser: Browser;
let context : BrowserContext;
let page: Page;

beforeAll( async () => {
    browser = await chromium.launch({
        headless: false
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://letcode.in/dropdowns');
})

    test("Select dropdown based on value", async() => {
      const fruits = await page.$("#fruits")
      await fruits?.selectOption("2")
      const msg = await page.$("//div[@class='notification is-success']//p[1]")
        if(msg){
            expect(await msg.textContent()).toContain("Orange")
        }
    })

    test("Select multiple", async() => {   
      const heros = await page.$("#superheros")
      await heros?.selectOption([
        {label: "Aquaman"},{value: "bt"},{index: 8}
      ])
      })

      test("Count of the select", async() => {   
        const lang = await page.$$("id=lang") 
        console.log(lang.length)
      })

      test("Get selected text", async() => {   
        await page.selectOption("#country", "Peru");
        const text = await page.$eval<string, HTMLSelectElement>("#country", ele => ele.value) 
        console.log(text)
        expect(text).toBe("Peru")   
      })      

     afterAll(async () => {
      await page.close();
      await context.close();
      await browser.close(); 
     })
})