import React, { CSSProperties } from 'react';
import Button from './Button';
import EditIcon from '../Icons/PageIcon/EditIcon';

declare interface EditButtonProps {
  callback: () => void,
  style?: React.CSSProperties
}

const EditButton = (props: EditButtonProps) => {
  return (
    <Button
      style={{
        display: 'flex',
        borderColor: '#5CC04A',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={props.callback}
    >
      <EditIcon style={{ height: '25px', width: '25px' }}/>
    </Button>
  );
};

export default EditButton;