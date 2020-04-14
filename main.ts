import {Observer} from "./Modules/Manager/Observer";
import {ConfigManager} from "./Modules/Manager/ConfigManager";
import {TimeManager} from "./Modules/Manager/TimeManager";
import {Cinema} from "./Modules/Entity/Cinema";
import {Render} from "./Modules/Render/Render";
import {FinanceManager} from "./Modules/Manager/FinanceManager";
import {MarketingManager} from "./Modules/Manager/MarketingManager";
import {LoanManager} from "./Modules/Manager/LoanManager";
import {RenderLoans} from "./Modules/Render/RenderLoans";
import {RenderBooths} from "./Modules/Render/RenderBooths";
import {RenderMarketing} from "./Modules/Render/RenderMarketing";
import {RenderResearch} from "./Modules/Render/RenderResearch";
import {ResearchItem} from "./Modules/Entity/Research/ResearchItem";
import {RenderRooms} from "./Modules/Render/RenderRooms";
import {MovieManager} from "./Modules/Manager/MovieManager";
import {RenderMoviePicker} from "./Modules/Render/RenderMoviePicker";
import {GenreManager} from "./Modules/Manager/GenreManager";
import {DebugBar} from "./Modules/DebugBar";
import {Room} from "./Modules/Entity/Room";
import {MovieType} from "./Modules/MovieTypes/MovieType";
import {RenderScheduler} from "./Modules/Render/RenderScheduler";
import {RenderSchedulerForm} from "./Modules/Render/RenderSchedulerForm";
import {Genre} from "./Modules/Entity/Genre";
import {Movie} from "./Modules/Entity/Movie";


const observer = new Observer;
const configManager = new ConfigManager;
const loanManager = new LoanManager;
const genreManager = new GenreManager(configManager);

document.addEventListener('DOMContentLoaded', () => {
    // temporary code, this should come from a save or a "create new game" menu

    // @ts-ignore
    showDebug();

    let cinema = new Cinema("Our own Cinema", new TimeManager(observer), configManager, new FinanceManager(configManager), new MarketingManager(), new MovieManager(genreManager));

    //Tmp code so there is a room and a movie for the scheduler
    cinema.addMovie(new Movie('Crazy long movie', 7, new Genre('fantasy'), MovieType.isGeneric(), 180));
    cinema.addMovie(new Movie('Test movie', 7, new Genre('fantasy'), MovieType.isGeneric(), 60));
    cinema.addMovie(new Movie('Other movie', 7, new Genre('fantasy'), MovieType.isGeneric(), 90));

    // cinema.addRoom(new Room("Koen room"));
    // cinema.addRoom(new Room("Bona room"));
    // cinema.addRoom(new Room("Jan room"));
    // cinema.addRoom(new Room("Irina room"));
    //done tmp code

    //Object responsible for rendering changes in state
    let render = new Render(cinema);
    render.addRender(new RenderLoans(cinema, loanManager));
    render.addRender(new RenderBooths(cinema));
    render.addRender(new RenderRooms(cinema));
    render.addRender(new RenderScheduler(cinema));
    render.addRender(new RenderSchedulerForm(cinema));
    render.addRender(new RenderResearch(cinema));
    render.addRender(new RenderMarketing(cinema));
    render.addRender(new RenderMoviePicker(cinema, render));
    render.render();

    //the main loop that makes the game has a flow of time
    setInterval(() => {
        for (let i = 0; render.speed > i; i++) {
            cinema.update();
        }
        render.render();
    }, 1000);

    //observers
    observer.subscribe(observer.HALFHOUR, () => {
        console.info('Half an hour has passed');

        render.renderByHalfHour();
    });

    observer.subscribe(observer.HOUR, () => {
        console.info('An hour has passed');

        cinema.boothManager.payHourCost();

        render.renderByHour();
    });

    observer.subscribe(observer.DAY, () => {
        console.info('A day has passed');

        render.renderByDay();
    });

    observer.subscribe(observer.MONTH, () => {
        console.info('A month has passed');

        loanManager.update(cinema);
        genreManager.update();
        cinema.researchManager.update(observer);
        render.renderByMonth();
    });

    observer.subscribe(observer.DAY, () => {
        render.renderByDay();
    });

    observer.subscribe(observer.WEEK, () => {
        cinema.marketingManager.weeklyCampaignUpdate();
        // renderMoviePicker.weeklyMoviePicker(render);
        render.renderByWeek();
    });

    observer.subscribe(observer.HOUR, () => {
        cinema.boothManager.payHourCost();
        render.renderByHour();
    });

    observer.subscribe(observer.YEAR, () => {
        console.info('A year has passed');
    });

    observer.subscribe(observer.RESEARCH_FINISHED, function (params: { research: ResearchItem; }) {
        alert('You finished research on ' + params.research.name + '. Make sure you select a new technology to work on. \nStanding still is going backwards.');
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
    let bar = new DebugBar(cinema, observer);
    bar.init();
});