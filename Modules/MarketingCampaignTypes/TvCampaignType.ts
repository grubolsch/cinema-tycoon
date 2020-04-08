import {MarketingCampaignType} from "./MarketingCampaignType";

class TvCampaignType extends MarketingCampaignType {

    constructor() {
        super('TV', 1000, 10, 20);
    }
}

export {TvCampaignType}