import {test, expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";
import { BasePage } from "../src/pages/BasePage";

let loginPage: LoginPage;
let homePage: HomePage;
let basePage: BasePage;

test.beforeEach(async ({ page }) =>
{
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);
    basePage = new BasePage(page);
});

//Testing purpose
 test('Login page title test', async ({  }) => 
{
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log(`Login page title: ${pageTitle}`);
    expect(pageTitle).toBe('Account Login');

});

test('Forgot Password link visibility test', async ({  }) => 
{
    expect(await loginPage.forgotPasswordLinkIsVisible()).toBeTruthy();
});

test.skip('do login into web application test', async ({ }) =>
{
    await loginPage.doLogin('abckk@yopmail.com', '12345');
    expect(await homePage.isLogoutLinkVisible()).toBeTruthy();
    expect.soft(await basePage.getPageTitle()).toBe('My Account');
});

  