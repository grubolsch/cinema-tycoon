import {ConfigManager} from "../../Manager/ConfigManager";
import {RoomComponent} from "./RoomComponent";

class Heating extends RoomComponent {

    constructor(cm: ConfigManager) {
        super(cm, cm.basicHeatingDailyCost, cm.basicHeatingorQuality);
    }


}

export {Heating};