import {Customer} from "../Entity/Customer";
import {currency} from "../Utils";
import {Cinema} from "../Entity/Cinema";
import {CustomerThought} from "../Entity/CustomerThought";

class RenderCustomerDetailPanel implements RenderInterface {
    private readonly gameArea = <HTMLElement>(document.querySelector('#game-area'));
    private readonly detailPanel = <HTMLElement>(document.querySelector('#customer-detail-panel'));
    private cinema: Cinema;

    constructor(cinema : Cinema) {
        this.renderOnce();
        this.cinema = cinema;
    }

    renderOnce() : void {
        let self = this;
        this.gameArea.addEventListener('click', function(e) {
            console.log();

            // loop parent nodes from the target to the delegation node
            for (var target = e.target; target && target != this; target = (<HTMLElement>target).parentNode) {
                if ((<HTMLElement>target).matches('.customer')) {
                    let customerId = (<HTMLElement>target).dataset.customer!;

                    let customer = self.cinema.customerManager.customers.get(parseInt(customerId));
                    console.log(customerId, customer)

                    if(customer != undefined) {
                        self.show(customer, e.clientX, e.clientY);
                    }

                    break;
                }
            }
        }, false);
    }

    render(): void {}

    show(customer: Customer, x : number, y : number) : void {
        if(customer.gender === Customer.GENDER_MALE) {
            (<HTMLElement>this.detailPanel.querySelector('.fa-male')).style.display = 'inline';
        } else {
            (<HTMLElement>this.detailPanel.querySelector('.fa-female')).style.display = 'inline';
        }

        if(customer.isFan) {
            (<HTMLElement>this.detailPanel.querySelector('.fa-heart')).style.display = 'inline';
        }

        (<HTMLElement>this.detailPanel.querySelector('.customer-name')).innerText = customer.name;
        (<HTMLElement>this.detailPanel.querySelector('.customer-age')).innerText = customer.age.toString();
        (<HTMLElement>this.detailPanel.querySelector('.customer-money-spent')).innerHTML = currency(customer.moneySpent);
        (<HTMLElement>this.detailPanel.querySelector('.customer-genre-comment')).innerText = customer.genreComment(this.cinema.genreManager.getRandomGenre());

        //@todo Need another PR for this
        (<HTMLElement>this.detailPanel.querySelector('.customer-current-action')).innerText = 'Todo';
        //@todo Need another PR for this
        (<HTMLElement>this.detailPanel.querySelector('.customer-ticket')).innerText = 'Todo';

        (<HTMLElement>this.detailPanel.querySelector('.customer-thoughts')).innerHTML = '';

        let self = this;
        customer.thoughts.forEach(function(customerThought) {
            let li = document.createElement('li');
            li.classList.add(customerThought.postive ? 'positive-thought' : 'negative-thought');
            li.innerHTML = '<i class="fa fa-cloud"></i> '+ customerThought.thought;
            (<HTMLElement>self.detailPanel.querySelector('.customer-thoughts')).appendChild(li);
        });

        this.detailPanel.style.left = (x+40) + 'px';
        this.detailPanel.style.top = (y-100) + 'px';
        this.detailPanel.style.display = 'block';
    }
}

export {RenderCustomerDetailPanel}