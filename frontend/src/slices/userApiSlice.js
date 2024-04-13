import React from "react";
import {USERS_URL} from '../constants'
import { apiSlice } from "./apiSlice";


const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        userProfile : builder.mutation({
            query : (data)=>({
                url : `${USERS_URL}/profile`,
                method : 'PUT',
                body : {...data} 
            })
        }),

        getUsers : builder.query({
            query : ()=>({
                url : USERS_URL,
                method : 'GET'
            })
        }),
        getUserDetails : builder.query({
            query : (id)=>({
                url : `${USERS_URL}/${id}`,
                method : 'GET'
            })
        }),
        updateUserDetail : builder.mutation({
            query : (id)=>({
                url : `${USERS_URL}/${id}`,
                method : 'PUT'
            })
        }),


        deleteUser : builder.mutation({
            query : (id)=>({
                url : `${USERS_URL}/delete/${id}`,
                method : "DELETE"
            })
        })





    })
})

export {userApiSlice}
export const {useUserProfileMutation ,useGetUsersQuery , useGetUserDetailsQuery , useUpdateUserDetailMutation, useDeleteUserMutation } = userApiSlice