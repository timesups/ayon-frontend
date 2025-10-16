/*
 * AnatomyEditor is a wrapper around SettingsEditor specifically for anatomy settings.
 * It loads anatomy schema and displays the editor, it also handles loading anatomy:
 * either a preset or existing project (one of projectName or preset must be provided)
 *
 * It however does not handle saving anatomy, this is done by the parent component.
 * Along with simple editing, it also handles copy+paste of anatomy settings,
 * and dispatching breadcrumbs to the store.
 */

import { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useGetAnatomyPresetQuery, useGetAnatomySchemaQuery } from '@queries/anatomy/getAnatomy'

import { useGetProjectAnatomyQuery } from '@shared/api'
import { isEqual } from 'lodash'

import { setUri } from '@state/context'
import SettingsEditor from '@containers/SettingsEditor'
import { getValueByPath, setValueByPath, sameKeysStructure } from '@containers/AddonSettings/utils'
import { cloneDeep } from 'lodash'
import { usePaste } from '@context/PasteContext'

const AnatomyEditor = ({ preset, projectName, formData, setFormData, setIsChanged }) => {
  const [originalData, setOriginalData] = useState(null)
  const { requestPaste } = usePaste()
  const { data: schema } = useGetAnatomySchemaQuery()

  const { data: anatomyPresetData, isLoading: presetLoading } = useGetAnatomyPresetQuery(
    { preset },
    { skip: !preset },
  )
  const { data: projectAnatomyData, isLoading: prjLoading } = useGetProjectAnatomyQuery(
    { projectName },
    { skip: !projectName },
  )
  const dispatch = useDispatch()
  const isLoading = presetLoading || prjLoading

  useEffect(() => {
    if (!anatomyPresetData) return
    setFormData(anatomyPresetData)
    setOriginalData(anatomyPresetData)
  }, [anatomyPresetData])

  useEffect(() => {
    if (!projectAnatomyData) return
    setFormData(projectAnatomyData)
    setOriginalData(projectAnatomyData)
  }, [projectAnatomyData])

  useEffect(() => {
    if (!setIsChanged) return
    if (!originalData || !formData) {
      setIsChanged(!isEqual(originalData, formData))
      return
    }
    setIsChanged(!isEqual(originalData, formData))
  }, [formData, originalData, setIsChanged])

  const onPasteValue = async (path) => {
    const pastedContent = await requestPaste()
    if (!pastedContent) {
      toast.error('No content to paste')
      return
    }
    let value
    try {
      value = JSON.parse(pastedContent)
    } catch (e) {
      toast.error('Invalid JSON')
      return
    }
    const oldValue = path.length === 0 ? formData : getValueByPath(formData, path)
    if (oldValue === undefined) {
      toast.error('No data to paste')
      return
    }
    if (!sameKeysStructure(oldValue, value)) {
      toast.error('Incompatible data structure')
      console.log('oldValue', oldValue)
      console.log('value', value)
      return
    }

    let newData = cloneDeep(formData)
    newData = setValueByPath(newData, path, value)
    setFormData(newData)
  }

  const editor = useMemo(() => {
    if (isLoading) {
      return 'Loading...'
    }
    if (!(preset || projectName)) return 'No preset or project selected'
    if (preset && projectName) return 'Select either preset or project'
    if (!(schema && originalData)) return null

    return (
      <SettingsEditor
        schema={schema}
        originalData={originalData}
        formData={formData}
        onChange={setFormData}
        context={{
          onPasteValue: onPasteValue,
        }}
      />
    )
  }, [schema, originalData, formData, isLoading, preset, projectName, setFormData, onPasteValue])

  return editor
}

export default AnatomyEditor
