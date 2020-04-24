import {Customer} from "../Entity/Customer";
import {currency} from "../Utils";
import {Cinema} from "../Entity/Cinema";
import {CustomerThought} from "../Entity/CustomerThought";

class RenderCustomerDetailPanel implements RenderInterface {
    private readonly gameArea = <HTMLElement>(document.querySelector('#game-area'));
    private readonly detailPanel = <HTMLElement>(document.querySelector('#customer-detail-panel'));
    private readonly detailPanelCloseButton = <HTMLElement>(document.querySelector('#customer-detail-panel .close'));
    private readonly toggleLoggingButton = <HTMLElement>(document.querySelector('#customer-detail-panel #toggle-logging'));
    private cinema: Cinema;
    private customer : Customer|null = null;

    constructor(cinema : Cinema) {
        this.renderOnce();
        this.cinema = cinema;
    }

    renderOnce() : void {
        let self = this;
        this.gameArea.addEventListener('click', function(e) {
            // loop parent nodes from the target to the delegation node
            for (var target = e.target; target && target != this; target = (<HTMLElement>target).parentNode) {
                if ((<HTMLElement>target).matches('.customer')) {
                    let customerId = (<HTMLElement>target).dataset.customer!;

                    let customer = self.cinema.customerManager.customers.get(parseInt(customerId));

                    if(customer != undefined) {
                        self.show(customer, e.clientX, e.clientY);
                    }

                    break;
                }
            }
        }, false);

        this.detailPanelCloseButton.addEventListener('click', function () {
            self.detailPanel.style.display = 'none';
            self.customer = null;
        });

        if(this.toggleLoggingButton) {
            this.toggleLoggingButton.addEventListener('click', (event) => {
                let customerId = (<HTMLElement>event.currentTarget).dataset.customer!;
                let customer = self.cinema.customerManager.customers.get(parseInt(customerId));

                if(customer === undefined) return;

                console.log(customer);

                if(customer.toggleLogger()) {
                    this.toggleLoggingButton.innerHTML = 'Toggle logging <em>on</em>';
                } else {
                    this.toggleLoggingButton.innerHTML = 'Toggle logging <em>off</em>';
                }
            });
        }
    }

    render(): void {
        if(this.customer === null) {
            return;
        }

        if(this.toggleLoggingButton) {
            this.toggleLoggingButton.dataset.customer = this.customer.id.toString();
        }

        if(this.customer.gender === Customer.GENDER_MALE) {
            (<HTMLElement>this.detailPanel.querySelector('.fa-male')).style.display = 'inline';
        } else {
            (<HTMLElement>this.detailPanel.querySelector('.fa-female')).style.display = 'inline';
        }

        if(this.customer.isFan) {
            (<HTMLElement>this.detailPanel.querySelector('.fa-heart')).style.display = 'inline';
        }

        (<HTMLElement>this.detailPanel.querySelector('.customer-name')).innerText = this.customer.name;
        (<HTMLElement>this.detailPanel.querySelector('.customer-age')).innerText = this.customer.age.toString();
        (<HTMLElement>this.detailPanel.querySelector('.customer-money-spent')).innerHTML = currency(this.customer.moneySpent);
        (<HTMLElement>this.detailPanel.querySelector('.customer-genre-comment')).innerText = this.customer.genreComment(this.cinema.genreManager.getRandomGenre());

        (<HTMLElement>this.detailPanel.querySelector('.customer-current-action')).innerText = this.customer.getCurrentAction().getDescription(this.cinema, this.customer);
        (<HTMLElement>this.detailPanel.querySelector('.customer-thoughts')).innerHTML = '';
        (<HTMLElement>this.detailPanel.querySelector('.customer-inventory')).innerHTML = '';

        this.customer.thoughts.forEach(customerThought => {
            let li = document.createElement('li');
            li.classList.add(customerThought.positive ? 'positive-thought' : 'negative-thought');
            li.innerHTML = '<i class="fa fa-cloud"></i> '+ customerThought.thought;
            (<HTMLElement>this.detailPanel.querySelector('.customer-thoughts')).appendChild(li);
        });

        this.customer.inventory.forEach(inventoryItem => {
            let li = document.createElement('li');
            li.innerHTML = inventoryItem.description();
            (<HTMLElement>this.detailPanel.querySelector('.customer-inventory')).appendChild(li);
        });
    }

    show(customer: Customer, x : number, y : number) : void {
        this.customer = customer;

        this.render();

        this.detailPanel.style.left = (x+40) + 'px';
        this.detailPanel.style.top = (y-100) + 'px';
        this.detailPanel.style.display = 'block';
    }
}

export {RenderCustomerDetailPanel}