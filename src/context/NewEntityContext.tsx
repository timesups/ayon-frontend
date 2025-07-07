import React, { createContext, useState, ReactNode, useContext } from 'react'
import { OperationModel } from '@api/rest/operations'
import { v1 as uuid1 } from 'uuid'
import { toast } from 'react-toastify'
import getSequence from '@helpers/getSequence'
import { generateLabel } from '@components/NewEntity/NewEntity'
import { PatchOperation, useUpdateOverviewEntitiesMutation } from '@queries/overview/updateOverview'
import { useProjectTableContext } from '@shared/ProjectTreeTable'
import { EditorTaskNode, MatchingFolder } from '@shared/ProjectTreeTable'
import checkName from '@helpers/checkName'
import { useSlicerContext } from './slicerContext'
import { isEmpty } from 'lodash'

export type NewEntityType = 'folder' | 'task'

export interface EntityForm {
  label: string
  subType: string
}

interface SequenceForm {
  active: boolean
  increment: string
  length: number
  prefix: boolean
  prefixDepth: number
}

interface NewEntityContextProps {
  entityType: NewEntityType | null
  setEntityType: React.Dispatch<React.SetStateAction<NewEntityType | null>>
  entityForm: EntityForm
  setEntityForm: React.Dispatch<React.SetStateAction<EntityForm>>
  sequenceForm: SequenceForm
  setSequenceForm: React.Dispatch<React.SetStateAction<SequenceForm>>
  onCreateNew: (selectedFolderIds: string[]) => Promise<void>
  onOpenNew: (type: NewEntityType, config?: { isSequence?: boolean }) => void
}

export const NewEntityContext = createContext<NewEntityContextProps | undefined>(undefined)

interface NewEntityProviderProps {
  children: ReactNode
}

