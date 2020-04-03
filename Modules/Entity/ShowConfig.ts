import {Movie} from "./Movie";

class ShowConfig {
    private readonly DURATION_BREAK = 15;

    private _movie: Movie;
    private _hasCommercial : boolean;
    private _hasBreak : boolean;
    private _duration : number;

    constructor(movie: Movie, hasCommercial: boolean, hasBreak: boolean) {
        this._movie = movie;
        this._hasCommercial = hasCommercial;
        this._hasBreak = hasBreak;

        this._duration = this.calculateDuration();
    }

    private calculateDuration() : number {
        this._duration = this._movie.duration;

        if(this._hasCommercial) {
            this._duration += this.DURATION_BREAK;
        }

        if(this._hasBreak) {
            this._duration += this.DURATION_BREAK;
        }

        return this._duration;
    }

    get movie(): Movie {
        return this._movie;
    }

    get hasCommercial(): boolean {
        return this._hasCommercial;
    }

    get hasBreak(): boolean {
        return this._hasBreak;
    }

    get duration(): number {
        return this._duration;
    }

}

export {ShowConfig}