import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";
import {Movie} from "../Entity/Movie";

class TicketsCampaignType extends MarketingCampaignType{

    constructor(cinema : Cinema) {
        super('Tickets', (50 * cinema.roomManager.rooms.size), 0);

    }

    applyBonus(cinema: Cinema): void {

    }

    removeBonus(cinema: Cinema): void {
    }
}

export {TicketsCampaignType}