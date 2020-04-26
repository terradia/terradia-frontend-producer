import React, {useState} from "react";
import {useHistory, useLocation} from 'react-router'
import {ReactComponent as Home} from "../../assets/Icon/page/Home Logo.svg";
import {ReactComponent as Products} from "../../assets/Icon/page/Product Logo.svg";
import {ReactComponent as Categories} from "../../assets/Icon/page/Categories Logo.svg";
import {ReactComponent as Statistics} from "../../assets/Icon/page/Statistics Logo.svg";
import {ReactComponent as Staff} from "../../assets/Icon/page/Staff Logo.svg";
import {ReactComponent as Documents} from "../../assets/Icon/page/Document Logo.svg";
import {ReactComponent as Company} from "../../assets/Icon/page/Company.svg";
import {Menu} from "antd";
import PageButton from "../Ui/PageButton";
import Logout from "../Authentication/Logout/Logout";
import {ReactComponent as LogoutIcon} from "../../assets/Logout.svg";
import Company from '../../pages/Company';

const Sidebar = React.forwardRef(() => {
    const currentUrl = useLocation().pathname;
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(currentUrl);

    const OnClickedLink = (href: string) => {
        setCurrentPage(href);
        history.push(href);
    };

    return (
        <Menu
            defaultSelectedKeys={[currentPage]}
            mode={"inline"}
            style={{
                display: "flex",
                flexWrap: "wrap",
                flexFlow: "column",
                justifyContent: "center",
                alignContent: "space-around"
            }}
        >
            <PageButton link={"/home"} label={"Home"} onClick={OnClickedLink} icon={
                () => <Home width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/products"} label={"Product"} onClick={OnClickedLink} icon={
                () => <Products width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/categories"} label={"Categories"} onClick={OnClickedLink} icon={
                () => <Categories width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/statistics"} label={"Statistics"} onClick={OnClickedLink} icon={
                () => <Statistics width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/staff"} label={"Staff"} onClick={OnClickedLink} icon={
                () => <Staff width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/document"} label={"Documents"} onClick={OnClickedLink} icon={
                () => <Documents width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/company"} label={"Company"} onClick={OnClickedLink} icon={
                () => <Company width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
        </Menu>
    )
});

export default Sidebar;