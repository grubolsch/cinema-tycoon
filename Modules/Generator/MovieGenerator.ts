import {Movie} from "../Entity/Movie";
import {MovieType} from "../MovieTypes/MovieType";
import movieNames  from  "../Assets/movienames.json";
import {GenreManager} from "../Manager/GenreManager";
import {TimeManager} from "../Manager/TimeManager";
import {ReleaseDate} from "../Entity/ReleaseDate";
import {randomNumber} from "../Utils";
import {ConfigManager} from "../Manager/ConfigManager";

class MovieGenerator {

    private readonly config : ConfigManager;
    private readonly timeManager : TimeManager;
    private readonly genreManager : GenreManager;

    constructor(config : ConfigManager, timeManager: TimeManager, genreManager: GenreManager) {
        this.config = config;
        this.timeManager = timeManager;
        this.genreManager = genreManager;
    }

    public createNewMovie(): Movie {
        let rating : number = this.ratingGenerator();

        let startPopularity = Math.min(10, Math.max(1, randomNumber(rating - this.config.popularityDeviation, rating + this.config.popularityDeviation)));

        let cost = Math.floor((Math.floor(Math.random() * 200) + 800) * (rating / 10));

        return new Movie(this.titleGenerator(), rating, startPopularity, this.genreManager.getRandomGenre(), this.typeGenerator(rating), this.durationGenerator(), new ReleaseDate(this.timeManager.year, this.timeManager.month), cost);
    }

    private typeGenerator(rating : number) : MovieType{
        if((rating > this.config.blockbusterMinRating) && (randomNumber(0, 100) <= this.config.blockbusterChance)) {
            return MovieType.isBlockbuster();
        }

        if(randomNumber(0, 100) <= this.config.arthouseChance) {
            return MovieType.isArthouse();
        }

        return MovieType.isGeneric();
    }

    private ratingGenerator(): number {
        return Math.ceil(Math.random() * 10);
    }

    private titleGenerator() : string {
        let partOne : Array<string> = movieNames.firstpart;
        let partTwo : Array<string> = movieNames.lastpart;
        return  partOne[Math.floor(Math.random() * partOne.length)] + ' ' +
            partTwo[Math.floor(Math.random() * partTwo.length)];
    }

    private durationGenerator() : number {
        return this.config.movieDurations[Math.floor(Math.random() * this.config.movieDurations.length)];
    }
}

export {MovieGenerator}