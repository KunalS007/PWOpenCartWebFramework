import {test, expect} from '../src/fixtures/pagefixtures';


test.beforeEach(async ({ loginPage }) =>
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin('abckk@yopmail.com', '12345');
});


test('Home page title test', async ({  basePage}) =>
{
    const pageTitle = await basePage.getPageTitle();
    console.log(`Home page title: ${pageTitle}`);
    expect(pageTitle).toBe('My Account');
});

test('Logout link visibility test', async ({ homePage }) =>
{
    expect(await homePage.isLogoutLinkVisible()).toBeTruthy();
   
});

test('@smoke Headers count test', async ({ homePage }) =>
{
     let  allHeaders = await homePage.getHeadersCount();
     console.log(`Headers count: ${allHeaders.length}`);
     expect.soft(allHeaders.length).toBe(4);
     expect.soft(allHeaders).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']); 


});