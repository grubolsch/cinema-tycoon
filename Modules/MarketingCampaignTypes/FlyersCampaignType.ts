import {MarketingCampaignType} from "./MarketingCampaignType";
import {ConfigManager} from "../Manager/ConfigManager";

class FlyersCampaignType extends MarketingCampaignType {
    constructor(config : ConfigManager) {
        super('Flyers', config.flyers_base_cost, config.flyers_base_bonus);
    }
}

export {FlyersCampaignType}