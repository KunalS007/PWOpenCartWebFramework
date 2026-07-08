import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class ProductInfoPage extends BasePage
{
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPriceData: Locator;
    private map: Map<string, string | number>;
    private readonly addToCartText: Locator;
    private readonly addToCartButton: Locator;


    constructor(page: Page)
    {
        super(page);
        this.header = page.locator('h1'); 
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPriceData = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string | number>();
        this.addToCartText = page.getByRole('textbox', {name: 'Qty'});
        this.addToCartButton = page.getByRole('button', {name: 'Add to Cart'});

    };

    async getProductHeaderValue(): Promise<string>
    {
        return await this.header.innerText();
    }

    async getProductImagesCount(): Promise<number>
    {
        await this.productImages.first().waitFor({state: 'visible'});
        return await this.productImages.count();
    }

    async getProductInfo(): Promise<Map<string, string | number>>
    {
        this.map.set('productName', await this.getProductHeaderValue());
        this.map.set('productImagesCount',await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPriceData();
        return this.map;
    }

    private async getProductMetaData(): Promise<void>
    {
       let metaData = await this.productMetaData.allInnerTexts();
       for(let data of metaData)
       {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.map.set(metaKey, metaValue);
       }
    }

    private async getProductPriceData(): Promise<void>
    {
        let priceData = await this.productPriceData.allInnerTexts();
       
        let price = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('price', price);
        this.map.set('ExTaxPrice', exTaxPrice);
    }

    async getAddToCartAnsMsg(quantity: number): Promise<string>
    {
        await this.addToCartText.fill(quantity.toString());
        await this.addToCartButton.click();
        let successMsg = await this.page.locator('div.alert-success').innerText();
        return successMsg;
    }
}


     





