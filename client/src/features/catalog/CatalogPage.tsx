import { Box } from "@mui/material";
import { Product } from "../../app/types/product"
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

export default function CatalogPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      fetch('https://localhost:5001/api/products')
        .then(response => response.json())
        .then((data: Product[]) => setProducts(data));
    }, [])
    
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center'}}>
            {products.map(product => (
                <ProductCard product={product} />
            ))}
        </Box>
    )
}