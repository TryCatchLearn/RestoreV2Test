import { Edit, Delete } from "@mui/icons-material";
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { currencyFormat } from "../../lib/util";
import { useFetchProductsQuery } from "../catalog/catalogApi";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "../catalog/catalogSlice";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { Product } from "../../lib/types/product";
import { useDeleteProductMutation } from "./adminApi";

export default function Inventory() {
    const productParams = useAppSelector(state => state.catalog);
    const { data, refetch } = useFetchProductsQuery(productParams);
    const [deleteProduct] = useDeleteProductMutation();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
        setEditMode(true);
    }

    const handleDeleteProduct = async (id: number) => {
        try {
            await deleteProduct(id);
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    if (editMode) return <ProductForm setEditMode={setEditMode} product={selectedProduct} refetch={refetch} />

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Inventory</Typography>
                <Button sx={{ m: 2 }} size='large' variant='contained'
                    onClick={() => setEditMode(true)}
                >Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.items.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.pictureUrl} alt={product.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.price)}</TableCell>
                                <TableCell align="center">{product.type}</TableCell>
                                <TableCell align="center">{product.brand}</TableCell>
                                <TableCell align="center">{product.quantityInStock}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
                                    <Button onClick={() => handleDeleteProduct(product.id)} startIcon={<Delete />} color='error' />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box padding={3}>
                {data?.pagination && data.items.length > 0 &&
                    <AppPagination
                        metadata={data.pagination}
                        onPageChange={(page: number) => dispatch(setPageNumber(page))}
                    />}
                </Box>

            </TableContainer>
        </>
    )
}