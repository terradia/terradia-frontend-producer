import React from "react";

const boldTextStyle = {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 28,
    color: "#828282",
};

declare interface titleProps {
    title: string
}

const Title = (props: titleProps) => {
    return (
        <div>
            <span style={boldTextStyle}>
                {props.title.toUpperCase()}
            </span>
        </div>
    )
};

export default Title;