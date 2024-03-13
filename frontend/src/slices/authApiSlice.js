import { AUTH_URL } from "../constants";
import { apiSlice } from "./apiSlice";


const authApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
        login : builder.mutation({
            query : (data)=>({
                url : AUTH_URL/login
            })
        })
    })
})


























// const authApiSlice = apiSlice.injectEndpoints({
//     endpoints : (builder)=> ({
//         login : builder.mutation({
//             query : (data)=>({
//                 url : AUTH_URL/login
//             })
//         })

//     })

// })