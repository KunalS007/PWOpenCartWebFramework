import {test, expect} from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) =>
{
    await loginPage.goToLoginPage();
});


test('Login page title test', async ({ loginPage }) => 
{
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log('Login page title:', pageTitle);
    expect(pageTitle).toBe('Account Login');

});

test('Forgot Password link visibility test', async ({ loginPage }) => 
{
    expect(await loginPage.forgotPasswordLinkIsVisible()).toBeTruthy();
});

test('do login into web application test', async ({ loginPage, homePage, basePage }) =>
{
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    expect(await homePage.isLogoutLinkVisible()).toBeTruthy();
    expect.soft(await basePage.getPageTitle()).toBe('My Account');
});



let testData = CsvHelper.readCSV('src/data/logindata.csv');
for(let row of testData)
{
    test(`Invalid login test with - ${row.username} and ${row.password}`, async({loginPage}) =>
    {
        await loginPage.doLogin(row.username, row.password);
        expect(loginPage.isInvalidLoginErrorDisplay).toBeTruthy();
    });
}


// Interview Question: when you have 10 test cases 8 test cases have to run 8 workers and 2 cases for 2 workers. e
test.describe('Serial Tests', () => {
  test.describe.configure({ mode: 'serial' });

  test('TC9', async ({ page }) => {
    console.log('Running TC9');
  });

  test('TC10', async ({ page }) => {
    console.log('Running TC10');
  });
});