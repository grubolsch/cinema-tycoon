import {CustomerThought} from "./CustomerThought";
import {randomNumber} from "../Utils";
import {CustomerAction} from "../CustomerActions/CustomerAction";

type Location = {'x' : number, 'y' : number}

class Customer {
    private _id : number;
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

    private _thoughts: Array<CustomerThought> = [];
    private _moneySpent : number = 0;

    private _location : Location = {'x': 0, 'y': 0};//@todo make nullable?
//    private actions : Array<CustomerAction> = [];
    private _currentAction : CustomerAction;

    constructor(name: string, age: number, gender: string, likeCommercial: boolean, commercialTolerance: number, likeBreak: boolean, breakTolerance: number, queueingTolerance: number, pricingToleranceShop: number, pricingToleranceTicket: number) {
        this._id = randomNumber(0, 100000000);
        this._name = name;
        this._age = age;
        this._gender = gender;
        this._likeCommercial = likeCommercial;
        this._commercialTolerance = commercialTolerance;
        this._likeBreak = likeBreak;
        this._breakTolerance = breakTolerance;
        this._queueingTolerance = queueingTolerance;
        this._pricingToleranceShop = pricingToleranceShop;
        this._pricingToleranceTicket = pricingToleranceTicket;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get age(): number {
        return this._age;
    }

    get gender(): string {
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

    get pricingToleranceShop(): number {
        return this._pricingToleranceShop;
    }

    get pricingToleranceTicket(): number {
        return this._pricingToleranceTicket;
    }

    addThought(thought: CustomerThought) {
        this._thoughts.push(thought);
    }

    get thoughts(): Array<CustomerThought> {
        return this._thoughts;
    }

    get location(): Location {
        return this._location;
    }

    //while the customer has unlimited money, we do track how much money he has spent in the cinema
    pay(ticketPrice: number) {
        this._moneySpent += ticketPrice;
    }

    get moneySpent(): number {
        return this._moneySpent;
    }

    get currentAction(): CustomerAction {
        return this._currentAction;
    }

    set currentAction(value: CustomerAction) {
        this._currentAction = value;
    }

//Testing purpose (temp)
    printCustomerInformation() {
        console.info(this._name + ", " +
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

    update() {
        this.currentAction.update();
    }
}


export { Customer, Location };