import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class CheckoutPage extends BasePage
{
    private readonly ShoppingCartText: Locator;
    private readonly CheckoutButton: Locator;

    constructor(page: Page)
    {   
        super(page);
        this.ShoppingCartText = page.getByRole('link', { name: 'shopping cart' }).first();
        this.CheckoutButton = page.getByRole('link', {name: 'Checkout'}).first();
    };

    async getShoppingCartText(): Promise<string>
    {
        return await this.ShoppingCartText.innerText();
    }

    async clickCheckoutButton()
    {
        await this.CheckoutButton.click();
    }
};
