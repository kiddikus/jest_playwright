import { chromium, Page, Browser, BrowserContext } from "playwright";


describe('Learn how to handle input fields', () => {

let browser: Browser;
let context : BrowserContext;
let page: Page;

beforeAll( async () => {
    browser = await chromium.launch({
        headless: false
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://letcode.in/edit');
})

    test("Enter your full name", async() => {
      // await page.type("id=fullName", "vitaliy");
        const input1 = await page.$("#fullName");
        await input1?.type("vitaliy")
    })

    test("Append a text and press keyboard tab", async() => {   // type start from 0 elem, one by one
        const join = await page.$("#join");                     // fill first clear all then prin whole word 
        await join?.focus();
        await page.keyboard.press("End");
        await join?.type(" Human");
      })

      test("Get attribute", async() => {   
        const text =await page.getAttribute("id=getMe", "value"); 
        console.log(text)      
      })

      test("Clear the row", async() => {   
        await page.fill("#clearMe", "");              
      })

      test("Confirm edit field is disabled", async() => {   
        const noEdit = await (await page.$("id=noEdit")).isDisabled();     
        console.log(noEdit)  
      })

      test("Confirm text is readonly", async() => {   
        const dontwrite = await (await page.$("id=dontwrite")).isEditable();     
        console.log(dontwrite)  
      })

     afterAll(async () => {
      await page.close();
      await context.close();
      await browser.close(); 
     })
})