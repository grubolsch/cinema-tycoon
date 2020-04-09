import {StatisticsManager} from "../StatisticsManager";
import {MONTHS} from "../TimeManager";
import {Cinema} from "../../Entity/Cinema";

type GraphLine = [string, string|number];

abstract class GraphRender implements RenderInterface, RenderByWeekInterface {
    protected _statisticsManager : StatisticsManager;
    protected _cinema: Cinema;

    private _rendered : boolean = false;

    constructor(cinema : Cinema, statisticsManager: StatisticsManager) {
        this._cinema = cinema;
        this._statisticsManager = statisticsManager;
    }

    public render() {
        if(this._rendered) {
           return;
        }
        //this.renderByWeek();
    }

    renderByWeek(): void {
        // @ts-ignore
        var data = google.visualization.arrayToDataTable(this.getData());

        var options = {
            title: this.getTitle(),
            curveType: 'function',
            legend: {position: 'bottom'}
        };

        // @ts-ignore
        var chart = new google.visualization.LineChart(this.targetNodeSelector());

        chart.draw(data, options);
    }

    protected abstract getTitle() : string;
    protected abstract targetNodeSelector() : HTMLElement;
    protected abstract getData() : Array<any>;
}

class CreditRenderGraph extends GraphRender {
    protected getTitle() : string {
        return 'Credit over time';
    }

    protected targetNodeSelector() : HTMLElement {
        return <HTMLElement>document.querySelector('#chart-credit');
    }

    protected getData(): Array<any> {
        let data = [];
        data.push(['Month', 'Credit']);

        this._statisticsManager.creditOverTime[this._cinema.timeManager.year].forEach(function(element, key ) {
            data.push([MONTHS[key-1], element]);
        });

        console.log('stats', this._statisticsManager.creditOverTime, data);
        return data;
    }
}

export {CreditRenderGraph}