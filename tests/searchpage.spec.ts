import {test,expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async({loginPage}) =>
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!,process.env.APP_PASSWORD!);

});


let productData = CsvHelper.readCSV('src/data/productdata.csv');
for(const row of productData)
{
test(`Verify search with product - ${row.sKey} and ${row.productName}`, async({homePage, searchResultPage}) =>
{
    await homePage.doSearch(row.sKey);
    expect(await searchResultPage.getSearchResultCount()).toBe(Number(row.resultcount));

});   
};

for(const row of productData)
{
test(`Verify user is able to land on Product page ${row.sKey} and ${row.productName}`, async({homePage, searchResultPage, page}) =>
{

    await homePage.doSearch(row.sKey);
    await searchResultPage.selectProduct(row.productName);
    expect(await page.title()).toBe(row.productName);

});
}