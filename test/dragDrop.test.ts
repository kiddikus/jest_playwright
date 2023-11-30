import { timeStamp } from "console";
import { chromium, Page, Browser, BrowserContext } from "playwright";


describe('Drag and Drop', () => {

let browser: Browser;
let context : BrowserContext;
let page: Page;

beforeAll( async () => {
    browser = await chromium.launch({
        headless: false
    });
    context = await browser.newContext();
    page = await context.newPage();
    
})

    test("Drag and Drop main page", async() => {
        await page.goto('https://letcode.in/dropable');
    const drag = await page.$("#draggable")
    const target = await page.$("#droppable")
    if(drag && target){
        const dragGeo = await drag.boundingBox()
        const targetGeo = await target.boundingBox()
        if(dragGeo && targetGeo){
            await page.mouse.move(dragGeo.x + dragGeo.width/2, dragGeo.y + dragGeo.height/2)
            await page.mouse.down()
            await page.mouse.move(targetGeo.x + targetGeo.width/2, targetGeo.y + targetGeo.height/2)
            await page.mouse.down()
        }else throw new Error("No Element")
    }
    })

    test("Drag and Drop frame", async() => {
        await page.goto('https://jqueryui.com/droppable');
        // switch to frame
       const frame = page.frame({url: 'https://jqueryui.com/resources/demos/droppable/default.html'})
       if(frame){
    const drag = await frame.$("#draggable")
    const target = await frame.$("#droppable")
    if(drag && target){
        const dragGeo = await drag.boundingBox()
        const targetGeo = await target.boundingBox()
        if(dragGeo && targetGeo){
            await page.mouse.move(dragGeo.x + dragGeo.width/2, dragGeo.y + dragGeo.height/2)
            await page.mouse.down()
            await page.mouse.move(targetGeo.x + targetGeo.width/2, targetGeo.y + targetGeo.height/2)
            await page.mouse.down()
        }else throw new Error("No Element")
    }
    }
    })

        afterAll(async () => {
       await page.close();
       await context.close();
       await browser.close();        
     })
})