class MovieType {
    private static _isArthouse: boolean = false;
    private static _isBlockbuster: boolean = false;
    private static _isGeneric: boolean = true;

    static isArthouse(value: boolean) {
        this._isArthouse = value;
    }

    static isBlockbuster(value: boolean) {
        this._isBlockbuster = value;
    }

    static isGeneric(value: boolean) {
        this._isGeneric = value;
    }
}

export {MovieType}