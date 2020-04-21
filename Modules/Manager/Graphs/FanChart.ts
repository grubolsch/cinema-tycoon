import {ChartConfigInterface, GraphLine} from "./ChartConfigInterface";
import {StatisticsManager} from "../StatisticsManager";

class FanChart implements ChartConfigInterface
{
    getTitle() : string {
        return 'Fans over time';
    }

    targetNodeSelector() : HTMLElement {
        return <HTMLElement>document.querySelector('#chart-fans');
    }

    getHeader() : GraphLine {
        return ['Month', 'Fans'];
    }

    getData(statisticsManager: StatisticsManager, year: number) : Array<Array<number>>|undefined {
        return statisticsManager.getFansOverTime(year);
    }

    getWidthPercentage() : number{
        return 0.4;
    }
}

export {FanChart}