import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/types/user";
import { accountApi } from "./accountApi";

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        user: null as User | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            accountApi.endpoints.login.matchFulfilled,
            () => {
                accountApi.endpoints.userInfo.initiate();
            }
        );
        builder.addMatcher(
            accountApi.endpoints.userInfo.matchFulfilled,
            (state, action) => {
                state.user = action.payload;
            }
        );
        builder.addMatcher(
            accountApi.endpoints.logout.matchFulfilled,
            (state) => {
                state.user = null
            }
        )
    }
})