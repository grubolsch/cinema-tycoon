// some temporary classes just for type hinting
import {FinanceManager} from "../Manager/FinanceManager";
import {TimeManager} from "../Manager/TimeManager";
import {ConfigManager} from "../Manager/ConfigManager";
import {MarketingCampaign} from "../MarketingCampaign";

class Room {
}

class Movie {
}

class Customer {
}

//end temp code

class Cinema {
    private _name: string;
    private _fans: number;
    private _ticketPrice: number;

    private _rooms: Array<Room> = [];
    private _movies: Array<Movie> = [];
    private _customers: Array<Customer> = [];

    private _timeManager: TimeManager;
    private _financeManager: FinanceManager;

    private _activeMarketingCampaign: MarketingCampaign | null = null;
    private _activeMarketingRemainingDuration : number | null = null;

    public constructor(name: string, TimeManager: TimeManager, StartConfig: ConfigManager, financeManager: FinanceManager) {
        this._name = name;
        this._fans = StartConfig.fans;
        this._ticketPrice = StartConfig.ticketprice;
        this._timeManager = TimeManager;
        this._financeManager = financeManager;
    }

    get name(): string {
        return this._name;
    }

    get fans(): number {
        return this._fans;
    }

    get ticketPrice(): number {
        return this._ticketPrice;
    }

    get rooms(): Array<Room> {
        return this._rooms;
    }

    get movies(): Array<Movie> {
        return this._movies;
    }

    get customers(): Array<Customer> {
        return this._customers;
    }

    get timeManager(): TimeManager {
        return this._timeManager;
    }

    get financeManager(): FinanceManager {
        return this._financeManager;
    }

    get activeMarketingCampaign(): MarketingCampaign | null {
        return this._activeMarketingCampaign;
    }

    set activeMarketingCampaign(value: MarketingCampaign | null) {
        this._activeMarketingCampaign = value;
        if (value !== null) {
            this.activeMarketingRemainingDuration = value.type.duration;
        }
    }

    get activeMarketingRemainingDuration(): number | null {
        return this._activeMarketingRemainingDuration;
    }

    set activeMarketingRemainingDuration(value : number | null) {
        this._activeMarketingRemainingDuration = value;
    }

    public updateMarketingDuration(){

        if (this.activeMarketingCampaign !== null){
            if (this.activeMarketingRemainingDuration !== null && this.activeMarketingRemainingDuration > 0){
                this.activeMarketingRemainingDuration--;
                if (this.activeMarketingRemainingDuration === 0){
                    this.activeMarketingRemainingDuration = null;
                    this.activeMarketingCampaign = null;
                    console.error('Your marketing campaign has expired');
                }
            }
        }

        if (this.activeMarketingCampaign && this.activeMarketingRemainingDuration && this.activeMarketingRemainingDuration > 0){
            console.log(this.activeMarketingCampaign);
            console.log(this.activeMarketingRemainingDuration);
        }
    }

    public update() {
        //temporary code to show the ticket price going up once per tick
        this.financeManager.earn(1, 'ticket sale');

        this.timeManager.updateTime();
    }
}

export {Cinema};