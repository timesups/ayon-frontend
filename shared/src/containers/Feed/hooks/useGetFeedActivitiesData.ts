import { GetActivitiesQueryVariables, PageInfo } from '@shared/api'
import { useGetActivitiesInfiniteInfiniteQuery } from '@shared/api'
import { isEqual, union } from 'lodash'
import { useMemo } from 'react'

export type UseGetActivitiesInfiniteInfiniteQuery = (
  queryArgs: Omit<GetActivitiesQueryVariables, 'last' | 'first' | 'cursor'> & { filter?: string },
  options: { skip: boolean },
) => {
  data: { pages: { activities: any[] }[] } & { pageInfo: PageInfo }
  isLoading: boolean
  isFetchingNextPage: boolean
  currentData: ({ pages: { activities: any[] }[] } & { pageInfo: PageInfo }) | undefined
  fetchNextPage: () => Promise<any>
  hasNextPage: boolean
}

type Props = {
  entities: Array<{ id: string; projectName: string }>
  filter: string
  activityTypes?: string[] | null
  projectName: string
  entityType: string
}

const useGetFeedActivitiesData = ({
  entities,
  filter,
  activityTypes,
  projectName,
  entityType,
}: Props) => {
  const entitiesToQuery = useMemo(
    () =>
      entities.map((entity) => ({ id: entity.id, projectName: entity.projectName, entityType })),
    [entities],
  )
  const entityIds = entitiesToQuery.map((entity) => entity.id)

  const skip = !entities.length || !filter || !activityTypes || !projectName
  // QUERY MADE TO GET ACTIVITIES

  const queryArgs = {
    entityIds: entityIds,
    projectName: projectName,
    referenceTypes: ['origin', 'mention', 'relation'],
    activityTypes: activityTypes,
    filter,
  }

  let {
    data: activitiesInfiniteData,
    isLoading: isFetchingActivities,
    isFetchingNextPage,
    currentData,
    fetchNextPage,
    hasNextPage,
  } = useGetActivitiesInfiniteInfiniteQuery(queryArgs, { skip: skip })

  // Extract tasks from infinite query data correctly
  const activitiesList = useMemo(() => {
    if (!activitiesInfiniteData?.pages) return []
    return activitiesInfiniteData.pages.flatMap((page) => page.activities || [])
  }, [activitiesInfiniteData?.pages])

  const currentActivitiesList = useMemo(() => {
    if (!currentData?.pages) return []
    return currentData.pages.flatMap((page) => page.activities || [])
  }, [currentData?.pages])

  const loadNextPage = async () => {
    if (!hasNextPage) {
      console.log('No more activities to load')
      return undefined
    }
    console.log('loading next page...')
    const result = await fetchNextPage()

    return result
  }

  // check if currentData matches all the entityIds
  // if not, this means we are loading new entity
  const isLoadingNew = useMemo(() => {
    if (!isFetchingActivities) return false

    const currentEntityIds = union(
      currentActivitiesList?.flatMap((activity) => (activity.entityId ? activity.entityId : [])),
    )

    return !isEqual(currentEntityIds, entityIds)
  }, [currentActivitiesList, entityIds, isFetchingActivities])

  if (skip) {
    isFetchingActivities = true
  }

  return {
    activitiesData: activitiesList,
    isLoadingActivities: isFetchingActivities,
    isLoadingNew,
    isLoadingNextPage: isFetchingNextPage,
    hasNextPage,
    loadNextPage,
  }
}

export default useGetFeedActivitiesData
