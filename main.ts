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
import {RenderMoviePicker} from "./Modules/Render/RenderMoviePicker";
import {DebugBar} from "./Modules/DebugBar";
import {RenderScheduler} from "./Modules/Render/RenderScheduler";
import {RenderSchedulerForm} from "./Modules/Render/RenderSchedulerForm";
import {RenderFacilities} from "./Modules/Render/RenderFacilities";
import {RenderCustomerDetailPanel} from "./Modules/Render/RenderCustomerDetailPanel";
import {StatisticsManager} from "./Modules/Manager/StatisticsManager";
import {randomNumber} from "./Modules/Utils";
import {CreditChart} from "./Modules/Manager/Graphs/CreditChart";
import {FanChart} from "./Modules/Manager/Graphs/FanChart";
import {RenderChart} from "./Modules/Render/RenderChart";
import {VisitorChart} from "./Modules/Manager/Graphs/VisitorsChart";
import {RenderFinancialReport} from "./Modules/Render/RenderFinancialReport";
import {RenderMovieDetailPanel} from "./Modules/Render/RenderMovieDetailPanel";
import {MovieSaleOverTime} from "./Modules/Manager/Graphs/MovieSaleOverTime";
import {GameSpeedManager} from "./Modules/Manager/GameSpeedManager";
import {RenderPriceManager} from "./Modules/Render/RenderPriceManager";

const observer = new Observer;
const configManager = new ConfigManager;
const loanManager = new LoanManager;
const timeManager = new TimeManager(observer);

document.addEventListener('DOMContentLoaded', () => {
    // temporary code, this should come from a save or a "create new game" menu
    let cinema = new Cinema("Our own Cinema", timeManager, configManager, new FinanceManager(configManager));
    //done tmp code


    //Object responsible for rendering changes in state
    let render : Render = new Render(cinema);
    //Object responsible for controlling game speed
    let gameSpeedManager : GameSpeedManager = new GameSpeedManager(render);
    render.addRender(new RenderLoans(cinema, loanManager));
    render.addRender(new RenderBooths(cinema));
    render.addRender(new RenderRooms(cinema));
    render.addRender(new RenderScheduler(cinema));

    let renderMovieDetailPanel = new RenderMovieDetailPanel(cinema)
    render.addRender(renderMovieDetailPanel);

    render.addRender(new RenderSchedulerForm(cinema, renderMovieDetailPanel));
    render.addRender(new RenderResearch(cinema));
    render.addRender(new RenderMarketing(cinema, gameSpeedManager));
    render.addRender(new RenderFacilities(cinema));
    render.addRender(new RenderCustomerDetailPanel(cinema));
    render.addRender(new RenderFinancialReport(cinema.financeManager));
    render.addRender(new RenderMovieDetailPanel(cinema));
    render.addRender(new RenderPriceManager(cinema));

    let renderChart = new RenderChart(cinema);
    renderChart.addGraph(new FanChart());
    renderChart.addGraph(new CreditChart());
    renderChart.addGraph(new VisitorChart());
    render.addRender(renderChart);

    let renderMoviePicker = new RenderMoviePicker(cinema, gameSpeedManager);
    render.addRender(renderMoviePicker);
    render.render();

    //force the screen to pick a movie to show up at the beginning of the game
    renderMoviePicker.renderByWeek();

    //the main loop that makes the game has a flow of time
    setInterval(() => {
        for (let i = 0; render.speed > i; i++) {
            cinema.update();
        }
        render.render();
    }, 1000);

    //observers
    observer.subscribe(observer.HALFHOUR, () => {
        render.renderByHalfHour();
    });

    observer.subscribe(observer.HOUR, () => {
        cinema.boothManager.payHourCost();
        cinema.facilityManager.updateByHour();
        render.renderByHour();
    });

    observer.subscribe(observer.DAY, () => {
        cinema.scheduler.resetShows();
        cinema.customerSpawnerManager.updateByDay();
        cinema.marketingManager.dailyUpdate();
        cinema.facilityManager.updateByDay();
        render.renderByDay();

    });

    observer.subscribe(observer.WEEK, () => {
        cinema.marketingManager.weeklyCampaignUpdate(cinema);
        cinema.statisticsManager.updateWeekly();
        cinema.releaseDatePenaltyManager.update();
        render.renderByWeek();
    });

    observer.subscribe(observer.MONTH, () => {
        loanManager.update(cinema);
        cinema.genreManager.update();
        cinema.facilityManager.updateByMonth();
        cinema.researchManager.update(observer);
        cinema.financeManager.resetReports();
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
    (new DebugBar(cinema, observer)).init();
});