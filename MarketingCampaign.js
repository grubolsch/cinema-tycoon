"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MarketingCampaign {
    constructor(type) {
        this.campaignTypes = ['Flyers', 'Newspaper', 'Radio', 'TV', 'Internet'];
        this._type = "";
        this._type = type;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
}
exports.MarketingCampaign = MarketingCampaign;
