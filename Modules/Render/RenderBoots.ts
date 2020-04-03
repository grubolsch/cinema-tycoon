import {Cinema} from "../Entity/Cinema";
import {Boot} from "../Entity/Boot";

class RenderBoots implements RenderInterface {
    private readonly _cinema : Cinema;

    constructor(cinema : Cinema) {
        this._cinema = cinema;
        document.querySelector('#build-boot')!.addEventListener('click', function() {
            cinema.bootManager.buildBoot();
            alert('build boot');
        });
    }

    render(): void {
        document.querySelector('#boot-container')!.innerHTML = '';
        this._cinema.bootManager.boots.forEach(function(boot : Boot) {
            // @ts-ignore
            var clone = document.querySelector('#boot-template').content.cloneNode(true);
            clone.querySelector('.boot-ticket-sold').innerHTML = boot.ticketsSold;
            clone.querySelector('.boot-customer-waiting').innerHTML = boot.customers.length;
            clone.querySelector('.boot-customer-away').innerHTML = boot.customersAway;

            document.querySelector('#boot-container')!.appendChild(clone);
        });
    }
}

export {RenderBoots}