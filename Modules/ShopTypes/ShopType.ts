import {Product} from "../Entity/Product";

class ShopType {

    private _name: string;
    private readonly BUILD_COST: number;
    private readonly _isUpgradable: boolean;
    private _products: Product[] | null;


    constructor(name: string, BUILD_COST: number, isUpgradable: boolean, products: Product[]) {
        this._name = name;
        this.BUILD_COST = BUILD_COST;
        this._isUpgradable = isUpgradable;
        this._products = products;
    }
}

export {ShopType}