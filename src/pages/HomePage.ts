import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";


export class HomePage extends BasePage
{
   
    //Private Locators
    private readonly logoutlink: Locator;
    private readonly headers: Locator;
  
    constructor(page: Page)
    {
        super(page);
        this.logoutlink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', {level: 2});
    }

    async isLogoutLinkVisible(): Promise<boolean>
    {
        return await this.logoutlink.isVisible();
    }

    async getHeadersCount(): Promise<string[]>
    {
        return await this.headers.allInnerTexts();
    }

    async doSearch(searchTerm: string): Promise<void>
    {
        // await this.searchInput.fill(searchTerm);
        // await this.searchButton.click();
        await this.searchBox.fill(searchTerm);
        await this.searchIcon.click();
    }
}