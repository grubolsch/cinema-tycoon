import {FacilityType} from "../ShopTypes/FacilityType";
import {Product} from "../Entity/Product";
import {ProductManager} from "./ProductManager";
import {ConfigManager} from "./ConfigManager";
import shopsJson from "../Assets/shopTypes.json";
import {FacilityException} from "../Exception/FacilityException";

class ShopMap extends Map<string, FacilityType> {
}

/*
* ShopTypeManager manages all potential types of shops & services
* */
class ShopTypeManager {
    private readonly TOILET = 'Toilet';
    private readonly ARCADE = 'Arcade';

    private _shops: ShopMap = new ShopMap();

    constructor(config: ConfigManager, productManager: ProductManager) {
        shopsJson.shops.forEach((json) => {

            if (this._shops.has(json.name)) {
                console.error('Shop found with double name: ' + json.name);
                return;
            }

            // @ts-ignore
            let service = json.service === true;

            this._shops.set(json.name, new FacilityType(config, json.name, json.buildCost, json.capacityPerCashier, json.monthlyRent, json.hourlyWagePerCashier, service, this.getProducts(json, productManager)));
        });
    }

    private getProducts(jsonShop: { products: any[]; }, productManager: ProductManager): Array<Product> {
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

    getToilet(): FacilityType {
        if (!this.shops.has(this.TOILET)) {
            throw FacilityException.missingCoreFacility(this.TOILET);
        }
        return this.shops.get(this.TOILET)!;
    }

    getArcade(): FacilityType {
        if (!this.shops.has(this.ARCADE)) {
            throw FacilityException.missingCoreFacility(this.ARCADE);
        }
        return this.shops.get(this.ARCADE)!;
    }
}

export {ShopTypeManager}