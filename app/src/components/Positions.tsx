import React from "react";

import { Coord } from "../util/Coord";
import { Position } from "./Position";

export interface Props {
    units: string;
    machinePos: Coord;
}

export const Positions: React.FunctionComponent<Props> = props => {
    const style = { border: "1px solid gray", padding: 3 };
    return (
        <table style={{ borderCollapse: "collapse", margin: 2 }}>
            <tr>
                <td style={style}>Axis</td>
                <td style={style}>Machine Position</td>
                <td style={style}>Work Position</td>
            </tr>
            <tr>
                <td style={{ textAlign: "center", ...style }}>X</td>
                <td style={style}>
                    <Position units={props.units} value={props.machinePos.X} />
                </td>
                <td style={style}>
                    <Position units={props.units} value={0.0} />
                </td>
            </tr>
            <tr>
                <td style={{ textAlign: "center", ...style }}>Y</td>
                <td style={style}>
                    <Position units={props.units} value={props.machinePos.Y} />
                </td>
                <td style={style}>
                    <Position units={props.units} value={0.0} />
                </td>
            </tr>
            <tr>
                <td style={{ textAlign: "center", ...style }}>Z</td>
                <td style={style}>
                    <Position units={props.units} value={props.machinePos.Z} />
                </td>
                <td style={style}>
                    <Position units={props.units} value={0.0} />
                </td>
            </tr>
        </table>
    );
};
