import {CustomerThought} from "./CustomerThought";
import {CustomerManager} from "../Manager/CustomerManager";
import {CustomerAppearance} from "../Render/CustomerAppearance";
import {ConfigManager} from "../Manager/ConfigManager";
import {Show} from "./Show";
import {Cinema} from "./Cinema";
import {Movie} from "./Movie";
import {TicketSaleException} from "../Exception/TicketSaleException";
import {CustomerAi} from "../Manager/CustomerAi";
import {Genre} from "./Genre";
import {CustomerAction} from "../CustomerActions/CustomerAction";
import {randomNumber} from "../Utils";
import {Product} from "./Product";
import {FreeTicket} from "./Items/FreeTicket";
import {InventoryItem} from "./Items/InventoryItem";
import {Ticket} from "./Items/Ticket";
import {EmptyLogger} from "../Logger/EmptyLogger";
import {ConsoleLogger} from "../Logger/ConsoleLogger";

type CustomerLocation = { x: number, y: number };

class Customer {
    public readonly PLAN_LEAVE = 'leave';
    public readonly PLAN_WATCH_MOVIE = 'watchmovie';

    public static readonly GENDER_MALE = 'Male';
    public static readonly GENDER_FEMALE = 'Female';

    private _id: number;
    private _name: string;
    private _age: number;
    private _gender: string;
    private _commercialTolerance: number;
    private _queueingTolerance: number;
    private _pricingToleranceShop: number;
    private _pricingToleranceTicket: number;
    private _isFan: boolean;
    private _thoughts: Array<CustomerThought> = [];
    private _moneySpent: number = 0;
    private _appearance: CustomerAppearance;
    private genreThought: Genre | null = null;
    private _targetShow: Show;
    private _inventory: Map<string, InventoryItem> = new Map<string, InventoryItem>();
    private _plans: Map<string, boolean> = new Map<string, boolean>();
    private _ai: CustomerAi | null = null;
    private _logger: LoggerInterface;

