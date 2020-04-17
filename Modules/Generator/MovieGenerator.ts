import {Movie} from "../Entity/Movie";
import {MovieType} from "../MovieTypes/MovieType";
import movieNames from "../Assets/movienames.json";
import {GenreManager} from "../Manager/GenreManager";
import {TimeManager} from "../Manager/TimeManager";
import {ReleaseDate} from "../Entity/ReleaseDate";
import {average, randomNumber} from "../Utils";
import {ConfigManager} from "../Manager/ConfigManager";
import {Cinema} from "../Entity/Cinema";

class MovieGenerator {

    private readonly config: ConfigManager;
    private readonly timeManager: TimeManager;
    private readonly genreManager: GenreManager;
    private readonly cinema: Cinema;

    constructor(cinema: Cinema, timeManager: TimeManager, genreManager: GenreManager) {
        this.cinema = cinema;
        this.config = cinema.config;
        this.timeManager = timeManager;
        this.genreManager = genreManager;
    }

    public createNewMovie(): Movie {
        let rating: number = this.ratingGenerator();

        let startPopularity = Math.min(10, Math.max(1, randomNumber(rating - this.config.popularityDeviation, rating + this.config.popularityDeviation)));
        let type = this.typeGenerator(rating);

        return new Movie(this.titleGenerator(), rating, startPopularity, this.genreManager.getRandomGenre(), type, this.durationGenerator(), new ReleaseDate(this.timeManager.year, this.timeManager.month), this.costGenerator(type, rating));
    }

    private typeGenerator(rating: number): MovieType {
        if ((rating > this.config.blockbusterMinRating) && (randomNumber(0, 100) <= this.config.blockbusterChance)) {
            return MovieType.isBlockbuster();
        }

        if (randomNumber(0, 100) <= this.config.arthouseChance) {
            return MovieType.isArthouse();
        }

        return MovieType.isGeneric();
    }

    private ratingGenerator(): number {
        //take the average of three ratings so really bad and exceptionally good movies are more rare.
        return average([randomNumber(1, 10), randomNumber(1, 10), randomNumber(1, 10)]);
    }

    private titleGenerator(): string {
        let partOne: Array<string> = movieNames.firstpart;
        let partTwo: Array<string> = movieNames.lastpart;
        return partOne[Math.floor(Math.random() * partOne.length)] + ' ' +
            partTwo[Math.floor(Math.random() * partTwo.length)];
    }

    private durationGenerator(): number {
        return this.config.movieDurations[Math.floor(Math.random() * this.config.movieDurations.length)];
    }

    private costGenerator(type : MovieType, rating : number) : number {
        let cost = randomNumber(this.config.licenseFeeMin, this.config.licenseFeeMax) * rating;

        cost += cost * this.config.licenseFeeExtraPerRoom * (this.cinema.roomManager.rooms.size-1) / 100;

        if(type.isBlockbuster) {
            cost += cost * this.config.licenseBlockbusterExtraCost / 100;
        }

        return cost;
    }
}

export {MovieGenerator}