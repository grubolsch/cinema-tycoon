"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MarketingCampaign = /** @class */ (function () {
    function MarketingCampaign(type) {
        this.campaignTypes = ['Flyers', 'Newspaper', 'Radio', 'TV', 'Internet'];
        this._type = "";
        this._type = type;
    }
    Object.defineProperty(MarketingCampaign.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    return MarketingCampaign;
}());
exports.MarketingCampaign = MarketingCampaign;
