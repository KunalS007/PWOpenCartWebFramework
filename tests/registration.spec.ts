import { test,expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({loginPage}) =>
{
    await loginPage.goToLoginPage();
});
test('Registration page title test', async ({ registrationPage }) =>
    {
        await registrationPage.goToRegistrationPage();
        const pageTitle = await registrationPage.getRegistrationPageTitle();
        console.log('Registration page title:', pageTitle);
        expect(pageTitle).toBe('Register Account');
    });

    let registrationData = CsvHelper.readCSV('src/data/registrationdata.csv');
    for(let row of registrationData)
    {
        test(`@sanity Registration test with csv - ${row.firstname} ${row.lastname}`, async ({ registrationPage }) => 
        {
            await registrationPage.goToRegistrationPage();
            await registrationPage.doRegistration(
                row.firstname, 
                row.lastname, 
                row.EMail, 
                row.Telephone, 
                row.password, 
                row.cofmpassword,
                row.sub
            );
        });
            

    }


 