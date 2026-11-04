import { useState, useMemo } from 'react'
import { useCreateContextMenu } from '@shared/containers/ContextMenu'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button, TablePanel, Section, Toolbar, Spacer } from '@ynput/ayon-react-components'
import { useDeleteAccessGroupMutation, useGetAccessGroupsQuery } from '@shared/api'
import NewAccessGroup from './NewAccessGroup'
import { confirmDelete } from '@shared/util'
import clsx from 'clsx'
import useTableLoadingData from '@hooks/useTableLoadingData'
import { useTranslation } from 'react-i18next'

const AccessGroupList = ({
  projectName,
  selectedAccessGroup,
  onSelectAccessGroup,
  canCreateOrDelete,
}) => {
  const { t } = useTranslation('settings')
  const [showNewAccessGroup, setShowNewAccessGroup] = useState(false)

  // Load user list
  const { data: accessGroupList = [], isLoading } = useGetAccessGroupsQuery({
    projectName: projectName || '_',
  })

  const [deleteAccessGroup] = useDeleteAccessGroupMutation()

  // Selection
  const selection = useMemo(() => {
    for (const accessGroup of accessGroupList) {
      if (accessGroup.name === selectedAccessGroup?.name) return accessGroup
    }
  }, [selectedAccessGroup, accessGroupList])

  const onSelectionChange = (eValue) => {
    if (!onSelectAccessGroup) return
    onSelectAccessGroup({
      name: eValue.name,
      isProjectLevel: eValue.isProjectLevel,
    })
  }

  const onNewAccessGroup = (name) => {
    // close form
    setShowNewAccessGroup(false)
    // select new access group
    onSelectAccessGroup({ name, isProjectLevel: true })
  }

  const getRowClass = (rowData) => {
    return { 'changed-project': rowData.isProjectLevel, loading: isLoading }
  }

  // Render

  const globalGroupPayload = {
    label: t('accessGroup'),
    accept: async () =>
      await deleteAccessGroup({ accessGroupName: selection.name, projectName: '_' }).unwrap(),
    message: t('confirmDeleteAccessGroup'),
  }

  const onDeleteGlobal = async () => confirmDelete(globalGroupPayload)

  const onContextMenu = (event) => {
    const eventData = event?.data
    ctxMenuShow(event.originalEvent, ctxMenuItems(eventData))
  }

  const ctxMenuItems = (eventData) => {
    const menuItems = [
      {
        label: t('clearOverrides'),
        icon: 'clear',
        disabled: !eventData.isProjectLevel,
        command: async () =>
          confirmDelete({
            header: t('clearProjectOverrides'),
            deleteLabel: t('clear'),
            label: t('projectOverrides'),
            accept: async () =>
              await deleteAccessGroup({ accessGroupName: eventData.name, projectName }).unwrap(),
            message: t('confirmClearAccessGroupOverrides'),
          }),
      },
      {
        label: t('delete'),
        icon: 'delete',
        command: async () =>
          confirmDelete({
            label: t('accessGroup'),
            accept: async () =>
              await deleteAccessGroup({
                accessGroupName: eventData.name,
                projectName: '_',
              }).unwrap(),
            message: t('confirmDeleteAccessGroup'),
          }),
        danger: true,
      },
    ]
    return menuItems
  }

  const [ctxMenuShow] = useCreateContextMenu([])

  const tableData = useTableLoadingData(accessGroupList, isLoading, 5, 'name')

  return (
    <Section style={{ maxWidth: 400, flex: 2 }}>
      {showNewAccessGroup && (
        <NewAccessGroup onClose={onNewAccessGroup} accessGroupList={accessGroupList} />
      )}

      {canCreateOrDelete && (
        <Toolbar>
          <Button
            label={t('newAccessGroup')}
            onClick={() => setShowNewAccessGroup(true)}
            icon="group_add"
          />
          <Spacer />
          <Button label={t('deleteAccessGroup')} onClick={onDeleteGlobal} icon="delete" />
        </Toolbar>
      )}

      <TablePanel>
        <DataTable
          value={tableData}
          scrollable="true"
          scrollHeight="flex"
          dataKey="name"
          selectionMode="single"
          selection={selection}
          onSelectionChange={(e) => onSelectionChange(e.value)}
          rowClassName={getRowClass}
          className={clsx({ loading: isLoading })}
          onContextMenu={(e) => onContextMenu(e)}
        >
          <Column field="name" header={t('accessGroup')} />
        </DataTable>
      </TablePanel>
    </Section>
  )
}

export default AccessGroupList
