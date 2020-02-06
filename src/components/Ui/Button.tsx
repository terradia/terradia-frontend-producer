import React from 'react'
import {Button as AntButton} from 'antd'
import {ButtonShape, ButtonSize, ButtonType} from "antd/es/button";

export interface ButtonProps {
    children?: React.ReactChildren[] | React.ReactChildren | HTMLElement[] | HTMLElement | string[] | string;
    text?: string;
    color?: ButtonType;
    disable?: boolean;
    shape?: ButtonShape;
    style?: object
    isLoading?: boolean;
    icon?: any;
    size?: ButtonSize;
    targetLink?: string;
    htmlType?: 'button' | 'reset' | 'submit' | undefined;
    fitParentWidth?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>
}

Button.defaultProps = {
    text: "",
    color: "default",
    disable: false,
    shape: undefined,
    isLoading: false,
    icon: undefined,
    size: "default",
    targetLink: "",
    htmlType: undefined,
    fitParentWidth: false,
    onClick: undefined,
};

export default function Button(props: ButtonProps)  {
    // if (!props.disable)
        return (
            <AntButton type={props.color}
                       shape={props.shape}
                       loading={props.isLoading}
                       onClick={props.onClick}
                       size={props.size}
                       target={props.targetLink}
                       block={props.fitParentWidth}
                       htmlType={props.htmlType}
                       style={props.style}
            >
                {props.icon}
                {props.text}
                {props.children}
            </AntButton>
        );
    // return null;
}