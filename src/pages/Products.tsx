import React from "react";
import Button from "../components/Ui/Button";
import {loader as graphqlLoader} from 'graphql.macro';
import {ReactComponent as AddIcon} from "../assets/Icon/ui/add.svg";
import "../assets/Style/Products/ProductsPage.less"
import {Collapse} from "antd";
import {useQuery} from "@apollo/react-hooks";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';


const queryAllCompanyProductsCategories = graphqlLoader('../graphql/query/getAllCompanyProductsCategories.graphql');

const {Panel} = Collapse;


const copiedData = {
    "data": {
        "getAllCompanyProductsCategories": [
            {
                "id": "40e048a1-681b-495a-85f3-b3307e784f01",
                "name": "Viandes",
                "products": [
                    {
                        "id": "1e5c1cef-6b2f-4fa2-af44-bcd248e20c73",
                        "name": "Salami",
                        "image": null,
                        "description": "Salami de porc",
                        "updatedAt": "2020-03-12T23:36:28.494Z",
                        "productReviews": null,
                        "index": 0
                    }
                ]
            },
            {
                "id": "40d6684a-003f-41ce-bbc1-194373477ac7",
                "name": "Fromage",
                "products": [
                    {
                        "id": "d8d6ac67-d45f-44a4-94fa-2acbbf760e77",
                        "name": "Fromage à raclette",
                        "image": null,
                        "description": "Fromage destiné à être utilisé pour la raclette",
                        "updatedAt": "2020-03-12T23:37:43.870Z",
                        "productReviews": null,
                        "index": 0
                    }
                ]
            },
            {
                "id": "35715d81-1cf9-4103-86dc-aa2c735abb07",
                "name": "Alcool",
                "products": [
                    {
                        "id": "0303a76b-8b99-419d-8aff-7c9e838e15bc",
                        "name": "Riesling",
                        "image": null,
                        "description": "Vin d'alsace",
                        "updatedAt": "2020-03-12T23:39:14.888Z",
                        "productReviews": null,
                        "index": 0

                    },
                    {
                        "id": "4e8215df-e736-47ac-b30b-8ab874e63d59",
                        "name": "Picon",
                        "image": null,
                        "description": "Notre amour à tous",
                        "updatedAt": "2020-03-12T23:39:28.434Z",
                        "productReviews": null,
                        "index": 1
                    }
                ]
            },
            {
                "id": "d1708c56-85df-4713-b7f5-f5223b69933d",
                "name": "Test",
                "products": [
                    {
                        "id": "c0ce9f4b-c779-4bb7-96ce-c2137fc85847",
                        "name": "Test Product",
                        "image": null,
                        "description": "This is a test product",
                        "updatedAt": "2020-03-12T23:40:09.201Z",
                        "productReviews": null,
                        "index": 0

                    },
                    {
                        "id": "669e7692-03e3-46c1-9c02-a344a80ec698",
                        "name": "Test Product",
                        "image": null,
                        "description": "This is a test product",
                        "updatedAt": "2020-03-12T23:40:23.618Z",
                        "productReviews": null,
                        "index": 1
                    },
                    {
                        "id": "aa0c6a85-b038-439f-a47f-608e3cf0d74d",
                        "name": "Test Product",
                        "image": null,
                        "description": "This is a test product",
                        "updatedAt": "2020-03-12T23:40:33.179Z",
                        "productReviews": null,
                        "index": 2

                    },
                    {
                        "id": "2ba927ab-9602-4b3b-9cde-204f02b0b973",
                        "name": "Test Product",
                        "image": null,
                        "description": "This is a test product",
                        "updatedAt": "2020-03-12T23:40:42.589Z",
                        "productReviews": null,
                        "index": 3

                    },
                    {
                        "id": "4ec31418-9e2b-41af-92c8-d2d70041987b",
                        "name": "Test Product",
                        "image": null,
                        "description": "This is a test product",
                        "updatedAt": "2020-03-12T23:40:51.439Z",
                        "productReviews": null,
                        "index": 4

                    },
                    {
                        "id": "59e3b54a-ca5c-4dc9-961c-353b4cb5a6f9",
                        "name": "Test Product",
                        "image": null,
                        "description": "This is a test product",
                        "updatedAt": "2020-03-12T23:40:59.898Z",
                        "productReviews": null,
                        "index": 5

                    },
                    {
                        "id": "cddafca2-6f54-4e0f-9aab-ea0e99758697",
                        "name": "Test Product",
                        "image": null,
                        "description": "This is a test product",
                        "updatedAt": "2020-03-12T23:41:09.357Z",
                        "productReviews": null,
                        "index": 6
                    }
                ]
            },
            {
                "id": "7ae8bd61-3428-4621-a175-d6ece22ef0d7",
                "name": "Légumes",
                "products": []
            },
            {
                "id": "eccc707d-af5b-47cb-92a0-8745f448fc7d",
                "name": "Fruits",
                "products": []
            },
            {
                "id": "d1bd14f3-a1bc-4885-846b-6a50c91bf1fb",
                "name": "Poisson",
                "products": []
            }
        ]
    }
};

// const getItems = (count, offset = 0) =>
//     Array.from({ length: count }, (v, k) => k).map(k => ({
//         id: `item-${k + offset}`,
//         content: `item ${k + offset}`
//     }));

// const copiedDataTest = getItems(10);
// const copiedDataTest2 = getItems(5, 10);


