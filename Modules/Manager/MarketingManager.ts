import {MarketingCampaign} from "../Entity/MarketingCampaign";
import {MarketingCampaignType} from "../MarketingCampaignTypes/MarketingCampaignType";
import {FlyersCampaignType} from "../MarketingCampaignTypes/FlyersCampaignType";
import {NewspaperCampaignType} from "../MarketingCampaignTypes/NewspaperCampaignType";
import {RadioCampaignType} from "../MarketingCampaignTypes/RadioCampaignType";
import {TvCampaignType} from "../MarketingCampaignTypes/TvCampaignType";
import {InternetCampaignType} from "../MarketingCampaignTypes/InternetCampaignType";
import {CampaignTypeException} from "../Exception/CampaignTypeException";
import {Cinema} from "../Entity/Cinema";

const MAX_WEEKS = 12;
const MIN_WEEKS = 1;

class MarketingManager {

    private _activeMarketingCampaign: MarketingCampaign | null = null;
    private _activeMarketingRemainingDuration: number = 0;

    public startCampaign(campaign: MarketingCampaign, cinema: Cinema): boolean {
        if (cinema.financeManager.canAfford(campaign.type.cost * campaign.duration)) {
            cinema.financeManager.pay(campaign.type.cost * campaign.duration, 'Marketing Cost');
        } else {
            console.error('Not enough money!');
            // TODO tell the player he/she is broke (but in a nice way)
            return false;
        }
        this._activeMarketingCampaign = campaign;
        this._activeMarketingRemainingDuration = campaign.duration;
        console.info('New marketing campaign started!');
        return true;
    }

    public weeklyCampaignUpdate(): void {
        if (this._activeMarketingCampaign !== null && this._activeMarketingRemainingDuration > 0) {
            this._activeMarketingRemainingDuration--;
            if (this._activeMarketingRemainingDuration === 0) {
                this._activeMarketingCampaign = null;
                console.info('Your marketing campaign has expired!');
            }
        }
    }

    public createCampaign(type: string, duration: number): MarketingCampaign {
        let campaignType: MarketingCampaignType;
        switch (type) {
            case 'Flyers':
                campaignType = new FlyersCampaignType();
                break;
            case 'Newspaper':
                campaignType = new NewspaperCampaignType();
                break;
            case 'Radio':
                campaignType = new RadioCampaignType();
                break;
            case 'TV':
                campaignType = new TvCampaignType();
                break;
            case 'Internet':
                campaignType = new InternetCampaignType();
                break;
            default:
                throw CampaignTypeException.noSuchType();
        }

        return new MarketingCampaign(campaignType, duration);
    }

    public checkWeekRangeMinMaxValue(value: number): number {
        if (value > MAX_WEEKS) {
            return MAX_WEEKS
        }
        if (value < MIN_WEEKS) {
            return MIN_WEEKS;
        }
        return value;
    }

    get activeMarketingCampaign(): MarketingCampaign | null {
        return this._activeMarketingCampaign;
    }

    get activeMarketingRemainingDuration(): number {
        return this._activeMarketingRemainingDuration;
    }
}

export {MarketingManager}