    constructor(name: string, age: number, gender: string, commercialTolerance: number,  queueingTolerance: number, pricingToleranceShop: number, pricingToleranceTicket: number, isFan: boolean, targetShow: Show) {
        this._id = CustomerManager.customerCounter++;
        this._name = name;
        this._age = age;
        this._gender = gender;
        this._commercialTolerance = commercialTolerance;
        this._queueingTolerance = queueingTolerance;
        this._pricingToleranceShop = pricingToleranceShop;
        this._pricingToleranceTicket = pricingToleranceTicket;
        this._isFan = isFan;
        this._appearance = new CustomerAppearance(this);
        this._targetShow = targetShow;
        this._logger= new EmptyLogger();
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

    get commercialTolerance(): number {
        return this._commercialTolerance;
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

    get inventory(): Map<string, InventoryItem> {
        return this._inventory;
    }

    addInventoryItem(desc: string, item: InventoryItem): void {
        this._inventory.set(desc, item);
    }

    removeInventoryItem(desc: string): void {
        this._inventory.delete(desc);
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

    get targetShow(): Show {
        return this._targetShow;
    }

    set targetShow(value: Show) {
        this._targetShow = value;
    }

    //Testing purpose (temp)
    printCustomerInformation(): void {
        console.info(this._name + ", " +
            this._gender + ", " +
            this._age + " / " +
            this._commercialTolerance + ", " +
            this._queueingTolerance + ", " +
            this._pricingToleranceShop + ", " +
            this._pricingToleranceTicket);
    }

    genreComment(genre: Genre) {
        //once we set a comment for a genre that customer sticks with it.

        if (this.genreThought === null) {
            this.genreThought = genre;
        }

        if (this.genreThought.isHype) {
            return 'I love ' + this.genreThought.name + ' movies. They are all the rage now.';
        } else if (this.genreThought.isUnpopular) {
            return 'I think ' + this.genreThought.name + ' movies are so boring.';
        }

        return '';
    }

    get hasFreeTicket(): boolean {
        return this._inventory.has(FreeTicket.INV_FREE_TICKET)
    }

    /**
     * Function buys a ticket and sets the thoughts of the customer about the price
     * Returns the price of the ticket
     */
    public purchaseTicket(originalTargetMovie: Movie, cinema: Cinema): number {
        if (this.hasFreeTicket) {
            if (originalTargetMovie.id === this.targetShow.movie.id) {
                this._plans.set(this.PLAN_WATCH_MOVIE, true);
                this.addThought(new CustomerThought(CustomerThought.THOUGHT_USED_FREE_TICKET, true));
                this.targetShow.sellTicket(cinema);

                return 0;
            }

            this.addThought(new CustomerThought(CustomerThought.THOUGHT_COULD_NOT_USE_FREE_TICKET, false));
        }

        let ticketBreakpoint = cinema.config.ticketBreakpointCustomer;
        if (this.isFan) {
            ticketBreakpoint = cinema.config.ticketBreakpointFan;
        }

        if (cinema.config.ticketprice * this.pricingToleranceTicket * ticketBreakpoint <= cinema.ticketPrice) {
            this._plans.set(this.PLAN_LEAVE, true);

            this.addThought(new CustomerThought(CustomerThought.TICKET_EXPENSIVE_WENT_HOME, false));
            throw TicketSaleException.ticketTooExpensive();
        }

        if (cinema.config.ticketprice * this.pricingToleranceTicket <= cinema.ticketPrice) {
            this.addThought(new CustomerThought(CustomerThought.TICKET_EXPENSIVE, false));
        } else if (cinema.config.ticketprice * this.pricingToleranceTicket * cinema.config.ticketCheapBonusThreshold <= cinema.ticketPrice) {
            this.addThought(new CustomerThought(CustomerThought.TICKET_CHEAP, true));
        }

        this._plans.set(this.PLAN_WATCH_MOVIE, true);

        this.addInventoryItem(Ticket.INV_TICKET, new Ticket(this.targetShow.movie));

        this.targetShow.sellTicket(cinema);
        this.pay(cinema.ticketPrice);
        this.targetShow.movie.bookTicket(cinema.ticketPrice, cinema.timeManager);

        return cinema.ticketPrice;
    }

    get plans(): Map<string, boolean> {
        return this._plans;
    }

    update(cinema: Cinema) {
        if (this._ai === null) {
            this._ai = new CustomerAi(cinema, this);
        }

        this._ai.update();
    }

    calculateHappiness(config: ConfigManager) {
        let movieQuality: number = 0;
        let roomQuality: number = 0;

        if (this.plans.get(this.PLAN_WATCH_MOVIE) === true) {
            //make sure he actually watched the movie (not just left the cinema).
            if (this.targetShow.movie != null) {
                movieQuality = this.targetShow.movie.rating * config.movieToQualityFactor;
            }

            if (this.targetShow.room != null) {
                roomQuality = this.targetShow.room.calculateRoomQuality() * config.roomToQualityFactor;
            }
        }

        let thoughtBonus = this.getPositiveThoughts().length * config.thoughtPositiveBonus;
        let thoughtPenalty = this.getNegativeThoughts().length * config.thoughtNegativeBonus;

        //@todo: happiness bonus products
        //@todo: happiness bonus Toilet
        //@todo: happiness bonus Arcade

        return movieQuality + roomQuality + thoughtBonus - thoughtPenalty;
    }

    //refactor to NEED class
    public wantToShop(config : ConfigManager) : boolean {
        let chance : number = config.baseShoppingChance;
        if(this.isFan) {
            chance += config.fanShoppingBonus;
        }

        chance += this.getPositiveThoughts().length * config.thoughtPositiveBonus;
        chance -= this.getNegativeThoughts().length * config.thoughtNegativeBonus;

        return chance >= randomNumber(0, 100);
    }

    public needsToUseToilet(config : ConfigManager) : boolean {
        let chance : number = config.toiletBasicChance;

        let result = Array.from(this.inventory).find(function(product) {
            return product[1].isDrink();
        });


        if(result !== undefined) {
            chance += config.toiletDrinkChance;
        }

        return chance >= randomNumber(0, 100);

    }
    //end refactor

    public getPositiveThoughts(): Array<CustomerThought> {
        return this.thoughts.filter(function (thought) {
            return thought.positive;
        });
    }

    public getNegativeThoughts(): Array<CustomerThought> {
        return this.thoughts.filter(function (thought) {
            return !thought.positive;
        });
    }

    getCurrentAction(): CustomerAction {
        if (this._ai === null) {
            throw new Error('this customer does not have an AI assigned!');
        }

        return this._ai.currentAction;
    }

    wantsToPlayInArcade(config: ConfigManager) {
        return false;
    }

    get logger(): LoggerInterface {
        return this._logger;
    }

    toggleLogger() : boolean {
        if(this._logger instanceof EmptyLogger) {
            this._logger = new ConsoleLogger();
            return true;
        }
        this._logger = new EmptyLogger();
        return false;
    }
}

export {Customer, CustomerLocation};