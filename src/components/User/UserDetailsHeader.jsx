import React from 'react'
import PropTypes from 'prop-types'
import DetailHeader from '../DetailHeader'
import { UserImagesStacked } from '@ynput/ayon-react-components'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
const SubHeader = styled.span`
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UserDetailsHeader = ({ users = [], onClose, subTitle = '', style = {} }) => {
  // translation
  const {t} = useTranslation()
  // a single user
  const singleUserEdit = users.length === 1 ? users[0] || ' ' : null

  const getUserName = (user) => user?.attrib?.fullName || user?.name

  const user_count = t("usercount",{length:users.length})
  const title = singleUserEdit ? getUserName(singleUserEdit) : user_count

  return (
    <DetailHeader onClose={onClose} context={users} dialogTitle="User Context" style={style}>
      <UserImagesStacked
        users={users.map((user) => ({
          avatarUrl: user.name && `/api/users/${user.name}/avatar`,
          self: user?.self,
        }))}
      />
      <div>
        <h2>{title}</h2>
        <SubHeader>{subTitle}</SubHeader>
      </div>
    </DetailHeader>
  )
}

UserDetailsHeader.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  onClose: PropTypes.func,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  style: PropTypes.object,
}

export default UserDetailsHeader
