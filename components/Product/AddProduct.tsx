import React from "react";
import {Card, Icon} from "antd";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";
import AddProductMutation from '../apollo/mutation/addProduct';


declare interface AddProductData {
    createProduct: {
        description: string;
        id: string;
        name: string;
    }
}

declare interface AddProductParams {
    description: string;
    name: string;
}

declare interface AddProductProps {
    isLoading?: boolean;
    onProductAdded?: any;
}

const AddProduct = (props: AddProductProps) => {
    const [addProduct] = useMutation<AddProductData, AddProductParams>(AddProductMutation);
    const handleAddProduct = () => {
        addProduct({variables: {name: "Test Product", description: "This is a test product"}}).then((data) => {
            console.log(data);
            if (props.onProductAdded)
                props.onProductAdded();
        }).catch((error) => {
            console.log(error);
        });
    };

    const icon = (
        <Icon type={props.isLoading ? "loading" : "plus-circle"}
              style={{ fontSize: '64px'}}
              onClick={props.isLoading ? undefined : handleAddProduct}
        />
    );
    return (
        <Card key={"default"}
              title={props.isLoading ? "Loading Products" : "Add new Product"}
              style={{textAlign: "center", border: "1px solid #E5E5E5", borderRadius: "15px", width: '300px', height: '175px'}}
              hoverable
        >
            {icon}
        </Card>
    )
};

export default AddProduct;