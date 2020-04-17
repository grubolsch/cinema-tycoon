class FacilityException extends Error {
    private constructor(msg : string) {
        super(msg);
    }

    static notEnoughMoney() : FacilityException {
        return new this('You don\'t have enough money.');
    }

    static noCashier() : FacilityException {
        return new this('There is no cashier working.')
    }

    static alreadyMaxCashier() : FacilityException {
        return new this('This facility has already max number of cashier .')
    }

    static undefinedFacilityTypeError() {
        return new this('Undefined Facility type.');
    }
}

export {FacilityException}