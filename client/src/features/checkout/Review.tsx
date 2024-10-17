import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { currencyFormat } from "../../lib/util";
import { useBasket } from "../../lib/hooks/useBasket";
import { ConfirmationToken } from "@stripe/stripe-js";

type Props = {
    confirmationToken: ConfirmationToken | null;
}

export default function Review({confirmationToken}: Props) {
    const { basket } = useBasket();

    const addressString = () => {
        if (!confirmationToken?.shipping) return '';
        const {address, name} = confirmationToken.shipping;
        return `${name}, ${address?.line1}, ${address?.city}, ${address?.state}, 
            ${address?.postal_code}, ${address?.country}`
    }

    const paymentString = () => {
        if (!confirmationToken?.payment_method_preview.card) return '';
        const {card} = confirmationToken.payment_method_preview;

        return `${card.brand.toUpperCase()}, **** **** **** ${card.last4}, 
            Exp: ${card.exp_month}/${card.exp_year}`;
    }

    return (
        <>
            <Box mt={4} width="100%">
                <Typography variant="h6" fontWeight="bold">
                    Billing and delivery information
                </Typography>
                <dl>
                    <Typography component="dt" fontWeight="medium">
                        Shipping address
                    </Typography>
                    <Typography component="dd" mt={1} color="textSecondary">
                        {addressString()}
                    </Typography>

                    <Typography component="dt" fontWeight="medium" mt={2}>
                        Payment details
                    </Typography>
                    <Typography component="dd" mt={1} color="textSecondary">
                        {paymentString()}
                    </Typography>
                </dl>
            </Box>

            <Box mt={6} mx="auto">
                <Divider />
                <TableContainer>
                    <Table>
                        <TableBody>
                            {basket?.items?.map((item) => (
                                <TableRow key={item.productId} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                    <TableCell sx={{ py: 4 }}>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <img src={item.pictureUrl} alt="product" style={{ width: 40, height: 40 }} />
                                            <Typography>{item.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 4 }}>
                                        x{item.quantity}
                                    </TableCell>
                                    <TableCell align="right" sx={{ p: 4 }}>
                                        {currencyFormat(item.price)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}