# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepagefix.spec.ts >> @smoke Headers count test
- Location: tests/homepagefix.spec.ts:24:1

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=account/login", waiting until "load"

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | import { BasePage } from "./BasePage";
  3  | 
  4  | export class LoginPage extends BasePage
  5  | {
  6  |     
  7  |     //Private Locators
  8  |    private readonly emailInput: Locator;
  9  |    private readonly passwordInput: Locator;
  10 |    private readonly LoginButton: Locator;
  11 |    private readonly forgotPasswordLink: Locator;
  12 |    private readonly loginErrorMessage:Locator;
  13 | 
  14 |    //constructor...of the class: initializing the locators
  15 |     constructor(page: Page)
  16 |     {
  17 |         super(page);
  18 |         this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
  19 |         this.passwordInput = page.getByRole('textbox', {name: 'Password' });
  20 |         this.LoginButton = page.getByRole('button', { name: 'Login'});
  21 |         this.forgotPasswordLink = page.getByRole('link', { name: 'Forgotten Password'}).first();
  22 |         this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
  23 |     
  24 |     };
  25 | 
  26 |     //public page actions(methods) behaviors
  27 |     async goToLoginPage(): Promise<void>
  28 |     {
> 29 |         await this.page.goto('opencart/index.php?route=account/login');
     |                         ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  30 |     }
  31 | 
  32 |     async getLoginPageTitle(): Promise<string>
  33 |     {
  34 |         return await this.page.title();
  35 |     }
  36 | 
  37 |     async forgotPasswordLinkIsVisible(): Promise<boolean>
  38 |     {
  39 |         return await this.forgotPasswordLink.isVisible();
  40 |     }
  41 | 
  42 |     async doLogin(email: string, password: string): Promise<void>
  43 |     {
  44 |         console.log(`Login with: ${email} and ${password}`);
  45 |         await this.emailInput.fill(email);
  46 |         await this.passwordInput.fill(password);
  47 |         await this.LoginButton.click();
  48 |     }
  49 | 
  50 |     async isInvalidLoginErrorDisplay(): Promise<boolean>
  51 |     {
  52 |        return await this.loginErrorMessage.isVisible();
  53 |     }
  54 | }
```