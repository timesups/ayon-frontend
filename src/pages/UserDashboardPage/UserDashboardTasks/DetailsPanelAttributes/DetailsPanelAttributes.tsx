import { useEffect, useMemo, useState } from 'react'
import { Section } from '@ynput/ayon-react-components'
import getMixedState from '@helpers/getMixedState'
import { useGetProjectQuery } from '@queries/project/getProject'
import { useGetSiteInfoQuery } from '@queries/auth/getAuth'
import DetailsPanelAttributesEditor, {
  AttributeField,
  DetailsPanelAttributesEditorProps,
} from './DetailsPanelAttributesEditor'
import useEntityUpdate from '@hooks/useEntityUpdate'
import { upperFirst } from 'lodash'

type Entity = {
  id: string
  name: string
  title?: string
  subTitle?: string
  label?: string
  tags?: string[]
  status?: string
  updatedAt?: string
  createdAt: string
  attrib?: Record<string, any>
  projectName?: string
  entityType: 'folder' | 'task' | 'product' | 'version'
  entitySubType: string
  // add subtypes
  folderType: string
  taskType: string
  users?: any[]
  path: string
  folderId?: string
  icon?: string
}

type EntityForm = {
  id: string
  name: string
  label: string | null | undefined
  entityType: 'folder' | 'task' | 'product' | 'version'
  taskType?: string
  folderType?: string
  productType?: string
  tags: string[]
  status: string
  updatedAt: string
  createdAt: string
  projectName: string
  path: string
  // attribs
  [key: string]: string | number | boolean | Date | any[] | Record<string, any> | undefined | null
}

// all fields in entity form are visible
const visibleFields: Array<keyof EntityForm> = [
  'id',
  'name',
  'label',
  'entityType',
  'taskType',
  'folderType',
  'productType',
  'tags',
  'status',
  'updatedAt',
  'createdAt',
  'projectName',
  'path',
]

const readOnlyFields: Array<keyof Entity> = [
  'id',
  'entityType',
  'projectName',
  'path',
  'name',
  'createdAt',
  'updatedAt',
]

// some field keys need to be mapped to the actual field names
const fieldKeyMappings = ({ users, entitySubType, title, ...entity }: Entity) => {
  return {
    ...entity,
    [`${entity.entityType}Type`]:
      // @ts-ignore
      `${entity.entityType}Type` in entity ? entity[`${entity.entityType}Type`] : entitySubType,
    assignees: entity.entityType ? users : undefined,
    label: entity.label || entity.name,
  }
}

type DetailsPanelAttributesProps = {
  entities: Entity[]
  isLoading: boolean
}

