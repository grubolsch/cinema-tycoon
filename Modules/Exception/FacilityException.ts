class FacilityException extends Error {
    static notEnoughMoney() : FacilityException {
        return new this('You don\'t have enough money.');
    }

    static noCashier() : FacilityException {
        return new this('There is no cashier working.')
    }

    static alreadyMaxCashier() : FacilityException {
        return new this('This facility has already max number of cashiers.')
    }

    static undefinedFacilityTypeError(type : any = undefined) : FacilityException {
        return new this('Undefined Facility type: '+ type);
    }

    static invalidNumberOfCashiers() : FacilityException {
        return new this('Invalid number of cashiers');
    }

    static couldNotFindElement(id : any) : FacilityException {
        return new this('Could not find rendered facility '+ id);
    }
}

export {FacilityException}