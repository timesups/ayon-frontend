import React from 'react'
import DashboardPanelWrapper from './DashboardPanelWrapper'
import { useGetProjectDashboardQuery } from '@queries/getProjectDashboard'
import styled from 'styled-components'
import clsx from 'clsx'


import { useTranslation } from 'react-i18next'

const RowStyled = styled.div`
  padding-top: 8px;
  font-size: 16px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const ProjectUsers = ({ projectName }) => {
  //translation

  const {t} = useTranslation()

  let { data = {}, isFetching } = useGetProjectDashboardQuery({
    projectName,
    panel: 'users',
  })

  const { teamSizeActive = 0, teamSizeTotal = 0, usersWithAccessTotal = 0 } = data

  return (
    <DashboardPanelWrapper className={clsx({ loading: isFetching }, 'shimmer-dark')}>
      <RowStyled>
        <strong>{t("teamSizeTotal",{teamTotal:teamSizeTotal})}</strong> | <strong>{t("teamSizeActive",{teamActive:teamSizeActive})}</strong>{' '}
        | <strong>{t("usersWithAccessTotal",{usersTotal:usersWithAccessTotal})}</strong>
      </RowStyled>
    </DashboardPanelWrapper>
  )
}

export default ProjectUsers
