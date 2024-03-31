import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../constants'

// const baseUrl = fetchBaseQuery({baseUrl : BASE_URL})
// console.log(baseUrl)

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
         baseUrl: BASE_URL,
         credentials:'include' 
        }),
    tagTypes: ['Product', 'Order', 'User', 'Auth'],
    endpoints: (builder) => ({}),

    // these above endpoints key, contain the actions for this slice and they will be extended in the separate file like actions for the product api are in the productApiSlice and likewise for all
    
  });

