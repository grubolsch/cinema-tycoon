import {MarketingCampaignType} from "./MarketingCampaignType";
import {Cinema} from "../Entity/Cinema";
import {ConfigManager} from "../Manager/ConfigManager";

class NewspaperCampaignType extends MarketingCampaignType {
    constructor(config : ConfigManager) {
        super('Newspapers', config.newspapers_base_cost, config.newspapers_base_bonus);
    }
}

export {NewspaperCampaignType}