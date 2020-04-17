import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";

class NewspaperCampaignType extends MarketingCampaignType {
    constructor(cinema : Cinema) {
        super('Newspapers', (150 * cinema.roomManager.rooms.size), 10);
    }
}

export {NewspaperCampaignType}