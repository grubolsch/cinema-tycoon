import {MarketingCampaignType} from "./MarketingCampaignType";
import {ConfigManager} from "../Manager/ConfigManager";

class TvCampaignType extends MarketingCampaignType {

    constructor(config : ConfigManager) {
        super('TV', config.tv_base_cost, config.tv_base_bonus);
    }
}

export {TvCampaignType}