import {MarketingCampaignType} from "./MarketingCampaignType";

class InternetCampaignType extends MarketingCampaignType {

    constructor() {
        super('Internet', 2000, 10000, 25);
    }
}

export {InternetCampaignType}