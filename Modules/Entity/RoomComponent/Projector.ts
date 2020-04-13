import {ConfigManager} from "../../Manager/ConfigManager";
import {RoomComponent} from "./RoomComponent";

class Projector extends RoomComponent {

    constructor(cm: ConfigManager) {
        super(cm.basicProjectorDailyCost, cm.basicProjectorQuality);
    }


}

export {Projector};