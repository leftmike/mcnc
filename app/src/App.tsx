import { initializeIcons } from "@uifabric/icons";
import React from "react";
import { Stack } from "office-ui-fabric-react";

import { Coord } from "./util/Coord";
import { CtrlWebSocket, MsgPosition } from "./util/CtrlWebSocket";
import { MachineCtrl } from "./components/MachineCtrl";
import { Workspace } from "./components/Workspace";

//CtrlWebSocket.init("ws://" + window.location.host + "/control");
CtrlWebSocket.init("ws://localhost:8241/control");

export interface Props {}
export interface State {
    machinePos: Coord;
    units: string;
    connected: boolean;
}

export class App extends React.Component<Props, State> {
    state: State = {
        machinePos: new Coord(0.0, 0.0, 0.0),
        units: "in",
        connected: false
    };

    componentDidMount() {
        CtrlWebSocket.onMsgPosition((msg: MsgPosition) => {
            this.setState({ machinePos: new Coord(msg.MachineX, msg.MachineY, msg.MachineZ) });
        });

        CtrlWebSocket.onReadyState((open: boolean) => {
            this.setState({ connected: open });
        });
    }

    onUnitsChange: (u: string) => void = u => {
        if (u !== this.state.units) {
            if (u === "mm") {
                this.setState({
                    units: u,
                    machinePos: this.state.machinePos.map(n => n * 25.4)
                });
            } else {
                this.setState({
                    units: u,
                    machinePos: this.state.machinePos.map(n => n / 25.4)
                });
            }
        }
    };

    render() {
        return (
            <Stack horizontal style={{ height: "100%" }}>
                <Stack.Item grow>
                    <Stack>
                        {this.state.connected ? "Connected" : "Disconnected"}
                        <Workspace />
                    </Stack>
                </Stack.Item>
                <Stack.Item>
                    <MachineCtrl
                        units={this.state.units}
                        machinePos={this.state.machinePos}
                        onUnitsChange={this.onUnitsChange}
                    />
                </Stack.Item>
            </Stack>
        );
    }
}

initializeIcons();
