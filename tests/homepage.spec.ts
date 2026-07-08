import {test, expect} from "@playwright/test";
import { HomePage } from "../src/pages/HomePage";
import { LoginPage } from "../src/pages/LoginPage";
import { BasePage } from "../src/pages/BasePage";  

let homePage: HomePage;
let loginPage: LoginPage;
let basePage: BasePage;

test.beforeEach(async ({ page }) =>
{
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('abckk@yopmail.com', '12345');
    homePage = new HomePage(page);
    basePage = new BasePage(page);
});


test.skip('Home page title test', async ({  }) =>
{
    const pageTitle = await basePage.getPageTitle();
    console.log(`Home page title: ${pageTitle}`);
    expect(pageTitle).toBe('My Account');
});

test('Logout link visibility test', async ({  }) =>
{
    expect(await homePage.isLogoutLinkVisible()).toBeTruthy();
   
});

test('Headers count test', async ({  }) =>
{
     let  allHeaders = await homePage.getHeadersCount();
     console.log(`Headers count: ${allHeaders.length}`);
     expect.soft(allHeaders.length).toBe(4);
     expect.soft(allHeaders).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']); 


});
