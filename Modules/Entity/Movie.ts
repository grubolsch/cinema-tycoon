import {MovieType} from "../MovieTypes/MovieType";
import {randomNumber} from "../Utils";

class Movie {
    private readonly _title: string;
    private readonly _rating: number;
    private readonly _genre: string;
    private readonly _type: MovieType;
    private readonly _duration : number;
    private readonly _id: number;

    constructor(title: string, rating: number, genre: string, type: MovieType, duration : number) {
        this._title = title;
        this._rating = rating;
        this._genre = genre;
        this._type = type;
        this._duration = duration;
        this._id = randomNumber(1, 1000000);
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get rating(): number {
        return this._rating;
    }

    get genre(): string {
        return this._genre;
    }

    get type(): MovieType {
        return this._type;
    }

    get duration(): number {
        return this._duration;
    }
}
export {Movie};