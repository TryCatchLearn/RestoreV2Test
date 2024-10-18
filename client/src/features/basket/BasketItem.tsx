import { Remove, Add, Close } from "@mui/icons-material";
import { Paper, Box, Typography, Grid2, Button } from "@mui/material";
import { BasketItem } from "../../lib/types/basket";
import { useAddBasketItemMutation, useRemoveBasketItemMutation } from "./basketApi";
import { currencyFormat } from "../../lib/util";

type Props = {
    basketItem: BasketItem;
}

export default function Item({ basketItem }: Props) {
    const [removeBasketItem] = useRemoveBasketItemMutation();
    const [addBasketItem] = useAddBasketItemMutation();

    return (
        <Paper sx={{
            height: 140,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
        }}
        >
            <Box display='flex' alignItems='center'>
                <Box
                    component="img"
                    src={basketItem.pictureUrl}
                    alt={basketItem.name}
                    sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginRight: 8,
                        ml: 4
                    }}
                />

                <Box display='flex' flexDirection='column' gap={1} flexGrow={1}>
                    <Typography variant="h6">{basketItem.name}</Typography>


                    <Box display='flex' alignItems='center' gap={3}>
                        <Typography sx={{ fontSize: '1.1rem' }}>
                            {currencyFormat(basketItem.price)} x {basketItem.quantity}
                        </Typography>
                        <Typography sx={{ fontSize: '1.1rem' }} color="primary">
                            {(currencyFormat(basketItem.price * basketItem.quantity))}
                        </Typography>
                    </Box>

                    <Grid2 container spacing={1} alignItems="center">
                        <Button
                            onClick={() => removeBasketItem({productId: basketItem.productId, quantity: 1})}
                            color="error"
                            size="small"
                            sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
                        >
                            <Remove />
                        </Button>

                        <Typography variant="h6">{basketItem.quantity}</Typography>

                        <Button
                            onClick={() => addBasketItem({product: basketItem, quantity: 1})}
                            color="success"
                            size="small"
                            sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
                        >
                            <Add />
                        </Button>
                    </Grid2>
                </Box>
            </Box>
            <Button
                onClick={() => removeBasketItem({productId: basketItem.productId, quantity: basketItem.quantity})}
                size="small"
                color="error"
                sx={{ minWidth: 0, alignSelf: 'start' }}
            >
                <Close />
            </Button>
        </Paper>
    )
}