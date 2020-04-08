import {MarketingCampaignType} from "./MarketingCampaignType";

class FlyersCampaignType extends MarketingCampaignType {

    constructor() {
        super('Flyers', 50, 2, 5);
    }
}

export {FlyersCampaignType}