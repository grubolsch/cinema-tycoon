import {MarketingCampaignType} from "./MarketingCampaignType";

class InternetCampaignType extends MarketingCampaignType {

    constructor() {
        super('Internet', 2000, 12, 25);
    }
}

export {InternetCampaignType}