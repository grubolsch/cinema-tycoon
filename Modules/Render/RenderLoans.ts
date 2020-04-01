import {LoanManager} from "../Manager/LoanManager";
import {Loan} from "../Entity/Loan";
import {Cinema} from "../Entity/Cinema";
import {LoanException} from "../Exception/LoanException";
import {currency} from "../Utils";

class RenderLoans implements RenderInterface {
    private _cinema : Cinema;
    private _loanManager : LoanManager;

    constructor(cinema: Cinema, loanManager: LoanManager) {
        this._cinema = cinema;
        this._loanManager = loanManager;

        this.renderOneTime();
    }

    public renderOneTime() {
        var self = this;
        this._loanManager.loans.forEach(function(loan : Loan) {
            // @ts-ignore
            var clone = document.querySelector('#loan-template').content.cloneNode(true);
            clone.querySelector('.loan-required-fans').innerHTML = loan.requiredFans;
            clone.querySelector('.loan-value').innerHTML = currency(loan.amount);
            clone.querySelector('.loan-duration').innerHTML = loan.durationInMonths + ' months';
            clone.querySelector('.loan-interest').innerHTML = loan.interest + ' %';
            clone.querySelector('button.take-loan').dataset.id = loan.id;

            document.querySelector('#loans')!.appendChild(clone);
        });

        document.querySelectorAll('#loans button.take-loan').forEach(function(element) {
            element.addEventListener('click', function() {
                // @ts-ignore
                let id = parseInt(this.dataset.id);
                let loan : Loan|undefined = self._loanManager.loans.get(id);

                try {
                    if (loan === undefined) {
                        throw LoanException.invalidLoan();
                    }

                    self._loanManager.takeLoan(self._cinema, loan);
                    alert('You took '+ loan.amount + ' EUR out with a loan! Use the money wisely!');
                }
                catch(error) {
                    if(error instanceof LoanException) {
                        alert(error.message);
                    } else {
                        //this should never happen
                        alert('Unknown error: '+ error.message);
                    }
                }
            });
        });
    }

    public render() {
        var self = this;

        //enable or disable the loan buttons
        document.querySelectorAll('#loans button.take-loan').forEach(function(button) {
            // @ts-ignore
            let id = parseInt(button.dataset.id);
            let loan : Loan|undefined = self._loanManager.loans.get(id);

            if (loan === undefined) {
                return;
            }

            if(self._loanManager.canTakeLoan(self._cinema, loan)) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', 'disabled');
            }
        });
    }
}

export {RenderLoans}