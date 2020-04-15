import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";
import {MarketingCampaignInterface} from "./MarketingCampaignInterface";

class TicketsCampaignType extends MarketingCampaignType{

    private ticketPriceHolder : number = 0;

    constructor() {
        super('Tickets', 0);
    }

    applyBonus(cinema: Cinema): void {
        this.ticketPriceHolder = cinema.ticketPrice;
        cinema.ticketPrice = 0;
    }

    removeBonus(cinema: Cinema): void {
        cinema.ticketPrice = this.ticketPriceHolder;
    }
}

export {TicketsCampaignType}