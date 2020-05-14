import React from 'react';
import Button from '../components/Ui/Button';
import { loader as graphqlLoader } from 'graphql.macro';
import { ReactComponent as AddIcon } from '../assets/Icon/ui/add.svg';
import '../assets/Style/Products/ProductsPage.less';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Table, Tag, Modal, Select } from 'antd';
import Popconfirm from 'antd/es/popconfirm';
// import Modal from '../components/Ui/Modal';

const queryCompanyUsers = graphqlLoader(
  '../graphql/query/getCompanyUsers.graphql'
);

const queryCompaniesByUser = graphqlLoader(
  '../graphql/query/getCompaniesByUser.graphql'
);

const mutationJoinCompany = graphqlLoader(
  '../graphql/mutation/joinCompany.graphql'
);

const mutationLeaveCompany = graphqlLoader(
  '../graphql/mutation/leaveCompany.graphql'
);

const mutationAddUserCompanyRole = graphqlLoader(
  '../graphql/mutation/addUserCompanyRole.graphql'
);

const mutationRemoveUserCompanyRole = graphqlLoader(
  '../graphql/mutation/removeUserCompanyRole.graphql'
);

const Staff = () => {
  const companyId = localStorage.getItem('selectedCompany');

  const { loading, error, data } = useQuery(queryCompanyUsers, {
    variables: { companyId: companyId },
  });

  const [joinCompany, { loading: joinCompanyLoading }] = useMutation(
    mutationJoinCompany
  );
  const [leaveCompany, { loading: leaveCompanyLoading }] = useMutation(
    mutationLeaveCompany
  );

  const [
    addUserCompanyRole,
    { loading: addUserCompanyRoleLoading },
  ] = useMutation(mutationAddUserCompanyRole);

  const [
    removeUserCompanyRole,
    { loading: removeUserCompanyRoleLoading },
  ] = useMutation(mutationRemoveUserCompanyRole);

  const [openUser, setOpenUser] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(false);

  const columns = [
    {
      title: 'Last Name',
      dataIndex: "user",// 'name',
      key: 'lastNameId' ,//'user.lastName',
      render: user => `${user.lastName}`,
    },
    {
      title: 'First Name',
      dataIndex: 'user',//'age',
      key: 'firstNameId',//'age',
      render: user => `${user.firstName}`,
    },
    {
      title: 'Email',
      dataIndex: 'user',//'address',
      key: 'emailId',//'address',
      render: user => `${user.email}`,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'roles',
      render: (roles) => (
        <span>
          {roles.map((tag, index) => {
            let color = tag.slugName.length === 'member' ? 'geekblue' : 'green';
            if (tag.slugName === 'admin') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={index}>
                {tag.slugName.toUpperCase()}
              </Tag>
            );
          })}
    </span>
    ),
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDeleteUser(record)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];



  console.log('===========DATATable');
  let extractArrays1 = data ? data.getCompany.users : null;
  console.log(extractArrays1);

  const handleOpenAddUser = () => {
    return openUser === true ? setOpenUser(false) : setOpenUser(true);
  };

  const handleDeleteUser = (userData) => {
    console.log('DATASOURCE');
    console.log(userData.user.id);
    leaveCompany({
      variables: {
        companyId: companyId,
        userId: userData.user.id,
      },
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleJoinCompany = () => {
    joinCompany({
      variables: {
        companyId: companyId,
        userId: 'ecd9b7fe-bd5c-4802-a936-1c1a8351a088',
      },
    }).catch((error) => {
      console.log(error);
    });
    return openUser === true ? setOpenUser(false) : setOpenUser(true);
  };

  const [items, setItems] = React.useState([]);

  const handleOpenRole = () => {
    data.getCompany.users.map((user) => {
      user.roles.map((role) => {
        setItems([
          ...items,
          {
            id: role.id,
            slugName: role.slugName,
          },
        ]);
      });
    });
    return openRole === true ? setOpenRole(false) : setOpenRole(true);
  };

  const [roleChanged, setRoleChanged] = React.useState('');
  const [userChanged, setUserChanged] = React.useState('');
  function handleChangeRole(value) {
    setRoleChanged(value);
  }

  function handleChangeUser(value) {
    setUserChanged(value);
  }

  const handleAddRoleUser = () => {
    console.log('roleChanged:');
    console.log(roleChanged);
    console.log('userChanged:');
    console.log(userChanged);
    addUserCompanyRole({
      variables: {
        companyUserId: userChanged, //"26b0eedd-b489-4f2d-bd5a-0b6f70a4a385",
        roleId: roleChanged, //"4ab9dee4-28a3-4109-9a59-94b10632fb77",
      },
    }).catch((error) => {
      console.log(error);
    });
    return openRole === true ? setOpenRole(false) : setOpenRole(true);
  };

  const { Option } = Select;
  if (loading) return <div>loading</div>;
  return (
    <div className={'product-page'}>
      <div className={'sub-header'}>
        <Button
          className={'button'}
          text={'Ajouter un employé'}
          icon={<AddIcon />}
          size={'large'}
          onClick={() => handleOpenAddUser()}
        />
        <Button
          className={'button'}
          text={'Modifier le rôle'}
          icon={<AddIcon />}
          size={'large'}
          onClick={() => handleOpenRole()}
        />
        <Modal
          title="Ajouté un employé"
          centered
          visible={openUser}
          onOk={() => handleJoinCompany()}
          onCancel={() => handleOpenAddUser()}
        ></Modal>
        <Modal
          title="Ajouté un rôle a un employé"
          centered
          visible={openRole}
          onOk={() => handleAddRoleUser()}
          onCancel={() => handleOpenRole()}
        >
          <Select
            defaultValue="Choose the role"
            style={{ width: 240 }}
            onChange={handleChangeRole}
          >
            {items
              ? items.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.slugName}
                  </Option>
                ))
              : null}
          </Select>
          <Select
            defaultValue="Choose your member"
            style={{ width: 240 }}
            onChange={handleChangeUser}
          >
            {data.getCompany.users
              ? data.getCompany.users.map((user) => (
                  <Option value={user.id} key={user.user.id}>
                    {user.user.firstName}
                  </Option>
                ))
              : null}
          </Select>
        </Modal>
      </div>
      {console.log('BEFORE TABLE')}
      {console.log(data.getCompany.users)}
      <Table
        columns={columns}
        dataSource={data ? data.getCompany.users : null} //dataTEST 
      />
    </div>
  );
};

export default Staff;
