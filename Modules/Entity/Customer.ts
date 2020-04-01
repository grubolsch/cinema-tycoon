import * as faker from 'faker';

const GENDER = ['Female','male'];
const MIN_AGE = 18;
const MAX_AGE = 80;

class Customer {
    private _name: string;
    private _age: number;
    private _gender: string;
    private _likeCommercial: boolean;
    private _commercialTolerance: number;
    private _likeBreak: boolean;
    private _breakTolerance: number;
    private _queueingTolerance: number;
    private _pricingToleranceShop: number;
    private _pricingToleranceTicket: number;

    constructor() {
        this._gender = faker.random.arrayElement(GENDER);
        this._name = faker.name.firstName(GENDER.indexOf(this._gender)) + " " + faker.name.lastName(GENDER.indexOf(this._gender));
        this._age = faker.random.number({min:MIN_AGE, max:MAX_AGE});
        this._likeCommercial = faker.random.boolean();
        this._commercialTolerance = 0.2;
        this._likeBreak = faker.random.boolean();
        this._breakTolerance = 0.2;
        this._queueingTolerance = faker.random.number({min:100, max:1000});
        this._pricingToleranceShop = faker.random.number({min:12, max:25})/10;
        this._pricingToleranceTicket = faker.random.number({min:12, max:25})/10;
    }

    get name(): String {
        return this._name;
    }

    get age(): number {
        return this._age;
    }

    get gender(): String {
        return this._gender;
    }

    get likeCommercial(): boolean {
        return this._likeCommercial;
    }

    get commercialTolerance(): number {
        return this._commercialTolerance;
    }

    get likeBreak(): boolean {
        return this._likeBreak;
    }

    get breakTolerance(): number {
        return this._breakTolerance;
    }

    get queueingTolerance(): number {
        return this._queueingTolerance;
    }

    //TODO method to lower queueingTolerance

    get pricingToleranceShop(): number {
        return this._pricingToleranceShop;
    }

    get pricingToleranceTicket(): number {
        return this._pricingToleranceTicket;
    }

    //Testing purpose (temp)
    printCustomerInformation() {
        console.log(this._name + ", " +
            this._gender + ", " +
            this._age + " / " +
            this._likeBreak + ", " +
            this._breakTolerance + ", " +
            this._likeCommercial + ", " +
            this._commercialTolerance + ", " +
            this._queueingTolerance + ", " +
            this._pricingToleranceShop + ", " +
            this._pricingToleranceTicket);
    }
}


export { Customer };