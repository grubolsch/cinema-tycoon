import {Cinema} from "./Entity/Cinema";
import {Observer} from "./Manager/Observer";

class DebugBar {
    readonly moneyForm = <HTMLElement>document.querySelector("#debugBar-add-money");
    readonly moneyElement = <HTMLInputElement>document.querySelector("#debugBar-add-money input");

    private readonly _cinema : Cinema;
    private readonly _observer : Observer;

    constructor(cinema: Cinema, observer : Observer) {
        this._cinema = cinema;
        this._observer = observer;
    }

    private giveMoney() {
        this._cinema.financeManager.earn(parseInt(this.moneyElement.value), 'blatant cheating');
    }

    init() {
        let self = this;
        this.moneyForm.addEventListener('submit', function(event) {
            event.preventDefault();
            self.giveMoney();
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