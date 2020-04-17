import {MarketingCampaign} from "../Entity/MarketingCampaign";
import {MarketingCampaignType} from "../MarketingCampaignTypes/MarketingCampaignType";
import {FlyersCampaignType} from "../MarketingCampaignTypes/FlyersCampaignType";
import {NewspaperCampaignType} from "../MarketingCampaignTypes/NewspaperCampaignType";
import {RadioCampaignType} from "../MarketingCampaignTypes/RadioCampaignType";
import {TvCampaignType} from "../MarketingCampaignTypes/TvCampaignType";
import {InternetCampaignType} from "../MarketingCampaignTypes/InternetCampaignType";
import {CampaignTypeException} from "../Exception/CampaignTypeException";
import {Cinema} from "../Entity/Cinema";
import {TicketsCampaignType} from "../MarketingCampaignTypes/TicketsCampaignType";
import {Movie} from "../Entity/Movie";

const MAX_WEEKS = 12;
const MIN_WEEKS = 1;

class MarketingManager {

    private _activeMarketingCampaign: MarketingCampaign | null = null;
    private _activeMovieCampaigns: Map<number, MarketingCampaign> = new Map<number, MarketingCampaign>();

    public startCampaign(campaign: MarketingCampaign, cinema: Cinema): boolean {
        let cost = campaign.type.cost * campaign.duration;
        if (cinema.financeManager.canAfford(cost)) {
            cinema.financeManager.pay(cost, 'Marketing Cost');
            this._activeMarketingCampaign = campaign;
            campaign.applyBonus(cinema);
            console.info('New marketing campaign started!');
            return true;
        }
        console.error('Not enough money!');
        // TODO tell the player he/she is broke (but in a nice way)
        return false;
    }

    public startMovieCampaign(campaign: MarketingCampaign, cinema: Cinema, movieId: string) {
        let cost = campaign.type.cost * campaign.duration;
        if (cinema.financeManager.canAfford(cost)) {
            cinema.financeManager.pay(cost, 'Marketing Cost');
            this._activeMovieCampaigns.set(parseInt(movieId), campaign);
        }
    }

    public weeklyCampaignUpdate(cinema: Cinema): void {
        if (this._activeMarketingCampaign !== null && this._activeMarketingCampaign.remainingWeeks > 0) {
            this._activeMarketingCampaign.weekUpdate();
            if (this._activeMarketingCampaign.remainingWeeks === 0) {
                this._activeMarketingCampaign.removeBonus(cinema);
                this._activeMarketingCampaign = null;
                console.info('Your marketing campaign has expired!');
            }
        }

        this._activeMovieCampaigns.forEach((campaign, key) => {
            campaign.weekUpdate(); // remainingWeeks--;
            if (campaign.remainingWeeks === 0){
                campaign.removeBonus(cinema);
                this._activeMovieCampaigns.delete(key);
            }
        })
    }

    public createCampaign(type: string, duration: number, cinema: Cinema, movie: Movie | null = null): MarketingCampaign {
        let campaignType: MarketingCampaignType;
        switch (type) {
            case 'Flyers':
                campaignType = new FlyersCampaignType(cinema);
                break;
            case 'Newspaper':
                campaignType = new NewspaperCampaignType(cinema);
                break;
            case 'Radio':
                campaignType = new RadioCampaignType(cinema);
                break;
            case 'TV':
                campaignType = new TvCampaignType(cinema);
                break;
            case 'Internet':
                campaignType = new InternetCampaignType(cinema);
                break;
            case 'Tickets':
                campaignType = new TicketsCampaignType(cinema);
                break;
            default:
                throw CampaignTypeException.noSuchType();
        }

        return new MarketingCampaign(campaignType, duration, movie);
    }

    get activeMovieCampaigns(): Map<number, MarketingCampaign> {
        return this._activeMovieCampaigns;
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
}

export {MarketingManager}