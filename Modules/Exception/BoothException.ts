class BoothException extends Error {
    static invalidUpgrade(level : any) : BoothException {
        return new this('Booth upgrade does not exist: '+ level);
    }

}

export {BoothException}