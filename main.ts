import {Observer} from "./Modules/Manager/Observer";
import {ConfigManager} from "./Modules/Manager/ConfigManager";
import {TimeManager} from "./Modules/Manager/TimeManager";
import {Cinema} from "./Modules/Entity/Cinema";
import {CustomerGenerator} from "./Modules/Generator/CustomerGenerator";
import {Render} from "./Modules/Render/Render";
import {FinanceManager} from "./Modules/Manager/FinanceManager";
import {MarketingManager} from "./Modules/Manager/MarketingManager";
import {LoanManager} from "./Modules/Manager/LoanManager";
import {RenderLoans} from "./Modules/Render/RenderLoans";
import {RenderBoots} from "./Modules/Render/RenderBoots";
import {RenderMarketing} from "./Modules/Render/RenderMarketing";
import {Customer} from "./Modules/Entity/Customer";
import {MovieGenerator} from "./Modules/Generator/MovieGenerator";
import {Movie} from "./Modules/Entity/Movie";
import {Room} from "./Modules/Entity/Room";
import {Scheduler} from "./Modules/Entity/Scheduler";
import {Show} from "./Modules/Entity/Show";
import {MovieType} from "./Modules/MovieTypes/MovieType";
import {TimePoint} from "./Modules/Entity/TimePoint";
import {RenderScheduler} from "./Modules/Render/RenderScheduler";
import {RenderSchedulerForm} from "./Modules/Render/RenderSchedulerForm";

function init() {
    generateMovie();
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
    //          init();

    let cinema = new Cinema("Our own Cinema", new TimeManager(observer), configManager, new FinanceManager(configManager), new MarketingManager());

    //Tmp code so there is a room and a movie for the scheduler
    cinema.addMovie(new Movie('Crazy long movie', 7, 'fantasy', MovieType.isGeneric(), 180));
    cinema.addMovie(new Movie('Test movie', 7, 'fantasy', MovieType.isGeneric(), 60));
    cinema.addMovie(new Movie('Other movie', 7, 'fantasy', MovieType.isGeneric(), 90));

    cinema.addRoom(new Room("Koen room"));
    cinema.addRoom(new Room("Bona room"));
    cinema.addRoom(new Room("Jan room"));
    cinema.addRoom(new Room("Irina room"));
    //done tmp code

    //Object responsible for rendering changes in state
    let render = new Render(cinema);
    render.addRender(new RenderLoans(cinema, loanManager));
    render.addRender(new RenderBoots(cinema));
    render.addRender(new RenderScheduler(cinema));
    render.addRender(new RenderSchedulerForm(cinema));
    render.addRender(new RenderMarketing(cinema));
    render.render();

    //the main loop that makes the game has a flow of time
    setInterval(() => {
        for (let i = 0; render.speed > i; i++) {
            cinema.update();
        }
        render.render();
    }, 1000);

    //observers

    observer.subscribe('halfHour', () => {
       render.renderByHalfHour();
    });

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
    });

    observer.subscribe('month', () => {
        loanManager.update(cinema);
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
//        console.info('customer created '+ customer.name);
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