import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage
{
    
    //Private Locators
   private readonly emailInput: Locator;
   private readonly passwordInput: Locator;
   private readonly LoginButton: Locator;
   private readonly forgotPasswordLink: Locator;
   private readonly logo: Locator;
   private readonly loginErrorMessage:Locator;

   //constructor...of the class: initializing the locators
    constructor(page: Page)
    {
        super(page);
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.passwordInput = page.getByRole('textbox', {name: 'Password' });
        this.LoginButton = page.getByRole('button', { name: 'Login'});
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgotten Password'}).first();
        this.logo = page.getByAltText('naveenopencart');
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
    
    };

    //public page actions(methods) behaviors
    async goToLoginPage(): Promise<void>
    {
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async getLoginPageTitle(): Promise<string>
    {
        return await this.page.title();
    }

    async forgotPasswordLinkIsVisible(): Promise<boolean>
    {
        return await this.forgotPasswordLink.isVisible();
    }

    async doLogin(email: string, password: string): Promise<void>
    {
        console.log(`Login with: ${email} and ${password}`);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.LoginButton.click();
    }

    async isInvalidLoginErrorDisplay(): Promise<boolean>
    {
       return await this.loginErrorMessage.isVisible();
    }
}