import {SchedulerException} from "./SchedulerException";

class SchedulerDeleteShowException extends SchedulerException {
    static couldNotFindShow(roomId : number) {
        return new this(`Could not find show to delete with roomId ${roomId}`);
    }

    static isPlaying() {
        return new this('You cannot delete shows that are currently playing.');
    }

    static couldNotRefreshInterface() {
        return new this('The show was delete but we could not refresh the interface - this should not have happened.');
    }
}

export {SchedulerDeleteShowException}