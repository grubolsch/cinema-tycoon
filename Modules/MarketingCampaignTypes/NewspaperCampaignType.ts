import {MarketingCampaignType} from "./MarketingCampaignType";

class NewspaperCampaignType extends MarketingCampaignType {
    constructor() {
        super('Newspapers', 250, 4, 10);
    }
}

export {NewspaperCampaignType}