export declare enum EventType {
    POINT = "point",
    ACE = "ace",
    DOUBLE_ERROR = "double_error",
    ERROR = "error"
}
export declare class Event {
    id: number;
    match: number;
    team: number;
    event: EventType;
}
