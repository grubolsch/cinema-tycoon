import shopsJson from "../Assets/shopTypes.json";
import {FacilityType} from "../ShopTypes/FacilityType";
import {Product} from "../Entity/Product";
import {ProductManager} from "./ProductManager";
import {ConfigManager} from "./ConfigManager";

class ShopMap extends Map<string, FacilityType> {}

/*
* ShopTypeManager manages all potential types of shops & services
* */
class ShopTypeManager {
    private _shops: ShopMap = new ShopMap();

    constructor(config : ConfigManager, productManager : ProductManager) {
        shopsJson.shops.forEach((shop) => {

            if(this._shops.has(shop.name)) {
                console.error('Shop found with double name: '+ shop.name);
                return;
            }

            this._shops.set(shop.name, new FacilityType(config, shop.name, shop.buildCost, shop.capacityPerCashier, shop.monthlyRent, shop.hourlyWagePerCashier, this.getProducts(shop, productManager)));
        });
    }

    private getProducts(jsonShop: { products: any[]; }, productManager: ProductManager) : Array<Product> {
        let products: Array<Product> = [];
        jsonShop.products.forEach((productId) => {
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