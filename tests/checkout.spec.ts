import {test,expect} from '../src/fixtures/pagefixtures';

test.beforeEach(async ({loginPage}) =>
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);  
});

test('Verify the checkout of selected product', async ({homePage,searchResultPage,productInfoPage,checkoutPage}) =>
{
    await homePage.doSearch("Macbook"); 
    await searchResultPage.selectProduct("MacBook Pro");
    let productInfoMap = await productInfoPage.getProductInfo();
    console.log("Product information is : ", productInfoMap);
    expect(productInfoMap.get('productName')).toBe('MacBook Pro');
    expect(productInfoMap.get('productImagesCount')).toBe(4);
    let successMessage = await productInfoPage.getAddToCartAnsMsg(2);
    expect.soft(successMessage).toContain('Success: You have added MacBook Pro to your shopping cart!');
    await checkoutPage.getShoppingCartText();
    await checkoutPage.clickCheckoutButton();
});