import {Cinema} from "../Entity/Cinema";
import {Customer} from "../Entity/Customer";
import {Boot} from "../Entity/Boot";

class BootManager {
    private readonly MAX_BOOTS = 6;

    private _boots: Array<Boot> = [];
    private _cinema : Cinema;

    constructor(cinema : Cinema) {
        this._cinema = cinema;
        this._boots.push(new Boot(cinema));//you start with 1 free booth
    }

    addCustomer(customer: Customer) {
        //sort until I have the shortest queue

        let boots : Array<Boot> = [];
        boots = Object.assign(boots, this._boots);

        boots.sort(function (a, b): number {
            return a.customers.length >= b.customers.length ? 1 : -1;
        });

        boots[0].addCustomer(customer);
    }

    update() {
        this._boots.forEach(function (boot) {
            boot.update();
        });
    }

    buildBoot() {
        if(this._boots.length >= this.MAX_BOOTS) {
            alert('You can only build '+ this.MAX_BOOTS + ' boots in your cinema');
            return;
        }

        let boot = new Boot(this._cinema);
        if(!this._cinema.financeManager.canAfford(boot.getBuildCost())) {
            alert('You cannot afford a new booth');
            return;
        }

        this._cinema.financeManager.pay(boot.getBuildCost(), 'Build boot');

        this._boots.push(boot);
    }

    get boots(): Array<Boot> {
        return this._boots;
    }

    payHourCost() : void {
        let costBoots : number = this._boots.length * this._boots[0].getHourCost();

        this._cinema.financeManager.pay(costBoots, 'Wages cashiers');
    }
}

export {BootManager}