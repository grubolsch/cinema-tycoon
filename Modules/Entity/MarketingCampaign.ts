import {MarketingCampaignType} from "../MarketingCampaignTypes/MarketingCampaignType";

class MarketingCampaign {

    private _type: MarketingCampaignType;

    constructor(type: MarketingCampaignType) {
        this._type = type;
    }

    get type(): MarketingCampaignType {
        return this._type;
    }

    set type(value: MarketingCampaignType) {
        this._type = value;
    }
}

export {MarketingCampaign};
