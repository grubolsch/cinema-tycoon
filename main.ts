import {MarketingCampaign} from "./Modules/Entity/MarketingCampaign";
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
import {MarketingManager} from "./Modules/Manager/MarketingManager";
import {LoanManager} from "./Modules/Manager/LoanManager";
import {RenderLoans} from "./Modules/Render/RenderLoans";
import {RenderBoots} from "./Modules/Render/RenderBoots";
import {Customer} from "./Modules/Entity/Customer";

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

    if (cinema.financeManager.canAfford(campaign.type.cost)){
        cinema.financeManager.pay(campaign.type.cost, 'Marketing Cost');
        cinema.activeMarketingCampaign = campaign;
    } else {
        console.error('Not enough money!');
        // TODO tell the player he/she is broke
    }
}

const observer = new Observer;
const configManager = new ConfigManager;
const loanManager = new LoanManager;


document.addEventListener('DOMContentLoaded', () => {
    // temporary code, this should come from a save or a "create new game" menu

    let cinema = new Cinema("Our own Cinema", new TimeManager(observer), configManager, new FinanceManager(configManager), new MarketingManager());

    init(cinema);

    //Object responsible for rendering changes in state
    let render = new Render(cinema);
    render.addRender(new RenderLoans(cinema, loanManager));
    render.addRender(new RenderBoots(cinema));
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

    observer.subscribe('hour', function() {
        cinema.bootManager.payHourCost();
    observer.subscribe('hour', () => {
        console.log('An hour has passed');
    });

    observer.subscribe('day', () => {
        console.log('A day has passed')
    });

    observer.subscribe('week', () => {
        console.log('A week has passed')
        cinema.updateMarketingDuration();
    });
    //end observers code

    //tmp code to simulate some vistors joining the cinema

    setInterval(function() {
        let customer = new Customer;
        cinema.bootManager.addCustomer(customer);
        console.info('customer created');
    }, 1000);

    //end test data





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