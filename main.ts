import {Observer} from "./Modules/Manager/Observer";
import {ConfigManager} from "./Modules/Manager/ConfigManager";
import {TimeManager} from "./Modules/Manager/TimeManager";
import {Cinema} from "./Modules/Entity/Cinema";
import {CustomerGenerator} from "./Modules/Generator/CustomerGenerator";
import {Render} from "./Modules/Render/Render";
import {FinanceManager} from "./Modules/Manager/FinanceManager";
import {MarketingManager} from "./Modules/Manager/MarketingManager";
import {MovieManager} from "./Modules/Manager/MovieManager";
import {LoanManager} from "./Modules/Manager/LoanManager";
import {RenderLoans} from "./Modules/Render/RenderLoans";
import {RenderBoots} from "./Modules/Render/RenderBoots";
import {RenderMarketing} from "./Modules/Render/RenderMarketing";
import {RenderMoviePicker} from "./Modules/Render/RenderMoviePicker";
import {RenderResearch} from "./Modules/Render/RenderResearch";

const observer = new Observer;
const configManager = new ConfigManager;
const loanManager = new LoanManager;

document.addEventListener('DOMContentLoaded', () => {
    // temporary code, this should come from a save or a "create new game" menu

    //@ts-ignore
    showDebug();

    let cinema = new Cinema("Our own Cinema", new TimeManager(observer), configManager, new FinanceManager(configManager), new MarketingManager(), new MovieManager());

    //Object responsible for rendering changes in state
    let render = new Render(cinema);
    render.addRender(new RenderLoans(cinema, loanManager));
    render.addRender(new RenderBoots(cinema));
    render.addRender(new RenderMarketing(cinema));
    render.addRender(new RenderResearch(cinema));
    render.render();

    let renderMoviePicker = new RenderMoviePicker(cinema);

    //the main loop that makes the game has a flow of time
    setInterval(() => {
        for (let i = 0; render.speed > i; i++) {
            cinema.update();
        }
        render.render();
    }, 1000);

    //observers
    observer.subscribe('hour', () => {
        cinema.bootManager.payHourCost();
        console.log('An hour has passed');
    });

    observer.subscribe('day', () => {
        console.log('A day has passed')
    });

    observer.subscribe('week', () => {
        console.log('A week has passed');

        cinema.marketingManager.weeklyCampaignUpdate();
        renderMoviePicker.weeklyMoviePicker(render);
    });

    observer.subscribe('month', () => {
        loanManager.update(cinema);
        cinema.researchManager.update();
    });

    observer.subscribe('year', () => {
        console.log('A year has passed');
    });
    //end observers code

    //tmp code to simulate some vistors joining the cinema
    let customerGenerater = new CustomerGenerator(configManager);
    setInterval(function() {
        let customer = customerGenerater.createCustomer();
        cinema.bootManager.addCustomer(customer);
        console.info('customer created '+ customer.name);
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
});