import {ConfigManager} from "../../Manager/ConfigManager";
import {RoomComponent} from "./RoomComponent";

class Screen extends RoomComponent {

    constructor(cm: ConfigManager) {
        super(cm.basicScreenDailyCost, cm.basicScreenQuality);
    }


}

export {Screen};