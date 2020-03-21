const TagSeparator = ":";

const MsgDeltaTag = "delta";
export interface MsgDelta {
    DeltaX: number;
    DeltaY: number;
    DeltaZ: number;
}

const MsgPositionTag = "position";
export interface MsgPosition {
    MachineX: number;
    MachineY: number;
    MachineZ: number;
}

class ctrlWebSocket {
    private url: string = "";
    private ws: WebSocket | undefined = undefined;
    private handlers: any = {};

    public init(url: string) {
        this.url = url;
        this.setup();
    }

    private setup() {
        this.ws = new WebSocket(this.url);
        this.ws.onmessage = event => {
            const buf = event.data;
            const idx = buf.indexOf(TagSeparator);
            const tag = buf.slice(0, idx);
            if (tag in this.handlers) {
                this.handlers[tag](JSON.parse(buf.slice(idx + 1)));
            }
        };
        this.ws.onclose = () => {
            this.ws = undefined;
            setTimeout(() => {
                this.setup();
            }, 1000);
        };
        this.ws.onerror = () => {
            if (this.ws) {
                this.ws.close();
            }
            this.ws = undefined;
        };
    }

    public sendMsgDelta(msg: MsgDelta) {
        this.send(MsgDeltaTag, msg);
    }

    private send(tag: string, msg: object) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(tag + TagSeparator + JSON.stringify(msg));
        }
    }

    public onMsgPosition(handler: (msg: MsgPosition) => void) {
        this.handlers[MsgPositionTag] = handler;
    }
}

export const CtrlWebSocket = new ctrlWebSocket();
