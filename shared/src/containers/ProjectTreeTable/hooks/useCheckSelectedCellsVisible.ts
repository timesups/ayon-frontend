// This hooks checks the current selection of cells is actually visible in the current viewport of the table
// If they are not visible, they will be removed from the selection
// This can happen when the user changes the slicer selection or filters (combined filters changes)

import { useEffect } from 'react'
import { CellId, parseCellId } from '../utils'
import { useProjectTableContext } from '../context'

type CheckSelectedCellsVisibleProps = {
  selectedCells: Set<CellId>
  setSelectedCells: (cells: Set<CellId>) => void
  focusedCellId: CellId | null
  setFocusedCellId: (cellId: CellId | null) => void
}

export const useCheckSelectedCellsVisible = ({
  selectedCells,
  setSelectedCells,
  focusedCellId,
  setFocusedCellId,
}: CheckSelectedCellsVisibleProps): void => {
  const { getEntityById } = useProjectTableContext()

  // checks that all of the selected cells are in the tableData
  // if they are not, they will be removed from the selection
  useEffect(() => {
    const missingCells = new Set<CellId>()
    for (const cellId of selectedCells) {
      // check if the cell rowId is in
      if (!getEntityById(parseCellId(cellId || '')?.rowId || '')) {
        missingCells.add(cellId)
      }
    }

    if (missingCells.size > 0) {
      // remove the missing cells from the selection
      const newSelection = new Set<CellId>(selectedCells)
      for (const cellId of missingCells) {
        newSelection.delete(cellId)
      }

      setSelectedCells(newSelection)

      // if the focused cell is one of the missing cells, clear it
      if (missingCells.has(focusedCellId || '')) {
        setFocusedCellId(null)
      }
    }
  }, [getEntityById, selectedCells, focusedCellId, setSelectedCells, setFocusedCellId])
}
