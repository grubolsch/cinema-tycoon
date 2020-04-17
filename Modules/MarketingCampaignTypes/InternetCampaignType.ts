import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";

class InternetCampaignType extends MarketingCampaignType {

    constructor(cinema : Cinema) {
        super('Internet', (1000 * cinema.roomManager.rooms.size), 25);
    }
}

export {InternetCampaignType}