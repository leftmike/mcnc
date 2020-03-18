import React, { useState } from "react";
import { Stack } from "office-ui-fabric-react";
import { MachineCtrl } from "./components/MachineCtrl";
import { Workspace } from "./components/Workspace";
import { initializeIcons } from "@uifabric/icons";

export const App: React.FunctionComponent = () => {
    const [machineX, setMachineX] = useState(0.0);
    const [machineY, setMachineY] = useState(0.0);
    const [machineZ, setMachineZ] = useState(0.0);
    const [units, setUnits] = useState("in");

    const onDeltaClick = function(deltaX: number, deltaY: number, deltaZ: number) {
        setMachineX(machineX + deltaX);
        setMachineY(machineY + deltaY);
        setMachineZ(machineZ + deltaZ);
    };

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
                    onDeltaClick={onDeltaClick}
                    onUnitsChange={onUnitsChange}
                />
            </Stack.Item>
        </Stack>
    );
};

initializeIcons();
