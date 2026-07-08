import { test as baseTest} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { SearchResultPage } from "../pages/SearchResultPage";   
import { ProductInfoPage } from "../pages/ProductInfoPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { BasePage } from "../pages/BasePage";

//define types for page fixtures

type pageFixtures = {
    loginPage: LoginPage,
    homePage: HomePage,
    registrationPage: RegistrationPage,
    searchResultPage: SearchResultPage,
    productInfoPage: ProductInfoPage,
    checkoutPage: CheckoutPage,
    basePage: BasePage

};

//extend playwright base test with page fixtures
export let test = baseTest.extend<pageFixtures>
({
    basePage: async ({page}, use) =>
    {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({page}, use) =>
    {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) =>
    {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    registrationPage: async ({ page }, use) =>
    {
        let registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },

    searchResultPage: async ({ page }, use) =>
    {
        let searchResultPage = new SearchResultPage(page);
        await use(searchResultPage);
    },

    productInfoPage: async ({ page }, use) =>
    {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    checkoutPage: async ({page}, use) =>
    {
        let checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    }


});

export { expect } from "@playwright/test";