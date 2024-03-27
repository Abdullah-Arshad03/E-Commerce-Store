import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
        getProducts: builder.query({
            query : ()=>({
                url : PRODUCTS_URL 
            }),
            keepUnusedDataFor : 5
        }),
        
        getProductDetails : builder.query({
            query : (prodId)=>({
                url : `${PRODUCTS_URL}/${prodId}`
            }),
            keepUnusedDataFor: 5
        }),

        createProduct : builder.mutation({
            query : ()=>({
                url : `${PRODUCTS_URL}/createproduct`,
                method : 'POST',
            }),
            invalidatesTags : ['Product']
        }),

        updateProduct : builder.mutation({
            query : ({prodId, data}) =>({
                url : `${PRODUCTS_URL}/product/${prodId}`,
                method : 'PUT',
                body : {...data}
            }),
            invalidatesTags : ['Product']
        })
    })
      
})


export const {useGetProductsQuery , useGetProductDetailsQuery , useCreateProductMutation , useUpdateProductMutation} = productApiSlice