const DetailsPanelAttributes = ({ entities = [], isLoading }: DetailsPanelAttributesProps) => {
  // form for project data
  const [mixedFields, setMixedFields] = useState<string[]>([])
  const [formData, setFormData] = useState<EntityForm | null>(null)

  const buildInitialForm = () => {
    // Group entity values by field name
    const valuesByField: Record<string, any[]> = {}
    // Track which fields have mixed values
    const mixedFieldsSet = new Set<string>()

    entities.forEach((entity) => {
      const mappedEntity = fieldKeyMappings(entity)

      // Process regular fields
      Object.keys(mappedEntity).forEach((key) => {
        if (visibleFields.includes(key as keyof Entity)) {
          valuesByField[key] = valuesByField[key] || []
          valuesByField[key].push((mappedEntity as any)[key])
        }
      })

      // Process attrib fields
      if (entity.attrib) {
        Object.keys(entity.attrib).forEach((key) => {
          const attribKey = `attrib.${key}`
          valuesByField[attribKey] = valuesByField[attribKey] || []
          valuesByField[attribKey].push(entity.attrib?.[key])
        })
      }
    })

    // Apply getMixedState to each field
    const formData = Object.entries(valuesByField).reduce((result, [key, values]) => {
      const { value, isMixed } = getMixedState(values)
      result[key] = value

      // Add to mixedFields if this field has mixed values
      if (isMixed) {
        mixedFieldsSet.add(key)
      }

      return result
    }, {} as Record<string, any>)

    setFormData(formData as EntityForm)
    // Update the mixedFields state with all fields that have mixed values
    setMixedFields(Array.from(mixedFieldsSet))
  }

  useEffect(() => {
    if (isLoading || entities.length === 0) return
    buildInitialForm()
  }, [entities, isLoading])

  const { data: projectData } = useGetProjectQuery(
    { projectName: formData?.projectName || '' },
    { skip: !formData?.projectName || mixedFields.includes('projectName') },
  )
  const { folderTypes = [], taskTypes = [], statuses = [], tags = [] } = projectData || {}

  const { data: info } = useGetSiteInfoQuery({ full: true })
  const { attributes = [] } = info || {}

  // build the fields array for defining the schema
  const fields: AttributeField[] = useMemo(() => {
    // Create custom fields as proper AttributeModel objects
    const customFieldsData: AttributeField[] = [
      {
        name: 'label',
        data: {
          type: 'string',
          title: 'Label',
          description: 'Used as a nice visual label only',
        },
      },
      {
        name: 'folderType',
        hidden: formData?.entityType !== 'folder',
        data: {
          type: 'string',
          title: 'Folder Type',
          description: 'Type of the folder',
          enum: folderTypes.map((type) => ({
            value: type.name,
            label: type.name,
            icon: type.icon,
          })),
        },
      },
      {
        name: 'taskType',
        hidden: formData?.entityType !== 'task',
        data: {
          type: 'string',
          title: 'Task Type',
          description: 'Type of the task',
          enum: taskTypes.map((type) => ({
            value: type.name,
            label: type.name,
            icon: type.icon,
          })),
        },
      },
      {
        name: 'status',
        data: {
          type: 'string',
          title: 'Status',
          description: 'The state the entity is in, is it approved or in progress etc.',
          enum: statuses.map((status) => ({
            value: status.name,
            label: status.name,
            icon: status.icon,
            color: status.color,
          })),
        },
      },
      {
        name: 'tags',
        data: {
          type: 'list_of_strings',
          title: 'Tags',
          enum: tags.map((tag) => ({
            value: tag.name,
            label: tag.name,
            color: tag.color,
          })),
        },
      },
    ]

    // Filter API attributes based on entity type
    const apiAttributesData: AttributeField[] = formData?.entityType
      ? attributes
          .filter((attr) => attr.scope?.includes(formData.entityType))
          .map((attr) => ({
            name: 'attrib.' + attr.name,
            data: attr.data,
          }))
      : []

    const readOnlyFieldsData: AttributeField[] = readOnlyFields.map((field) => ({
      name: field,
      readonly: true,
      data: {
        type: 'string',
        title: upperFirst(field),
      },
    }))

    // Combine custom fields with API attributes
    const allFieldsData = [...customFieldsData, ...apiAttributesData, ...readOnlyFieldsData]
    const sortToTop = ['path', 'name']
    const sortedFieldsData = [...allFieldsData].sort((a, b) => {
      const aIndex = sortToTop.indexOf(a.name)
      const bIndex = sortToTop.indexOf(b.name)
      if (aIndex === -1 && bIndex === -1) return 0
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })

    return sortedFieldsData
  }, [attributes, folderTypes, taskTypes, statuses, tags, formData?.entityType])

  //
  let enableEditing = false
  if (
    ['task', 'folder'].includes(formData?.entityType || '') &&
    !mixedFields.includes('projectName')
  ) {
    enableEditing = true
  }

  const entityType = formData?.entityType || 'task'
  const projectName = formData?.projectName || ''

  // Setup entity update functionality
  const { updateEntity } = useEntityUpdate({
    entities: entities.map((entity) => ({
      id: entity.id,
      projectName: entity.projectName || '',
      folderId: entity.folderId,
      users: entity.users || [],
    })),
    entityType,
    projectName,
  })

  const handleChange: DetailsPanelAttributesEditorProps['onChange'] = (key, value) => {
    if (key.startsWith('attrib.')) {
      value = {
        [key.replace('attrib.', '')]: value,
      }
      key = 'attrib'
    }

    console.log('handleChange', key, value)

    // update the form data
    // @ts-ignore
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))

    // update the entity in database
    updateEntity(key, value)
  }

  return (
    <Section style={{ padding: 8, overflow: 'hidden' }}>
      <DetailsPanelAttributesEditor
        fields={fields}
        form={formData || {}}
        mixedFields={mixedFields}
        isLoading={isLoading}
        enableEditing={enableEditing}
        onChange={handleChange}
      />
    </Section>
  )
}

export default DetailsPanelAttributes
