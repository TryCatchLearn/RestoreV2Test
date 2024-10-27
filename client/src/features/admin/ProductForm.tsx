import { Box, Paper, Typography, Button, Grid2 } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/shared/components/AppTextInput";
import { createProductSchema, CreateProductSchema } from "../../lib/schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import AppSelectInput from "../../app/shared/components/AppSelectInput";
import { useFetchFiltersQuery } from "../catalog/catalogApi";
import AppDropzone from "../../app/shared/components/AppDropzone";
import { Product } from "../../lib/types/product";
import { useEffect } from "react";
import { useCreateProductMutation, useUpdateProductMutation } from "./adminApi";
import { LoadingButton } from "@mui/lab";
import { handleApiError } from "../../lib/util";

type Props = {
    setEditMode: (value: boolean) => void;
    product?: Product;
    refetch: () => void;
}

type FileWithPreview = File & { preview?: string };

export default function ProductForm({ setEditMode, product, refetch }: Props) {
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const resolver = zodResolver(createProductSchema);
    const { control, handleSubmit, reset, watch, setError, formState: {isSubmitting} } = useForm<CreateProductSchema>({
        resolver,
        mode: 'onTouched'
    });
    const watchFile = watch('file');
    const { data } = useFetchFiltersQuery();

    useEffect(() => {
        if (product) reset(product);
    }, [product, reset]);

    const createFormData = (item: FieldValues) => {
        const formData = new FormData();
        for (const key in item) {
            formData.append(key, item[key])
        }
        return formData;
    }

    const onSubmit = async (data: FieldValues) => {
        try {
            const formData = createFormData(data);
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, String(value));
            });

            if (watchFile) {
                formData.append('file', watchFile);
            }

            if (product) await updateProduct({id: product.id, data: formData}).unwrap();
            else await createProduct(formData).unwrap();

            setEditMode(false);
            refetch();
        } catch (error: unknown) {
            console.log(error);
            handleApiError<CreateProductSchema>(error, setError, 
                ['brand', 'description', 'file', 'name', 'pictureUrl', 'price', 'quantityInStock', 'type'])
        }
    }

    return (
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Product Details
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={3}>
                    <Grid2 size={12}>
                        <AppTextInput control={control} name='name' label='Name' />
                    </Grid2>
                    <Grid2 size={12}>
                        {data?.brands &&
                            <AppSelectInput items={data.brands} control={control} name='brand' label='Brand' />}
                    </Grid2>
                    <Grid2 size={12}>
                        {data?.types &&
                            <AppSelectInput items={data.types} control={control} name='type' label='Type' />}
                    </Grid2>
                    <Grid2 size={12}>
                        <AppTextInput control={control} name='price' label='Price' type="number" />
                    </Grid2>
                    <Grid2 size={12}>
                        <AppTextInput control={control} name='quantityInStock' label='Quantity in Stock' type="number" />
                    </Grid2>
                    <Grid2 size={12}>
                        <AppTextInput control={control} name='description' label='Description' multiline rows={3} />
                    </Grid2>
                    <Grid2 size={12} display='flex' justifyContent='space-between' alignItems='center'>
                        <AppDropzone control={control} name='file' />
                        {watchFile ? (
                            <img src={(watchFile as unknown as FileWithPreview)?.preview}  alt='preview' style={{ maxHeight: 200 }} />
                        ) : (
                            <img src={product?.pictureUrl} alt={product?.name} style={{ maxHeight: 200 }} />
                        )}
                    </Grid2>
                </Grid2>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button variant='contained' color='inherit' onClick={() => setEditMode(false)}>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form>

        </Box>
    )
}