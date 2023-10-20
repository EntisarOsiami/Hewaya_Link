import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Comment','Blog', 'Rating'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
