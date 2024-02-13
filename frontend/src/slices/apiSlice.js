import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../constants'

// const baseUrl = fetchBaseQuery({baseUrl : BASE_URL})
// console.log(baseUrl)

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({})
  });