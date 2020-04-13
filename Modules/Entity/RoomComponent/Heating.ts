import {ConfigManager} from "../../Manager/ConfigManager";
import {RoomComponent} from "./RoomComponent";

class Heating extends RoomComponent {

    constructor(cm: ConfigManager) {
        super(cm.basicHeatingDailyCost, cm.basicHeatingQuality);
    }


}

export {Heating};