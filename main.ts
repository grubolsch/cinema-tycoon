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
import {MovieManager} from "./Modules/Manager/MovieManager";
import {RenderMoviePicker} from "./Modules/Render/RenderMoviePicker";
import {GenreManager} from "./Modules/Manager/GenreManager";
import {DebugBar} from "./Modules/DebugBar";

const observer = new Observer;
const configManager = new ConfigManager;
const loanManager = new LoanManager;
const genreManager = new GenreManager(configManager);

document.addEventListener('DOMContentLoaded', () => {
    // temporary code, this should come from a save or a "create new game" menu

    // @ts-ignore
    showDebug();

    let cinema = new Cinema("Our own Cinema", new TimeManager(observer), configManager, new FinanceManager(configManager), new MarketingManager(), new MovieManager(genreManager));

    //Object responsible for rendering changes in state
    let render = new Render(cinema);
    render.addRender(new RenderLoans(cinema, loanManager));
    render.addRender(new RenderBooths(cinema));
    render.addRender(new RenderResearch(cinema));
    render.addRender(new RenderMarketing(cinema));
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
    observer.subscribe(observer.MONTH, () => {
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
        renderMoviePicker.weeklyMoviePicker(render);
        render.renderByWeek();
    });

    observer.subscribe(observer.HOUR, () => {
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