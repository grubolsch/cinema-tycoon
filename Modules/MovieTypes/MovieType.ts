import {MovieTypeException} from "../Exception/MovieTypeException";

class MovieType {
    private _isArthouse: boolean = false;
    private _isBlockbuster: boolean = false;

    private constructor(isBlockbuster : boolean, isArthouse : boolean) {
        if(isBlockbuster && isArthouse) {
            throw MovieTypeException.invalidType();
        }

        this._isBlockbuster = isBlockbuster;
        this._isArthouse = isArthouse;
    }

    static isArthouse() : MovieType {
        return new this(false, true);
    }

    static isBlockbuster() : MovieType {
        return new this(true, false);
    }

    static isGeneric() : MovieType {
        return new this(false, false);
    }

    get isArthouse(): boolean {
        return this._isArthouse;
    }

    get isBlockbuster(): boolean {
        return this._isBlockbuster;
    }

    get isNormal(): boolean {
        return !this._isBlockbuster && !this._isArthouse;
    }
}

export {MovieType}