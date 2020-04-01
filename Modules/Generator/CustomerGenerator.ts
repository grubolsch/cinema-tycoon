import {Customer} from "../Entity/Customer";

class CustomerGenerator{

    public createCustomer(): Customer{
        let customer = new Customer();
        customer.printCustomerInformation();
        return customer;
    }
}

export { CustomerGenerator };