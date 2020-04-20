import {ChartConfigInterface, GraphLine} from "./ChartConfigInterface";
import {StatisticsManager} from "../StatisticsManager";

class CreditChart implements ChartConfigInterface
{
    getTitle() : string {
        return 'Credit over time';
    }

    targetNodeSelector() : HTMLElement {
        return <HTMLElement>document.querySelector('#chart-credit');
    }

    getHeader() : GraphLine {
        return ['Month', 'Credit'];
    }

    getData(statisticsManager: StatisticsManager, year: number) : Array<Array<number>>|undefined {
        return statisticsManager.getCreditOverTime(year);
    }

    getWidthPercentage() : number{
        return 0.8;
    }
}

export {CreditChart}