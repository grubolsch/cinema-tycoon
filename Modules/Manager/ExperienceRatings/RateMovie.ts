import {Movie} from "../../Entity/Movie";
import {Customer} from "../../Entity/Customer";
import {CustomerThought} from "../../Entity/CustomerThought";

class RateMovie {
    rate(movie : Movie, customer : Customer) {
        if(movie.rating <= 2) {
            //2 bad thoughts so it counts really bad against the player.
            customer.addThought(new CustomerThought(movie.title +' was an absolute train wreck of a movie. I feel robbed.', false ));
            customer.addThought(new CustomerThought('They should fire the person who plans in such train wrecks.', false ));
        }
        else if(movie.rating <= 4) {
            customer.addThought(new CustomerThought((movie.title +' is just not a good movie. What where they thinking?'), false));
        }
        else if(movie.rating >= 9) {
            customer.addThought(new CustomerThought((movie.title +' is one of the best movies I ever saw. Just wow.'), true));
            customer.addThought(new CustomerThought(('I am so happy this Cinema chose to show me this movie!'), true));
        }
        else if(movie.rating >= 7) {
            customer.addThought(new CustomerThought((movie.title +' is a really fun movie.'), true));
        }
    }
}

export {RateMovie}