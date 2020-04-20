import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";
import {ConfigManager} from "../Manager/ConfigManager";
import {Movie} from "../Entity/Movie";

class TicketsCampaignType extends MarketingCampaignType{

    private _movie: Movie;

    constructor(config : ConfigManager, movie : Movie) {
        super('Tickets', 0, 0);
        this._movie = movie;
    }

    applyBonus(cinema: Cinema): void {

    }

    removeBonus(cinema: Cinema): void {
    }
}

export {TicketsCampaignType}