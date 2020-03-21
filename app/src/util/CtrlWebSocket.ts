const TagSeparator = ":";

const MsgDeltaTag = "delta";
export interface MsgDelta {
    DeltaX: number;
    DeltaY: number;
    DeltaZ: number;
}

//const MsgPositionTag = "position";
export interface MsgPosition {
    MachineX: number;
    MachineY: number;
    MachineZ: number;
}

class ctrlWebSocket {
    private url: string = "";
    private ws: WebSocket | undefined = undefined;

    public init(url: string) {
        this.url = url;
        this.ws = new WebSocket(this.url);
    }

    public sendMsgDelta(msg: MsgDelta) {
        this.send(MsgDeltaTag, msg);
    }

    private send(tag: string, msg: object) {
        if (this.ws) {
            this.ws.send(tag + TagSeparator + JSON.stringify(msg));
        }
    }

    //private onMsgPositionHandler: (msg: MsgPosition) => void = () => {};
    public onMsgPosition(handler: (msg: MsgPosition) => void) {
        //this.onMsgPositionHandler = handler;
        if (this.ws) {
            this.ws.onmessage = event => {
                const buf = event.data;
                const idx = buf.indexOf(TagSeparator);
                // buf.slice(0, idx) === MsgPositionTag
                handler(JSON.parse(buf.slice(idx + 1)));
            };
        }
    }
    /*
    private onMessage(event) {
        event.data
    }

    onReceive(handler: (msg: ReceiveMsg) => void) {
        if (this.ws) {
            this.ws.onmessage = event => {
                handler(JSON.parse(event.data));
            };
        }
    }
*/
}

export const CtrlWebSocket = new ctrlWebSocket();
