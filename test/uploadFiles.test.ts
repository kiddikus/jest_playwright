import { chromium } from "playwright";

describe('Upload file', () => {

    const pathFile0 = "../videos/a.webm";
    const pathFile1 = "../videos/b.webm";

    test('Upload files using set input files', async() => {
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://fex.net/');
        await page.setInputFiles("(//input[@class='input input_type_file'])[1]", [pathFile0, pathFile1])

        await context.close();  
        await browser.close();

    })

    test('Upload files using on function', async() => {
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/upload');

        await page.on("filechooser", async (filechooser) => {               //listener always before action(row 34)
            await filechooser.setFiles([pathFile0, pathFile1])
        })

        await page.click(".example + div#drag-drop-upload", {force: true})
        await page.close();
        await context.close();  
        await browser.close();

    })

})

