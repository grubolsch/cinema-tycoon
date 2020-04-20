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

class CampaignGenerator {

    private readonly _config: ConfigManager;

    constructor(config : ConfigManager) {
        this._config = config;
    }

    createCampaign(type: string, duration: number, movie: Movie | null = null) : MarketingCampaign{
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
                    campaignType = new TicketsCampaignType(this._config, movie);
                    break;
                }
                throw CampaignTypeException.noMovieSelected();
            default:
                throw CampaignTypeException.noSuchType();
        }

        return new MarketingCampaign(campaignType, duration, movie)
    }
}

export {CampaignGenerator}