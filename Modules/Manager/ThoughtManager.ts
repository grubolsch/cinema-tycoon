import {Cinema} from "../Entity/Cinema";
import {CustomerThought} from "../Entity/CustomerThought";

class ThoughtManager {
    private readonly cinema : Cinema;

    constructor(cinema: Cinema) {
        this.cinema = cinema;
    }


    update()  {
        let list = new Map<string, number>();

        this.cinema.customerManager.customers.forEach((customer) => {
            customer.thoughts.forEach((customerThought) => {
                list.set(customerThought.thought, (list.has(customerThought.thought)) ? <number>list.get(customerThought.thought) : 0);
            });
        });

        console.log(list);

        let sortedList = Array.from(list).sort(function(a, b) {
            return (a[0] > b[0]) ? 1 : -1;
        });

        console.log(sortedList);
    }
}

export {ThoughtManager}