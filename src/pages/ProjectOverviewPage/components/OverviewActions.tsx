import { getPlatformShortcutKey, KeyMode } from '@shared/helpers'
import { useCellEditing, useSelectionContext } from '@shared/ProjectTreeTable'
import useDeleteEntities from '@shared/ProjectTreeTable/hooks/useDeleteEntities'
import { Button } from '@ynput/ayon-react-components'
import { FC } from 'react'
import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

const Container = styled.div`
  display: flex;
  gap: var(--base-gap-small);

  background-color: var(--md-sys-color-surface-container-high);
  padding: 2px;
  border-radius: var(--border-radius-m);
`
const ActionButton = styled(Button)`
  background-color: unset;
  padding: 4px !important;
`

interface OverviewActionsProps {}

const OverviewActions: FC<OverviewActionsProps> = ({}) => {

  const {t} = useTranslation()


  const { selectedCells } = useSelectionContext()
  const { canUndo, canRedo, undo, redo } = useCellEditing()
  const deleteEntities = useDeleteEntities({})

  return (
    <Container>
      <ActionButton
        icon="undo"
        data-tooltip={t("Undo")}
        data-shortcut={getPlatformShortcutKey('z', [KeyMode.Ctrl])}
        onClick={undo}
        disabled={!canUndo}
      />
      <ActionButton
        icon="redo"
        data-tooltip={t("Redo")}
        data-shortcut={getPlatformShortcutKey('z', [KeyMode.Ctrl], 'Shift')}
        onClick={redo}
        disabled={!canRedo}
      />
      <ActionButton
        icon="delete"
        data-tooltip={t("Delete selected")}
        onClick={() => deleteEntities(Array.from(selectedCells))}
        disabled={!selectedCells.size}
      />
    </Container>
  )
}

export default OverviewActions
