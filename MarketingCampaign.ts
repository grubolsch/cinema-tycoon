class MarketingCampaign {
    constructor(type: string) {
        this._type = type;
    }

    readonly campaignTypes: Array<string> = ['Flyers', 'Newspaper', 'Radio', 'TV', 'Internet'];

    private _type: string = "";

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }
}

export { MarketingCampaign };
