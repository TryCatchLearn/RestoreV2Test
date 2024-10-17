import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Basket, BasketItem } from "../../app/types/basket";
import { Product } from "../../app/types/product";
import Cookies from 'js-cookie';

function isBasketItem(product: Product | BasketItem): product is BasketItem {
    return (product as BasketItem).quantity !== undefined;
}

export const basketApi = createApi({
    reducerPath: 'basketApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Basket'],
    endpoints: (builder) => ({
        fetchBasket: builder.query<Basket, void>({
            query: () => `basket`,
            providesTags: ['Basket']
        }),
        addBasketItem: builder.mutation<Basket, { product: Product | BasketItem, quantity: number }>({
            query: ({ product, quantity }) => {
                const productId = isBasketItem(product) ? product.productId : product.id;
                return {
                    url: `basket?productId=${productId}&quantity=${quantity}`,
                    method: 'POST'
                }
            },
            onQueryStarted: async ({ product, quantity }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                        draft.items = draft.items ?? [];
                        const productId = isBasketItem(product) ? product.productId : product.id;
                        const existingItem = draft.items.find(item => item.productId === productId);
                        if (existingItem) existingItem.quantity += quantity;
                        else draft.items.push(isBasketItem(product) ? product : new BasketItem(product, quantity))
                    })
                )
                // TODO: This does not work properly when creating a new basket.  Only after creation.  
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error);
                    patchResult.undo();
                }
            }
        }),
        removeBasketItem: builder.mutation<void, { productId: number, quantity: number }>({
            query: ({ productId, quantity }) => ({
                url: `basket?productId=${productId}&quantity=${quantity}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({ productId, quantity }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                        const itemIndex = draft.items.findIndex(item => item.productId === productId);
                        if (itemIndex >= 0) {
                            draft.items[itemIndex].quantity -= quantity;
                            if (draft.items[itemIndex].quantity <= 0) {
                                draft.items.splice(itemIndex, 1);
                            }
                        }
                    })
                )

                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                    console.log(error);
                }
            }
        }),
        clearBasket: builder.mutation<void, void>({
            queryFn: () => ({data: undefined}),
            onQueryStarted: async (_, {dispatch}) => {
                dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                        draft.items = [];
                    }
                ));
                Cookies.remove('basketId');
            }
        })
    })
});

export const { useFetchBasketQuery, useAddBasketItemMutation, useRemoveBasketItemMutation, 
    useClearBasketMutation } = basketApi;