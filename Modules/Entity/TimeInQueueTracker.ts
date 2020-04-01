class TimeInQueueTracker {
    private _time: number = 0;

    get time(): number {
        return this._time;
    }

    public addTick(): void {
        this._time++;
    }
}

export {TimeInQueueTracker}