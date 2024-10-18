import { Card, Grid2, Typography, Button, Divider, Grid, TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { format } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { currencyFormat } from "../../lib/util";
import { useFetchOrderDetailedQuery } from "./orderApi";

export default function OrderDetailed() {
    const { id } = useParams<{ id: string }>();

    const { data: order } = useFetchOrderDetailedQuery(+id!);

    if (!order) return null;

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
        <Card style={{ padding: '2rem', maxWidth: '1024px', margin: '2rem auto' }}>
            <div style={{ padding: '1rem' }}>
                <Grid2 container justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" fontWeight="600" align="center">
                        Order summary for order #{order.id}
                    </Typography>
                    <Button component={Link} to='/orders' variant="outlined" >
                        Back to orders
                    </Button>
                </Grid2>

                <Divider style={{ margin: '2rem 0' }} />

                <Grid2 container spacing={4}>
                    <Grid2 size={12}>
                        <Typography variant="h6" fontWeight="600">Billing and delivery information</Typography>
                        <dl>
                            <dt><Typography variant="subtitle1" fontWeight="500">Shipping address</Typography></dt>
                            <dd><Typography variant="body2" fontWeight="300">{addressString()}</Typography></dd>
                        </dl>
                        <dl>
                            <dt><Typography variant="subtitle1" fontWeight="500">Payment info</Typography></dt>
                            <dd><Typography variant="body2" fontWeight="300">{paymentString()}</Typography></dd>
                        </dl>
                    </Grid2>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="600">Order details</Typography>
                        <dl>
                            <dt><Typography variant="subtitle1" fontWeight="500">Email address</Typography></dt>
                            <dd><Typography variant="body2" fontWeight="300">{order.buyerEmail}</Typography></dd>
                        </dl>
                        <dl>
                            <dt><Typography variant="subtitle1" fontWeight="500">Order status</Typography></dt>
                            <dd><Typography variant="body2" fontWeight="300">{order.orderStatus}</Typography></dd>
                        </dl>
                        <dl>
                            <dt><Typography variant="subtitle1" fontWeight="500">Order date</Typography></dt>
                            <dd><Typography variant="body2" fontWeight="300">{format(order.orderDate, 'dd MMM yyyy')}</Typography></dd>
                        </dl>
                    </Grid>
                </Grid2>

                <Divider style={{ margin: '2rem 0' }} />

                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {order.orderItems.map((item) => (
                                <TableRow key={item.productId}>
                                    <TableCell>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <img src={item.pictureUrl} alt="product" style={{ width: '40px', height: '40px' }} />
                                            <Typography>{item.name}</Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">x{item.quantity}</TableCell>
                                    <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider style={{ margin: '2rem 0' }} />

                <div style={{ padding: '1rem' }}>
                    <Typography variant="h6" fontWeight="600">Order summary</Typography>
                    <div>
                        <dl style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
                            <Typography variant="body1" fontWeight="500">Subtotal</Typography>
                            <Typography>{currencyFormat(order.subtotal)}</Typography>
                        </dl>
                        <dl style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
                            <Typography variant="body1" fontWeight="500">Discount</Typography>
                            <Typography color="green">-$0.00</Typography>
                        </dl>
                        <dl style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
                            <Typography variant="body1" fontWeight="500">Delivery fee</Typography>
                            <Typography>{currencyFormat(order.deliveryFee)}</Typography>
                        </dl>
                    </div>

                    <Divider />

                    <dl style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0', paddingTop: '1rem' }}>
                        <Typography variant="body1" fontWeight="500">Total</Typography>
                        <Typography fontWeight="600">{currencyFormat(order.total)}</Typography>
                    </dl>
                </div>
            </div>
        </Card>
    )
}