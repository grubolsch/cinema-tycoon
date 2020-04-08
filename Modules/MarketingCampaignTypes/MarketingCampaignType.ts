class MarketingCampaignType {
    name: string;
    cost: number;
    bonus : number;

    constructor(name: string, cost: number, duration: number, bonus: number) {
        this.name = name;
        this.cost = cost;
        this.bonus = bonus;
    }
}

export {MarketingCampaignType}