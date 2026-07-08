import { Locator, Page } from "@playwright/test";

export class BasePage
{
    protected readonly page: Page;
    protected readonly logo:Locator;
    protected readonly searchBox:Locator;
    protected readonly searchIcon:Locator;
    protected readonly footerLinks:Locator;
    protected readonly currency:Locator;
    protected readonly cartButton:Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.logo = page.getByAltText('naveenopencart');
        this.searchBox = page.getByPlaceholder('Search');
        this.searchIcon = page.locator('div#search button');
        this.currency = page.locator('#form-currency');
        this.footerLinks = page.locator('footer a');
        this.cartButton = page.locator('div#cart button');
    }

    async isLogoVisible(): Promise<boolean>
    {
        return this.logo.isVisible();
    }

    async isSearchBoxVisible(): Promise<boolean>
    {
        return this.searchBox.isVisible();
    }

    async isCurrencyBoxVisible():Promise<boolean>
    {
        return await this.currency.isVisible();
    }
    
    async isCartButtonVisible():Promise<boolean>
    {
        return await this.cartButton.isVisible();
    }

    async getPageFooterCount():Promise<number>
    {
        return await this.footerLinks.count();
    }

    async getPageFooters():Promise<string[]>
    {
        return await this.footerLinks.allInnerTexts();
    }

    async getPageTitle():Promise<string>
    {
        return this.page.title();
    }

    getPageCurrentTitle(): string
    {
        return this.page.url();
    }

    async waitForPageLoad()
    {
        await this.page.waitForLoadState('load');
    }

    async takesScreenshot(name:string)
    {
        return await this.page.screenshot
        ({
            fullPage:true,
            path:`reports/screenshot/${name}.png`
        });
    }

}