import { createSlice } from "@reduxjs/toolkit";
import { ProductParams } from "../../lib/types/productParams";
import { Pagination } from "../../lib/types/pagination";

type CatalogState = {
    pagination?: Pagination
} & ProductParams;

const initialState: CatalogState = {
    pageNumber: 1,
    pageSize: 8,
    types: [],
    brands: [],
    searchTerm: '',
    orderBy: 'name',
}

export const catalogSlice = createSlice({
    name: 'catalogSlice',
    initialState,
    reducers: {
        setPageNumber(state, action) {
            state.pageNumber = action.payload
        },
        setPageSize(state, action) {
            state.pageSize = action.payload
        },
        setOrderBy(state, action) {
            state.orderBy = action.payload;
            state.pageNumber = 1
        },
        setTypes(state, action) {
            state.types = action.payload;
            state.pageNumber = 1;
        },
        setBrands(state, action) {
            state.brands = action.payload;
            state.pageNumber = 1;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
            state.pageNumber = 1;
        },
        setPagination(state, action) {
            state.pagination = action.payload
        },
        resetParams() {
            return initialState;
        }
    }
});

export const {setBrands, setOrderBy, setPageNumber, setPageSize, setSearchTerm, setTypes, resetParams} = catalogSlice.actions;