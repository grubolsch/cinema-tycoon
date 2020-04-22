import {StatisticsManager} from "../StatisticsManager";

type GraphLine = [string, string|number];

interface ChartConfigInterface {
    getTitle() : string;
    targetNodeSelector() : HTMLElement;
    getHeader() : GraphLine
    getData(statisticsManager: StatisticsManager, year: number) : Array<Array<number>>|undefined;
    getWidthPercentage(): number;
}

export {ChartConfigInterface, GraphLine}