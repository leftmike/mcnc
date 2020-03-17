import React, { useState } from "react";
import { ComboBox, IComboBoxOption } from "office-ui-fabric-react/lib/index";
import { IconButton } from "office-ui-fabric-react/lib/Button";

export interface Props {
    units: string;
    onDeltaClick: (deltaX: number, deltaY: number, deltaZ: number) => void;
}

const mmStepDefault = "1";
const mmStepOptions: IComboBoxOption[] = [
    { key: "10", text: "10" },
    { key: "1", text: "1" },
    { key: "0.1", text: "0.1" },
    { key: "0.01", text: "0.01" }
];

const inStepDefault = "0.1";
const inStepOptions: IComboBoxOption[] = [
    { key: "1", text: "1" },
    { key: "0.1", text: "0.1" },
    { key: "0.01", text: "0.01" },
    { key: "0.001", text: "0.001" }
];

export const PositionCtrl: React.FunctionComponent<Props> = props => {
    var stepOptions: IComboBoxOption[];
    var stepDefault: string;
    if (props.units === "mm") {
        stepOptions = mmStepOptions;
        stepDefault = mmStepDefault;
    } else {
        stepOptions = inStepOptions;
        stepDefault = inStepDefault;
    }

    const [step, setStep] = useState(Number(stepDefault));
    // change step back to default when changing units

    return (
        <div>
            <table>
                <tr>
                    <td>
                        <IconButton
                            iconProps={{ iconName: "ArrowUpRight" }}
                            styles={{ root: { transform: "rotate(-90deg)" } }}
                            title="-X +Y"
                            onClick={() => props.onDeltaClick(-1 * step, 1 * step, 0)}
                        />
                    </td>
                    <td>
                        <IconButton
                            iconProps={{ iconName: "Up" }}
                            title="+Y"
                            onClick={() => props.onDeltaClick(0, 1 * step, 0)}
                        />
                    </td>
                    <td>
                        <IconButton
                            iconProps={{ iconName: "ArrowUpRight" }}
                            title="+X +Y"
                            onClick={() => props.onDeltaClick(1 * step, 1 * step, 0)}
                        />
                    </td>
                    <td>
                        <IconButton
                            iconProps={{ iconName: "Up" }}
                            title="+Z"
                            onClick={() => props.onDeltaClick(0, 0, 1 * step)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <IconButton
                            iconProps={{ iconName: "Back" }}
                            title="-X"
                            onClick={() => props.onDeltaClick(-1 * step, 0, 0)}
                        />
                    </td>
                    <td style={{ textAlign: "center" }}>X Y</td>
                    <td>
                        <IconButton
                            iconProps={{ iconName: "Forward" }}
                            title="+X"
                            onClick={() => props.onDeltaClick(1 * step, 0, 0)}
                        />
                    </td>
                    <td style={{ textAlign: "center" }}>Z</td>
                </tr>
                <tr>
                    <td>
                        <IconButton
                            iconProps={{ iconName: "ArrowUpRight" }}
                            styles={{ root: { transform: "rotate(180deg)" } }}
                            title="-X -Y"
                            onClick={() => props.onDeltaClick(-1 * step, -1 * step, 0)}
                        />
                    </td>
                    <td>
                        <IconButton
                            iconProps={{ iconName: "Down" }}
                            title="-Y"
                            onClick={() => props.onDeltaClick(0, -1 * step, 0)}
                        />
                    </td>
                    <td>
                        <IconButton
                            iconProps={{ iconName: "ArrowUpRight" }}
                            styles={{ root: { transform: "rotate(90deg)" } }}
                            title="+X -Y"
                            onClick={() => props.onDeltaClick(1 * step, -1 * step, 0)}
                        />
                    </td>
                    <td>
                        <IconButton
                            iconProps={{ iconName: "Down" }}
                            title="-Z"
                            onClick={() => props.onDeltaClick(0, 0, -1 * step)}
                        />
                    </td>
                </tr>
            </table>
            <ComboBox
                options={stepOptions}
                label={"Delta Step (" + props.units + ")"}
                text={String(step)}
                onChange={(_event, option) => {
                    if (option) {
                        setStep(Number(option.key));
                    }
                }}
            />
        </div>
    );
};
