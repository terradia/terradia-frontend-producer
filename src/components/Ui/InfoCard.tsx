import React from 'react';
import {Card} from 'antd';

declare interface Info {
    label: string;
    text: string;
}

declare interface InfoCardProps {
    title: string;
    infos: Info[];
}

const textStyle = {
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: 'normal',
    color: '#575757',
    flexShrink: 0,
};

const boldTextStyle = {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: 'normal',
    color: '#828282',
};

const InfoCard = (props: InfoCardProps) => {
    const {title, infos} = props;

    const info = infos.map(info => (
        <p key={info.label}>
            <span style={boldTextStyle}>
                {info.label}
            </span>
            <span style={textStyle}>
                {info.text}
            </span>
        </p>
    ));
    return (
        <div style={{display: 'flex', paddingBottom: 24}}>
            <Card title={title}
                  bordered={false}
                  headStyle={boldTextStyle}
                  style={{width: 300}}
            >
                {info}
            </Card>
        </div>
    );
};

export default InfoCard;