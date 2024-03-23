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
        })
    })
})

export {userApiSlice}

export const {useUserProfileMutation} = userApiSlice