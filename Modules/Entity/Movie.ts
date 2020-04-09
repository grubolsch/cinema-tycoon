import {MovieType} from "../MovieTypes/MovieType";
import {randomNumber} from "../Utils";
import {Genre} from "./Genre";

class Movie {
    private readonly _title: string;
    private readonly _rating: number;
    private readonly _genre: Genre;
    private readonly _type: MovieType;
    private readonly _duration : number;
    private readonly _id: number;
    private readonly _cost: number;

    constructor(title: string, rating: number, genre: Genre, type: MovieType, duration : number) {
        this._title = title;
        this._rating = rating;
        this._genre = genre;
        this._type = type;
        this._duration = duration;
        this._id = randomNumber(1, 1000000);

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
}
export {Movie};