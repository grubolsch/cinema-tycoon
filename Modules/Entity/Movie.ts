class Movie {

    private readonly _movieTitle: string;
    private readonly _movieRating: number;
    private readonly _movieGenre: string;
    private readonly _movieType: Map<string, boolean>;

    constructor(title: string, rating: number, genre: string, type: Map<string, boolean>) {
        this._movieTitle = title;
        this._movieRating = rating;
        this._movieGenre = genre;
        this._movieType = type
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

    get movieType(): Map<string, boolean> {
        return this._movieType;
    }
}
export {Movie};