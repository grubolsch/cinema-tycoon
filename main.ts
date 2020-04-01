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

function init() {

    // function makeMarketingButtons() {
    //     let types: Array<string> = ['Flyers', 'Newspaper', 'Radio', 'TV', 'Internet'];
    //     types.forEach(type => {
    //         let btn = document.createElement('button');
    //         btn.innerText = type;
    //         btn.addEventListener('click', () => {
    //             if (window.confirm('are you sure you want to start a ' + type + ' campaign ?')){
    //                 newMarketingCampaign(type);
    //             }
    //         });
    //         document.body.appendChild(btn);
    //     });
    // }
    //
    // (function makeStartCampaignButton() {
    //     let btn = document.createElement('button');
    //     btn.innerText = 'Start a marketing campaign';
    //     btn.addEventListener('click', () => {
    //         makeMarketingButtons();
    //     });
    //     document.body.appendChild(btn);
    // }());
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

var observer = new Observer;
var configManager = new ConfigManager;

document.addEventListener('DOMContentLoaded', function() {
    // temporary code, this should come from a save or a "create new game" menu
    init();

    let cinema = new Cinema("Our own Cinema", new TimeManager(observer), configManager, new FinanceManager(configManager));

    //Object responsible for rendering changes in state
    let render = new Render;

    //the main loop that makes the game has a flow of time
    setInterval(function () {
        for (var i = 0; render.speed > i; i++) {
            cinema.update();
        }
        render.render(cinema);
    }, 1000);

    //example code
    observer.subscribe('hour', function() {
        console.log('the hour changed!');
    });
    //end example code

    //control the speed buttons
    document.querySelectorAll('img.speed').forEach(function(element) {
        element.addEventListener('click',  () => {
            render.speed = this.dataset.ticks;
        });
    });
});