import { useState, useMemo, useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  Button,
  Section,
  Toolbar,
  Spacer,
  ScrollPanel,
  SaveButton,
} from '@ynput/ayon-react-components'
import SettingsEditor from '@containers/SettingsEditor'
import useSettingsPaste from '@containers/SettingsEditor/useSettingsPaste'
import { isEqual } from 'lodash'
import {
  useDeleteAccessGroupMutation,
  useSaveAccessGroupMutation,
  useGetAccessGroupsQuery,
  useGetAccessGroupQuery,
  useGetAccessGroupSchemaQuery,
} from '@shared/api'
import { confirmDelete } from '@shared/util'
import { useTranslation } from 'react-i18next'

const AccessGroupDetail = ({ projectName, accessGroupName }) => {
  const { t } = useTranslation('settings')
  const [originalData, setOriginalData] = useState(null)
  const [formData, setFormData] = useState(null)

  const { data } = useGetAccessGroupQuery(
    {
      accessGroupName: accessGroupName,
      projectName: projectName || '_',
    },
    { skip: !accessGroupName },
  )
  const { data: schema } = useGetAccessGroupSchemaQuery(projectName ? { projectName } : {})

  const { data: accessGroupList = [] } = useGetAccessGroupsQuery({
    projectName: projectName || '_',
  })

  const isProjectLevel = useMemo(() => {
    for (const accessGroup of accessGroupList) {
      if (accessGroup?.name === accessGroupName) return accessGroup.isProjectLevel
    }
  }, [accessGroupName, accessGroupList])

  useEffect(() => {
    if (!data) return
    setFormData(data)
    setOriginalData(data)
  }, [data])

  // mutations
  const [saveAccessGroup, { isLoading: saving }] = useSaveAccessGroupMutation()
  const [deleteAccessGroup] = useDeleteAccessGroupMutation()

  const isChanged = useMemo(() => {
    if (!originalData || !formData) return false
    return !isEqual(originalData, formData)
  }, [formData, originalData])

  const onSave = async () => {
    try {
      await saveAccessGroup({
        accessGroupName,
        projectName: projectName || '_',
        permissions: formData,
      }).unwrap()
      toast.success(t('projectAccessGroupSaved'))
    } catch (err) {
      toast.error(t('unableSaveAccessGroup'))
    }
  }

  const onDeleteLocalGroupSettings = async () =>
    confirmDelete({
      header: t('clearProjectOverrides'),
      deleteLabel: t('clear'),
      label: t('projectOverrides'),
      accept: async () => await deleteAccessGroup({ accessGroupName, projectName }).unwrap(),
      message: t('confirmClearAccessGroupOverrides'),
    })

  const isLocalProject = !!projectName
  // This conditions checks if there are any local (NOT global) project settings for user group
  const noLocalSettings = projectName && !isProjectLevel

  // a pasted section with other keys would save a broken access group
  const onPasteValue = useSettingsPaste(formData, setFormData, { strict: true })

  const permissionsEditor = useMemo(() => {
    return (
      <SettingsEditor
        schema={schema}
        originalData={originalData}
        formData={formData}
        onChange={setFormData}
        level={projectName ? 'project' : 'studio'}
        context={{
          headerProjectName: projectName,
          onPasteValue,
        }}
      />
    )
  }, [schema, originalData, formData, projectName, setFormData, onPasteValue])

  return (
    <Section style={{ flex: 2 }}>
      <Toolbar>
        <Spacer />
        {isLocalProject && (
          <Button
            onClick={onDeleteLocalGroupSettings}
            label={t('clearProjectOverrides')}
            disabled={noLocalSettings}
            icon="delete"
          />
        )}
        <SaveButton onClick={onSave} label={t('saveChanges')} active={isChanged} saving={saving} />
      </Toolbar>
      <ScrollPanel
        className="nopad transparent"
        scrollStyle={{ padding: 0 }}
        style={{ flexGrow: 1 }}
      >
        {permissionsEditor}
      </ScrollPanel>
    </Section>
  )
}

export default AccessGroupDetail
