import {Cinema} from "../Entity/Cinema";
import {Booth} from "../Entity/Booth";

class RenderBooths implements RenderInterface {
    private readonly _cinema : Cinema;
    private readonly container = <HTMLElement>document.querySelector('#booth-container');
    private readonly template = <HTMLTemplateElement>document.querySelector('#booth-template');

    constructor(cinema : Cinema) {
        this._cinema = cinema;
        document.querySelector('#build-booth')!.addEventListener('click', function() {
            cinema.boothManager.buildBoot();
        });
    }

    render(): void {
        let self = this;
        this.container.innerHTML = '';
        this._cinema.boothManager.booths.forEach(function(booth : Booth) {
            let clone = <HTMLElement>(self.template.content.cloneNode(true));

            clone.querySelector('.booth-ticket-sold')!.innerHTML = booth.ticketsSold.toString();
            clone.querySelector('.booth-customer-waiting')!.innerHTML = booth.customers.length.toString();
            clone.querySelector('.booth-customer-away')!.innerHTML = booth.customersAway.toString();

            document.querySelector('#booth-container')!.appendChild(clone);
        });
    }
}

export {RenderBooths}