import {ConfigManager} from "../Manager/ConfigManager";
import {MarketingCampaign} from "../Entity/MarketingCampaign";
import {MarketingCampaignType} from "../MarketingCampaignTypes/MarketingCampaignType";
import {FlyersCampaignType} from "../MarketingCampaignTypes/FlyersCampaignType";
import {NewspaperCampaignType} from "../MarketingCampaignTypes/NewspaperCampaignType";
import {RadioCampaignType} from "../MarketingCampaignTypes/RadioCampaignType";
import {TvCampaignType} from "../MarketingCampaignTypes/TvCampaignType";
import {InternetCampaignType} from "../MarketingCampaignTypes/InternetCampaignType";
import {TicketsCampaignType} from "../MarketingCampaignTypes/TicketsCampaignType";
import {CampaignTypeException} from "../Exception/CampaignTypeException";
import {Movie} from "../Entity/Movie";
import {TimeManager} from "../Manager/TimeManager";

class CampaignGenerator {

    private readonly _config: ConfigManager;

    constructor(config : ConfigManager) {
        this._config = config;
    }

    createCampaign(type: string, durationWeeks: number, movie: Movie | null = null, freeTicketAmount: number = 0) : MarketingCampaign{
        let campaignType: MarketingCampaignType;
        switch (type) {
            case 'Flyers':
                campaignType = new FlyersCampaignType(this._config);
                break;
            case 'Newspaper':
                campaignType = new NewspaperCampaignType(this._config);
                break;
            case 'Radio':
                campaignType = new RadioCampaignType(this._config);
                break;
            case 'TV':
                campaignType = new TvCampaignType(this._config);
                break;
            case 'Internet':
                campaignType = new InternetCampaignType(this._config);
                break;
            case 'Tickets':
                if (movie !== null){
                    campaignType = new TicketsCampaignType(this._config, movie, freeTicketAmount);
                    durationWeeks = TimeManager.WEEKS_IN_MONTH; // ticket campaigns always run for 1 month / 4 weeks
                    break;
                }
                throw CampaignTypeException.noMovieSelected();
            default:
                throw CampaignTypeException.noSuchType();
        }

        return new MarketingCampaign(campaignType, durationWeeks, movie)
    }
}

export {CampaignGenerator}