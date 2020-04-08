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




    let movie : Movie = new Movie('test movie', 7, 'fantasy', MovieType.isGeneric(), 60);
    cinema.addMovie(movie);

    let room = new Room("koen room");
    cinema.addRoom(room);

    let show1 = new Show(room, movie, new TimePoint(9, 0), false, false);
    let show2 = new Show(room, movie, new TimePoint(11, 0), false, false);
    let show3 = new Show(room, movie, new TimePoint(13, 0), false, false);

    console.log(show1.duration, show1.start, show1.end);

    let schedule = new Scheduler(cinema);

    console.log(schedule.plan(show1));
    console.log(schedule.plan(show2));
    console.log(schedule.plan(show3));

    console.log(schedule.getShowsByRoom(room));






/*
    table.querySelectorAll('td.drop-enabled').forEach(function(element) {
        element.addEventListener('dragover', function(event) {
            console.log(event);
            const isLink = event.dataTransfer.types.includes("text/plain");


            event.preventDefault();
        });

        element.addEventListener('drop', function(event) {
            alert('release');
            event.preventDefault();
        });
    });
*/

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