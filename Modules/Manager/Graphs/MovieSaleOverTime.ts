import {ChartConfigInterface, GraphLine} from "./ChartConfigInterface";
import {StatisticsManager} from "../StatisticsManager";
import {Movie} from "../../Entity/Movie";

class MovieSaleOverTime implements ChartConfigInterface
{
    private readonly movie : Movie;

    constructor(movie: Movie) {
        this.movie = movie;
    }

    getTitle() : string {
        return 'Ticket sales '+ this.movie.title;
    }

    targetNodeSelector() : HTMLElement {
        return <HTMLElement>document.querySelector('#chart-movie-over-time');
    }

    getHeader() : GraphLine {
        return ['Month', 'Ticket sale'];
    }

    getData(statisticsManager: StatisticsManager, year: number) : Array<Array<number>>|undefined {
        return this.movie.ticketHistory[year];
    }

    getWidthPercentage() : number{
        return 0.8;
    }
}

export {MovieSaleOverTime}