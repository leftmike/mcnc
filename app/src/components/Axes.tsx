import React from "react";
import { Positions, Props as PositionsProps } from "./Positions";
import { PositionCtrl, Props as PositionCtrlProps } from "./PositionCtrl";

export interface Props extends PositionsProps, PositionCtrlProps {}

export const Axes: React.FunctionComponent<Props> = props => {
    return (
        <div>
            <Positions {...props} />
            <PositionCtrl {...props} />
        </div>
    );
};
