import {Drawer as AntDrawer} from 'antd'
import React, {ChangeEventHandler, ReactElement, ReactNode} from "react";

export interface DrawerProps {
    children?: Element | ReactElement | Element[] | ReactElement[];
    closable ?: boolean;
    destroyOnClose ?:boolean
    mask ?: boolean;
    drawerStyle ?: object;
    headerStyle ?: object;
    bodyStyle ?: object;
    title ?: string | ReactNode;
    visible ?: boolean;
    width ?: string | number;
    zIndex ?: number;
    placement ?: 'top' | 'right' | 'bottom' | 'left'
    height ?: string | number;
    onClose ?: () => void;
}

AntDrawer.defaultProps = {
    closable: true,
    destroyOnClose: false,
    title: 'DrawerTitle',
    placement: 'right',
    width: '500px',
    bodyStyle: undefined,
    drawerStyle: undefined,
};

export default function Drawer(props: DrawerProps) {
    const {children, ...lastProps} = props;

    return (
        <AntDrawer
            {...lastProps}
        >
            {children}
        </AntDrawer>
    );
}