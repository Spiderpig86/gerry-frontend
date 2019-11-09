/**
 * Wrapper library around Websocket conection.
 * 
 * @export
 * @class WebSocketHandler
 */
export class WebSocketHandler {

    public connectionUrl: string;
    public ws: WebSocket;

    constructor(connectionUrl: string, onOpen?: () => void, onMessage?: (event: any) => void, onClose?: () => void) {
        this.connectionUrl = connectionUrl;
        this.ws = new WebSocket(connectionUrl);

        this.ws.onopen = onOpen || this.defaultOnOpen;
        this.ws.onmessage = onMessage || this.defaultOnMessage;
        this.ws.onclose = onClose || this.defaultOnClose;
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