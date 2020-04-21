import {MarketingCampaignType} from "../MarketingCampaignTypes/MarketingCampaignType";
import {Cinema} from "./Cinema";
import {Movie} from "./Movie";

class MarketingCampaign {

    private readonly _type: MarketingCampaignType;
    private readonly _duration: number;
    private _remainingWeeks: number;
    private readonly _movie: Movie | null;
    private _daysActive: number = 0;

    constructor(type: MarketingCampaignType, duration: number, movie: Movie | null = null) {
        this._type = type;
        this._duration = duration;
        this._remainingWeeks = duration;
        this._movie = movie;
    }

    get type(): MarketingCampaignType {
        return this._type;
    }

    get duration(): number {
        return this._duration;
    }

    get remainingWeeks(): number {
        return this._remainingWeeks;
    }

    get movie(): Movie | null {
        return this._movie;
    }

    get daysActive(): number {
        return this._daysActive;
    }

    addDayActive(): void {
        this._daysActive++;
    }

    applyBonus(cinema: Cinema) {
        this.type.applyBonus(cinema);
    }

    removeBonus(cinema: Cinema) {
        this.type.removeBonus(cinema);
    }

    weekUpdate(): void {
        this._remainingWeeks--;
    }
}

export {MarketingCampaign};
