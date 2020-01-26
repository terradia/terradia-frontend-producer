import React, {useContext, useEffect} from "react";
import {notification} from "antd";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import UserContext from "../Context/UserContext";
import DELETE_COMPANY from "../../apollo/mutation/deleteCompany";

declare interface DeleteCompanyProps {
    setCallDelete: (value: boolean) => void;
}

const DeleteCompany = (props: DeleteCompanyProps) => {
    const [deleteCompanyRequest, {data}] = useMutation(DELETE_COMPANY);
    const user = useContext(UserContext);
    const {setCallDelete} = props;

    useEffect(() => {
        if (user && user.company) {
            deleteCompanyRequest({variables: {id: user.company.id}}).then(() => {
                if (!data) {
                    notification.success({
                        message: "Company",
                        description: "Your company was successfully deleted"
                    });
                    user.company = undefined;
                } else {
                    notification.error({
                        message: "Company",
                        description: "Can not delete your company"
                    })
                }
                setCallDelete(false);
            }).catch(() => {
                notification.error({
                    message: "Error",
                    description: "An error occurred while deleting your company"
                });
            });
        }
    }, []);

    return <div/>;
};

export default DeleteCompany;