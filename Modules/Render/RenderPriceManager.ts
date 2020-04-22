import {Cinema} from "../Entity/Cinema";
import {ProductManager} from "../Manager/ProductManager";
import {currency} from "../Utils";

class RenderPriceManager implements RenderInterface {
    private readonly TYPE_TICKET = 'TICKET';

    private readonly cinema: Cinema;
    private readonly productManager: ProductManager;

    private readonly tableElement = <HTMLElement>document.querySelector('#price-manager-tbody');
    private readonly template = <HTMLTemplateElement>document.querySelector('#price-manager-row-template');

    constructor(cinema: Cinema) {
        this.cinema = cinema;
        this.productManager = cinema.productManager;

        this.renderOnce();
    }

    renderOnce(): void {

        this.renderTicketPriceWidget();

        this.productManager.products.forEach((product) => {
            let clone = <HTMLElement>(this.template.content.cloneNode(true));

            (<HTMLElement>clone.querySelector('.price-manager-product-name')).innerText = product.name;
            (<HTMLElement>clone.querySelector('.price-manager-product-cost')).innerHTML = currency(product.costPrice);
            (<HTMLInputElement>clone.querySelector('.price-manager-product-profit')).innerHTML = currency(product.profit);

            (<HTMLInputElement>clone.querySelector('.price-manager-product-price')).value = product.sellingPrice.toString();
            (<HTMLInputElement>clone.querySelector('.price-manager-product-price')).name = product.id.toString();

            this.tableElement.appendChild(clone);
        });

        this.tableElement.querySelectorAll('.price-manager-product-price').forEach((element) => {
            element.addEventListener('change', (event) => {
                let target = <HTMLInputElement>event.target;

                let price = parseFloat(parseFloat(target.value).toFixed(2));

                if (this.TYPE_TICKET == target.name) {
                    return this.handleTicketPriceChange(target, price);
                }

                this.handleProductPriceChange(target, price);
            });
        });
    }

    renderTicketPriceWidget() {
        let clone = <HTMLElement>(this.template.content.cloneNode(true));

        (<HTMLElement>clone.querySelector('.price-manager-product-name')).innerText = 'Ticket price';
        (<HTMLInputElement>clone.querySelector('.price-manager-product-price')).value = this.cinema.ticketPrice.toString();
        (<HTMLInputElement>clone.querySelector('.price-manager-product-price')).name = this.TYPE_TICKET;

        this.tableElement.appendChild(clone);
    }

    render(): void {
    }

    private handleTicketPriceChange(target: HTMLInputElement, price: number) {
        if (isNaN(price)) {
            target.value = this.cinema.ticketPrice.toString();
            return;
        }

        this.cinema.ticketPrice = price;

        return;
    }

    private handleProductPriceChange(target: HTMLInputElement, price: number) {
        let product = this.productManager.products.get(parseInt(target.name));

        if (product === undefined) {
            return;
        }

        if (isNaN(price)) {
            target.value = product.sellingPrice.toString();
            return;
        }

        if(!target.parentElement || !target.parentElement.parentElement) {
            console.error('Elements missing to handleProductPriceChange()')
            return;
        }

        let tr = <HTMLElement>target.parentElement.parentElement;
        let errorElement = <HTMLElement>tr.querySelector('.error');
        let profitElement = <HTMLElement>tr.querySelector('.price-manager-product-profit');

        if (price <= product.costPrice) {
            errorElement.classList.remove('hide');
            errorElement.innerHTML = 'You cannot sell for a loss';
            return;
        }
        errorElement.classList.add('hide');

        product.sellingPrice = price;

        profitElement.innerHTML = currency(product.profit);
    }
}

export {RenderPriceManager}