class LoanException extends Error {
    static loanPaidOff() : LoanException {
        return new this('Loan is paid off');
    }
    static alreadyTookLoan() : LoanException {
        return new this('You already took this Loan');
    }

    static doesNotQualify() : LoanException {
        return new this('You do not qualify for this loan');
    }

    static invalidLoan() : LoanException {
        return new this('This is an invalid loan');
    }
}

export {LoanException}