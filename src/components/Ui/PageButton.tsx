import React, {ComponentType, SVGProps} from "react";
import {Icon, Menu} from "antd";

const textStyle = {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: "larger",
    color: "#BBBBBB",
};

declare interface PageButtonProps {
    link: string;
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    onClick: (href: string) => void;
}

const PageButton = ({
                        link,
                        icon,
                        label,
                        onClick,
                        ...props
}: PageButtonProps) => {

    return (
        <Menu.Item key={link} onClick={() => onClick(link)} style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
        }} {...props}>
            <Icon component={icon}/>
            <span style={textStyle}>
                {label}
            </span>
        </Menu.Item>
    );
};

export default PageButton;