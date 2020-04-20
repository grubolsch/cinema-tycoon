import {MovieType} from "../MovieTypes/MovieType";
import {Genre} from "./Genre";
import {ReleaseDate} from "./ReleaseDate";
import {MovieManager} from "../Manager/MovieManager";
import {Cinema} from "./Cinema";
import {MarketingCampaign} from "./MarketingCampaign";

class Movie {

    private readonly _title: string;
    private readonly _rating: number;
    private readonly _genre: Genre;
    private readonly _type: MovieType;
    private readonly _duration: number;
    private readonly _id: number;
    private readonly _cost: number;
    private readonly _startPopularity: number;
    private readonly _releaseDate: ReleaseDate;
    private _releaseDatePenalty: number = 0;
    private _freeTicketsRemaining: number = 0;

    constructor(title: string, rating: number, startPopularity: number, genre: Genre, type: MovieType, duration: number, releaseDate: ReleaseDate, cost: number) {
        this._id = MovieManager.counter++;
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

    increaseReleasePenalty(quantity: number = 1): void {
        this._releaseDatePenalty += quantity;
    }

    get freeTicketsRemaining(): number {
        return this._freeTicketsRemaining;
    }

    addFreeTickets(amount: number): void {
        this._freeTicketsRemaining += amount;
    }

    removeFreeTicket(): void {
        this._freeTicketsRemaining--;
    }

    removeRemainingTickets(): void {
        this._freeTicketsRemaining = 0;
    }

    hasRunningCampaign(cinema: Cinema): boolean {
        return cinema.marketingManager.activeMovieCampaigns.has(this._id);
    }

    getRunningCampaign(cinema: Cinema): MarketingCampaign {
        return <MarketingCampaign>cinema.marketingManager.activeMovieCampaigns.get(this._id);
    }
}

export {Movie};