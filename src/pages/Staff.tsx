import React from "react";
import Button from "../components/Ui/Button";
import { loader as graphqlLoader } from "graphql.macro";
import "../assets/Style/Products/ProductsPage.less";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Table, Tag, Modal, AutoComplete } from "antd";
import Popconfirm from "antd/es/popconfirm";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons/lib";

const queryCompanyUsers = graphqlLoader(
  "../graphql/query/getCompanyUsers.graphql"
);

const getAllUsers = graphqlLoader("../graphql/query/getAllUsers.graphql");

const getAllRoles = graphqlLoader("../graphql/query/getAllRoles.graphql");

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
  const { loading, error: errorDataCompany, data: dataCompany } = useQuery(
    queryCompanyUsers,
    {
      variables: { companyId: companyId },
    }
  );

  const {
    loading: loadingRoles,
    error: errorRoles,
    data: dataRoles,
  } = useQuery(getAllRoles);

  const {
    loading: loadingAllUsers,
    error: errorAllUsers,
    data: allUsers,
  } = useQuery(getAllUsers);

  const [joinCompany, { loading: joinCompanyLoading }] = useMutation(
    mutationJoinCompany,
    {
      refetchQueries: [
        {
          query: queryCompanyUsers,
          variables: { companyId: companyId },
        },
      ],
    }
  );

  const [leaveCompany, { loading: leaveCompanyLoading }] = useMutation(
    mutationLeaveCompany,
    {
      refetchQueries: [
        {
          query: queryCompanyUsers,
          variables: { companyId: companyId },
        },
      ],
    }
  );

  const [
    addUserCompanyRole,
    { loading: addUserCompanyRoleLoading },
  ] = useMutation(mutationAddUserCompanyRole, {
    refetchQueries: [
      {
        query: queryCompanyUsers,
        variables: { companyId: companyId },
      },
    ],
  });

  const [
    removeUserCompanyRole,
    { loading: removeUserCompanyRoleLoading },
  ] = useMutation(mutationRemoveUserCompanyRole, {
    refetchQueries: [
      {
        query: queryCompanyUsers,
        variables: { companyId: companyId },
      },
    ],
  });

  const [openUser, setOpenUser] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(false);

  const handleDeleteUser = (userData) => {
    if (userData)
      leaveCompany({
        variables: {
          companyId: companyId,
          userId: userData.id,
        },
      }).catch((error) => {
        console.log(error);
      });
  };

  // TODO : translate the roleSlugname
  const roleRenderer = (roles: { slugName: string }[]) => {
    return (
      <span>
        {roles.map((role: { slugName: string }, index: string | number) => {
          let color = "green";
          if (role.slugName === "admin") {
            color = "volcano";
          }
          if (role.slugName === "owner") {
            color = "cyan";
          }
          return (
            <Tag color={color} key={index}>
              {role.slugName.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    );
  };

  const [roles, setRoles] = React.useState([]); // All roles availables
  const [userSelectedRole, setuserSelectedRole] = React.useState({
    companyId: null,
    roles: [],
  });

  function isRoleSelected(roleId, userSelected) {
    if (userSelected) {
      return userSelected.roles.find((role) => role.id === roleId)
        ? true
        : false;
    }
    return false;
  }

  const handleAddRoleUser = (role) => {
    let tmpUser = {
      companyId: null,
      roles: [],
    };
    addUserCompanyRole({
      variables: {
        companyUserId: userSelectedRole.companyId,
        roleId: role.id,
      },
    }).catch((error) => {
      console.log(error);
    });
    tmpUser = {
      companyId: userSelectedRole.companyId,
      roles: [
        ...userSelectedRole.roles,
        {
          id: role.id,
          slugName: role.slugName,
        },
      ],
    };
    setuserSelectedRole(tmpUser);
    return;
  };

  const handleRemovedRoleUser = (roleId) => {
    let tmpUser = {
      companyId: null,
      roles: [],
    };
    removeUserCompanyRole({
      variables: {
        companyUserId: userSelectedRole.companyId,
        roleId: roleId,
      },
    }).catch((error) => {
      console.log(error);
    });
    tmpUser = {
      companyId: userSelectedRole.companyId,
      roles: userSelectedRole.roles.filter((role) => role.id !== roleId),
    };
    setuserSelectedRole(tmpUser);
    return;
  };

  function handleChange(role) {
    if (isRoleSelected(role.id, userSelectedRole)) return;
    handleAddRoleUser(role);
  }

  function handleClose(removedRole) {
    handleRemovedRoleUser(removedRole);
  }

  // TODO : translate the roleSlugname
  function handleChangeRole() {
    return (
      <div>
        {roles.map((role) => (
          <Tag
            closable={isRoleSelected(role.id, userSelectedRole)}
            key={role.id}
            onClose={(e) => {
              e.preventDefault();
              handleClose(role.id);
            }}
            color={isRoleSelected(role.id, userSelectedRole) ? "green" : null}
            onClick={() => handleChange(role)}
          >
            {role.slugName.toUpperCase()}
          </Tag>
        ))}
      </div>
    );
  }

  const handleRoles = () => {
    return openRole === true ? setOpenRole(false) : setOpenRole(true);
  };

  const handleOpenRole = (userRecord) => {
    let tmpRole = [];
    let tmpUser = {
      companyId: null,
      roles: [],
    };
    openRole === true ? setOpenRole(false) : setOpenRole(true);
    if (userSelectedRole)
      setuserSelectedRole({
        companyId: null,
        roles: [],
      });
    if (!errorRoles) {
      dataRoles.getAllRoles.forEach((role) => {
        tmpRole = [
          ...tmpRole,
          {
            id: role.id,
            slugName: role.slugName,
          },
        ];
      });
      tmpUser = { companyId: userRecord.id, roles: userRecord.roles };
      setRoles(tmpRole);
      setuserSelectedRole(tmpUser);
    } else console.log(errorRoles);
    return;
  };

  // TODO : translate actions titles
  const actions = (text, record) => {
    return (
      <div>
        <EditOutlined
          className={"category-icon"}
          onClick={(event) => {
            handleOpenRole(record);
            event.stopPropagation();
          }}
        />
        <Popconfirm
          placement="top"
          title={"Êtes vous sûr(e)?"}
          onConfirm={(event) => {
            handleDeleteUser(record.user);
            event.stopPropagation();
          }}
          onCancel={(event) => {
            event.stopPropagation();
          }}
          okText="Oui"
          cancelText="Non"
        >
          <DeleteOutlined
            className={"category-icon"}
            style={{ color: "red" }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
        </Popconfirm>
      </div>
    );
  };

  // TODO : translate
  const columns = [
    {
      title: "Nom",
      dataIndex: "user",
      key: "lastNameId",
      render: (user) => `${user.lastName}`,
    },
    {
      title: "Prénom",
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
      title: "Rôles",
      key: "roles",
      dataIndex: "roles",
      render: roleRenderer,
    },
    {
      title: "Opérations",
      dataIndex: "operation",
      render: actions,
    },
  ];

  const [allUsersState, setAllUsers] = React.useState([]);

  const handleOpenAddUser = () => {
    let tmpAllUsers = [];
    if (!loadingAllUsers && !errorAllUsers) {
      allUsers.getAllUsers.forEach((user) => {
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
    } else console.log(errorAllUsers);
    return openUser === true ? setOpenUser(false) : setOpenUser(true);
  };

  const [selectedUserToCompany, setSelectedUserToCompany] = React.useState("");

  const onSelectUser = (userSelected) => {
    allUsersState.find((user) =>
      user.slugName === userSelected ? setSelectedUserToCompany(user.id) : null
    );
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
    return openUser === true ? setOpenUser(false) : setOpenUser(true);
  };

  // TODO : translate loading
  if (
    loading ||
    loadingRoles ||
    loadingAllUsers ||
    leaveCompanyLoading ||
    removeUserCompanyRoleLoading
  )
    return <div>loading</div>;

  // TODO : translate the text, title, placeHolder
  return (
    <div className={"product-page"}>
      <div className={"sub-header"}>
        <Button
          className={"button"}
          text={"Ajouter un employé"}
          icon={<PlusOutlined />}
          onClick={handleOpenAddUser}
        />
        <Modal
          title="Ajouter un employé"
          centered
          visible={openUser}
          confirmLoading={joinCompanyLoading}
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
          title="Modifier le rôle de l'employé"
          centered
          visible={openRole}
          confirmLoading={addUserCompanyRoleLoading}
          onOk={() => handleRoles()}
          onCancel={() => handleRoles()}
        >
          <div>{handleChangeRole()}</div>
        </Modal>
      </div>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={
          dataCompany
            ? dataCompany.getCompany.users
            : console.log(errorDataCompany)
        }
      />
    </div>
  );
};

export default Staff;
