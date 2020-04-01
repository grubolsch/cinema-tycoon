import {MarketingCampaignType} from "./MarketingCampaignType";

class RadioCampaignType extends MarketingCampaignType {

    constructor() {
        super('Radio', 500, 3000, 15);
    }
}

export {RadioCampaignType}