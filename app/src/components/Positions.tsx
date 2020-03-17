import React from "react";
import { Position } from "./Position";

export interface Props {
    units: string;
    machineX: number;
    machineY: number;
    machineZ: number;
}

export const Positions: React.FunctionComponent<Props> = props => {
    return (
        <table>
            <tr>
                <td colSpan={3}>Axes</td>
            </tr>
            <tr>
                <td>Axis</td>
                <td>Machine Position</td>
                <td>Work Position</td>
            </tr>
            <tr>
                <td>X</td>
                <td>
                    <Position units={props.units} value={props.machineX} />
                </td>
                <td>
                    <Position units={props.units} value={0.0} />
                </td>
            </tr>
            <tr>
                <td>Y</td>
                <td>
                    <Position units={props.units} value={props.machineY} />
                </td>
                <td>
                    <Position units={props.units} value={0.0} />
                </td>
            </tr>
            <tr>
                <td>Z</td>
                <td>
                    <Position units={props.units} value={props.machineZ} />
                </td>
                <td>
                    <Position units={props.units} value={0.0} />
                </td>
            </tr>
        </table>
    );
};
