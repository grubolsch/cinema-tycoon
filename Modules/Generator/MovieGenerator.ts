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
        return new Movie(this.titleGenerator(), rating, this.genreManager.getRandomGenre(), this.typeGenerator(rating), this.durationGenerator(), new ReleaseDate(this.timeManager.year, this.timeManager.month));
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
        const duration = [90, 120, 150, 180];

        return duration[Math.floor(Math.random() * duration.length)];
    }
}

export {MovieGenerator}