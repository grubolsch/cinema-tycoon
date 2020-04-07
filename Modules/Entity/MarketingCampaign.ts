import {MarketingCampaignType} from "../MarketingCampaignTypes/MarketingCampaignType";

class MarketingCampaign {

    readonly _type: MarketingCampaignType;
    readonly _duration : number;

    constructor(type: MarketingCampaignType, duration : number) {
        this._type = type;
        this._duration = duration;
    }

    get type(): MarketingCampaignType {
        return this._type;
    }

    get duration(): number {
        return this._duration;
    }
}

export {MarketingCampaign};
