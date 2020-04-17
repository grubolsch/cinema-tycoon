import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";

class RadioCampaignType extends MarketingCampaignType {

    constructor(cinema : Cinema) {
        super('Radio', (500 * cinema.roomManager.rooms.size), 15);
    }
}

export {RadioCampaignType}