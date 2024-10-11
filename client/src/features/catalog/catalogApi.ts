import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../../app/types/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { ProductParams } from "../../app/types/productParams";
import { filterEmptyValues } from "../../lib/util";
import { Pagination } from "../../app/types/pagination";

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<{ items: Product[], pagination: Pagination }, ProductParams>({
            query: (productParams) => {
                return {
                    url: 'products',
                    params: filterEmptyValues(productParams)
                }
            },
            transformResponse: (items: Product[], meta) => {
                const paginationHeader = meta?.response?.headers?.get('Pagination');
                const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
                return { items, pagination };
            }
        }),
        fetchProductDetails: builder.query<Product, number>({
            query: (productId) => `products/${productId}`
        }),
        fetchFilters: builder.query<{ brands: string[], types: string[] }, void>({
            query: () => 'products/filters'
        })
    })
});

export const { useFetchProductsQuery, useFetchProductDetailsQuery, useFetchFiltersQuery } = catalogApi;