import {GenreException} from "../Exception/GenreException";

class Genre {
    private readonly _name: string;
    private _isHype: boolean = false;
    private _isUnpopular: boolean = false;
    private _duration: number = 0;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    get isHype(): boolean {
        return this._isHype;
    }

    get isUnpopular(): boolean {
        return this._isUnpopular;
    }

    public setPopularity(isHype : boolean, isUnpopular : boolean, duration : number) {
        if(isHype && isUnpopular) {
            throw GenreException.invalidType();
        }

        this._isHype = isHype;
        this._isUnpopular = isUnpopular;

        if(!this._isHype && !this._isUnpopular) {
            duration = 0;
        }
        this._duration = duration;
    }

    public lowerDuration() {
        if(this._duration === 0) {
            return;
        }

        this._duration--;

        if(this._duration === 0) {
            this.setPopularity(false, false, 0);
        }
    }
}

export {Genre}