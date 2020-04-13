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
import {MovieGenerator} from "./Modules/Generator/MovieGenerator";
import {Movie} from "./Modules/Entity/Movie";
import {RenderResearch} from "./Modules/Render/RenderResearch";
import {ResearchItem} from "./Modules/Entity/Research/ResearchItem";
import {GenreManager} from "./Modules/Manager/GenreManager";
import {DebugBar} from "./Modules/DebugBar";
import {Room} from "./Modules/Entity/Room";
import {MovieType} from "./Modules/MovieTypes/MovieType";
import {RenderScheduler} from "./Modules/Render/RenderScheduler";
import {RenderSchedulerForm} from "./Modules/Render/RenderSchedulerForm";
import {Genre} from "./Modules/Entity/Genre";
import {ReleaseDate} from "./Modules/Entity/ReleaseDate";
import {CustomerSpawnerManager} from "./Modules/Manager/CustomerSpawnerManager";
import {CustomerGenerator} from "./Modules/Generator/CustomerGenerator";
import {Show} from "./Modules/Entity/Show";
import {TimePoint} from "./Modules/Entity/TimePoint";
import {ShowConfig} from "./Modules/Entity/ShowConfig";
import {ReleaseDatePenaltyManager} from "./Modules/Manager/ReleaseDatePenaltyManager";

function generateMovies(config : ConfigManager, timeManager : TimeManager, genreManager : GenreManager) : Array<Movie> {
    let generator = new MovieGenerator(config, timeManager, genreManager);
    let manyMovies: Array<Movie> = [];
    for (let i = 0; i < 10; i++){
        manyMovies[i] = generator.createNewMovie();
    }
    console.log(manyMovies);
    return manyMovies;
}

const observer = new Observer;
const configManager = new ConfigManager;
const loanManager = new LoanManager;
const genreManager = new GenreManager(configManager);
const timeManager = new TimeManager(observer);

document.addEventListener('DOMContentLoaded', () => {
//    generateMovies(configManager, timeManager, genreManager);

    // temporary code, this should come from a save or a "create new game" menu
    let cinema = new Cinema("Our own Cinema", timeManager, configManager, new FinanceManager(configManager), new MarketingManager(), genreManager);
    const releaseDatePenaltyManager = new ReleaseDatePenaltyManager(cinema, configManager);

    let releaseDate = new ReleaseDate(cinema.timeManager.year, cinema.timeManager.month);

    //Tmp code so there is a room and a movie for the scheduler
    let movie = new Movie('Crazy long movie', 7, new Genre('fantasy'), MovieType.isGeneric(), 180, releaseDate);
    cinema.addMovie(movie);
    cinema.addMovie(new Movie('Test movie', 7, new Genre('fantasy'), MovieType.isGeneric(), 60, releaseDate));
    cinema.addMovie(new Movie('Other movie', 7, new Genre('fantasy'), MovieType.isGeneric(), 90, releaseDate));

    let room = new Room("Koen room");
    cinema.addRoom(room);
    cinema.addRoom(new Room("Bona room"));
    cinema.addRoom(new Room("Jan room"));
    cinema.addRoom(new Room("Irina room"));

    cinema.scheduler.plan(new Show(room, new TimePoint(9, 0), new ShowConfig(movie, true, true)));
    cinema.scheduler.plan(new Show(room, new TimePoint(14, 0), new ShowConfig(movie, true, true)));
    //done tmp code

    //Object responsible for rendering changes in state
    let render = new Render(cinema);
    render.addRender(new RenderLoans(cinema, loanManager));
    render.addRender(new RenderBooths(cinema));
    render.addRender(new RenderScheduler(cinema));
    render.addRender(new RenderSchedulerForm(cinema));
    render.addRender(new RenderResearch(cinema));
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
    observer.subscribe(observer.HALFHOUR, () => {
        console.info('Half an hour has passed');

        render.renderByHalfHour();
    });

    observer.subscribe(observer.HOUR, () => {
        console.info('An hour has passed');

        cinema.boothManager.payHourCost();

        render.renderByHour();
    });

    observer.subscribe(observer.WEEK, () => {
        console.info('A week has passed');

        releaseDatePenaltyManager.update();
    });

    observer.subscribe(observer.DAY, () => {
        console.info('A day has passed');

        render.renderByDay();

        cinema.customerSpawnerManager.updateByDay();
    });

    observer.subscribe(observer.MONTH, () => {
        console.info('A month has passed');

        loanManager.update(cinema);
        genreManager.update();
        cinema.researchManager.update(observer);

        render.renderByMonth();
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