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
import {CreditRenderGraph} from "./Modules/Manager/Graphs/CreditGraph";
import {StatisticsManager} from "./Modules/Manager/StatisticsManager";

function generateMovies(genreManager : GenreManager) : void {
    let manyMovies: Array<Movie> = [];
    for (let i = 0; i < 10; i++){
        manyMovies[i] = MovieGenerator.newMovie(genreManager);
    }
    console.log(manyMovies);
}

const observer = new Observer;
const configManager = new ConfigManager;
const loanManager = new LoanManager;
const genreManager = new GenreManager(configManager);

document.addEventListener('DOMContentLoaded', () => {
    // temporary code, this should come from a save or a "create new game" menu
    generateMovies(genreManager);

    let cinema = new Cinema("Our own Cinema", new TimeManager(observer), configManager, new FinanceManager(configManager), new MarketingManager());
    const statisticsManager = new StatisticsManager(cinema);

    //Object responsible for rendering changes in state
    let render = new Render(cinema);
    render.addRender(new RenderLoans(cinema, loanManager));
    render.addRender(new RenderBooths(cinema));
    render.addRender(new RenderResearch(cinema));
    render.addRender(new RenderMarketing(cinema));

    render.addRender(new CreditRenderGraph(cinema, statisticsManager));

    render.render();


    //the main loop that makes the game has a flow of time
    setInterval(() => {
        for (let i = 0; render.speed > i; i++) {
            cinema.update();
        }
        render.render();
    }, 1000);

    //observers
    observer.subscribe(observer.MONTH, () => {
        loanManager.update(cinema);
        genreManager.update();
        cinema.researchManager.update(observer);

        render.renderByMonth();
    });

    observer.subscribe(observer.DAY, () => {
        console.log('A day has passed');

        render.renderByDay();
    });

    observer.subscribe(observer.WEEK, () => {
        console.log('A week has passed');

        statisticsManager.updateWeekly();

        render.renderByWeek();
    });

    observer.subscribe(observer.HOUR, () => {
        console.log('An hour has passed');

        cinema.boothManager.payHourCost();

        render.renderByHour();
    });

    observer.subscribe(observer.YEAR, () => {
        console.log('A year has passed');
    });

    observer.subscribe(observer.RESEARCH_FINISHED, function(params: { research: ResearchItem; }) {
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

    let bar = new DebugBar(cinema, observer);
    bar.init();
});