import React from 'react'
import {Button as AntButton} from 'antd'
import {ButtonShape, ButtonSize, ButtonType} from "antd/es/button";

export interface ButtonProps {
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
    onClick?: React.MouseEventHandler<HTMLElement>;
    id?: string;
    className?: string;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
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
                       id={props.id}
                       className={props.className}
            >
                {props.icon}
                {props.text}
                {props.children}
            </AntButton>
        );
    // return null;
};

export default Button;