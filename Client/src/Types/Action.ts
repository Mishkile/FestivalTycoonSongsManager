class Action {
    constructor(public type: string, public payload: any) {
        this.type = type;
        this.payload = payload;
    }
}