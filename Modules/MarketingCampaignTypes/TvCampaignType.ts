import {MarketingCampaignType} from "./MarketingCampaignType";

class TvCampaignType extends MarketingCampaignType {

    constructor() {
        super('TV', 1000, 6000, 20);
    }
}

export {TvCampaignType}