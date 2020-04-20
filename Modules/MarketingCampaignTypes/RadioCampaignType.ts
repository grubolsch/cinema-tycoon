import {MarketingCampaignType} from "./MarketingCampaignType";
import {ConfigManager} from "../Manager/ConfigManager";

class RadioCampaignType extends MarketingCampaignType {

    constructor(config : ConfigManager) {
        super('Radio', config.radio_base_cost, config.radio_base_bonus);
    }
}

export {RadioCampaignType}