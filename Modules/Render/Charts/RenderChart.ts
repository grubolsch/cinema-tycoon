import {StatisticsManager} from "../../Manager/StatisticsManager";
import {Cinema} from "../../Entity/Cinema";
import {ChartConfigInterface, GraphLine} from "../../Manager/Graphs/ChartConfigInterface";
import {MONTHS} from "../../Manager/TimeManager";

class RenderChart implements RenderInterface {
    // @ts-ignore
    private readonly modal = $('#statisticsModal');

    private readonly availableElement: HTMLElement  = (<HTMLElement>document.querySelector('#statistics-available'));
    private readonly noDataElement: HTMLElement  = (<HTMLElement>document.querySelector('#statistics-not-available'));
    private readonly buttonElement: HTMLElement  = (<HTMLElement>document.querySelector('#statisticsModalButton'));

    private _statisticsManager : StatisticsManager;
    private _cinema: Cinema;

    private _charts: Array<ChartConfigInterface> = [];

    private rendered : boolean = false;

    constructor(cinema : Cinema, statisticsManager: StatisticsManager) {
        this._cinema = cinema;
        this._statisticsManager = statisticsManager;
    }

    addGraph(chartConfig : ChartConfigInterface) {
        this._charts.push(chartConfig);
    }

    public render() {
        if(this.rendered) {
            return;
        }
        this.rendered = true;

        this.buttonElement.addEventListener('click', () => {
            this.renderGraphs();
        });
    }
    renderGraphs(): void {
        this.modal.modal('show')

        try {
            this._charts.forEach((chart) => {
                let flattenedData: Array<GraphLine> = [];
                flattenedData.push(chart.getHeader());

                let rawData = chart.getData(this._statisticsManager, this._cinema.timeManager.year);
                if (rawData === undefined) {
                    throw new Error('Data for the year '+ this._cinema.timeManager.year + ' not available yet.');
                }
                this.availableElement.classList.remove('hide');
                this.noDataElement.classList.add('hide');

                rawData.forEach(function (valueByWeeks, key) {
                    let month = key;

                    valueByWeeks.forEach(function (value, key) {
                        flattenedData.push([`m ${month}, w ${key}`, value]);
                    });
                });

                // @ts-ignore
                const chartElement = new google.visualization.LineChart(chart.targetNodeSelector());

                // @ts-ignore
                chartElement.draw(google.visualization.arrayToDataTable(flattenedData), this.getChartOptions(chart));
            });
        }
        catch(error) {
            console.error(error)
            this.availableElement.classList.add('hide');
            this.noDataElement.classList.remove('hide');

            this.noDataElement.innerHTML = error.message;
        }
    }


    protected getChartOptions(chartConfig : ChartConfigInterface) : object {
        //we need to calculate this at the moment the modal is clicked because google charts is not responsive itself, and it can only size itself for containers that are visible at the moment of rendering
        let width = Math.ceil(<number>this.modal.width() * chartConfig.getWidthPercentage() / 2);

        console.log(<number>this.modal.width(), chartConfig.getWidthPercentage())

        return {
            'title': chartConfig.getTitle(),
            'curveType': 'function',
            'legend': 'none',
            'width': width,
            'chartArea': {left:0,'width': '100%'},
        };
    }
}

export {RenderChart}