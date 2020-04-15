import {MarketingCampaignInterface} from "./MarketingCampaignInterface";
import {Cinema} from "../Entity/Cinema";

class MarketingCampaignType implements MarketingCampaignInterface{
    name: string;
    cost: number;

    constructor(name: string, cost: number) {
        this.name = name;
        this.cost = cost;
    }

    applyBonus(cinema: Cinema): void {
    }

    removeBonus(cinema: Cinema): void {
    }
}

export {MarketingCampaignType}