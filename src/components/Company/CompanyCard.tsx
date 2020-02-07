import React, {useContext} from "react";
import {Avatar, Card, Icon, Popconfirm} from "antd";
import UserContext from "../Context/UserContext";

const {Meta} = Card;

declare interface CompanyCardProps {
    setEditModal: (value: boolean) => void;
    setCallDelete: (value: boolean) => void;
}

const CompanyCard = (props: CompanyCardProps) => {
    const user = useContext(UserContext);
    const {setEditModal, setCallDelete} = props;

    if (user && user.company) {
        return (
            <Card
                cover={
                    <img
                        src={user.company.cover ? user.company.cover : "/static/CompanyCover.png"}
                        alt={"Company Cover"}
                    />
                }
                size={"small"}
                actions={[
                    (
                        <Icon key={"edit"} type={"edit"} onClick={() => setEditModal(true)}/>
                    ),
                    (
                        <Popconfirm
                            title={"Are you sure you want to delete this company ?"}
                            onConfirm={() => setCallDelete(true)}
                            okText={"Yes"}
                            cancelText={"No"}
                            placement={"right"}
                        >
                            <Icon key={"delete"} type={"delete"}/>
                        </Popconfirm>
                    ),
                ]}
            >
                <Meta
                    avatar={
                        <Avatar
                            src={user.company.logo ? user.company.logo : "/static/CompanyLogo.png"}
                            shape={"square"}
                            size={"large"}
                        />
                    }
                    title={user.company.name}
                    description={user.company.description}
                />
            </Card>
        )
    }
    return (
        <div>
            <p>You don't have any company at this time</p>
        </div>
    )
};

export default CompanyCard;