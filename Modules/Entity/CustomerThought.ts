class CustomerThought {
    public static readonly THOUGHT_WAITING_TOO_LONG = "I am waiting too long in this queue";
    public static readonly THOUGHT_WAITING_TOO_LONG_GOING_HOME = "I have waited far too long in this queue! I am going home!";
    public static readonly THOUGHT_MOVIE_SOLD_OUT_LEFT_CINEMA : string = 'The movie I wanted to see was sold out! I am leaving this place.';
    public static readonly THOUGHT_MOVIE_SOLD_OUT : string = 'I had to see another movie than I planned originally. This sucks.';
    public static readonly MOVIE_NOT_SAME_GENRE : string = 'The movie I had see is not even in the genre I came for. I am not enjoying my time here.';
    public static readonly THOUGHT_USED_FREE_TICKET : string = 'I got a free ticket to see my movie! What a bargain!';
    public static readonly THOUGHT_COULD_NOT_USE_FREE_TICKET : string = 'They lure me here with a free ticket and then I cannot use it! Scammers!';
    public static readonly TICKET_CHEAP: string = 'The ticket for this movie is really cheap! Awesome.';
    public static readonly TICKET_EXPENSIVE: string = 'The ticket for this movie is really expensive! This is a ripoff';
    public static readonly TICKET_EXPENSIVE_WENT_HOME: string = 'I am not selling my organs for a ticket in this cinema! I am going home.';
    public static readonly FAN_NEW: string = 'After this great experience I became of fan of this Cinema';
    public static readonly FAN_NEW_FRIEND: string = 'This place is so great I even convinced a friend to check this cinema out!';
    public static readonly FAN_LOST: 'This place has gone downhill. I am no longer a fan.';

    private readonly _thought: string;
    private readonly _postive: boolean;

    constructor(thought: string, postive: boolean) {
        this._thought = thought;
        this._postive = postive;

        console.error('Thought: ' + thought)
    }

    get thought(): string {
        return this._thought;
    }

    get postive(): boolean {
        return this._postive;
    }
}

export {CustomerThought}