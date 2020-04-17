import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";

class TicketsCampaignType extends MarketingCampaignType{

    constructor(cinema : Cinema) {
        super('Tickets', (50 * cinema.roomManager.rooms.size));
    }

    applyBonus(cinema: Cinema): void {
    }

    removeBonus(cinema: Cinema): void {
    }
}

export {TicketsCampaignType}