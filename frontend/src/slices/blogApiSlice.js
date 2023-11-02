import { apiSlice } from './apiSlice';

const BLOGS_URL = '/api/blogs';

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      query: () => ({
        url: BLOGS_URL,
        method: 'GET',
      }),
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: BLOGS_URL,
        method: 'POST',
        body: data,
      }),
    }),
    updateBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.blogId}`, 
        method: 'PUT',
        body: data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({  
        url: `${BLOGS_URL}/${blogId}`,  
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApiSlice.endpoints;
