import {CustomerThought} from "./CustomerThought";
import {randomNumber} from "../Utils";
import {CustomerManager} from "../Manager/CustomerManager";
import {CustomerAppearance} from "../Render/CustomerAppearance";
import {Room} from "./Room";
import {Movie} from "./Movie";
import {ConfigManager} from "../Manager/ConfigManager";

class Customer {
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

    private _visitedRoom : Room|null = null;
    private _visitedMovie : Movie|null = null;


    private THOUGHT_POSTIVE_BONUS = 5;
    private THOUGHT_NEGATIVE_PENALTY = 5;

    calculateHappiness(config : ConfigManager) {
        /*
        *percentage change of converting / losing pop to fan
        If pop saw a blockbuster -20% chance
        If pop saw an arthouse movie +20% chance

        If happiness is more than 100%, it has a chance of making a “friend” a fan.
         */

        let movieQuality = 0;
        if(this._visitedMovie != null) {
            movieQuality = this._visitedMovie.rating * 10;
        }

        let roomQuality = 0;
        if(this._visitedRoom != null) {
            roomQuality = this._visitedRoom.calculateRoomQuality();
        }

        let thoughtBonus = this.getPositiveThoughts().length * this.THOUGHT_POSTIVE_BONUS;
        let thoughtPenalty = this.getNegativeThoughts().length * this.THOUGHT_NEGATIVE_PENALTY;

        //@todo: happiness bonus products
        //@todo: happiness bonus Toilet
        //@todo: happiness bonus Arcade

        return movieQuality + roomQuality + thoughtBonus - thoughtPenalty;
    }

    public getPositiveThoughts() : Array<CustomerThought> {
        return this.thoughts.filter(function (thought) {
            return thought.postive;
        });
    }

    public getNegativeThoughts() : Array<CustomerThought> {
        return this.thoughts.filter(function (thought) {
            return !thought.postive;
        });
    }

    get visitedRoom(): Room | null {
        return this._visitedRoom;
    }

    get visitedMovie(): Movie | null {
        return this._visitedMovie;
    }
}


export { Customer };