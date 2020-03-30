import React, {useState} from "react";
import {useHistory, useLocation} from 'react-router'
import {ReactComponent as Home} from "../../assets/Home Logo.svg";
import {ReactComponent as Products} from "../../assets/Product Logo.svg";
import {ReactComponent as Categories} from "../../assets/Categories Logo.svg";
import {ReactComponent as Statistics} from "../../assets/Statistics Logo.svg";
import {ReactComponent as Staff} from "../../assets/Staff Logo.svg";
import {ReactComponent as Documents} from "../../assets/Document Logo.svg";
import {Icon, Menu} from "antd";

const textStyle = {
    marginLeft: "10%",
    fontWeight: 600,
    fontSize: "larger",
    color: "#BBBBBB",
};

/*const linkStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexFlow: "row",
    flex: 1
};*/

const Sidebar = () => {
    const currentUrl = useLocation().pathname;
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(currentUrl);

    const OnClickedLink = (href: string) => {
        setCurrentPage(href);
        history.push(href);
    };

    return (
        <Menu
            defaultOpenKeys={["/Home"]}
            defaultSelectedKeys={[currentPage]}
            mode={"inline"}
        >
            <Menu.Item key={"/Home"} onClick={() => OnClickedLink("/Home")} style={{
                display: "flex",
                alignContent: "center"
            }}>
                <Icon component={() => <Home width={'25px'} height={'25px'}/>}/>
                <span style={textStyle}>
                    Home
                </span>
            </Menu.Item>
            <Menu.Item key={"/Product"} onClick={() => OnClickedLink("/Products")}>
                <Icon component={() => <Products width={'25px'} height={'25px'}/>}/>
                <span style={textStyle}>
                    Products
                </span>
            </Menu.Item>
            <Menu.Item key={"/Categories"} onClick={() => OnClickedLink("/Categories")}>
                <Icon component={() => <Categories width={'25px'} height={'25px'}/>}/>
                <span style={textStyle}>
                    Categories
                </span>
            </Menu.Item>
            <Menu.Item key={"/Statistics"} onClick={() => OnClickedLink("/Statistics")}>
                <Icon component={() => <Statistics width={'25px'} height={'25px'}/>}/>
                <span style={textStyle}>
                    Statistics
                </span>
            </Menu.Item>
            <Menu.Item key={"/Staff"} onClick={() => OnClickedLink("/Staff")}>
                <Icon component={() => <Staff width={'25px'} height={'25px'}/>}/>
                <span style={textStyle}>
                    Staff
                </span>
            </Menu.Item>
            <Menu.Item key={"/Documents"} onClick={() => OnClickedLink("/Documents")}>
                <Icon component={() => <Documents width={'25px'} height={'25px'}/>}/>
                <span style={textStyle}>
                    Documents
                </span>
            </Menu.Item>
        </Menu>
    )
};

export default Sidebar;