import {Customer} from "../Entity/Customer";

class CustomerGenerator{

    public createCustomer(){
        let customer = new Customer();
        customer.printCustomerInformation();
    }
}

export { CustomerGenerator };