export const NewEntityProvider: React.FC<NewEntityProviderProps> = ({ children }) => {
  const { findNonInheritedValues, projectName, attribFields, projectInfo, getEntityById } =
    useProjectTableContext()
  const { attrib: projectAttrib = {}, statuses } = projectInfo || {}

  const { rowSelection, sliceType } = useSlicerContext()

  const firstStatusForTask =
    statuses?.filter((status) => status.scope?.includes('task'))?.[0]?.name ||
    statuses?.[0]?.name ||
    'none'
  const firstStatusForFolder =
    statuses?.filter((status) => status.scope?.includes('folder'))?.[0]?.name ||
    statuses?.[0]?.name ||
    'none'

  const [entityType, setEntityType] = useState<NewEntityType | null>(null)

  const initData: EntityForm = { label: '', subType: '' }
  const [entityForm, setEntityForm] = useState<EntityForm>(initData)
  const [sequenceForm, setSequenceForm] = useState<SequenceForm>({
    active: false,
    increment: '',
    length: 10,
    prefix: false,
    prefixDepth: 0,
  })

  // Helper functions for creating operations
  const createEntityOperation = (
    entityType: NewEntityType,
    subType: string,
    name: string,
    parentId?: string,
  ): NewEntityOperation => {
    // add extra data from slicer
    const slicerData: Record<string, any> = {}
    if (sliceType !== 'hierarchy' && !isEmpty(rowSelection) && entityType === 'task') {
      const selection = Object.keys(rowSelection).filter(
        (key) => !['hasValue', 'noValue'].includes(key),
      )
      switch (sliceType) {
        case 'assignees':
          slicerData.assignees = selection
          break
        case 'status':
          slicerData.status = selection[0]
          break
        default:
          break
      }
    }

    return {
      type: 'create',
      entityType: entityType,
      data: {
        [`${entityType}Type`]: subType,
        id: uuid1().replace(/-/g, ''),
        name: checkName(name),
        ...(parentId && { [entityType === 'folder' ? 'parentId' : 'folderId']: parentId }),
        ...slicerData,
      },
    }
  }

  const createSequenceOperations = (
    entityType: NewEntityType,
    subType: string,
    sequence: string[],
    folderIds: string[],
  ): NewEntityOperation[] => {
    // For root folders
    if (folderIds.length === 0 && entityType === 'folder') {
      return sequence.map((name) => createEntityOperation(entityType, subType, name))
    }

    // For folders or tasks with parent references
    const operations: NewEntityOperation[] = []
    for (const folderId of folderIds) {
      for (const name of sequence) {
        operations.push(createEntityOperation(entityType, subType, name, folderId))
      }
    }
    return operations
  }

  const createSingleOperations = (
    entityType: NewEntityType,
    subType: string,
    label: string,
    folderIds: string[],
  ): NewEntityOperation[] => {
    // For root folders
    if (folderIds.length === 0 && entityType === 'folder') {
      return [createEntityOperation(entityType, subType, label)]
    }

    // For folders or tasks with parent references
    return folderIds.map((folderId) => createEntityOperation(entityType, subType, label, folderId))
  }

  type PatchNewTaskOperation = PatchOperation & {
    data: EditorTaskNode
  }
  type PatchNewFolderOperation = PatchOperation & {
    data: MatchingFolder
  }

  type NewEntityOperation = OperationModel & {
    data: {
      id: string
      name: string
      folderId?: string
      parentId?: string
      folderType?: string
      taskType?: string
    }
  }

  const createPatchOperations = (
    operations: NewEntityOperation[],
    paths: Record<string, string> = {},
  ): (PatchNewTaskOperation | PatchNewFolderOperation)[] => {
    // split operations by folderId or parentId (convert parentId to folderId)
    const folderIds = new Set<string>()
    for (const operation of operations) {
      if (operation.entityType === 'folder') {
        // @ts-ignore
        folderIds.add(operation.data?.parentId)
      } else if (operation.entityType === 'task') {
        // @ts-ignore
        folderIds.add(operation.data?.folderId)
      }
    }

    const attribsByParentId = new Map<string, any>()
    for (const folderId of folderIds) {
      const nonInheritedValues = findNonInheritedValues(
        folderId,
        attribFields.map((field) => field.name),
      )
      attribsByParentId.set(folderId, nonInheritedValues)
    }

    const folderOperations = operations.filter((op) => op.entityType === 'folder')
    const taskOperations = operations.filter((op) => op.entityType === 'task')

    const processOperations = (ops: NewEntityOperation[], entityType: NewEntityType) => {
      let patchOperations: PatchOperation[] = []
      for (const operation of ops) {
        // Get the appropriate parent ID based on entity type
        const parentId =
          entityType === 'folder'
            ? (operation.data as any).parentId
            : (operation.data as any).folderId

        // Find the folder attributes
        const attribs = attribsByParentId.get(parentId) || projectAttrib

        // Filter out attributes that are not inherited or scoped to the entity type
        const filteredAttribs = Object.keys(attribs).reduce<Record<string, any>>((acc, key) => {
          // Find the field definition in attribFields
          const fieldDef = attribFields.find((field) => field.name === key)
          if (!fieldDef) return acc // Skip if not in attribFields

          // Check if the field is scoped to the current entity type
          const isScoped = fieldDef.scope?.includes(entityType)
          // Check if the field should be inherited
          const isInheritable = !!fieldDef.data.inherit

          // Only include attributes that are scoped to the entity type
          // or are inheritable from parent
          if (isScoped) {
            // Directly apply non-inherited values
            acc[key] = attribs[key]
          } else if (isInheritable && attribs[key]) {
            // Mark as inherited if inheritable
            acc[key] = {
              ...attribs[key],
              inherited: true,
              inheritedFrom: parentId,
            }
          }

          return acc
        }, {})

        // Create entity-specific patch operation with the correct type casting
        if (entityType === 'folder') {
          let path = operation.data.parentId && paths[operation.data.parentId]
          path = path ? path + '/' + operation.data.name : ''

          const folderPatch: PatchNewFolderOperation = {
            type: 'create',
            entityType: 'folder',
            entityId: (operation.data as any).id,
            data: {
              ...operation.data,
              entityType: 'folder',
              projectName,
              folderType: (operation.data as any).folderType,
              parents: [],
              updatedAt: new Date().toISOString(),
              status: firstStatusForFolder,
              ownAttrib: [],
              path: path,
              tags: [],
              attrib: filteredAttribs,
            } as MatchingFolder,
          }
          patchOperations.push(folderPatch)
        } else {
          const taskPatch: PatchNewTaskOperation = {
            type: 'create',
            entityType: 'task',
            entityId: (operation.data as any).id,
            data: {
              ...operation.data,
              entityType: 'task',
              taskType: (operation.data as any).taskType,
              folderId: (operation.data as any).folderId,
              active: true,
              assignees: operation.data.assignees || [],
              projectName,
              status: operation.data.status || firstStatusForTask,
              folder: {
                path: operation.data.folderId ? paths[operation.data.folderId] : '',
              },
              tags: [],
              ownAttrib: [],
              path: '',
              updatedAt: new Date().toISOString(),
              attrib: filteredAttribs,
              allAttrib: JSON.stringify(filteredAttribs),
            } as EditorTaskNode,
          }
          patchOperations.push(taskPatch)
        }
      }
      return patchOperations
    }

    // Process both types with the same function
    const folderOperationPatches = processOperations(
      folderOperations,
      'folder',
    ) as PatchNewFolderOperation[]
    const taskOperationsPatches = processOperations(
      taskOperations,
      'task',
    ) as PatchNewTaskOperation[]

    return [...folderOperationPatches, ...taskOperationsPatches]
  }

  const [createEntities] = useUpdateOverviewEntitiesMutation()

  const onCreateNew: NewEntityContextProps['onCreateNew'] = async (selectedFolderIds) => {
    // first check name and entityType valid
    if (!entityType || !entityForm.label) return

    // If we're creating a task and there are no selected folders, show error
    if (entityType === 'task' && selectedFolderIds.length === 0) {
      toast.error('Cannot create a task without selecting a folder')
      return
    }

    let operations: NewEntityOperation[]

    if (sequenceForm.active) {
      // Generate the sequence
      const sequence = getSequence(entityForm.label, sequenceForm.increment, sequenceForm.length)
      operations = createSequenceOperations(
        entityType,
        entityForm.subType,
        sequence,
        selectedFolderIds,
      )
    } else {
      operations = createSingleOperations(
        entityType,
        entityForm.subType,
        entityForm.label,
        selectedFolderIds,
      )
    }

    // get all the paths for the selected folders
    const paths: Record<string, string> = {}
    for (const folderId of selectedFolderIds) {
      const entity = getEntityById(folderId)
      if (entity?.entityType === 'folder') {
        paths[folderId] = entity.path
      }
    }

    const patchOperations = createPatchOperations(operations, paths)

    try {
      await createEntities({
        operationsRequestModel: { operations },
        projectName: projectName,
        patchOperations,
      }).unwrap()
    } catch (error) {
      toast.error('Failed to create new entity')
    }
  }

  const onOpenNew: NewEntityContextProps['onOpenNew'] = (type, config) => {
    // set entityType
    setEntityType(type)
    // set any default values
    const typeOptions =
      (type === 'folder' ? projectInfo?.folderTypes : projectInfo?.taskTypes) || []
    const firstType = typeOptions[0]
    const firstName = firstType.name || ''

    // Use the helper function to generate the label
    const initData = {
      subType: firstName,
      label: generateLabel(type, firstName, projectInfo),
    }

    console.log(config)

    // if sequence, set sequenceForm active
    if (config?.isSequence) {
      setSequenceForm((prev) => ({
        ...prev,
        active: true,
      }))
    }

    setEntityForm(initData)
  }

  const value: NewEntityContextProps = {
    entityType,
    setEntityType,
    entityForm,
    setEntityForm,
    sequenceForm,
    setSequenceForm,
    onCreateNew,
    onOpenNew,
  }

  return <NewEntityContext.Provider value={value}>{children}</NewEntityContext.Provider>
}

export const useNewEntityContext = () => {
  const context = useContext(NewEntityContext)
  if (!context) {
    throw new Error('useNewEntityContext must be used within a NewEntityProvider')
  }
  return context
}
