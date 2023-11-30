import { Page } from 'playwright'

export default class LoginPage{

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // locators
public get eleEmailTextField(){
    const emailTextField = this.page.$("input[name='email']")
    if(emailTextField != null){
        return emailTextField
    }else throw new Error("No element")    
}

public get elePassTextField(){
    const passTextField = this.page.$("input[name='password']")
    if(passTextField != null){
        return passTextField
    }else throw new Error("No element")    
}

eleLogInBtn = async () => await this.page.$("//button[text()='LOGIN']")  //refactoring for less rows
// public get eleLogInBtn(){
//     return this.page.$("//button[text()='LOGIN']")
// }


public async enterUserName(name: string){
    const ele = await this.eleEmailTextField
    await ele?.fill(name)
}

public async enterUserPass(pass: string){
    const ele = await this.elePassTextField
    await ele?.fill(pass)
}

public async clickLoginBtn(){
    const ele = await this.eleLogInBtn()
    await ele?.click()
} 

public async login(name: string, pass: string){
    await this.enterUserName(name)
    await this.enterUserPass(pass)
    await this.clickLoginBtn()
} 
}
