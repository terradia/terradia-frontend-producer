import React from 'react';

export enum breakpointEnum {
    xs = 0,
    sm = 576,
    md = 768,
    lg = 992,
    xl = 1200,
    xxl = 1600
}

export const xs = 0;
export const sm = 576;
export const md = 768;
export const lg = 992;
export const xl = 1200;
export const xxl = 1600;

const Breakpoint = React.createContext<breakpointEnum>(xxl);
export default Breakpoint;