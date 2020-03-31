class MarketingCampaign {
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
