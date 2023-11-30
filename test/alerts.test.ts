import { chromium, Page, Browser, BrowserContext } from "playwright";


describe('Learn how to handle input aserts', () => {

let browser: Browser;
let context : BrowserContext;
let page: Page;

beforeAll( async () => {
    browser = await chromium.launch({
        headless: false
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://letcode.in/alert');
})

    test("Handle dialogs", async() => {
      const ele = await page.$("id=accept");
      page.once("dialog", (dialog) => {
      dialog.accept();
      })
      await ele?.click();

    })

    test("Dismiss the Alert & print the alert text", async() => {   
        const ele = await page.$("id=confirm");
        page.once("dialog", async(dialog) => {
         console.log(dialog.message());  
         await dialog.dismiss();
        })
        await ele?.click();
      })

      test("Type your name & accept", async() => {   
        const ele = await page.$("#prompt");
          page.once("dialog", (dialog) => {
          console.log('Message ' + dialog.message()); 
          console.log('Default value ' + dialog.defaultValue());
          console.log('Type ' + dialog.type()); 
          dialog.accept("Vitaliy");
        })
        await ele?.click();     
      })

      test("Sweet alert", async() => {   
        const ele = await page.$("id=modern");
        // page.once("dialog", (dialog) => {           
        //   dialog.accept();
        // })
        await ele?.click(); 
        const a = await page.$("//button[@class='modal-close is-large']")
        await a.click()           
      })

      

     afterAll(async () => {
      await page.close();
      await context.close();
      await browser.close(); 
     })
})