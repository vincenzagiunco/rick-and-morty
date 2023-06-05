import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Character,
  Episode,
  Location,
  ResultsWithPaginationInfo,
} from "./models";

const BASE_URL = "https://rickandmortyapi.com/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getCharacters: builder.query<
      ResultsWithPaginationInfo<Character[]>,
      { page?: number }
    >({
      query: ({ page }) => ({
        url: "character",
        method: "GET",
        params: page ? { page } : undefined,
      }),
    }),
    getCharacter: builder.query<Character, { id: string }>({
      query: ({ id }) => ({
        url: `character/${id}`,
        method: "GET",
      }),
    }),
    getEpisodes: builder.query<
      ResultsWithPaginationInfo<Episode[]>,
      { page?: number }
    >({
      query: ({ page }) => ({
        url: "episode",
        method: "GET",
        params: page ? { page } : undefined,
      }),
    }),
    getEpisode: builder.query<Episode, { id: string }>({
      query: ({ id }) => ({
        url: `episode/${id}`,
        method: "GET",
      }),
    }),
    getMultipleEpisodes: builder.query<Episode[], { ids: string[] }>({
      query: ({ ids }) => {
        const idsParam = ids.join(",");
        return {
          url: `episode/${idsParam}`,
          method: "GET",
        };
      },
      transformResponse: (response: Episode | Episode[], _, { ids }) => {
        if (ids.length === 1) {
          const character = response as Episode;
          return [{ ...character }];
        }
        return response as Episode[];
      },
    }),
    getLocations: builder.query<
      ResultsWithPaginationInfo<Location[]>,
      { page?: number }
    >({
      query: ({ page }) => ({
        url: "location",
        method: "GET",
        params: page ? { page } : undefined,
      }),
    }),
    getLocation: builder.query<Location, { id: string }>({
      query: ({ id }) => ({
        url: `/location/${id}`,
        method: "GET",
      }),
    }),
    getMultipleCharacters: builder.query<Character[], { ids: string[] }>({
      query: ({ ids }) => {
        const idsParam = ids.join(",");
        return {
          url: `character/${idsParam}`,
          method: "GET",
        };
      },
      transformResponse: (response: Character | Character[], _, { ids }) => {
        if (ids.length === 1) {
          const character = response as Character;
          return [{ ...character }];
        }
        return response as Character[];
      },
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  useGetMultipleCharactersQuery,
  useGetEpisodesQuery,
  useGetMultipleEpisodesQuery,
  useGetEpisodeQuery,
  useGetLocationsQuery,
  useGetLocationQuery,
} = api;
