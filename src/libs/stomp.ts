declare var SockJS: any;
declare var Stomp: any;

export class StompClient {
    public connectionUrl: string;
    public subscribePath: string;
    public sendPath: string;
    public socket: any;
    public stompClient: any;
    public onClose?: () => void;

    constructor(
        url: string,
        subscribePath: string,
        sendPath: string,
        onOpen?: () => void,
        onMessage?: (res: any) => void,
        onClose?: () => void
    ) {
        this.connectionUrl = url;
        this.subscribePath = subscribePath;
        this.sendPath = sendPath;
        this.socket = new SockJS(url);
        this.stompClient = new Stomp.over(this.socket);
        this.onClose = onClose;

        this.stompClient.connect({}, (frame: any) => {
            console.log('CONNECTED')
            this.stompClient.subscribe(this.subscribePath, (data) => {
                this.executeCallback(() => onMessage(data), () => this.defaultOnMessage(data));
            });
            this.executeCallback(onOpen, this.defaultOnOpen);
        });
    }

    public defaultOnOpen(): void {
        console.info(`WebSocket connection established to ${this.connectionUrl}.`);
    }

    public defaultOnMessage(message: any): void {
        console.info(`Message received from ${this.connectionUrl}.`, message);
    }

    public defaultOnClose(): void {
        console.info(`WebSocket connection to ${this.connectionUrl} has been closed.`);
    }

    public publish(body: string): void {
        this.stompClient.send(this.sendPath, {}, body);
    }

    public closeConnection() {
        this.stompClient.disconnect(() => {
            this.executeCallback(this.onClose, this.defaultOnClose);
        });
    }

    private executeCallback(callback: any, fallback: any): void {
        if (callback !== null) {
            callback();
        } else {
            fallback();
        }
    }
}
