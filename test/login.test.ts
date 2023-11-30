import { chromium } from "playwright";

describe('Launch Browser', () => {
    test('Login LetCode', async() => {
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://letcode.in/');
        await page.click("text=Log in");
        await page.fill("input[name='email']", "kiddikus95@gmail.com");
        await page.fill("input[name='password']", "test123")
        await page.click("button:text('LOGIN')");
        await page.click('"Sign out"')
        await page.close();
        await context.close();
        await browser.close();


    })
})