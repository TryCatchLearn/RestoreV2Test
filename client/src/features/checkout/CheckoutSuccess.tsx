import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { currencyFormat } from "../../lib/util";

export default function CheckoutSuccess() {
    const { state: {data: order} } = useLocation();

    if (!order) return <Typography>Problem accessing the order</Typography>

    const addressString = () => {
        const address = order.shippingAddress;

        return `${address.name}, ${address?.line1}, ${address?.city}, ${address?.state}, 
            ${address?.postal_code}, ${address?.country}`
    }
    
    const paymentString = () => {
        const card = order.paymentSummary;

        return `${card.brand.toUpperCase()}, **** **** **** ${card.last4}, 
            Exp: ${card.exp_month}/${card.exp_year}`;
    }

    return (
        <Container maxWidth='md'>
            <>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Thanks for your fake order!
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Your order <strong>#{order.id}</strong> will never be processed as this is a fake shop. We will not notify you once your order has not shipped.
                </Typography>

                <Paper elevation={1} sx={{ padding: 2, marginBottom: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="textSecondary">
                            Order date
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                            {order.orderDate}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography variant="body2" color="textSecondary">
                            Payment method
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                            {paymentString()}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography variant="body2" color="textSecondary">
                            Address
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                            {addressString()}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography variant="body2" color="textSecondary">
                            Amount
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                            {currencyFormat(order.total)}
                        </Typography>
                    </Box>
                </Paper>

                <Box display="flex" justifyContent="flex-start" gap={2}>
                    <Button variant="contained" color="primary" href={`/orders/1`}>
                        View your order
                    </Button>
                    <Button component={Link} to='/catalog' variant="outlined" color="primary">
                        Continue shopping
                    </Button>
                </Box>
            </>
        </Container>
    )
}