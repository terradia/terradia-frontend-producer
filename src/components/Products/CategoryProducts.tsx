import React, {useEffect, useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {ReactComponent as CarretIcon} from '../../assets/Icon/ui/carret.svg';


interface CategoryProductsProps {
    provided: { innerRef: any; placeholder: any; droppableProps: any };
    snapshot: { isDraggingOver: boolean; draggingOverWith: any; draggingFromThisWith: any; isUsingPlaceholder: boolean };
    cat: { id: string; name: string; products: any };
}

const getItemStyle = (isDragging, draggableStyle) => {
    return ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle
    });
};

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : null,
    padding: '10px',
});

function CategoryProducts(props: CategoryProductsProps) {

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (props.snapshot.isDraggingOver) {
            setCollapsed(false);
        }
    }, [props.snapshot.isDraggingOver]);


    return (
        <div
            ref={props.provided.innerRef}
            className={`category ${collapsed === true ? 'collapsed-cat' : ''}`}
            style={getListStyle(props.snapshot.isDraggingOver)}>
            <div
                ref={props.provided.innerRef}
                style={{height: '5%', position: 'absolute'}}
                onClick={() => {
                    if (collapsed) {
                        setCollapsed(false);
                    } else {
                        setCollapsed(true);
                    }
                }}
            >
                <CarretIcon style={{transform: collapsed ? null : 'rotate(90deg)'}}/>
                {props.cat.name}
            </div>
            <div ref={props.provided.innerRef} className={`card-list ${collapsed === true ? 'collapsed' : ''}`}>
                {props.cat.products.map((product, index) => (
                    <Draggable
                        key={product.id}
                        draggableId={product.id}
                        index={index}
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
                                <p style={{}}>
                                    {product.name}
                                </p>
                            </div>
                        )}

                    </Draggable>
                ))}
                {props.provided.placeholder}
            </div>
        </div>
    );
}

export default CategoryProducts;
