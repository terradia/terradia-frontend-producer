import React, {ReactElement, ReactNode} from 'react'
import {Modal as AntModal} from 'antd'

export interface ModalProps {
    children?: Element | ReactElement | Element[] | ReactElement[];
    centered?: boolean;
    closable?: boolean;
    closeIcon?: ReactNode;
    confirmLoading?: boolean;
    destroyOnClose?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    maskStyle?: object;
    okText?: string;
    onCancel?: () => void;
    onOk?: (e:any) => void;
    cancelText?: string;
    title?: string;
    visible?: boolean;
    width?: string | number;
    zIndex?: number;
}

Modal.defaultProps = {
    centered: false,
    closable: true,
    closeIcon: undefined,
    confirmLoading: false,
    destroyOnClose: false,
    mask: true,
    maskClosable: true,
    maskStyle: {},
    okText: "Confirm",
    cancelText: "Cancel",
    title: "",
    visible: false,
    width: 520,
    zIndex: 1000
};

export default function Modal(props: ModalProps) {
    const {children, ...lastProps} = props;

    return (
        <AntModal
            {...lastProps}
        >
                {children}
        </AntModal>
    );
}