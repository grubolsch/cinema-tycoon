class GenreManager {
    private _hypes : Array<Genre> = [];
    private _antiHypes : Array<Genre> = [];

    get hypes(): Array<Genre> {
        return this._hypes;
    }

    set hypes(value: Array<Genre>) {
        this._hypes = value;
    }

    get antiHypes(): Array<Genre> {
        return this._antiHypes;
    }

    set antiHypes(value: Array<Genre>) {
        this._antiHypes = value;
    }
}