import {MarketingCampaign} from "./Modules/MarketingCampaign";
import {Observer} from "./Modules/Manager/Observer";
import {ConfigManager} from "./Modules/Manager/ConfigManager";
import {TimeManager} from "./Modules/Manager/TimeManager";
import {Cinema} from "./Modules/Entity/Cinema";
import {Render} from "./Modules/Render/Render";
import {FinanceManager} from "./Modules/Manager/FinanceManager";
import {FlyersCampaignType} from "./Modules/MarketingCampaignTypes/FlyersCampaignType";
import {NewspaperCampaignType} from "./Modules/MarketingCampaignTypes/NewspaperCampaignType";
import {RadioCampaignType} from "./Modules/MarketingCampaignTypes/RadioCampaignType";
import {TvCampaignType} from "./Modules/MarketingCampaignTypes/TvCampaignType";
import {InternetCampaignType} from "./Modules/MarketingCampaignTypes/InternetCampaignType";
import {MarketingCampaignType} from "./Modules/MarketingCampaignTypes/MarketingCampaignType";

function init(cinema : Cinema) {

    (function bindButtons() {

        (function bindMarketingButtons() {

            document.getElementById('FlyersCampaign')!.addEventListener('click', () => {
                newMarketingCampaign('Flyers', cinema);
            });
            document.getElementById('NewspaperCampaign')!.addEventListener('click', () => {
                newMarketingCampaign('Newspaper', cinema);
            });
            document.getElementById('RadioCampaign')!.addEventListener('click', () => {
                newMarketingCampaign('Radio', cinema);
            });
            document.getElementById('TVCampaign')!.addEventListener('click', () => {
                newMarketingCampaign('TV', cinema);
            });
            document.getElementById('InternetCampaign')!.addEventListener('click', () => {
                newMarketingCampaign('Internet', cinema);
            });

        }());

    }());

}

function newMarketingCampaign(type: string, cinema : Cinema) {
    let campaignType : MarketingCampaignType;
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
    }
    let campaign: MarketingCampaign = new MarketingCampaign(campaignType!);

    cinema.activeMarketingCampaign = campaign;
}

const observer = new Observer;
const configManager = new ConfigManager;

document.addEventListener('DOMContentLoaded', () => {
    // temporary code, this should come from a save or a "create new game" menu

    let cinema = new Cinema("Our own Cinema", new TimeManager(observer), configManager, new FinanceManager(configManager));

    init(cinema);

    //Object responsible for rendering changes in state
    let render = new Render;

    //the main loop that makes the game has a flow of time
    setInterval(() => {
        for (let i = 0; render.speed > i; i++) {
            cinema.update();
        }
        render.render(cinema);
    }, 1000);

    //example code
    observer.subscribe('hour', function () {
        console.log('the hour changed!');
    });
    //end example code

    //control the speed buttons
    document.querySelectorAll('img.speed').forEach((element) => {
        element.addEventListener('click', (e) => {
            render.speed = e.target!.dataset.ticks;
        });
    });
});