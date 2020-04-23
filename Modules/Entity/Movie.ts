import {MovieType} from "../MovieTypes/MovieType";
import {Genre} from "./Genre";
import {ReleaseDate} from "./ReleaseDate";
import {MovieManager} from "../Manager/MovieManager";
import {Cinema} from "./Cinema";
import {MarketingCampaign} from "./MarketingCampaign";
import {FreeTicketDistributor} from "../Manager/FreeTicketDistributor";
import {TimeManager} from "../Manager/TimeManager";

type ReviewsType = Array<string>;
type TicketHistoryType = Array<Array<Array<number>>>;

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
    private _reviews: ReviewsType;
    private _freeTicketsRemaining: number = 0;

    constructor(title: string, rating: number, startPopularity: number, genre: Genre, type: MovieType, duration: number, releaseDate: ReleaseDate, cost: number, reviews: ReviewsType) {
        this._id = MovieManager.counter++;
        this._title = title;
        this._rating = rating;
        this._genre = genre;
        this._type = type;
        this._duration = duration;
        this._releaseDate = releaseDate;
        this._cost = cost;
        this._startPopularity = startPopularity;
        this._reviews = reviews;
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

    get reviews(): Array<string> {
        return this._reviews;
    }

    increaseReleasePenalty(quantity: number = 1): void {
        console.log('increase')
        this._releaseDatePenalty += quantity;
    }

    private _ticketHistory : TicketHistoryType = [];
    private _totalRevenue : number = 0;
    private _totalTickets : number = 0;

    public bookTicket(ticketPrice : number, timeManager : TimeManager) {
        const year = timeManager.year;
        const month = timeManager.month;
        const week = timeManager.week;

        let value = 1;

        if(!this._ticketHistory[year]) {
            this._ticketHistory[year] = [];
        }

        if(!this._ticketHistory[year][month]) {
            this._ticketHistory[year][month] = [];
        }

        if(!this._ticketHistory[year][month][week]) {
            this._ticketHistory[year][month][week] = 0;
        }

        this._ticketHistory[year][month][week]++;

        this._totalTickets++;
        this._totalRevenue += ticketPrice;
    }

    get ticketHistory(): TicketHistoryType {
        return this._ticketHistory;
    }

    get totalRevenue(): number {
        return this._totalRevenue - this.cost;
    }

    get totalTickets(): number {
        return this._totalTickets;
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

    getRunningCampaign(cinema: Cinema): MarketingCampaign | null {
        return cinema.marketingManager.activeMovieCampaigns.get(this._id) ?? null;
    }
}
export {Movie, ReviewsType};