import {Cinema} from "./Entity/Cinema";
import {Observer} from "./Manager/Observer";
import {CustomerGenerator} from "./Generator/CustomerGenerator";
import {TimePoint} from "./Entity/TimePoint";
import {Show} from "./Entity/Show";
import {randomNumber} from "./Utils";

class DebugBar {
    private readonly moneyForm = <HTMLElement>document.querySelector("#debugBar-add-money");
    private readonly moneyElement = <HTMLInputElement>document.querySelector("#debugBar-add-money input");
    private readonly createCustomerButton = <HTMLElement>document.querySelector("#createCustomerDebug");
    private readonly cinemaButton = <HTMLElement>document.querySelector("#cinemaLogButton");

    private readonly _cinema : Cinema;
    private readonly _observer : Observer;

    constructor(cinema: Cinema, observer : Observer) {
        this._cinema = cinema;
        this._observer = observer;
    }

    private giveMoney() {
        this._cinema.financeManager.earn(parseInt(this.moneyElement.value), 'blatant cheating');
    }

    private createCustomer() {
        let generator = new CustomerGenerator(this._cinema.config);

        let allShows = this._cinema.scheduler.allShows;
        if(allShows.length === 0) {
            alert('You can only generate customers if you have at least 1 show planned');
            return;
        }

        let customer = generator.createCustomer(allShows[randomNumber(0, allShows.length-1)]);
        this._cinema.customerManager.add(customer);
    }

    init() {
        let self = this;

        this.cinemaButton.addEventListener('click', () => {
            console.log(this._cinema);
        });

        this.moneyForm.addEventListener('submit', event => {
            event.preventDefault();
            self.giveMoney();
        });

        this.createCustomerButton.addEventListener('click', () => {
            self.createCustomer();
        });

        document.querySelectorAll('div#debugBar button.trigger-event').forEach((element) => {
            element.addEventListener('click', (e) => {
                // @ts-ignore
                this._observer.trigger(e.target.getAttribute('rel'), [self._cinema.timeManager]);
            });
        });
    }
}

export {DebugBar}