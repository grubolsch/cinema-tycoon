import {ChartConfigInterface, GraphLine} from "./ChartConfigInterface";
import {StatisticsManager} from "../StatisticsManager";

class VisitorChart implements ChartConfigInterface
{
    getTitle() : string {
        return 'Visitor over time';
    }

    targetNodeSelector() : HTMLElement {
        return <HTMLElement>document.querySelector('#chart-visitors');
    }

    getHeader() : GraphLine {
        return ['Month', 'Visitor'];
    }

    getData(statisticsManager: StatisticsManager, year: number) : Array<Array<number>>|undefined {
        return statisticsManager.getVisitorsOverTime(year);
    }

    getWidthPercentage() : number{
        return 0.4;
    }
}

export {VisitorChart}