import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/types/product";
import { Link } from "react-router-dom";
import { useAddBasketItemMutation } from "../basket/basketApi";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../lib/util";

type Props = {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const [addBasketItem, {isLoading}] = useAddBasketItemMutation();

    return (
        <Card
            elevation={3}
            sx={{
                width: 280,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
            <CardMedia
                sx={{ height: 240, backgroundSize: 'cover' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent sx={{pb: 0}}>
                <Typography gutterBottom variant="subtitle2" sx={{ textTransform: 'uppercase' }}>
                    {product.name}
                </Typography>
                <Typography variant="h6" sx={{ color: 'secondary.main' }}>
                    {currencyFormat(product.price)}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'space-between'}}>
                <LoadingButton
                    loading={isLoading}
                    onClick={() => addBasketItem({product, quantity: 1})}
                >
                    Add to cart
                </LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>
        </Card>
    )
}