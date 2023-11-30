import { Page } from 'playwright'

export default class CommonPage{

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // locators
public get toaster(){
    return  this.page.waitForSelector("div[role='alertdialog']")
}
}