import products from "../Assets/products.json"
import {Product} from "../Entity/Product";


class Productmanager {

    private _products: Array<Product>;

    constructor() {
        var self = this;
        products.products.forEach(function(product) {
            self._products.push(new Product());
        });
    }
}