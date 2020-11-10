import React from "react";
import { loader as graphqlLoader } from "graphql.macro";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Table, Tag, Modal, Row, Col, Divider, Card } from "antd";
import Popconfirm from "antd/es/popconfirm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons/lib";
import TerradiaLoader from "../components/TerradiaLoader";
import InvitationsListCard from "../components/Staff/InvitationsListCard";

const queryCompanyUsers = graphqlLoader(
  "../graphql/query/getCompanyUsers.graphql"
);

const getAllRoles = graphqlLoader("../graphql/query/getAllRoles.graphql");

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
      variables: { companyId },
    }
  );

  const {
    loading: loadingRoles,
    error: errorRoles,
    data: dataRoles,
  } = useQuery(getAllRoles);

  const [leaveCompany, { loading: leaveCompanyLoading }] = useMutation(
    mutationLeaveCompany,
    {
      refetchQueries: [
        {
          query: queryCompanyUsers,
          variables: { companyId },
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
        variables: { companyId },
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
        variables: { companyId },
      },
    ],
  });

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

  const isRoleSelected = (roleId, userSelected) => {
    if (userSelected) {
      return !!userSelected.roles.find((role) => role.id === roleId);
    }
    return false;
  };

  const handleAddRoleUser = (role) => {
    addUserCompanyRole({
      variables: {
        companyUserId: userSelectedRole.companyId,
        roleId: role.id,
      },
    }).catch((error) => {
      console.log(error);
    });
    const tmpUser = {
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
    removeUserCompanyRole({
      variables: {
        companyUserId: userSelectedRole.companyId,
        roleId: roleId,
      },
    }).catch((error) => {
      console.log(error);
    });
    const tmpUser = {
      companyId: userSelectedRole.companyId,
      roles: userSelectedRole.roles.filter((role) => role.id !== roleId),
    };
    setuserSelectedRole(tmpUser);
    return;
  };

  const handleChange = (role) => {
    if (isRoleSelected(role.id, userSelectedRole)) return;
    handleAddRoleUser(role);
  };

  const handleClose = (removedRole) => {
    handleRemovedRoleUser(removedRole);
  };

  // TODO : translate the roleSlugname
  const handleChangeRole = () => {
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
  };

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
      <Row>
        <Col span={6}>
          <EditOutlined
            className={"category-icon"}
            onClick={(event) => {
              handleOpenRole(record);
              event.stopPropagation();
            }}
          />
        </Col>
        <Col span={6}>
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
              className={"category-icon red"}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          </Popconfirm>
        </Col>
      </Row>
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

  if (
    loading ||
    loadingRoles ||
    leaveCompanyLoading ||
    removeUserCompanyRoleLoading
  )
    return <TerradiaLoader />;

  return (
    <>
      <Card className={"card"} title={<h2>Employés</h2>}>
        <Table
          columns={columns}
          rowKey={"id"}
          dataSource={
            dataCompany
              ? dataCompany.getCompany.users
              : console.log(errorDataCompany)
          }
        />
      </Card>
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
      <Divider className={"invisible-divider"} style={{ margin: "12px 0" }} />
      <InvitationsListCard companyView={true} />
    </>
  );
};

export default Staff;
