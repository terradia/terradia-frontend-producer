import {FormComponentProps} from 'antd/lib/form/Form'
import {Form as AntForm} from 'antd'
import React, {ReactNode} from "react";

interface FormProps extends FormComponentProps {
    labelAlign?: 'left' | 'right';
    layout?: 'horizontal' | 'vertical' | 'inline';

    onSubmit(): any;

    colon?: boolean;
    items?: Array<Item>;
}

interface Item {
    id: string;
    content?: ReactNode;
    label?: string;
}

// Form.defaultProps = {
//     labelAlign: 'right',
//     layout: 'horizontal',
    // onSubmit: undefined,
    // colon: true
// };

function testOnSubmit(e: any) {
    console.log(e);
}

interface IState {
    items?: object;
}

// export default function Form(props: FormProps, formProps: FormComponentProps) {
const form = class Form extends React.Component<FormProps & FormComponentProps, IState> {
    constructor(props: FormProps & FormComponentProps) {
        super(props);

        console.log('Formprops', props);
        this.state = {
            items: props.items
        };

        // console.log(typeof (items[0]));
        // items.map((item: any) => {
        //     console.log(typeof item.content);
        //
        // });

    }


    render() {
        // const usernameError = isFieldTouched('username') && getFieldError('username');

    // const [items, setItems] = useState(props.items);
    const items = this.props.items ? this.props.items : [{id : 'random', content: <p>Error</p>, label: 'Error'}];

    // console.log(formProps);
    const {getFieldDecorator} = this.props.form;
        // const items = this.state.items;

        return (
            <AntForm onSubmit={testOnSubmit} labelAlign={this.props.labelAlign} layout={this.props.layout} colon={this.props.colon}>
                {items.map((item: Item) => {
                    // const ForwardItem: any = React.forwardRef((props, ref) => (
                    //     item.content.props.ref=ref;
                    //     ));
                    // <ForwardItem ref={ref}/>
                    return (
                    <AntForm.Item htmlFor={item.id} key={item.id} label={item.label}>
                        {getFieldDecorator(item.id, {
                            rules: [{required: true, message: 'Please input your username!'}],
                            initialValue: 'ShitCoupeAuPneu'
                        })
                        // (<ForwardItem/>)
                        (item.content)
                        }
                    </AntForm.Item>)
                })
                }
            </AntForm>
        );
    }
}


const goodForm = AntForm.create({name: 'my_form'})(form);



export default goodForm