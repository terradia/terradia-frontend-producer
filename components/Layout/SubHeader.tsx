import React from "react";
import {Layout as AntLayout, Menu} from "antd";
import Button from "../Ui/Button";
const AntHeader = AntLayout.Header;

export default function SubHeader() {
    return (
        <AntHeader style={{
            height: '10vh',
            width: '100%',
            display: 'fixed',
            position: 'relative',
            background: 'none',
            justifyContent: 'space-between'
        }}>
            <Menu mode="horizontal" style={{lineHeight: '6vh', background: 'none'}}>
                <Menu.Item key={"sort"}>
                    <Button>
                        Sort
                    </Button>
                </Menu.Item>
                <Menu.Item key={"label"}>
                    <Button>
                        Label
                    </Button>
                </Menu.Item>
                <Menu.Item key={"another sort"}>
                    <Button>
                        Another Sort
                    </Button>
                </Menu.Item>
            </Menu>
        </AntHeader>
    )
}