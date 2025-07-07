import { useState } from 'react'
import AccessGroupList from './AccessGroupList'
import AccessGroupDetail from './AccessGroupDetail'
import { AccessGroupObject } from '@api/rest/accessGroups'
import {
  EmptyPlaceholderFlex,
  EmptyPlaceholderFlexWrapper,
} from '@shared/EmptyPlaceholder/EmptyPlaceholderFlex.styled'


import { useTranslation } from 'react-i18next'


type Props = {
  projectName?: string
  canCreateOrDelete?: boolean
}

const AccessGroups = ({ projectName, canCreateOrDelete }: Props) => {
  const {t} = useTranslation()

  const [selectedAccessGroup, setSelectedAccessGroup] = useState<AccessGroupObject | null>(null)

  return (
    <main style={{ display: 'flex', flexGrow: 1, gap: 'var(--base-gap-large)' }}>
      <AccessGroupList
        canCreateOrDelete={canCreateOrDelete}
        projectName={projectName}
        selectedAccessGroup={selectedAccessGroup}
        onSelectAccessGroup={setSelectedAccessGroup}
      />

      {!selectedAccessGroup && (
        <EmptyPlaceholderFlexWrapper>
          <EmptyPlaceholderFlex
            message={t("No access group selected")}
            icon={'group'}
          ></EmptyPlaceholderFlex>
        </EmptyPlaceholderFlexWrapper>
      )}

      {selectedAccessGroup && (
        <AccessGroupDetail projectName={projectName} accessGroupName={selectedAccessGroup?.name} />
      )}
    </main>
  )
}

export default AccessGroups
