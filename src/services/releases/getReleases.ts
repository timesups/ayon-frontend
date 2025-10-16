import { marketApi, gqlApi } from '@shared/api'
import type { GetInstallEventsQuery } from '@shared/api'
import { PubSub } from '@shared/util'

const enhancedApi = marketApi.enhanceEndpoints({
  endpoints: {
    getReleases: {},
    getReleaseInfo: {},
  },
})

export const { useGetReleasesQuery, useGetReleaseInfoQuery, useLazyGetReleaseInfoQuery } =
  enhancedApi

export type InstallMessage = {
  id: string
  topic: string
  project: string | null
  user: string
  dependsOn: string | null
  description: string
  summary: {
    url: string
    name: string
    version: string
  }
  status: string
  sender: string | null
  createdAt: string
  updatedAt: string
  progress: number
}

export type InstallEventNode = GetInstallEventsQuery['events']['edges'][0]['node']
// GRAPHQL QUERIES (from different api slice)
export type GetInstallEvent = InstallEventNode | InstallMessage
export type GetInstallEventsResult = GetInstallEvent[]

import { DefinitionsFromApi, OverrideResultType, TagTypesFromApi } from '@reduxjs/toolkit/query'
type Definitions = DefinitionsFromApi<typeof gqlApi>
type TagTypes = TagTypesFromApi<typeof gqlApi>
// update the definitions to include the new types
type UpdatedDefinitions = Omit<Definitions, 'GetInstallEvents'> & {
  GetInstallEvents: OverrideResultType<Definitions['GetInstallEvents'], GetInstallEventsResult>
}

const releasesGqlApi = gqlApi.enhanceEndpoints<TagTypes, UpdatedDefinitions>({
  endpoints: {
    GetInstallEvents: {
      transformResponse: (response: GetInstallEventsQuery) =>
        response.events.edges.map(({ node }) => node),
      async onCacheEntryAdded({ ids = [] }, { updateCachedData, cacheEntryRemoved }) {
        let subscriptions: any[] = []

        const topics = [
          'addon.install_from_url',
          'installer.install_from_url',
          'dependency_package.install_from_url',
        ]

        try {
          const handlePubSub = (topic: string, message: InstallMessage) => {
            if (topic === 'client.connected') {
              return
            }

            // if message is not in ids, ignore
            if (!ids.includes(message.id)) return

            // update cache
            updateCachedData((draft) => {
              // find index of event
              const index = draft.findIndex((e) => e.id === message.id)
              // replace event
              if (index !== -1) {
                draft[index] = message
              } else {
                // add event
                draft.push(message)
              }
            })
          }

          // sub to websocket topics
          topics.forEach((topic) => {
            const sub = PubSub.subscribe(topic, handlePubSub)
            subscriptions.push(sub)
          })
        } catch (error) {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
          console.error(error)
        }
        await cacheEntryRemoved
        // unsubscribe from all topics
        subscriptions.forEach((sub: any) => PubSub.unsubscribe(sub))
      },
    },
  },
})

export const { useGetInstallEventsQuery } = releasesGqlApi
