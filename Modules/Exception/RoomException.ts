class RoomException extends Error {
    private constructor(msg : string) {
        super(msg);
    }

    static notEnoughMoney() : RoomException {
        return new this('You don\'t have enough money');
    }

    static alreadyMaxNumberRoom() : RoomException {
        return new this('You cannot buy more rooms')
    }

    static notUpgradable() : RoomException {
        return new this('This room is not upgradable')
    }

    static noBasicComponents() : RoomException {
        return new this('Basic component(s) of this room is missing')
    }

    static noSuchRoom() : RoomException{
        return new this('Is this room really exist? Something wrong')
    }


}

export {RoomException}