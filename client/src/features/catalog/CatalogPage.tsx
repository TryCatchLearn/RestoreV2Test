import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import { useFetchProductsQuery } from "./catalogApi";

export default function CatalogPage() {
    const {data, isLoading} = useFetchProductsQuery();

    if (isLoading) return <div>Loading...</div>;
    
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center'}}>
            {data && data.map(product => (
                <ProductCard product={product} key={product.id} />
            ))}
        </Box>
    )
}