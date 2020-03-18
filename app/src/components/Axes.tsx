import React from "react";
import { Positions, Props as PositionsProps } from "./Positions";
import { PositionCtrl, Props as PositionCtrlProps } from "./PositionCtrl";

export interface Props extends PositionsProps, PositionCtrlProps {}

export const Axes: React.FunctionComponent<Props> = props => {
    return (
        <div
            style={{
                borderStyle: "solid",
                borderColor: "gray",
                borderWidth: 1,
                padding: 10,
                margin: 10
            }}
        >
            <div style={{ marginLeft: 2, marginBottom: 10 }}>Axes</div>
            <Positions {...props} />
            <PositionCtrl {...props} />
        </div>
    );
};
