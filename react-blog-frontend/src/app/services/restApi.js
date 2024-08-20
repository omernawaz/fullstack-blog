import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setTokens, clearTokens, updateUser} from "../features/authSlice";
import { API_BASE_URL } from "../../constants";


const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh/',
        method: 'POST',
        body: { refresh: api.getState().auth.refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(setTokens(refreshResult.data));

      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh also fails, log out the user
      api.dispatch(clearTokens());
    }
  }

  return result;
};


export const authApi = createApi({
    reducerPath: 'restApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login/',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setTokens(data));
                } catch {
                    //do nothing here the form handles the errors
                }
            }
        }),
        register: builder.mutation({
            query: (formData) => ({
                url: 'auth/register/',
                method: 'POST',
                body: formData,
            }),
        }),

        follow: builder.mutation({
          query: (request) => ({
            url: 'users/follow/',
            method: 'POST',
            body: request
          }),

          async onQueryStarted(args, {dispatch, queryFulfilled, getState}){
            try {
                await queryFulfilled;
                const currentUser = getState().auth.user;
                const response = await dispatch(authApi.endpoints.getUser.initiate(currentUser.id, {forceRefetch: true})).unwrap();
                dispatch(updateUser(response));
            } catch {
                // do nothing here, if the query fails, we don't need to update the user
            }
          },
        }),

        favourite: builder.mutation({
          query: (request) => ({
            url: 'posts/favourite/',
            method: 'POST',
            body: request
          }),

          async onQueryStarted(args, {dispatch, queryFulfilled, getState}){
            try {
                await queryFulfilled;
                const currentUser = getState().auth.user;
                const response = await dispatch(authApi.endpoints.getUser.initiate(currentUser.id, {forceRefetch: true})).unwrap();
                dispatch(updateUser(response));
            } catch {
                // do nothing here, if the query fails, we don't need to update the user
            }
          },
        }),

        feed: builder.query({
          query: () => ({
            url: 'feed/',
            method: "GET",
          })
        }),

        addPost: builder.mutation({
          query: (formData) => ({
            url: 'posts/',
            method: 'POST',
            body: formData
        }),

        async onQueryStarted(args, {dispatch, queryFulfilled, getState}){
          try {
              await queryFulfilled;
              const currentUser = getState().auth.user;
              const response = await dispatch(authApi.endpoints.getUser.initiate(currentUser.id, {forceRefetch: true})).unwrap();
              dispatch(updateUser(response));
          } catch {
              // do nothing here, if the query fails, we don't need to update the user
          }
        },

        }),

        editPost: builder.mutation({
          query: (formData) => ({
            url: `posts/${formData.id}/`,
            method: 'PATCH',
            body: formData
        }),
        }),

        deletePost: builder.mutation({
          query: (postId) => ({
            url: `posts/${postId}/`,
            method: 'DELETE',
        }),

        async onQueryStarted(args, {dispatch, queryFulfilled, getState}){
          try {
              await queryFulfilled;
              const currentUser = getState().auth.user;
              const response = await dispatch(authApi.endpoints.getUser.initiate(currentUser.id, {forceRefetch: true})).unwrap();
              dispatch(updateUser(response));
          } catch {
              // do nothing here, if the query fails, we don't need to update the user
          }
        },
        }),
        
        getAllPosts: builder.query({
          query: () => ({
            url: 'posts/',
            method: 'GET',
        }),
        }),

        getPost: builder.query({
          query: (postId) => ({
            url: `posts/${postId}/`,
            method: 'GET',
        }),
        }),

        getUserPosts: builder.query({
          query: (userId) => ({
            url: `users/${userId}/posts/`,
            method: 'GET',
        }),
        }),

        getAllUsers: builder.query({
          query: () => ({
            url: 'users/',
            method: 'GET',
        }),
        }),

        getUser: builder.query({
          query: (userId) => ({
            url: `users/${userId}/`,
            method: 'GET',
        }),
        }),

        editUser: builder.mutation ({
          query: (formData) => ({
            url: `users/${formData.get('id')}/`, 
            method: 'PATCH',
            body: formData,
          }),

          async onQueryStarted(args, {dispatch, queryFulfilled, getState}){
            try {
                await queryFulfilled;
                const currentUser = getState().auth.user;
                const response = await dispatch(authApi.endpoints.getUser.initiate(currentUser.id, {forceRefetch: true})).unwrap();
                dispatch(updateUser(response));
            } catch {
                // do nothing here, if the query fails, we don't need to update the user
            }
          },
        }),

        

  })
})
  
  export const { 
    useLoginMutation, 
    useRegisterMutation, 
    useFollowMutation, 
    useFavouriteMutation,
    useAddPostMutation, 
    useEditPostMutation,
    useEditUserMutation,
    useDeletePostMutation,
    useGetAllPostsQuery, 
    useGetAllUsersQuery, 
    useGetUserPostsQuery,
    useGetPostQuery, 
    useGetUserQuery,
    useFeedQuery,
  } = authApi;