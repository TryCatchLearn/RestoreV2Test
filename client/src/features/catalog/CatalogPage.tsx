import { Grid2, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";

export default function CatalogPage() {
    const productParams = useAppSelector(state => state.catalog);
    const { data, isLoading } = useFetchProductsQuery(productParams);
    const dispatch = useAppDispatch();

    if (isLoading) return <div>Loading...</div>;

    return (
        <Grid2 container spacing={4}>
            <Grid2 size={3}>
                <Filters />
            </Grid2>
            <Grid2 size={9}>
                {data?.items && data?.items.length > 0 ? (
                    <Grid2 container spacing={3} sx={{ display: 'flex' }}>
                    {data && data.items.map(product => (
                        <Grid2 size={3} key={product.id}>
                            <ProductCard product={product} />
                        </Grid2>
                    ))}
                </Grid2>
                ) : (
                    <Typography variant="h5">There are no results for this filter</Typography>
                )}
                
                {data?.pagination && data.items.length > 0 &&
                <AppPagination 
                    metadata={data.pagination}
                    onPageChange={(page: number) => dispatch(setPageNumber(page))}
                />}
            </Grid2>
        </Grid2>
    )
}