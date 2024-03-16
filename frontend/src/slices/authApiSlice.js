import { AUTH_URL } from "../constants";
import { apiSlice } from "./apiSlice";


// apiSlice is the parent Slice 
const authApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
        login : builder.mutation({
            query : (data)=>({
                url : `${AUTH_URL}/login`,
                method : "POST",
                body : data
            })
        }),

        logout : builder.mutation({
            query : ()=>({
                url :  `${AUTH_URL}/logout`,
                method : "POST"
            })
        }) ,
        register : builder.mutation({
            query : (data)=>({
                url :  `${AUTH_URL}/register`,
                method : 'POST',
                body : data
            })
        })  
    })
})

export {authApiSlice}

export const {useLoginMutation , useLogoutMutation , useRegisterMutation} = authApiSlice
