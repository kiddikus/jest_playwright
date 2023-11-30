import { chromium } from "playwright";

// npx playwright codegen letcode.in

describe('Launch Browser', () => {
    test('Login LetCode', async() => {
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext({
            recordVideo: {
                dir: "./videos/",
                size: {
                    width: 800,
                    height: 600
                }
            }            
        });
        const page = await context.newPage();
        await page.goto('https://letcode.in/');
  
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter registered email' }).click();  
  await page.getByRole('textbox', { name: 'Enter registered email' }).fill('kiddikus95@gmail.com');
  await page.getByRole('textbox', { name: 'Enter registered email' }).press('Tab');
  await page.getByPlaceholder('Enter password').fill('test123');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('link', { name: 'Work-Space' }).click();
  await page.getByRole('link', { name: 'All in One' }).click();
  await page.locator('#firstname').click();
  await page.locator('#firstname').fill('vitaliq');
  await page.locator('#lasttname').click();
  await page.locator('#lasttname').fill('last');
  await page.getByPlaceholder('Email input').click();
  await page.getByPlaceholder('Email input').fill('hello@gmail.com');
  await page.locator('form div').filter({ hasText: 'EmailCountry codeUSA (+1)UK' }).getByRole('combobox').selectOption('380');
  await page.getByPlaceholder('Phone Number').click();
  await page.getByPlaceholder('Phone Number').fill('123456789');
  await page.getByPlaceholder('Address Line-1').click();
  await page.getByPlaceholder('Address Line-1').fill('rest');
  await page.getByPlaceholder('Address Line-2').click();
  await page.getByPlaceholder('Address Line-2').fill('rest2');
  await page.getByPlaceholder('State').click();
  await page.getByPlaceholder('State').fill('uk');
  await page.getByPlaceholder('Postal-Code').click();
  await page.getByPlaceholder('Postal-Code').fill('83071');
  await page.locator('form div').filter({ hasText: 'Postal-CodeCountryAfghanistan' }).getByRole('combobox').selectOption('Ukraine');
  await page.locator('#Date').fill('1984-12-03');
  await page.getByLabel('Male', { exact: true }).check();
  await page.getByLabel('I agree to the terms and').check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'Sign out' }).click();
   await page.close();
   await context.close();
   await browser.close();
})
})