const reorder = (list, startIndex, endIndex) => {
    console.log('startIndex', startIndex);
    console.log('endIndex', endIndex);
    console.log('list', list);
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    console.log('reorder res', result);
    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    console.log('src Clone', sourceClone);
    console.log('dest Clone', destClone);
    console.log('removed', removed);
    console.log('drop src', droppableSource);
    console.log('drop dest', droppableDestination);

    // @ts-ignore
    // removed.index = droppableDestination.index;
    destClone.splice(droppableDestination.index, 0, removed);
    console.log('dest Clone', destClone);
    // let it =
    // destClone.map(product => {
    //     product.index
    // })

    const result = {};
    result[0] = sourceClone;
    result[1] = destClone;
    console.log('result move ------');
    console.log('res src', result[0]);
    console.log('res dest', result[1]);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => {
    return ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle
    })
};

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : null,
    padding: '10px',
});

const Products = () => {
    const {loading, error, data} = useQuery(queryAllCompanyProductsCategories, {
        variables: {companyId: '984c68b8-dac6-4b58-a4e0-6e6dc0d8e59b'},
    });

    function onDragEnd(result) {
        const {source, destination} = result;
        console.log('source', source);
        console.log('destination', destination);

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const index = copiedData.data.getAllCompanyProductsCategories.findIndex(cat => cat.id === source.droppableId);
            console.log('index', index);

            // @ts-ignore
            copiedData.data.getAllCompanyProductsCategories[index].products = reorder(
                copiedData.data.getAllCompanyProductsCategories[index].products,
                source.index,
                destination.index
            );
        } else {
            const indexSrc = copiedData.data.getAllCompanyProductsCategories.findIndex(cat => cat.id === source.droppableId);
            const indexDest = copiedData.data.getAllCompanyProductsCategories.findIndex(cat => cat.id === destination.droppableId);
            const result = move(
                copiedData.data.getAllCompanyProductsCategories[indexSrc].products,
                copiedData.data.getAllCompanyProductsCategories[indexDest].products,
                source,
                destination
            );

            copiedData.data.getAllCompanyProductsCategories[indexSrc].products = result[0];
            copiedData.data.getAllCompanyProductsCategories[indexDest].products = result[1];
        }
    }

    return (
        <div className={'product-page'}>
            <div className={'sub-header'}>
                <Button className={'button'} text={'Créer une catégorie'} icon={<AddIcon/>} size={'large'}
                        onClick={() => {
                            console.log('cat', data);
                            console.log('load', loading);
                        }}/>
                <Button className={'button'} text={'Créer un produit'} icon={<AddIcon/>} size={'large'}/>
                <Button className={'button'} text={'Créer une publicité'} icon={<AddIcon/>} size={'large'}/>
            </div>
            <div className={'categories-list'}>
                {/*{!loading && copiedData.data.getAllCompanyProductsCategories.map((cat) => {*/}
                {/*<Collapse accordion>*/}
                    <DragDropContext onDragEnd={onDragEnd}>
                        {copiedData.data.getAllCompanyProductsCategories.map((cat, index) => (
                            // <div className={'card-list'} id={cat.name} key={cat.id}>
                            <Droppable droppableId={cat.id} direction={"horizontal"} key={cat.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        className={"category"}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                        {/*<Panel header={cat.name} key={index}>*/}
                                            <div
                                                ref={provided.innerRef}
                                                style={{height: '5%'}}
                                            >
                                                {cat.name}
                                            </div>
                                            <div ref={provided.innerRef} className={'card-list'}>
                                                <div ref={provided.innerRef} className={'card-list2'}>
                                                    {cat.products.map((product, index) => (
                                                        <Draggable
                                                            key={product.id}
                                                            draggableId={product.id}
                                                            index={index}
                                                            // index={product.index}
                                                        >
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    className={'card'}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={getItemStyle(
                                                                        snapshot.isDragging,
                                                                        provided.draggableProps.style
                                                                    )}
                                                                >
                                                                    {product.name}
                                                                </div>
                                                            )}

                                                        </Draggable>
                                                    ))}
                                                </div>
                                                {provided.placeholder}
                                            </div>
                                        {/*</Panel>*/}

                                    </div>
                                )}
                            </Droppable>
                            // </div>

                        ))}
                    </DragDropContext>
                {/*</Collapse>*/}
            </div>
        </div>
    )
};

export default Products;
// <Collapse
//     bordered={false}
//     expandIcon={({isActive}) => <CollapseIcon
//         style={{
//             transform: `rotate(${isActive ? 90 : 0}deg)`,
//             transformOrigin: 'center center'
//         }}/>}
//     className="site-collapse-custom-collapse"
// >

// <Panel header={cat.name} ref={provided.innerRef} className={'categorie'} key={cat.name}>
//</Panel>
// </Collapse>


// <Droppable droppableId="droppable" direction="horizontal">
//     {(provided, snapshot) => (
//         <div ref={provided.innerRef} {...provided.droppableProps}>
//             <Draggable draggableId={"draggable-1"} index={1}>
//                 {provided => (
//                     <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                     >
//                         Salut les enfants
//                     </div>
//                 )}
//             </Draggable>
//             <Draggable draggableId={"draggable-2"} index={2}>
//                 {provided => (
//                     <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                     >
//                         Salut les enfants - 2
//                     </div>
//                 )}
//             </Draggable>
//         </div>
//     )}
// </Droppable>
