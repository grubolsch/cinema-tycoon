import {Cinema} from "../Entity/Cinema";

class MarketingCampaignType{
    private readonly _name: string;
    private readonly _cost: number;
    private readonly _bonus: number;

    constructor(name: string, cost: number, bonus : number) {
        this._name = name;
        this._cost = cost;
        this._bonus = bonus;
    }

    get name(): string {
        return this._name;
    }

    get cost(): number {
        return this._cost;
    }

    get bonus(): number {
        return this._bonus;
    }

    applyBonus(cinema: Cinema): void {}
    removeBonus(cinema: Cinema): void {}

    isTicketCampaign(): boolean {
        return false;
    }
}

export {MarketingCampaignType}