import {MovieType} from "../MovieTypes/MovieType";

class Movie {
    private readonly _movieTitle: string;
    private readonly _movieRating: number;
    private readonly _movieGenre: string;
    private readonly _movieType: MovieType;

    private readonly _uniqueID: number;

    constructor(title: string, rating: number, genre: string, type: MovieType) {
        this._movieTitle = title;
        this._movieRating = rating;
        this._movieGenre = genre;
        this._movieType = type;
        this._uniqueID = Math.floor(Math.random() * 1000000000000000) // random, hopefully unique id
    }

    get movieTitle(): string {
        return this._movieTitle;
    }

    get movieRating(): number {
        return this._movieRating;
    }

    get movieGenre(): string {
        return this._movieGenre;
    }

    get movieType(): MovieType {
        return this._movieType;
    }

    get uniqueID(): number {
        return this._uniqueID;
    }
}
export {Movie};