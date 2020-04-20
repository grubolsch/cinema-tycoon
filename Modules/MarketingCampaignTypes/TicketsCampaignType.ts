import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";
import {ConfigManager} from "../Manager/ConfigManager";
import {Movie} from "../Entity/Movie";

class TicketsCampaignType extends MarketingCampaignType{

    private readonly _movie: Movie;
    private readonly _amount: number;

    constructor(config : ConfigManager, movie : Movie, amount: number) {
        super('Tickets', 0, 0);
        this._movie = movie;
        this._amount = amount;
    }

    applyBonus(cinema: Cinema): void {
        this._movie.addFreeTickets(this._amount);
    }

    removeBonus(cinema: Cinema): void {
        this._movie.removeRemainingTickets();
    }
}

export {TicketsCampaignType}