import {Cinema} from "./Entity/Cinema";
import {Observer} from "./Manager/Observer";
import {CustomerGenerator} from "./Generator/CustomerGenerator";

class DebugBar {
    readonly moneyForm = <HTMLElement>document.querySelector("#debugBar-add-money");
    readonly moneyElement = <HTMLInputElement>document.querySelector("#debugBar-add-money input");
    readonly createCustomerButton = <HTMLElement>document.querySelector("#createCustomerDebug");

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

        let customer = generator.createCustomer();
        customer.appearance.render();
        console.log('generated customer', customer);
    }

    init() {
        let self = this;
        this.moneyForm.addEventListener('submit', function(event) {
            event.preventDefault();
            self.giveMoney();
        });

        this.createCustomerButton.addEventListener('click', function() {
            self.createCustomer();
        });

        document.querySelectorAll('div#debugBar button.trigger-event').forEach((element) => {
            element.addEventListener('click', (e) => {
                // @ts-ignore
                self._observer.trigger(e.target.getAttribute('rel'), [self._cinema.timeManager]);
            });
        });
    }
}

export {DebugBar}