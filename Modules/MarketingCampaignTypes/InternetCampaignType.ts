import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";

class InternetCampaignType extends MarketingCampaignType {

    constructor(cinema : Cinema) {
        super('Internet', (1000 * cinema.roomManager.rooms.size));
    }

    applyBonus(cinema: Cinema): void {
    }

    removeBonus(cinema: Cinema): void {
    }
}

export {InternetCampaignType}