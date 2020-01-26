import React from "react";
import {Anchor as AntAnchor} from 'antd'
import Home from "../../public/Home Logo.svg"
import Products from "../../public/Product Logo.svg"
import Categories from "../../public/Categories Logo.svg";
import Statistics from "../../public/Statistics Logo.svg";
import Staff from "../../public/Staff Logo.svg"
import Documents from "../../public/Document Logo.svg"

export interface AnchorProps {
    affix ?: boolean;
    bounds ?: number;
    getContainer ?: () => HTMLElement;
    offsetBottom ?: number;
    offsetTop ?: number;
    showInkInFixed ?: boolean;
    onClick ?: any;
    getCurrentAnchor ?: () => string;
    targetOffset ?: number;
    onChange ?: (currentActiveLink: string) => void;
    style?: object
}

export default function Anchor(props: AnchorProps) {
    const {Link} = AntAnchor;

    return (
        <AntAnchor
            {...props}
        >
            <Link key={"Home"} href={"/"} title={''}>
                <Home/>
                <span style={{fontWeight: 'bold', fontSize: '24'}}>
                    Home
                </span>
            </Link>
            <Link key={"Product"} href={"/Products"} title={''}>
                <Products/>
                <span style={{fontWeight: 'bold', fontSize: '24'}}>
                    Products
                </span>
            </Link>
            <Link key={"Categories"} href={"/Categories"} title={''}>
                <Categories/>
                <span style={{fontWeight: 'bold', fontSize: '24'}}>
                    Categories
                </span>
            </Link>
            <Link key={"Statistics"} href={"/Statistics"} title={''}>
                <Statistics/>
                <span style={{fontWeight: 'bold', fontSize: '24'}}>
                    Statistics
                </span>
            </Link>
            <Link key={"Staff"} href={"/Staff"} title={''}>
                <Staff/>
                <span style={{fontWeight: 'bold', fontSize: '24'}}>
                    Staff
                </span>
            </Link>
            <Link key={"Documents"} href={"/Documents"} title={''}>
                <Documents/>
                <span style={{fontWeight: 'bold', fontSize: '24'}}>
                    Documents
                </span>
            </Link>
        </AntAnchor>
    );
}