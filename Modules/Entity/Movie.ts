import {MovieType} from "../MovieTypes/MovieType";
import {randomNumber} from "../Utils";
import {Genre} from "./Genre";
import {ReleaseDate} from "./ReleaseDate";

class Movie {

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

    constructor(title: string, rating: number, startPopularity : number, genre: Genre, type: MovieType, duration : number, releaseDate : ReleaseDate, cost : number) {
        this._id = randomNumber(1, 1000000);
        this._title = title;
        this._rating = rating;
        this._genre = genre;
        this._type = type;
        this._duration = duration;
        this._releaseDate = releaseDate;
        this._cost = cost;
        this._startPopularity = startPopularity;
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

    get releaseDatePenalty(): number {
        return this._releaseDatePenalty;
    }

    get startPopularity(): number {
        return this._startPopularity;
    }

    increaseReleasePenalty(quantity : number = 1) : void {
        this._releaseDatePenalty += quantity;
    }
}
export {Movie};