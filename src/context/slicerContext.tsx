import { createContext, useContext, useState, ReactNode } from 'react'
import { ExpandedState, RowSelectionState } from '@tanstack/react-table'
import useSlicerReduxSync from '@containers/Slicer/hooks/useSlicerReduxSync'
import useLoadRemote from '@/remote/useLoadRemote'
import { ProjectModel } from '@api/rest/project'
import { Assignees } from '@queries/user/getUsers'
import { TableRow } from '@containers/Slicer/types'

export type SliceType = 'hierarchy' | 'assignees' | 'status' | 'type' | 'taskType'
const sliceTypes: SliceType[] = ['hierarchy', 'assignees', 'status', 'type', 'taskType']

export type SliceDataItem = {
  id: string
  name?: string | null
  label?: string | null
  subType?: string | null
}

export type SelectionData = Record<string, SliceDataItem>

export type OnSliceTypeChange = (
  sliceType: SliceType,
  leavePersistentSlice: boolean,
  returnToPersistentSlice: boolean,
) => void

export type SlicerConfig = {
  [page: string]: {
    fields: SliceType[]
  }
}

type ExtraSlices = {
  formatStatuses: (project?: ProjectModel) => TableRow[]
  formatTaskTypes: (project?: ProjectModel) => TableRow[]
  formatTypes: (project?: ProjectModel) => TableRow[]
  formatAssignees: (assignees: Assignees) => TableRow[]
}

export type UseExtraSlices = () => ExtraSlices

interface SlicerContextValue {
  rowSelection: RowSelectionState
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>
  onRowSelectionChange?: (selection: RowSelectionState) => void
  expanded: ExpandedState
  setExpanded: React.Dispatch<React.SetStateAction<ExpandedState>>
  onExpandedChange?: (expanded: ExpandedState) => void
  sliceType: SliceType
  onSliceTypeChange: OnSliceTypeChange
  rowSelectionData: SelectionData
  setRowSelectionData: React.Dispatch<React.SetStateAction<SelectionData>>
  persistentRowSelectionData: SelectionData
  setPersistentRowSelectionData: React.Dispatch<React.SetStateAction<SelectionData>>
  config: SlicerConfig
  useExtraSlices: UseExtraSlices
}

const SlicerContext = createContext<SlicerContextValue | undefined>(undefined)

interface SlicerProviderProps {
  children: ReactNode
}

export const SlicerProvider = ({ children }: SlicerProviderProps) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [rowSelectionData, setRowSelectionData] = useState<SelectionData>({})
  // if there is a need to leavePersistentSlice row selection data between slice changes (like the hierarchy)
  const [persistentRowSelectionData, setPersistentRowSelectionData] = useState<SelectionData>({})
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [sliceType, setSliceType] = useState<SliceType>('hierarchy')

  const { config, useExtraSlices } = useSlicerRemotes()

  const { onRowSelectionChange, onExpandedChange } = useSlicerReduxSync({
    setRowSelection,
    setExpanded,
    sliceType,
  })

  //   do something with selection change
  const handleRowSelectionChange = (selection: RowSelectionState) => {
    if (sliceType === 'hierarchy') {
      // update redux focused folders
      onRowSelectionChange(selection)
    }
  }

  const handleExpandedChange = (expanded: ExpandedState) => {
    if (sliceType === 'hierarchy') {
      // update redux expanded folders
      onExpandedChange(expanded)
    }
  }

  const handleSliceTypeChange: OnSliceTypeChange = (
    sliceType,
    leavePersistentSlice,
    returnToPersistentSlice,
  ) => {
    if (!sliceTypes.includes(sliceType)) return console.log('Invalid slice type')
    // reset selection
    setRowSelection({})
    // set slice type
    setSliceType(sliceType)
    // reset selection data
    setRowSelectionData({})
    // set persistent selection data
    if (leavePersistentSlice) setPersistentRowSelectionData(rowSelectionData)
    // we returned to the persisted slice type

    if (returnToPersistentSlice) {
      // clear the persisted selection data
      setPersistentRowSelectionData({})
      // restore the selection data and selection
      setRowSelectionData(persistentRowSelectionData)
      setRowSelection(
        Object.keys(persistentRowSelectionData).reduce((acc, id) => {
          acc[id] = true
          return acc
        }, {} as RowSelectionState),
      )
    }
  }

  return (
    <SlicerContext.Provider
      value={{
        rowSelection,
        setRowSelection,
        onRowSelectionChange: handleRowSelectionChange,
        expanded,
        setExpanded,
        onExpandedChange: handleExpandedChange,
        sliceType,
        onSliceTypeChange: handleSliceTypeChange,
        rowSelectionData,
        setRowSelectionData,
        persistentRowSelectionData,
        setPersistentRowSelectionData,
        config,
        useExtraSlices,
      }}
    >
      {children}
    </SlicerContext.Provider>
  )
}

const useSlicerRemotes = (): { config: SlicerConfig; useExtraSlices: UseExtraSlices } => {
  const configFallback: SlicerConfig = { progress: { fields: ['hierarchy'] } }

  // get slicer remotes
  const config = useLoadRemote({
    remote: 'slicer',
    module: 'config',
    fallback: configFallback,
  })

  const useExtraSlicesDefault: UseExtraSlices = () => {
    return {
      formatStatuses: () => [],
      formatTaskTypes: () => [],
      formatTypes: () => [],
      formatAssignees: () => [],
    }
  }

  // slicer transformers
  const useExtraSlices = useLoadRemote({
    remote: 'slicer',
    module: 'useExtraSlices',
    fallback: useExtraSlicesDefault,
  })

  return { config, useExtraSlices }
}

export const useSlicerContext = () => {
  const context = useContext(SlicerContext)
  if (context === undefined) {
    throw new Error('useSlicerContext must be used within a SlicerProvider')
  }
  return context
}

export default SlicerContext
