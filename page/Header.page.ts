import { Page } from 'playwright'

export default class HeaderPage{

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // locators
public get eleLogInBtn (){
    const loginBtn = this.page.waitForSelector("text=Log in")
    if(loginBtn != null){
        return loginBtn
    }else throw new Error("No element")    
}

public get eleLogOutBtn(){
    const logOutBtn = this.page.$("text=Sign out")
    if(logOutBtn != null){
        return logOutBtn
    }else throw new Error("No element")    
}

public async clickLogIn(){
    const ele = await this.eleLogInBtn
    await ele?.click()
}

public async clickLogOut(){
    const ele = await this.eleLogOutBtn
    await ele?.click()
}

}