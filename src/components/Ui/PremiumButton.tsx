import React from 'react';
import Button from './Button';

const textStyle = {
    fontFamily: 'Montserrat',
    fontWeight: 400,
    color: '#5CC04A',
    fontSize: 16
};

const PremiumButton = () => {
    return (
        <Button
            style={{
                display: 'flex',
                borderColor: '#5CC04A',
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <span style={textStyle}>
                Passer a Terradia PRO
            </span>
        </Button>
    );
};

export default PremiumButton;