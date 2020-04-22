import {ChartConfigInterface} from "../../Manager/Graphs/ChartConfigInterface";

class ChartConfigurationHelper {
    public static getChartOptions(modal : object, chartConfig: ChartConfigInterface): object {
        // @ts-ignore
        let width = <number>modal.width();

        //we need to calculate this at the moment the modal is clicked because google charts is not responsive itself, and it can only size itself for containers that are visible at the moment of rendering
        width = Math.ceil(width * chartConfig.getWidthPercentage() / 2);

        return {
            'title': chartConfig.getTitle(),
            'curveType': 'function',
            'legend': 'none',
            'width': width,
            'chartArea': {left: 0, 'width': '100%'},
        };
    }
}

export {ChartConfigurationHelper}