import {Cinema} from "../Entity/Cinema";
import {Movie} from "../Entity/Movie";
import {ConfigManager} from "./ConfigManager";
import {randomNumber} from "../Utils";

/**
 * this class lowers a movie popularity over time
 */
class ReleaseDatePenaltyManager {
    private readonly _cinema : Cinema;
    private _config: ConfigManager;

    constructor(cinema: Cinema, config : ConfigManager) {
        this._cinema = cinema;
        this._config = config;
    }

    update() {
        let self = this;
        this._cinema.movieManager.movies.forEach(function(movie) {
            self.updateMovie(movie);
        });
    }

    private updateMovie(movie : Movie) : void {
        if(movie.releaseDatePenalty === this._config.maxPopularityPenalty) {
            //you can never have more than -100% popularity bonus
            return;
        }

        if(randomNumber(0, 100) <= this.getPopularityDropChance(movie)) {
            movie.increaseReleasePenalty(this._config.releaseDatePenalty);
        }
    }

    private getPopularityDropChance(movie : Movie) : number {
        let difference : number = movie.releaseDate.calculateDifferenceInMonths(this._cinema.timeManager);

        if(difference <= this._config.popularityDropThreshold1) {
            return this._config.popularityDrop1;
        }
        else if(difference <= this._config.popularityDropThreshold2) {
            return this._config.popularityDrop2;
        }
        else {
            return this._config.popularityDrop3;
        }
    }
}

export {ReleaseDatePenaltyManager}