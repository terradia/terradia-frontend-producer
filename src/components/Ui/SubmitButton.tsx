import React from "react";
import Button from "./Button";

declare interface SubmitButtonProps {
    callback: () => void;
}

const SubmitButton = (props: SubmitButtonProps) => {
    return (
        <Button
            style={{
                display: "flex",
                borderColor: "#5CC04A",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={props.callback}
        >
            <span>Submit</span>
        </Button>
    );
};

export default SubmitButton;