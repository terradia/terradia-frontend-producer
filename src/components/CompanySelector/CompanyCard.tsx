import React from 'react';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const textStyle = {
  fontWeight: 600,
  fontSize: 'larger',
  color: '#575757',
  flexShrink: 0,
};

declare interface CompanyCardProps {
  id: string;
  selected: boolean;
  loading?: boolean;
  name?: string;
  cover?: string;
  logo?: string;
  onClick: (string) => void
}

const CompanyCard = ({
                       id,
                       selected = false,
                       loading = false,
                       name = 'Mon compte personnel',
                       cover = '/src/assets/company/defaultCover',
                       logo = '/src/assets/company/defaultLogo',
                       onClick,
                     }: CompanyCardProps) => {

  const onClickHandler = () => {
    onClick(id);
  };
  console.log(selected);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Card
        style={{
          width: 250,
          height: 250,
          margin: '24px',
          border: 'solid ',
          borderColor: (selected) ? '#00c537' : '#FFFFFF',
        }}
        onClick={onClickHandler}
        loading={loading}
      >
        <Avatar
          size={200}
          shape={'square'}
          alt={'profile'}
          src={logo}
          icon={<UserOutlined/>}
        />
      </Card>
      <span style={textStyle}>
        {name}
      </span>
    </div>
  );
};

export default CompanyCard;