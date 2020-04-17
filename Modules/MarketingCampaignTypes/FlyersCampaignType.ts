import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";

class FlyersCampaignType extends MarketingCampaignType {
    constructor(cinema : Cinema) {
        super('Flyers', (50 * cinema.roomManager.rooms.size));
    }

    applyBonus(cinema: Cinema): void {
    }

    removeBonus(cinema: Cinema): void {
    }
}

export {FlyersCampaignType}