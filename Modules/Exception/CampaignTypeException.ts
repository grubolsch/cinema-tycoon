class CampaignTypeException extends Error {
    private constructor(msg: string) {
        super(msg);
    }

    static noSuchType() {
        return new this('Something went wrong selecting a campaign type.');
    }
}

export {CampaignTypeException}