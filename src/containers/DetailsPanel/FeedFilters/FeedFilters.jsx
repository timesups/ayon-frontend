import * as Styled from './FeedFilters.styled'
import { useDispatch, useSelector } from 'react-redux'
import { updateDetailsPanelTab, updateFeedFilter } from '@state/details'
import { Button, Spacer } from '@ynput/ayon-react-components'
import clsx from 'clsx'
import { entitiesWithoutFeed } from '../DetailsPanel'
import { useTranslation } from 'react-i18next'
const FeedFilters = ({
  isLoading,
  entityType,
  className,
  overrides = {},
  scope,
  statePath,
  ...props
}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const setFeedFilter = (value) => dispatch(updateFeedFilter({ value, statePath, scope }))
  const setTab = (tab) => dispatch(updateDetailsPanelTab({ statePath, tab, scope }))

  const selectedFilter = useSelector((state) => state.details[statePath][scope].filter)
  const selectedTab = useSelector((state) => state.details[statePath][scope].tab)

  const filtersLeft = [
    {
      id: 'activity',
      tooltip: t("All activity"),
      icon: 'forum',
    },
    {
      id: 'comments',
      tooltip: t("Comments"),
      icon: 'chat',
    },
    {
      id: 'publishes',
      tooltip: t("Published versions"),
      icon: 'layers',
    },
    {
      id: 'checklists',
      tooltip: t("Checklists"),
      icon: 'checklist',
    },
  ]

  // for each override, find the filter and update it
  Object.entries(overrides).forEach(([id, override]) => {
    const index = filtersLeft.findIndex((filter) => filter.id === id)
    if (index !== -1) {
      filtersLeft[index] = { ...filtersLeft[index], ...override }
    }
  })

  const hideActivityFilters = entitiesWithoutFeed.includes(entityType)

  return (
    <Styled.FiltersToolbar {...props} className={clsx(className, { loading: isLoading })}>
      {!hideActivityFilters &&
        filtersLeft.map((filter) => (
          <Button
            key={filter.id}
            selected={filter.id === selectedFilter && selectedTab === 'feed'}
            onClick={() => setFeedFilter(filter.id)}
            label={filter.label}
            icon={filter.icon}
            data-tooltip={filter.tooltip}
            data-tooltip-delay={0}
          />
        ))}
      <Spacer />
      {entityType === 'version' && (
        <Button
          icon="order_play"
          onClick={() => setTab('files')}
          selected={selectedTab === 'files'}
          data-tooltip={t("Version files")}
          data-tooltip-delay={0}
        />
      )}
      <Button
        onClick={() => setTab('attribs')}
        selected={selectedTab === 'attribs'}
        style={{ padding: '6px 8px' }}
      >
        {t("Attributes")}
      </Button>
    </Styled.FiltersToolbar>
  )
}

export default FeedFilters
