import { useState } from 'react'
import * as Styled from './UserDashboardNoProjects.styled'
import NoProducts from '../../BrowserPage/Products/NoProducts'
import { Button } from '@ynput/ayon-react-components'
import NewProjectDialog from '../../ProjectManagerPage/NewProjectDialog'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { $Any } from '@types'
import { useTranslation } from 'react-i18next'

const UserDashboardNoProjects = () => {
  // translation
  const {t} = useTranslation()


  const [openNewProject, setOpenNewProject] = useState(false)
  const user = useSelector((state: $Any) => state.user)
  const newProjectButtonVisible = user.data.isAdmin || user.data.isManager
  const navigate = useNavigate()

  return (
    <Styled.Container>
      <NoProducts label={t("No Projects")} error={undefined} />
      {newProjectButtonVisible && (
        <Button
          label={t("Create first project")}
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
