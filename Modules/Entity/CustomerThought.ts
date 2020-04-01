class CustomerThought {
    private readonly _thought: string;
    private readonly _postive: boolean;

    constructor(thought: string, postive: boolean) {
        this._thought = thought;
        this._postive = postive;
    }

    get thought(): string {
        return this._thought;
    }

    get postive(): boolean {
        return this._postive;
    }
}

export {CustomerThought}