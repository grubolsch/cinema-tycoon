import {ShopType} from "../ShopTypes/ShopType";

class Shop {

    private _cashier: number = 1;
    private readonly _CASHIER_WAGES: number = 50;
    private readonly _SHOP_TYPE: ShopType;


    constructor(SHOP_TYPE: ShopType) {
        this._SHOP_TYPE = SHOP_TYPE;
    }

    get cashier(): number {
        return this._cashier;
    }

    get CASHIER_WAGES(): number {
        return this._CASHIER_WAGES;
    }

    get SHOP_TYPE(): ShopType {
        return this._SHOP_TYPE;
    }
}
export {Shop}