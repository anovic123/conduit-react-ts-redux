import { createApi } from '@reduxjs/toolkit/query/react';
import { realWorldBaseQuery } from '../../../core/api/realworld-base-query';
import { FEED_PAGE_SIZE } from '../consts';
import { ArticleCommentsInDTO } from './dto/article-comments.in';
import { FeedArticle } from "./dto/global-feed.in";
import { PopularTagsInDTO } from './dto/popular-tags.in';
import { SingleArticleInDTO } from './dto/single-article.in';
import { transformResponse } from './utils';

interface BaseFeedParams {
  page: number;
}

interface GlobalFeedParams extends BaseFeedParams {
  tag: string | null;
}

interface ProfileFeedParams extends BaseFeedParams {
  author: string;
  isFavorite?: boolean;
}

export interface FeedData {
  articles: FeedArticle[];
  articlesCount: number;
}

interface SingleArticleParams {
  slug: string;
}

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<FeedData, GlobalFeedParams>({
      query: ({ page, tag }) => ({
        url: '/articles',
        params: {
          limit: FEED_PAGE_SIZE,
          offset: page * FEED_PAGE_SIZE,
          tag
        },
      }),
      transformResponse,
    }),
    getProfileFeed: builder.query<FeedData,ProfileFeedParams>({
      query: ({ page, author, isFavorite = false }) => ({
        url: '/articles',
        params: {
          limit: FEED_PAGE_SIZE,
          offset: page * FEED_PAGE_SIZE,
          author: isFavorite ? undefined : author,
          favorited: !isFavorite ? undefined : author
        },
      })
    }),
    getPopularTags: builder.query<PopularTagsInDTO, any>({
      query: () => ({
        url: '/tags',
      }),
    }),
    getSingleArticle: builder.query<SingleArticleInDTO, SingleArticleParams>({
      query: ({ slug }) => ({
        url: `/articles/${slug}`,
      }),
    }),
    getCommentsForArticle: builder.query<ArticleCommentsInDTO, SingleArticleParams>({
      query: ({ slug }) => ({
        url: `/articles/${slug}/comments`
      })
    })
  })
})

export const { 
  useGetGlobalFeedQuery, 
  useGetProfileFeedQuery,
  useGetPopularTagsQuery,
  useGetSingleArticleQuery, 
  useGetCommentsForArticleQuery
} = feedApi;