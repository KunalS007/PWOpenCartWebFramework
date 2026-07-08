import{Locator,Page} from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage
{
    //Private Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly subscribeYesRadio: Locator;
    private readonly privacyPolicyCheckbox: Locator
    private readonly continueButton: Locator;

    //constructor...of the class: initializing the locators
    constructor(page:Page)
    {
        super(page);
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephoneInput = page.getByRole('textbox', { name: 'Telephone' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' }).first();
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Password Confirm' });
        this.subscribeYesRadio = page.getByRole('radio', { name: 'Yes' });
        this.privacyPolicyCheckbox = page.locator('[name="agree"]');
        this.continueButton = page.getByRole('button', {name: 'Continue'});
    }

    //public page actions(methods) behaviors
    async goToRegistrationPage(): Promise<void>
    {
        await this.page.goto('opencart/index.php?route=account/register');
    }

    async getRegistrationPageTitle(): Promise<string>
    {
        return await this.page.title();
    }

    async doRegistration(firstName: string, LastName: string, email: string, telephone: string, password: string, confirmPassword: string, subscribeYesRadio: string): Promise<void>
    {
        console.log(`Registration with: ${firstName} ${LastName} ${email} ${telephone} ${password}`);
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(LastName);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
      
        if (subscribeYesRadio?.trim().toLowerCase() === 'yes') 
        {
            await this.subscribeYesRadio.check();
        }
        await this.privacyPolicyCheckbox.check();
        await this.continueButton.click();
    }
}