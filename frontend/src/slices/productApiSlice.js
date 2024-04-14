import { PRODUCTS_URL , UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";



export const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
        getProducts: builder.query({
            query : ({pageNumber})=>({
                url : `${PRODUCTS_URL}`,
                params : {
                    pageNumber : pageNumber
                }
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
            query : (data) =>({
                url : `${PRODUCTS_URL}/product/${data.prodId}`,
                method : 'PUT',
                body : data
            }),
            invalidatesTags : ['Product']
        }),

        uploadProduct : builder.mutation({
            query : (data)=>({
                url : `${UPLOAD_URL}`,
                method : "POST",
                body : data 
            })
        }),
        deleteProduct : builder.mutation({
            query : (id)=>({
                url :  `${PRODUCTS_URL}/delete/${id}` ,
                method : 'DELETE',
            })
        }), 
        createReview : builder.mutation({
            query : (data)=>({
                url : `${PRODUCTS_URL}/${data.id}/reviews`,
                method  :'POST',
                body : data
            }),
            invalidatesTags : ['Product']
        }),
        topProds : builder.query({
            query : ()=>({
                url : `${PRODUCTS_URL}/top`,
                method : 'GET'

            }),
            keepUnusedDataFor : 5
        })

    })
      
})


export const {useGetProductsQuery , useTopProdsQuery , useGetProductDetailsQuery , useCreateProductMutation , useUpdateProductMutation ,  useUploadProductMutation , useDeleteProductMutation, useCreateReviewMutation} = productApiSlice