import { apiSlice } from './apiSlice';

const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'GET',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),

    fetchUserRankPoints: builder.query({
      query: () => ({
        url: `${USERS_URL}/rank-points`,
        method: 'GET',
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `${USERS_URL}/verify-email`,
        method: 'POST',
        body: { token },
      }),
    }),
  }),
});

export const useLoginMutation = userApiSlice.endpoints.login.useMutation;
export const useLogoutMutation = userApiSlice.endpoints.logout.useMutation;
export const useRegisterMutation = userApiSlice.endpoints.register.useMutation;
export const useGetUserProfileQuery = userApiSlice.endpoints.getUserProfile.useQuery;
export const useUpdateUserMutation = userApiSlice.endpoints.updateUser.useMutation;
export const useVerifyEmailMutation = userApiSlice.endpoints.verifyEmail.useMutation;
export const useFetchUserRankPointsQuery = userApiSlice.endpoints.fetchUserRankPoints.useQuery;
