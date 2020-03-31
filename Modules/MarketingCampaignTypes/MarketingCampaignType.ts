class MarketingCampaignType {
    name: string;
    cost: number;
    duration: number;
    bonus : number;

    constructor(name: string, cost: number, duration: number, bonus: number) {
        this.name = name;
        this.cost = cost;
        this.duration = duration;
        this.bonus = bonus;
    }
}

export {MarketingCampaignType}