import {Product} from "../Entity/Product";

class ShopType {
    private readonly _name: string;
    private readonly _buildCost: number;
    private readonly _products: Product[];

    constructor(name: string, buildCost: number, products: Product[]) {
        this._name = name;
        this._buildCost = buildCost;
        this._products = products;
    }

    get name(): string {
        return this._name;
    }

    get buildCost(): number {
        return this._buildCost;
    }

    get products(): Product[] {
        return this._products;
    }
}

export {ShopType}