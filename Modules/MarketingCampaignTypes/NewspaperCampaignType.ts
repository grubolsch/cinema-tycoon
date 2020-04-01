import {MarketingCampaignType} from "./MarketingCampaignType";

class NewspaperCampaignType extends MarketingCampaignType {
    constructor() {
        super('Newspapers', 250, 1500, 10);
    }
}

export {NewspaperCampaignType}