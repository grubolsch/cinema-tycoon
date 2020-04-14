import {MovieType} from "../MovieTypes/MovieType";
import {randomNumber} from "../Utils";
import {Genre} from "./Genre";
import {ReleaseDate} from "./ReleaseDate";

class Movie {
    private readonly POPULARITY_DEVIATION = 2;
    private readonly POPULARITY_TO_CUSTOMER_FACTOR = 10;
    private readonly RELEASE_DATE_PENALTY = 5;

    private readonly _title: string;
    private readonly _rating: number;
    private readonly _genre: Genre;
    private readonly _type: MovieType;
    private readonly _duration : number;
    private readonly _id: number;
    private readonly _cost: number;
    private readonly _startPopularity: number;
    private readonly _releaseDate: ReleaseDate;
    private _releaseDatePenalty: number = 0;

    constructor(title: string, rating: number, genre: Genre, type: MovieType, duration : number, releaseDate : ReleaseDate) {
        this._title = title;
        this._rating = rating;
        this._genre = genre;
        this._type = type;
        this._duration = duration;
        this._id = randomNumber(1, 1000000);
        this._releaseDate = releaseDate;
        this._startPopularity  = randomNumber(this._rating-this.POPULARITY_DEVIATION, this._rating+this.POPULARITY_DEVIATION);
        this._cost = Math.floor((Math.floor(Math.random() * 200) + 800) * (this.rating / 10));
    }
    get title(): string {
        return this._title;
    }

    get rating(): number {
        return this._rating;
    }

    get genre(): Genre {
        return this._genre;
    }

    get type(): MovieType {
        return this._type;
    }

    get duration(): number {
        return this._duration;
    }

    get id(): number {
        return this._id;
    }

    get cost(): number {
        return this._cost;
    }

    get releaseDate(): ReleaseDate {
        return this._releaseDate;
    }

    get popularity() : number {
        let base = this._startPopularity * this.POPULARITY_TO_CUSTOMER_FACTOR;
        return Math.max(0, base - (base * this._releaseDatePenalty / 100));
    }

    get releaseDatePenalty(): number {
        return this._releaseDatePenalty;
    }

    increaseReleasePenalty() : void {
        this._releaseDatePenalty += this.RELEASE_DATE_PENALTY;
    }
}
export {Movie};