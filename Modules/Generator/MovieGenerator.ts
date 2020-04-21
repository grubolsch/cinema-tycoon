import {Movie, ReviewsType} from "../Entity/Movie";
import {MovieType} from "../MovieTypes/MovieType";
import movieNames from "../Assets/movienames.json";
import {GenreManager} from "../Manager/GenreManager";
import {TimeManager} from "../Manager/TimeManager";
import {ReleaseDate} from "../Entity/ReleaseDate";
import {average, randomNumber} from "../Utils";
import {ConfigManager} from "../Manager/ConfigManager";
import {Cinema} from "../Entity/Cinema";
import reviews from "../Assets/reviews.json";

class MovieGenerator {
    //not moving those to config because they are so core that changing these values would change the balance of almost any movie calculation in the game
    private readonly MIN_RATING: number = 1;
    private readonly MAX_RATING: number = 10;

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
        let type = this.typeGenerator(rating);

        return new Movie(this.titleGenerator(),
            rating,
            this.popularityGenerator(rating),
            this.genreManager.getRandomGenre(),
            type,
            this.durationGenerator(),
            new ReleaseDate(this.timeManager.year, this.timeManager.month),
            this.costGenerator(type, rating),
            this.generateReviews(rating)
        );
    }

    private popularityGenerator(rating: number) {
        let startPopularity = Math.min(this.MAX_RATING, Math.max(this.MIN_RATING, randomNumber(rating - this.config.popularityDeviation, rating + this.config.popularityDeviation)));
        return startPopularity;
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
        return Math.ceil(average([randomNumber(this.MIN_RATING, this.MAX_RATING), randomNumber(this.MIN_RATING, this.MAX_RATING), randomNumber(this.MIN_RATING, this.MAX_RATING)]));
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

    private costGenerator(type: MovieType, rating: number): number {
        let cost = randomNumber(this.config.licenseFeeMin, this.config.licenseFeeMax) * rating;

        cost += cost * this.config.licenseFeeExtraPerRoom * (this.cinema.roomManager.rooms.size - 1) / 100;

        if (type.isBlockbuster) {
            cost += cost * this.config.licenseBlockbusterExtraCost / 100;
        }

        return Math.round(cost);
    }

    private generateReviews(rating: number): ReviewsType {
        let reviewsList: ReviewsType = [];
        for (let i = 0; i < this.config.numberOfReviews; i++) {
            let ratingWithDeviation = randomNumber(Math.max(rating - this.config.popularityDeviation, this.MIN_RATING), Math.min(rating + this.config.popularityDeviation, this.MAX_RATING));

            reviewsList.push((ratingWithDeviation) + "/" + this.MAX_RATING + ": " + reviews.reviews[ratingWithDeviation - 1][randomNumber(0, reviews.reviews[ratingWithDeviation - 1].length - 1)]);
        }
        return reviewsList;
    }
}

export {MovieGenerator}