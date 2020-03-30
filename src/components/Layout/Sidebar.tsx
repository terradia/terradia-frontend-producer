import React, {useState} from "react";
import {useHistory, useLocation} from 'react-router'
import {ReactComponent as Home} from "../../assets/Home Logo.svg";
import {ReactComponent as Products} from "../../assets/Product Logo.svg";
import {ReactComponent as Categories} from "../../assets/Categories Logo.svg";
import {ReactComponent as Statistics} from "../../assets/Statistics Logo.svg";
import {ReactComponent as Staff} from "../../assets/Staff Logo.svg";
import {ReactComponent as Documents} from "../../assets/Document Logo.svg";
import {ReactComponent as Company} from "../../assets/Company.svg";
import {Icon, Menu} from "antd";
import PageButton from "../Ui/PageButton";
import Logout from "../Authentication/Logout/Logout";
import {ReactComponent as LogoutIcon} from "../../assets/Logout.svg";

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
            <PageButton link={"/Home"} label={"Home"} onClick={OnClickedLink} icon={
                () => <Home width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/Product"} label={"Product"} onClick={OnClickedLink} icon={
                () => <Products width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/Categories"} label={"Categories"} onClick={OnClickedLink} icon={
                () => <Categories width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/Statistics"} label={"Statistics"} onClick={OnClickedLink} icon={
                () => <Statistics width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/Staff"} label={"Staff"} onClick={OnClickedLink} icon={
                () => <Staff width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/Document"} label={"Documents"} onClick={OnClickedLink} icon={
                () => <Documents width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
            <PageButton link={"/company"} label={"Company"} onClick={OnClickedLink} icon={
                () => <Company width={'25px'} height={'25px'} style={{display: "flex"}}/>
            }/>
        </Menu>
    )
});

export default Sidebar;