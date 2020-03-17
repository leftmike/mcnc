import React, { useState } from "react";
import { Stack } from "office-ui-fabric-react";
import { MachineCtrl } from "./components/MachineCtrl";
import { Workspace } from "./components/Workspace";
import { initializeIcons } from "@uifabric/icons";

export const App: React.FunctionComponent = () => {
    const [machineX, setMachineX] = useState(0.0);
    const [machineY, setMachineY] = useState(0.0);
    const [machineZ, setMachineZ] = useState(0.0);
    const onDeltaClick = function(deltaX: number, deltaY: number, deltaZ: number) {
        setMachineX(machineX + deltaX);
        setMachineY(machineY + deltaY);
        setMachineZ(machineZ + deltaZ);
    };

    return (
        <Stack horizontal>
            <Stack.Item grow>
                <Workspace />
            </Stack.Item>
            <Stack.Item>
                <MachineCtrl
                    units="mm"
                    machineX={machineX}
                    machineY={machineY}
                    machineZ={machineZ}
                    onDeltaClick={onDeltaClick}
                />
            </Stack.Item>
        </Stack>
    );
};

initializeIcons();
