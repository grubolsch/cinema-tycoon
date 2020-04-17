import {randomNumber} from "../Utils";
import {Customer, CustomerLocation} from "../Entity/Customer";

class CustomerAppearance {
    private readonly gameAreaElement = <HTMLElement>document.querySelector('#game-area');
    private readonly customerElement : HTMLElement;
    private readonly hair = 'hair';
    private readonly top = 'tops';
    private readonly bottom = 'bottoms';
    private readonly shoes = 'shoes';
    private readonly eyes = 'eyes';
    private readonly customer : Customer;

    private _location: CustomerLocation|null = null;

    constructor(customer : Customer) {
        this.customer = customer;
        this.customerElement = document.createElement('div');
        this.customerElement.className = 'customer';
        this.customerElement.id = 'customer-' + customer.id;

        this.generateSkin();
        this.renderClothPart(this.hair, 13, [-20, -135, -250, -370, -485]);
        this.renderClothPart(this.top, 23, [-20, -187, -418, - 535, -648]);//@todo there are more tops but I am sick of looking for the coordinates
        this.renderClothPart(this.bottom, 25, [-72, -187, -304, -535, -650]);
        this.renderClothPart(this.shoes, 17, [-100, -215]);
        this.renderClothPart(this.eyes, 17, [-60]);
    }

    private generateSkin() {
        let x = randomNumber(0, 11) * -68;
        this.customerElement.style.backgroundPosition =  x + 'px -20px';
    }

    private renderClothPart(className : string, width : number, y : Array<number>) : void {
        let x = randomNumber(0, width-1) * -68;

        let element = document.createElement('div');
        element.className = className;
        element.style.backgroundPosition =  x + 'px '+ y[randomNumber(0, y.length-1)] +'px';

        this.customerElement.appendChild(element);
    }

    public render(location : CustomerLocation) {
        this._location = location;
        this.customerElement.style.top = this._location.x + "px";
        this.customerElement.style.left = this._location.y + "px";

        if(!document.querySelector('#customer-' + this.customer.id)) {
            this.gameAreaElement.appendChild(this.customerElement);
        }
    }

    get location(): CustomerLocation {
        if(this._location === null) {
            return {'x': 0, 'y': 0};
        }

        return this._location;
    }
}

export {CustomerAppearance}