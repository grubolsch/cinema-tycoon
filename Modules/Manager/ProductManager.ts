import productsJson from "../Assets/products.json"
import {Product} from "../Entity/Product";

class ProductMap extends Map<number, Product> {}

class ProductManager {
    private _products: ProductMap = new ProductMap();

    constructor() {
        productsJson.products.forEach(product => {

            if(this._products.has(product.id)) {
                console.error('Product found with double id: '+ product.id);
                return;
            }

            this._products.set(product.id, new Product(product.id, product.name, product.bonus, product.costPrice, product.defaultPrice, product.category));
        });
    }

    get products(): ProductMap {
        return this._products;
    }
}

export {ProductManager}