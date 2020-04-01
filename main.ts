import {MarketingCampaign} from "./Modules/MarketingCampaign";
import {MovieGenerator} from "./Modules/Generator/MovieGenerator";
import {Movie} from "./Modules/Entity/Movie";
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
import {LoanManager} from "./Modules/Manager/LoanManager";
import {RenderLoans} from "./Modules/Render/RenderLoans";

function init() {

    (function bindButtons() {

        (function bindMarketingButtons() {

            document.getElementById('FlyersCampaign')!.addEventListener('click', () => {
                newMarketingCampaign('Flyers');
            });
            document.getElementById('NewspaperCampaign')!.addEventListener('click', () => {
                newMarketingCampaign('Newspaper');
            });
            document.getElementById('RadioCampaign')!.addEventListener('click', () => {
                newMarketingCampaign('Radio');
            });
            document.getElementById('TVCampaign')!.addEventListener('click', () => {
                newMarketingCampaign('TV');
            });
            document.getElementById('InternetCampaign')!.addEventListener('click', () => {
                newMarketingCampaign('Internet');
            });

        }());

    }());
}

function newMarketingCampaign(type: string) {
    let campaign: MarketingCampaign;
    switch (type) {
        case 'Flyers':
            campaign = new MarketingCampaign(new FlyersCampaignType());
            break;
        case 'Newspaper':
            campaign = new MarketingCampaign(new NewspaperCampaignType());
            break;
        case 'Radio':
            campaign = new MarketingCampaign(new RadioCampaignType());
            break;
        case 'TV':
            campaign = new MarketingCampaign(new TvCampaignType());
            break;
        case 'Internet':
            campaign = new MarketingCampaign(new InternetCampaignType());
            break;
    }
    // TODO set campaign as active on the cinema object
    console.log(campaign!.type);
}

function generateMovie() {
    let manyMovies: Array<Movie> = [];
    for (let i = 0; i < 10; i++){
        manyMovies[i] = MovieGenerator.newMovie();
    }
    console.log(manyMovies);
}

const observer = new Observer;
const configManager = new ConfigManager;
const loanManager = new LoanManager;

document.addEventListener('DOMContentLoaded', () => {
    // temporary code, this should come from a save or a "create new game" menu
    init();

    let cinema = new Cinema("Our own Cinema", new TimeManager(observer), configManager, new FinanceManager(configManager));

    //Object responsible for rendering changes in state
    let render = new Render(cinema);
    render.addRender(new RenderLoans(cinema, loanManager));
    render.render();

    //the main loop that makes the game has a flow of time
    setInterval(() => {
        for (let i = 0; render.speed > i; i++) {
            cinema.update();
        }
        render.render();
    }, 1000);

    //observers

    observer.subscribe('month', function() {
        loanManager.update(cinema);
    });
    //end observers code

    //control the speed buttons
    document.querySelectorAll('img.speed').forEach((element) => {
        element.addEventListener('click', (e) => {
            // @ts-ignore
            render.speed = e.target.dataset.ticks;
        });
    });

    //create the debug bar
    document.querySelectorAll('div#debugBar button.trigger-event').forEach((element) => {
        element.addEventListener('click', (e) => {
            // @ts-ignore
            observer.trigger(e.target.getAttribute('rel'), [cinema.timeManager]);
        });
    });

    // trigger-event btn btn-secondary" rel="hour

});
