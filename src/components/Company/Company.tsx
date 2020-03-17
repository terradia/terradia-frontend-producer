import React, { useContext, /*useEffect,*/ useState } from 'react'
import Button from '../Ui/Button'
import { Drawer, Icon } from 'antd'
import UserContext from '../Context/UserContext'
import DeleteCompany from './DeletteCompany'
import editCompany from './EditCompany/EditCompany'
import CompanyCard from './CompanyCard'
import CompanyIcon from 'company.svg'

const bodyStyle = {
  fontSize: '20px'
}

const drawerStyle = {
  color: 'red'
}

const headerStyle = {
  fontSize: '30px',
  color: '#5CC04A'
}

const buttonStyle = {
  backgroundColor: '#5CC04A',
  borderColor: '#5CC04A',
  color: '#FFFFF',
  width: '400px',
  height: '45px',
  marginBottom: '20px'
}

const Company = () => {
  const [visible, setVisibility] = useState(false)
  const [openEditModal, setEditModal] = useState(false)
  const [callDelete, setCallDelete] = useState(false)
  const user = useContext(UserContext)
  const editCompanyModal = editCompany({ setEditModal, openEditModal })
  console.log(user)

  return (
    <div>
      <UserContext.Provider value={user} />
      <Button
        color={'primary'}
        onClick={() => setVisibility(!visible)}
        style={buttonStyle}
        text={'Mes entreprise'}
      />
      <Drawer
        title={
          <div style={headerStyle}>
            <Icon component={CompanyIcon} /> Mes Companies
          </div>
        }
        placement={'right'}
        closable={true}
        onClose={() => setVisibility(!visible)}
        visible={visible}
        width={400}
        drawerStyle={drawerStyle}
        bodyStyle={bodyStyle}
      >
        <CompanyCard
          setEditModal={setEditModal}
          setCallDelete={setCallDelete}
        />
      </Drawer>
      {openEditModal && editCompanyModal}
      {callDelete && <DeleteCompany setCallDelete={setCallDelete} />}
    </div>
  )
}
export default Company
