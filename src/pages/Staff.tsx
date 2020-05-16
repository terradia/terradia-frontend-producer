import React from "react";
import Button from "../components/Ui/Button";
import { loader as graphqlLoader } from "graphql.macro";
import { ReactComponent as AddIcon } from "../assets/Icon/ui/add.svg";
import "../assets/Style/Products/ProductsPage.less";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Table, Tag, Modal, Select, AutoComplete } from "antd";
import Popconfirm from "antd/es/popconfirm";
import { ConsoleSqlOutlined } from "@ant-design/icons";
// import Modal from '../components/Ui/Modal';

const queryCompanyUsers = graphqlLoader(
  "../graphql/query/getCompanyUsers.graphql"
);

const getAllUsers = graphqlLoader("../graphql/query/getAllUsers.graphql");

const mutationJoinCompany = graphqlLoader(
  "../graphql/mutation/joinCompany.graphql"
);

const mutationLeaveCompany = graphqlLoader(
  "../graphql/mutation/leaveCompany.graphql"
);

const mutationAddUserCompanyRole = graphqlLoader(
  "../graphql/mutation/addUserCompanyRole.graphql"
);

const mutationRemoveUserCompanyRole = graphqlLoader(
  "../graphql/mutation/removeUserCompanyRole.graphql"
);

const Staff = () => {
  const companyId = localStorage.getItem("selectedCompany");

  const { loading, error, data } = useQuery(queryCompanyUsers, {
    variables: { companyId: companyId },
  });

  const {
    loading: loadingAllUsers,
    error: errorAllUsers,
    data: allUsers,
  } = useQuery(getAllUsers);

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
      title: "Last Name",
      dataIndex: "user",
      key: "lastNameId",
      render: (user) => `${user.lastName}`,
    },
    {
      title: "First Name",
      dataIndex: "user",
      key: "firstNameId",
      render: (user) => `${user.firstName}`,
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "emailId",
      render: (user) => `${user.email}`,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "roles",
      render: (roles) => (
        <span>
          {roles.map((tag, index) => {
            let color = tag.slugName.length === "member" ? "geekblue" : "green";
            if (tag.slugName === "admin") {
              color = "volcano";
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
      title: "Operation",
      dataIndex: "operation",
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

  const handleDeleteUser = (userData) => {
    leaveCompany({
      variables: {
        companyId: companyId,
        userId: userData.user.id,
      },
    }).catch((error) => {
      console.log(error);
    });
  };

  // Add user to company
  const [allUsersState, setAllUsers] = React.useState([]);

  const handleOpenAddUser = () => {
    let tmpAllUsers = [];
    allUsers.getAllUsers.map((user) => {
      tmpAllUsers = [
        ...tmpAllUsers,
        {
          id: user.id,
          slugName: user.firstName + " " + user.lastName,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      ];
    });
    setAllUsers(tmpAllUsers);
    return openUser === true ? setOpenUser(false) : setOpenUser(true);
  };

  const [selectedUserToCompany, setSelectedUserToCompany] = React.useState("");

  const onSelectUser = (userSelected) => {
    allUsersState.find((user) =>
      user.slugName === userSelected ? setSelectedUserToCompany(user.id) : null
    );
    console.log("SELECTED COMPANY");
    console.log(selectedUserToCompany);
  };

  const handleJoinCompany = () => {
    joinCompany({
      variables: {
        companyId: companyId,
        userId: selectedUserToCompany,
      },
    }).catch((error) => {
      console.log(error);
    });

    console.log("After ok button Join company");
    console.log(selectedUserToCompany);
    return openUser === true ? setOpenUser(false) : setOpenUser(true);
  };

  // Add role to user
  const [roles, setRoles] = React.useState([]);
  const [roleChanged, setRoleChanged] = React.useState("");
  const [userChanged, setUserChanged] = React.useState("");
  function handleChangeRole(value) {
    setRoleChanged(value);
  }

  const handleOpenRole = () => {
    data.getCompany.users.map((user) => {
      user.roles.map((role) => {
        setRoles([
          ...roles,
          {
            id: role.id,
            slugName: role.slugName,
          },
        ]);
      });
    });
    return openRole === true ? setOpenRole(false) : setOpenRole(true);
  };

  function handleChangeUserRole(value) {
    setUserChanged(value);
  }

  const handleAddRoleUser = () => {
    addUserCompanyRole({
      variables: {
        companyUserId: userChanged,
        roleId: roleChanged,
      },
    }).catch((error) => {
      console.log(error);
    });
    return openRole === true ? setOpenRole(false) : setOpenRole(true);
  };

  if (loading) return <div>loading</div>;

  return (
    <div className={"product-page"}>
      <div className={"sub-header"}>
        <Button
          className={"button"}
          text={"Ajouter un employé"}
          icon={<AddIcon />}
          size={"large"}
          onClick={() => handleOpenAddUser()}
        />
        <Button
          className={"button"}
          text={"Modifier le rôle"}
          icon={<AddIcon />}
          size={"large"}
          onClick={() => handleOpenRole()}
        />
        <Modal
          title="Ajouter un employé"
          centered
          visible={openUser}
          onOk={() => handleJoinCompany()}
          onCancel={() => handleOpenAddUser()}
        >
          {allUsersState && (
            <AutoComplete
              style={{ width: 200 }}
              placeholder="Ajouter un employé"
              onSelect={onSelectUser}
              onChange={onSelectUser}
            >
              {allUsersState.map((user) => (
                <AutoComplete.Option key={user.id} value={user.slugName}>
                  {user.slugName}
                </AutoComplete.Option>
              ))}
            </AutoComplete>
          )}
        </Modal>
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
            {roles
              ? roles.map((item) => (
                  <Select.Option value={item.id} key={item.id}>
                    {item.slugName}
                  </Select.Option>
                ))
              : null}
          </Select>
          <Select
            defaultValue="Choose your member"
            style={{ width: 240 }}
            onChange={handleChangeUserRole}
          >
            {data.getCompany.users
              ? data.getCompany.users.map((user) => (
                  <Select.Option value={user.id} key={user.user.id}>
                    {user.user.firstName}
                  </Select.Option>
                ))
              : null}
          </Select>
        </Modal>
      </div>
      <Table
        columns={columns}
        dataSource={data ? data.getCompany.users : null}
      />
    </div>
  );
};

export default Staff;
