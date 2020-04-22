import shopsJson from "../Assets/shopTypes.json";
import {ShopType} from "../ShopTypes/ShopType";
import {Product} from "../Entity/Product";
import {ProductManager} from "./ProductManager";

class ShopMap extends Map<string, ShopType> {}
type shopLine = { id: string; products: number[]; name: string; buildCost: number };

class ShopTypeManager {
    private _shops: ShopMap = new ShopMap();

    constructor(productManager : ProductManager) {
        // @ts-ignore
        shopsJson.shops.forEach((shop: shopLine) => {

            if(this._shops.has(shop.id)) {
                console.error('Shop found with double id: '+ shop.id);
                return;
            }
            this._shops.set(shop.name, new ShopType(shop.name, shop.buildCost, this.getProducts(shop, productManager)));
        });
    }

    private getProducts(shop: shopLine, productManager: ProductManager) : Array<Product> {
        let products: Array<Product> = [];
        shop.products.forEach((productId: number) => {
            if (productManager.products.has(productId)) {
                products.push(productManager.products.get(productId)!);
            }
        });
        return products;
    }

    get shops(): ShopMap {
        return this._shops;
    }
}

export {ShopTypeManager}