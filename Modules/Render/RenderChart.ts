import {StatisticsManager} from "../Manager/StatisticsManager";
import {Cinema} from "../Entity/Cinema";
import {ChartConfigInterface, GraphLine} from "../Manager/Graphs/ChartConfigInterface";
import {MONTHS} from "../Manager/TimeManager";
import {ChartConfigurationHelper} from "./Helper/ChartConfigurationHelper";

class RenderChartException extends Error {
    static dataNotAvailable(year : number) {
        return new this(`Data for the year ${year} not available yet.`);
    }
}

class RenderChart implements RenderInterface {
    // @ts-ignore
    private readonly modal = $('#statisticsModal');

    private readonly availableElement: HTMLElement = (<HTMLElement>document.querySelector('#statistics-available'));
    private readonly noDataElement: HTMLElement = (<HTMLElement>document.querySelector('#statistics-not-available'));
    private readonly buttonElement: HTMLElement = (<HTMLElement>document.querySelector('#statisticsModalButton'));

    private _statisticsManager: StatisticsManager;
    private _cinema: Cinema;

    private _charts: Array<ChartConfigInterface> = [];

    private rendered: boolean = false;

    constructor(cinema: Cinema) {
        this._cinema = cinema;
        this._statisticsManager = cinema.statisticsManager;
    }

    addGraph(chartConfig: ChartConfigInterface) {
        this._charts.push(chartConfig);
    }

    private readonly movieSelector = (<HTMLSelectElement>document.querySelector('#movie-detail-selector'));

    public render() {
        if (this.rendered) {
            return;
        }
        this.rendered = true;

        this.buttonElement.addEventListener('click', () => {
            this.modal.modal('show');
            this.renderGraphs();
        });

        this.movieSelector.addEventListener('change', () => {
            this.renderGraphs();
        });
    }

    renderGraphs(): void {
        try {
            this._charts.forEach((chartConfig) => {
                let flattenedData: Array<GraphLine> = [];
                flattenedData.push(chartConfig.getHeader());

                let rawData = chartConfig.getData(this._statisticsManager, this._cinema.timeManager.year);
                if (rawData === undefined) {
                    throw RenderChartException.dataNotAvailable(this._cinema.timeManager.year);
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
                const chartElement = new google.visualization.LineChart(chartConfig.targetNodeSelector());

                // @ts-ignore
                chartElement.draw(google.visualization.arrayToDataTable(flattenedData), ChartConfigurationHelper.getChartOptions(this.modal, chartConfig));
            });
        } catch (error) {
            this.availableElement.classList.add('hide');
            this.noDataElement.classList.remove('hide');

            this.noDataElement.innerHTML = error.message;
        }
    }
}

export {RenderChart}