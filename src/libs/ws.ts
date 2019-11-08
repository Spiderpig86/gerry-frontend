/**
 * Wrapper library around Websocket conection.
 * 
 * @export
 * @class WebSocketHandler
 */
export class WebSocketHandler {

    public connectionUrl: string;
    public ws: WebSocket;

    constructor(connectionUrl: string, onOpen) {
        this.connectionUrl = connectionUrl;
        this.ws = new WebSocket(connectionUrl);
    }

    public defaultOnOpen(): void {
        console.info(`WebSocket connection established to ${this.connectionUrl}.`);
    }

    public defaultOnMessage(): void {
        console.info(`Message received from ${this.connectionUrl}.`);
    }

    public defaultOnClose(): void {
        console.info(`WebSocket connection to ${this.connectionUrl} has been closed.`);
    }
}