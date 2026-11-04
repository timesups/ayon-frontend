import { $Any } from '@types'
import type { TFunction } from 'i18next'
import type { FilterType, MarketFilter, MarketFilterFilterAction } from './MarketFilters'

type MarketFilterBase = Omit<MarketFilter, 'name' | 'tooltip'> & {
  nameKey: string
  tooltipKey: string
}

export const addonFiltersBase: MarketFilterBase[] = [
  {
    id: 'all',
    type: 'addons',
    nameKey: 'filterAll',
    filter: [],
    tooltipKey: 'filterAllTooltip',
  },
  {
    id: 'free',
    type: 'addons',
    nameKey: 'filterFree',
    filter: [
      {
        flags: (v?: string[]) => !v?.includes('licensed'),
      },
    ],
    tooltipKey: 'filterFreeTooltip',
  },
  {
    id: 'updates',
    type: 'addons',
    nameKey: 'filterUpdates',
    filter: [{ isOutdated: true }, { isDownloaded: true }],
    tooltipKey: 'filterUpdatesTooltip',
  },
  {
    id: 'production',
    type: 'addons',
    nameKey: 'filterProduction',
    filter: [{ currentProductionVersion: (v: $Any) => v }, { isDownloaded: true }],
    tooltipKey: 'filterProductionTooltip',
  },
  {
    id: 'production-outdated',
    type: 'addons',
    nameKey: 'filterProductionOutdated',
    filter: [
      {
        isProductionOutdated: true,
        isDownloaded: true,
        currentProductionVersion: (v: $Any) => v,
      },
    ],
    tooltipKey: 'filterProductionOutdatedTooltip',
  },
  {
    id: 'uninstalled',
    type: 'addons',
    nameKey: 'filterDownloadsAvailable',
    filter: [{ isDownloaded: false }],
    tooltipKey: 'filterDownloadsAvailableTooltip',
  },
]

export const releaseFiltersBase: MarketFilterBase[] = [
  {
    id: 'latest',
    type: 'releases',
    nameKey: 'filterLatest',
    filter: [{ isLatest: true }],
    tooltipKey: 'filterLatestTooltip',
  },
  {
    id: 'all',
    type: 'releases',
    nameKey: 'filterAllReleases',
    filter: [],
    tooltipKey: 'filterAllReleasesTooltip',
  },
]

const localizeFilters = (filters: MarketFilterBase[], t: TFunction): MarketFilter[] =>
  filters.map(({ nameKey, tooltipKey, ...rest }) => ({
    ...rest,
    name: t(nameKey),
    tooltip: t(tooltipKey),
  }))

export const getMarketFilters = (
  t: TFunction,
): {
  type: FilterType
  name: string
  filters: MarketFilter[]
}[] => [
  {
    type: 'addons',
    name: t('addons'),
    filters: localizeFilters(addonFiltersBase, t),
  },
  {
    type: 'releases',
    name: t('releaseBundles'),
    filters: localizeFilters(releaseFiltersBase, t),
  },
]

// returns the filters for the selected type and filter
export const getMarketFilter = (type: string, filter: string): MarketFilterFilterAction[] => {
  const selectedFilters =
    type === 'releases' ? releaseFiltersBase : type === 'addons' ? addonFiltersBase : undefined
  return selectedFilters?.find((f) => f.id === filter)?.filter || []
}

// Backwards-compatible aliases used by any leftover imports
export const addonFilters = addonFiltersBase as unknown as MarketFilter[]
export const releaseFilters = releaseFiltersBase as unknown as MarketFilter[]
export const marketFilters = [
  { type: 'addons' as FilterType, name: 'Addons', filters: addonFilters },
  { type: 'releases' as FilterType, name: 'Release Bundles', filters: releaseFilters },
]
