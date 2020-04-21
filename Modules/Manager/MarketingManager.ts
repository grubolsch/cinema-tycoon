import {MarketingCampaign} from "../Entity/MarketingCampaign";
import {Cinema} from "../Entity/Cinema";
import {ConfigManager} from "./ConfigManager";
import {CampaignGenerator} from "../Generator/CampaignGenerator";
import {Movie} from "../Entity/Movie";

class MarketingManager {

    private readonly _config: ConfigManager;
    private _activeMarketingCampaign: MarketingCampaign | null = null;
    private _activeMovieCampaigns: Map<number, MarketingCampaign> = new Map<number, MarketingCampaign>();

    constructor(config: ConfigManager) {
        this._config = config;
    }

    createCampaign(type: string, duration: number, movie: Movie | null = null, freeTicketAmount: number = 0): MarketingCampaign {
        let campaignGenerator: CampaignGenerator = new CampaignGenerator(this._config);
        return campaignGenerator.createCampaign(type, duration, movie, freeTicketAmount);
    }

    calculateCost(campaign: MarketingCampaign, cinema: Cinema): number {
        if (campaign.movie !== null) {
            if (campaign.type.name === 'Tickets'){
                return (campaign.type.cost * campaign.movie.freeTicketsRemaining);
            }
            return (campaign.type.cost * campaign.duration);
        }
        return ((campaign.type.cost * cinema.roomManager.rooms.size) * campaign.duration);
    }

    calculateFreeTicketsCost(amount: number, cinema: Cinema): number{
        let costPerTicket = (cinema.ticketPrice / 5);
        return (amount * costPerTicket);
    }

    calculatePreviewCost(type: string, duration: number, cinema : Cinema, movie: boolean = false): number {
        let campaignGenerator: CampaignGenerator = new CampaignGenerator(this._config);
        let campaign = campaignGenerator.createCampaign(type, duration);

        if (movie){
            return ((campaign.type.cost * cinema.roomManager.rooms.size) * duration) ;
        }
        return (campaign.type.cost * duration);
    }

    public startCampaign(campaign: MarketingCampaign, cinema: Cinema): boolean {
        let cost = this.calculateCost(campaign, cinema);
        if (cinema.financeManager.canAfford(cost)) {
            cinema.financeManager.pay(cost, 'Marketing Cost');
            this._activeMarketingCampaign = campaign;
            campaign.applyBonus(cinema);
            console.info('New marketing campaign started!');
            return true;
        }
        console.error('Not enough money!');
        return false;
    }

    public startMovieCampaign(campaign: MarketingCampaign, cinema: Cinema, movieId: string) {
        let cost = this.calculateCost(campaign, cinema);
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
                console.info('A marketing campaign has expired!');
            }
        }

        this._activeMovieCampaigns.forEach((campaign, key) => {
            campaign.weekUpdate();
            if (campaign.remainingWeeks === 0) {
                campaign.removeBonus(cinema);
                this._activeMovieCampaigns.delete(key);
                console.info('A marketing campaign has expired!');
            }
        })
    }

    get activeMovieCampaigns(): Map<number, MarketingCampaign> {
        return this._activeMovieCampaigns;
    }

    public checkWeekRangeMinMaxValue(value: number): number {
        if (value > this._config.marketing_max_weeks) {
            return this._config.marketing_max_weeks;
        }
        if (value < this._config.marketing_min_weeks) {
            return this._config.marketing_min_weeks;
        }
        return value;
    }

    get activeMarketingCampaign(): MarketingCampaign | null {
        return this._activeMarketingCampaign;
    }
}

export {MarketingManager}