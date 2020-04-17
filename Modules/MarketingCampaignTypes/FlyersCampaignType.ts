import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";

class FlyersCampaignType extends MarketingCampaignType {
    constructor(cinema : Cinema) {
        super('Flyers', (50 * cinema.roomManager.rooms.size), 5);
    }
}

export {FlyersCampaignType}