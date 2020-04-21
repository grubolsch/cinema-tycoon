import {Cinema} from "../../Entity/Cinema";
import {Customer} from "../../Entity/Customer";
import {CustomerThought} from "../../Entity/CustomerThought";
import {Room} from "../../Entity/Room";
import {ConfigManager} from "../ConfigManager";

class RateRoom {
    private config : ConfigManager;

    constructor(config: ConfigManager) {
        this.config = config;
    }

    rate(room : Room, customer : Customer) {
        let quality : number = room.calculateRoomQuality();

        if(quality <= this.config.qualityRoomVeryBad) {
            //2 bad thoughts so it counts really bad against the player.
            customer.addThought(new CustomerThought(room.name +' has a nice roof. I hate every other part in it.', false ));
            customer.addThought(new CustomerThought('What an old and outdated cinema.', false ));
        }
        else if(quality <= this.config.qualityRoomBad) {
            customer.addThought(new CustomerThought(room.name +' is an older, outdated room.', false ));
        }
        else if(quality >= this.config.qualityRoomVeryGood) {
            customer.addThought(new CustomerThought(room.name +' gives the ultimate cinema experience. It was perfect.', true ));
            customer.addThought(new CustomerThought('This cinema has state of the art equipment.', true ));
        }
        else if(quality >= this.config.qualityRoomGood) {
            customer.addThought(new CustomerThought(room.name +' is a really nice, modern room.', true ));
        }
    }
}

export {RateRoom}
