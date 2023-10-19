import { apiSlice } from "./apiSlice";
import { selectCurrentUser } from "../Selectors/selectors.js";
import {store} from "./../store.js";
export const { useCreateCommentMutation } = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createComment: builder.mutation({
        query: (blogId, formData) => ({
          url: `/blogs/${blogId}/comments`,
          method: 'POST',
          body: { ...formData, author: selectCurrentUser(store.getState()).name },
          tags: ['Comment'],
        }),
      }),
    }),
  });