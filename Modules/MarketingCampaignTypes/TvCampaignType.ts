import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";

class TvCampaignType extends MarketingCampaignType {

    constructor(cinema : Cinema) {
        super('TV', (750 * cinema.roomManager.rooms.size), 20);
    }
}

export {TvCampaignType}