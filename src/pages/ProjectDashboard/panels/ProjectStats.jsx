import React, { useMemo } from 'react'
import DashboardPanelWrapper from './DashboardPanelWrapper'
import ListStatsTile from './ListStatsTile'
import copyToClipboard from '@helpers/copyToClipboard'
import { useGetProjectDashboardQuery } from '@queries/getProjectDashboard'
import getEntityTypeIcon from '@helpers/getEntityTypeIcon'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
const ProjectStats = ({ projectName, share, position }) => {
  const {t} = useTranslation()
  const {
    data = {},

    isFetching,
  } = useGetProjectDashboardQuery({ projectName, panel: 'entities' })

  const { folders, products, tasks, versions, representations, workfiles } = data

  const stats = {
    folders: { label: t("Folders"), icon: getEntityTypeIcon('folder'), stat: folders },
    products: { label: t("Products"), icon: getEntityTypeIcon('product'), stat: products },
    versions: { label: t("Versions"), icon: getEntityTypeIcon('version'), stat: versions },
    representations: {
      label: t("Representations"),
      icon: getEntityTypeIcon('representation'),
      stat: representations,
    },
    tasks: { label: t("Tasks"), icon: getEntityTypeIcon('task'), stat: tasks },
    workfiles: { label: t("Workfiles"), icon: getEntityTypeIcon('workfile'), stat: workfiles },
  }

  const statsOrder = ['folders', 'products', 'versions', 'representations', 'tasks', 'workfiles']

  const copyStatMessage = (id) => {
    const { label, stat } = stats[id]
    // demo_Commercial has 10 folders
    const message = `${projectName} has ${stat} ${label}`
    copyToClipboard(message)
  }

  const shareData = useMemo(() => {
    return { project: projectName, ...data }
  }, [data])

  return (
    <DashboardPanelWrapper
      title={t("Project Stats")}
      icon={{ icon: 'share', onClick: () => share('stats', shareData, position) }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      }}
    >
      {statsOrder.map((id) => {
        const { label, icon } = stats[id]

        return (
          <ListStatsTile
            title={label}
            stat={stats[id].stat}
            icon={icon}
            isLoading={isFetching}
            key={id}
            onClick={() => copyStatMessage(id)}
          />
        )
      })}
    </DashboardPanelWrapper>
  )
}

export default ProjectStats
