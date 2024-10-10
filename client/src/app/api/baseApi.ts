import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { startLoading, stopLoading } from "../layout/uiSlice";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api/'
});

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(startLoading());
    await sleep();
    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch(stopLoading());
    if (result.error) {
        const {status, data} = result.error;
        console.log({status, data});
    }

    return result;
}