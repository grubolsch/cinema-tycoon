import {Cinema} from "./Entity/Cinema";

class DebugBar {
    readonly moneyForm = <HTMLElement>document.querySelector("#debugBar-add-money");
    readonly moneyElement = <HTMLInputElement>document.querySelector("#debugBar-add-money input");

    private readonly _cinema : Cinema;

    constructor(cinema: Cinema) {
        this._cinema = cinema;
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
                observer.trigger(e.target.getAttribute('rel'), [cinema.timeManager]);
            });
        });
    }
}

export {DebugBar}