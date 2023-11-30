import { chromium, Page, Browser, BrowserContext } from "playwright";


describe('Learn how to handle frames', () => {

let browser: Browser;
let context : BrowserContext;
let page: Page;

beforeAll( async () => {
    browser = await chromium.launch({
        headless: false
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://letcode.in/frame');
})

    test("Interact with frames", async() => {
      const frame = page.frame({name: "firstFr"})
      //await frame?.fill()
      if(frame != null){
        await frame.fill("input[name='fname']", "vitaliy")
        await frame.fill("input[name='lname']", "nau")

        //inner frames

        const frames = frame.childFrames();
        console.log(frames.length)
        if(frames != null){          
        await frames[1].fill("input[name='email']", "test@mail.com")
        }else throw new Error("No such frames")
        
        //back to parent

        //await frame.fill("input[name='lname']", "parent")
        
        const parent = frames[0].parentFrame()
        await parent.fill("input[name='lname']", "parent")
       

      }else throw new Error("No such frame")
    })

        afterAll(async () => {
          await page.close();
          await context.close();
          await browser.close(); 
     })
})