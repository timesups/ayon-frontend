import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Styled from './UserDashboardNoProjects.styled'
import NoProducts from './NoProducts'
import { Button } from '@ynput/ayon-react-components'
import NewProjectDialog from '../../ProjectManagerPage/NewProjectDialog'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { $Any } from '@types'

const UserDashboardNoProjects = () => {
  const { t } = useTranslation('dashboard')
  const [openNewProject, setOpenNewProject] = useState(false)
  const user = useSelector((state: $Any) => state.user)
  const newProjectButtonVisible = user.data.isAdmin || user.data.isManager
  const navigate = useNavigate()

  return (
    <Styled.Container>
      <NoProducts label={t('noProjects')} error={undefined} />
      {newProjectButtonVisible && (
        <Button
          label={t('createFirstProject')}
          variant="filled"
          icon="create_new_folder"
          onClick={() => setOpenNewProject(true)}
        />
      )}
      {openNewProject && (
        <NewProjectDialog
          onHide={(name: string) => {
            setOpenNewProject(false)
            if (name) navigate(`/manageProjects/anatomy?project=${name}`)
          }}
        />
      )}
    </Styled.Container>
  )
}

export default UserDashboardNoProjects
