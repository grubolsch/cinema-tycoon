import {Cinema} from "../Entity/Cinema";

class RenderCustomers implements RenderInterface {
    private readonly gameArea = <HTMLElement>document.querySelector('#game-area');
    private readonly cinema : Cinema;

    constructor(cinema: Cinema) {
        this.cinema = cinema;
    }

    render(): void {
        let self = this;
        this.cinema.customers.forEach(function(customer) {
            let customerNode : HTMLElement|null = document.querySelector('#customer-' + customer.id);
            if(customerNode === null) {
                customerNode = document.createElement('div');
                customerNode.className = 'customer clickable';
                customerNode.id = 'customer-' + customer.id;
                customerNode.innerText = customer.name;

                self.gameArea.appendChild(customerNode);
            }

            customerNode.style.top = customer.location.x.toString() + "px";
            customerNode.style.left = customer.location.y.toString() + "px";

            console.log('location', customer.location)
        })
    }
}

export {RenderCustomers}