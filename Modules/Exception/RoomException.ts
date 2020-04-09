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


}

export {RoomException}