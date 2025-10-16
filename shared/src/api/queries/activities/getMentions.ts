import { activityFeedApi } from '@shared/api/generated'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type {
  SuggestEntityMentionApiArg,
  SuggestEntityMentionApiResponse,
} from '@shared/api/generated'

const enhancedMentionsApi = activityFeedApi.enhanceEndpoints({
  endpoints: {
    suggestEntityMention: {},
  },
})

const injectedApi = enhancedMentionsApi.injectEndpoints({
  endpoints: (build) => ({
    getEntityMentions: build.query<SuggestEntityMentionApiResponse, SuggestEntityMentionApiArg>({
      queryFn: async (args, { dispatch }) => {
        // Use the mutation internally to get data
        const res = await dispatch(
          enhancedMentionsApi.endpoints.suggestEntityMention.initiate(args),
        )

        if (res.error) {
          return { error: res.error as FetchBaseQueryError }
        }

        return { data: res.data }
      },
    }),
  }),
})

export const { useGetEntityMentionsQuery } = injectedApi
export { injectedApi as mentionsQueries }
