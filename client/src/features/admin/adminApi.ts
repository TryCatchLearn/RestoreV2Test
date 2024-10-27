import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Product } from "../../lib/types/product";

export const adminApi = createApi({
    reducerPath: 'admin',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        createProduct: builder.mutation<Product, FormData>({
            query: (data: FormData) => {
                return {
                    url: 'products',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation<void, {id: number, data: FormData}>({
            query: ({id, data}) => {
                return {
                    url: `products/${id}`,
                    method: 'PUT',
                    body: data
                }
            },
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id: number) => {
                return {
                    url: `products/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Product']
        })
    })
});

export const {useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation} = adminApi;