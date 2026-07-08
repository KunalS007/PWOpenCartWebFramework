import {test,expect} from '../src/fixtures/pagefixtures';

test.beforeEach(async ({loginPage}) =>
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

});



test('Verify product images count ', async ({homePage,searchResultPage,productInfoPage }) => 
{
    await homePage.doSearch("Macbook");
    await searchResultPage.selectProduct("MacBook Pro");
    let imagesCount = await productInfoPage.getProductImagesCount();
    console.log("Total product images count is : " + imagesCount);
    expect(imagesCount).toBe(4);
    
});

test('Verify product information ', async ({homePage,searchResultPage,productInfoPage }) =>
{
     await homePage.doSearch("Macbook");
    await searchResultPage.selectProduct("MacBook Pro");
    let productInfoMap = await productInfoPage.getProductInfo();
    console.log("Product information is : ", productInfoMap);
    expect(productInfoMap.get('productName')).toBe('MacBook Pro');
    expect(productInfoMap.get('productImagesCount')).toBe(4);
    expect(productInfoMap.get('Brand')).toBe('Apple');
    expect(productInfoMap.get('Product Code')).toBe('Product 18');
    expect(productInfoMap.get('Reward Points')).toBe('800');
   // expect.soft(productInfoMap.get('Availability')).toBe('In Stock');
    expect.soft(productInfoMap.get('price')).toBe('$2,000.00');
    expect.soft(productInfoMap.get('ExTaxPrice')).toBe('$2,000.00');

});

test('Verify add to cart functionality ', async ({homePage,searchResultPage,productInfoPage }) =>
{
    await homePage.doSearch("Macbook");
    await searchResultPage.selectProduct("MacBook Pro");
    let successMessage = await productInfoPage.getAddToCartAnsMsg(2);
    expect.soft(successMessage).toContain('Success: You have added MacBook Pro to your shopping cart!');
});


//common methods
test('Company logo exist or not', async ({ basePage}) =>
{
    expect(await basePage.isLogoVisible()).toBeTruthy();
});


test('Footers exist or not', async ({ basePage}) =>
{
    expect(await basePage.getPageFooterCount()).toBe(16);
});