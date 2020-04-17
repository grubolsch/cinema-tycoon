import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";

class TvCampaignType extends MarketingCampaignType {

    constructor(cinema : Cinema) {
        super('TV', (750 * cinema.roomManager.rooms.size));
    }

    applyBonus(cinema: Cinema): void {
    }

    removeBonus(cinema: Cinema): void {
    }
}

export {TvCampaignType}