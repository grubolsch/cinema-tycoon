import {InventoryItem} from "./Items/InventoryItem";

class Product implements InventoryItem {
    private readonly DRINK: string = 'drinks';

    private readonly _id: number;
    private readonly _name: string;
    private readonly _happinessBonus: number;
    private readonly _costPrice: number;
    private readonly _defaultPrice: number;
    private readonly _category: string;
    private _sellingPrice: number;

    constructor(id: number, name: string, happinessBonus: number, costPrice: number, sellingPrice: number, category: string) {
        this._id = id;
        this._name = name;
        this._happinessBonus = happinessBonus;
        this._costPrice = costPrice;
        this._sellingPrice = sellingPrice;
        this._defaultPrice = sellingPrice;
        this._category = category;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    description(): string {
        return this.name;
    }

    get happinessBonus(): number {
        return this._happinessBonus;
    }

    get costPrice(): number {
        return this._costPrice;
    }

    get sellingPrice(): number {
        return this._sellingPrice;
    }

    get defaultPrice(): number {
        return this._defaultPrice;
    }

    get profit() : number {
        return this.sellingPrice - this.costPrice;
    }

    set sellingPrice(value: number) {
        if(value <= 0) {
            throw new Error('You cannot give away items for free.');
        }

        this._sellingPrice = value;
    }

    isDrink() : boolean {
        return this._category === this.DRINK;
    }

    get category(): string {
        return this._category;
    }
}

export {Product}