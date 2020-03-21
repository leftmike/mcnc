import { initializeIcons } from "@uifabric/icons";
import React, { useState } from "react";
import { Stack } from "office-ui-fabric-react";

import { CtrlWebSocket, MsgPosition } from "./util/CtrlWebSocket";
import { MachineCtrl } from "./components/MachineCtrl";
import { Workspace } from "./components/Workspace";

//CtrlWebSocket.init("ws://" + window.location.host + "/control");
CtrlWebSocket.init("ws://localhost:8241/control");

export const App: React.FunctionComponent = () => {
    const [machineX, setMachineX] = useState(0.0);
    const [machineY, setMachineY] = useState(0.0);
    const [machineZ, setMachineZ] = useState(0.0);
    const [units, setUnits] = useState("in");

    const onUnitsChange = function(u: string) {
        if (u !== units) {
            setUnits(u);
            if (u === "mm") {
                setMachineX(machineX * 25.4);
                setMachineY(machineY * 25.4);
                setMachineZ(machineZ * 25.4);
            } else {
                setMachineX(machineX / 25.4);
                setMachineY(machineY / 25.4);
                setMachineZ(machineZ / 25.4);
            }
        }
    };

    // public onMsgPosition(handler: (msg: MsgPosition) => void)
    const onMsgPosition = function(msg: MsgPosition) {
        setMachineX(msg.MachineX);
        setMachineY(msg.MachineY);
        setMachineZ(msg.MachineZ);
    };

    CtrlWebSocket.onMsgPosition(onMsgPosition);

    return (
        <Stack horizontal style={{ height: "100%" }}>
            <Stack.Item grow>
                <Workspace />
            </Stack.Item>
            <Stack.Item>
                <MachineCtrl
                    units={units}
                    machineX={machineX}
                    machineY={machineY}
                    machineZ={machineZ}
                    onUnitsChange={onUnitsChange}
                />
            </Stack.Item>
        </Stack>
    );
};

initializeIcons();
