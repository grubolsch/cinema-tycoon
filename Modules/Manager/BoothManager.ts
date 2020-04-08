import {Cinema} from "../Entity/Cinema";
import {Customer} from "../Entity/Customer";
import {Booth} from "../Entity/Booth";

class BoothManager {
    private readonly MAX_BOOTHS = 6;

    private _booths: Array<Booth> = [];
    private _cinema : Cinema;

    constructor(cinema : Cinema) {
        this._cinema = cinema;
        this._booths.push(new Booth(cinema));//you start with 1 free booth
    }

    addCustomer(customer: Customer) {
        //sort until I have the shortest queue

        let boots : Array<Booth> = [];
        boots = Object.assign(boots, this._booths);

        boots.sort(function (a, b): number {
            return a.customers.length >= b.customers.length ? 1 : -1;
        });

        boots[0].addCustomer(customer);
    }

    update() {
        this._booths.forEach(function (booth) {
            booth.update();
        });
    }

    buildBoot() {
        if(this._booths.length >= this.MAX_BOOTHS) {
            alert('You can only build '+ this.MAX_BOOTHS + ' boots in your cinema');
            return;
        }

        let booth = new Booth(this._cinema);
        if(!this._cinema.financeManager.canAfford(booth.getBuildCost())) {
            alert('You cannot afford a new booth');
            return;
        }

        this._cinema.financeManager.pay(booth.getBuildCost(), 'Build boot');

        this._booths.push(booth);
    }

    get booths(): Array<Booth> {
        return this._booths;
    }

    payHourCost() : void {
        let costBoots : number = this._booths.length * this._booths[0].getHourCost();

        this._cinema.financeManager.pay(costBoots, 'Wages cashiers');
    }
}

export {BoothManager}