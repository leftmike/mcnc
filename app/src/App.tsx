import { initializeIcons } from "@uifabric/icons";
import React, { useState } from "react";
import { Stack } from "office-ui-fabric-react";

import { Coord } from "./util/Coord";
import { CtrlWebSocket, MsgPosition } from "./util/CtrlWebSocket";
import { MachineCtrl } from "./components/MachineCtrl";
import { Workspace } from "./components/Workspace";

//CtrlWebSocket.init("ws://" + window.location.host + "/control");
CtrlWebSocket.init("ws://localhost:8241/control");

export const App: React.FunctionComponent = () => {
    const [machinePos, setMachinePos] = useState(new Coord(0.0, 0.0, 0.0));
    const [units, setUnits] = useState("in");
    const [connected, setConnected] = useState(false);

    const onUnitsChange = (u: string) => {
        if (u !== units) {
            setUnits(u);
            if (u === "mm") {
                setMachinePos(machinePos.map(n => n * 25.4));
            } else {
                setMachinePos(machinePos.map(n => n / 25.4));
            }
        }
    };

    const onMsgPosition = (msg: MsgPosition) => {
        setMachinePos(new Coord(msg.MachineX, msg.MachineY, msg.MachineZ));
    };
    CtrlWebSocket.onMsgPosition(onMsgPosition);

    const onReadyState = (open: boolean) => {
        setConnected(open);
    };
    CtrlWebSocket.onReadyState(onReadyState);

    return (
        <Stack horizontal style={{ height: "100%" }}>
            <Stack.Item grow>
                <Stack>
                    {connected ? "Connected" : "Disconnected"}
                    <Workspace />
                </Stack>
            </Stack.Item>
            <Stack.Item>
                <MachineCtrl units={units} machinePos={machinePos} onUnitsChange={onUnitsChange} />
            </Stack.Item>
        </Stack>
    );
};

initializeIcons();
