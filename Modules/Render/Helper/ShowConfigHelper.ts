import {ShowConfig} from "../../Entity/ShowConfig";
import {Movie} from "../../Entity/Movie";
import {ShowConfigHelperException} from "../../Exception/ShowConfigHelperException";
import {Cinema} from "../../Entity/Cinema";

class ShowConfigHelper {
    static createMovieConfig(cinema : Cinema) : ShowConfig {
        var movieId = parseInt((<HTMLInputElement>document.querySelector('#schedule-planner-movies')).value);
        var hasCommercial = (<HTMLInputElement>document.querySelector('#schedule-planner-commercial')).checked;
        var hasBreak = (<HTMLInputElement>document.querySelector('#schedule-planner-break')).checked;

        let movie : Movie | undefined = cinema.movieManager.movies.get(movieId);
        if(movie === undefined) {
            throw ShowConfigHelperException.invalidMovie('Invalid movie selected');
        }

        return new ShowConfig(movie, hasCommercial, hasBreak);
    }
}

export {ShowConfigHelper}