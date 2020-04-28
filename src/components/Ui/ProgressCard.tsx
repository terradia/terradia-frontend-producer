import React from 'react';
import {Card, Progress} from 'antd';

declare interface ProgressCardProps {
    text: string;
    value: number;
}

const boldTextStyle = {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: 'normal',
    color: '#828282',
};

const CardStyle = {
    marginBottom: '8px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-around'
};

const CardBodyStyle = {
    display: 'flex',
    width: '100%',
    color: '#F6F8FA',
    ...boldTextStyle,
    padding: '5px',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const ProgressCard = ({text, value}: ProgressCardProps) => {
    return (
        <Card style={CardStyle} bodyStyle={CardBodyStyle}>
            <span style={{
                display: 'flex',
                flexFlow: 'column'
            }}>
                {text}
            </span>
            <Progress type="dashboard"
                      percent={value}
                      width={40}
                      strokeWidth={10}
                      strokeColor={'#00c537'}
                      format={value => (value)}
            />
        </Card>
    );
};

export default ProgressCard;