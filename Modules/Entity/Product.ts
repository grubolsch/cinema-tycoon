class Product {

    private readonly _ID: number;
    private readonly _NAME: string;
    //private readonly _HAPINESS_BONUS: number;
    private readonly _COST_PRICE: number;
    private _sellingPrice: number;

    constructor(ID: number, NAME: string, /*HAPINESS_BONUS: number,*/ COST_PRICE: number, sellingPrice: number) {
        this._ID = ID;
        this._NAME = NAME;
        //this._HAPINESS_BONUS = HAPINESS_BONUS;
        this._COST_PRICE = COST_PRICE;
        this._sellingPrice = sellingPrice;
    }

    get ID(): number {
        return this._ID;
    }

    get NAME(): string {
        return this._NAME;
    }

    /*get HAPINESS_BONUS(): number {
        return this._HAPINESS_BONUS;
    }*/

    get COST_PRICE(): number {
        return this._COST_PRICE;
    }

    get sellingPrice(): number {
        return this._sellingPrice;
    }

    set sellingPrice(value: number) {
        this._sellingPrice = value;
    }
}

export {Product}