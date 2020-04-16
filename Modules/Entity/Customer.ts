import {CustomerThought} from "./CustomerThought";
import {randomNumber} from "../Utils";
import {CustomerManager} from "../Manager/CustomerManager";
import {CustomerAppearance} from "../Render/CustomerAppearance";
import {Genre} from "./Genre";

class Customer {
    public static readonly GENDER_MALE = 'Male';
    public static readonly GENDER_FEMALE = 'Female';

    private _id: number;
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
    private _isFan: boolean;
    private _thoughts: Array<CustomerThought> = [];
    private _moneySpent : number = 0;
    private _appearance: CustomerAppearance;
    private genreThought : Genre|null = null;

    constructor(name: string, age: number, gender: string, likeCommercial: boolean, commercialTolerance: number, likeBreak: boolean, breakTolerance: number, queueingTolerance: number, pricingToleranceShop: number, pricingToleranceTicket: number, isFan : boolean) {
        this._id = CustomerManager.customerCounter++;
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
        this._isFan = isFan;
        this._appearance = new CustomerAppearance(this);
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

    get isFan(): boolean {
        return this._isFan;
    }

    addThought(thought: CustomerThought) {
        this._thoughts.push(thought);
    }

    get thoughts(): Array<CustomerThought> {
        return this._thoughts;
    }

    //while the customer has unlimited money, we do track how much money he has spent in the cinema
    pay(ticketPrice: number) {
        this._moneySpent += ticketPrice;
    }

    get moneySpent(): number {
        return this._moneySpent;
    }

    get appearance(): CustomerAppearance {
        return this._appearance;
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

    genreComment(genre: Genre) {
        //once we set a comment for a genre that customer sticks with it.

        if(this.genreThought === null) {
            this.genreThought = genre;
        }

        if(this.genreThought.isHype) {
            return 'I love ' + genre.name + ' movies. They are all the rage now.';
        }
        else if(this.genreThought.isUnpopular) {
            return 'I think ' + genre.name + ' movies are so boring.';
        }

        return '';
    }
}


export { Customer };