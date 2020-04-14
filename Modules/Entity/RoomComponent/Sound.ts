import {ConfigManager} from "../../Manager/ConfigManager";
import {RoomComponent} from "./RoomComponent";

class Sound extends RoomComponent {

    constructor(cm: ConfigManager) {
        super(cm.basicSoundDailyCost, cm.basicSoundQuality);
    }


}

export {Sound};