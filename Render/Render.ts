class Render {
    private _speed : number = 1;

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }

    public render(cinema : Cinema) {
        document.querySelector('#ui-name').innerHTML = cinema.name;
        document.querySelector('#ui-date').innerHTML = cinema.timeManager.getDate();
        document.querySelector('#ui-currentcredit').innerHTML = currency(cinema.financeManager.credit);
        document.querySelector('#ui-fans').innerHTML = cinema.fans + " fans";
    }
}