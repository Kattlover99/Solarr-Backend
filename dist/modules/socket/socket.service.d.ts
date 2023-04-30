export declare class SocketService {
    private websocket;
    constructor();
    connect(): void;
    send(data: any): void;
    disconnect(): void;
}
