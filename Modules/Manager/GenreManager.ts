import {Genre} from "../Entity/Genre";
import {randomNumber, shuffle} from "../Utils";
import genres from "../Assets/Genres.json";
import {ConfigManager} from "./ConfigManager";

class GenreManager {
    private _genres : Array<Genre> = [];
    private _config : ConfigManager;

    constructor(config : ConfigManager) {
        this._config = config;

        var self = this;
        genres.genres.forEach(function(genre) {
            self._genres.push(new Genre(genre.genre));
        });
        this.update();//get the first popular and unpopular genres
    }

    getRandomGenre() : Genre {
        return this._genres[randomNumber(0, this._genres.length-1)];
    }

    update() {
        var numberPopularGenres : number = 0;
        var numberUnpopularGenres : number = 0;

        //we need to shuffle the genres otherwise the genres on top have a much higher change of becoming (un)popular
        let list = shuffle<Genre>(this._genres);

        this._genres.forEach(function(genre) {
            genre.lowerDuration();

            if(genre.isHype) {
                numberPopularGenres++;
            }
            else if(genre.isUnpopular) {
                numberUnpopularGenres++;
            }
        });

        let self = this;
        this._genres.forEach(function(this: void, genre) {
            let isPopular : boolean = randomNumber(0, 100) <= (self._config.hypeChance - (self._config.hypeChanceDropRate * numberPopularGenres));
            let isUnpopular : boolean = randomNumber(0, 100) <= (self._config.hypeChance - (self._config.hypeChanceDropRate * numberUnpopularGenres));

            if(genre.isHype || genre.isUnpopular) {
                return;
            }
            
            if(isPopular) {
                genre.setPopularity(true, false, randomNumber(self._config.hypeMinimumDuration, self._config.hypeMaximumDuration));
                numberPopularGenres++;
            } else if(isUnpopular) {
                genre.setPopularity(false, true, randomNumber(self._config.hypeMinimumDuration, self._config.hypeMaximumDuration));
                numberUnpopularGenres++;
            }
        });
    }
}

export {GenreManager}