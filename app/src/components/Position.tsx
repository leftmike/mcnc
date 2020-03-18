import React from "react";

export interface Props {
    units: string;
    value: number;
}

export const Position: React.FunctionComponent<Props> = props => {
    const trimValue = (n: number) => n.toFixed(props.units === "mm" ? 2 : 3);

    return (
        <div style={{ textAlign: "right" }}>
            {trimValue(props.value)} {props.units}
        </div>
    );
};
