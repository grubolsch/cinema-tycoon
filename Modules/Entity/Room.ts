import {randomNumber} from "../Utils";

class Room {
    private _id : number;
    private _name : string;

    constructor(name: string) {
        this._id = randomNumber(1, 1000000);
        this._name = name;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
}

export {Room}