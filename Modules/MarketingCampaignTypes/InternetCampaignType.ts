import {MarketingCampaignType} from "./MarketingCampaignType";
import {ConfigManager} from "../Manager/ConfigManager";

class InternetCampaignType extends MarketingCampaignType {

    constructor(config : ConfigManager) {
        super('Internet', config.internet_base_cost, config.internet_base_bonus);
    }
}

export {InternetCampaignType}