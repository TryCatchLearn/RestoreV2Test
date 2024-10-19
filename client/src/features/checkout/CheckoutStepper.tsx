import { LoadingButton } from "@mui/lab";
import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Review from "./Review";
import { useFetchUserAddressQuery, useUpdateUserAddressMutation } from "../account/accountApi";
import { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { currencyFormat } from "../../lib/util";
import { useBasket } from "../../lib/hooks/useBasket";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../orders/orderApi";
import CheckoutAddress from "./CheckoutAddress";

const steps = ['Address', 'Payment', 'Review'];

export default function CheckoutStepper() {
    const { data: address, isLoading} = useFetchUserAddressQuery();
    const [createOrder] = useCreateOrderMutation();
    const { subtotal, deliveryFee, basket, clearBasket } = useBasket();
    const [updateAddress] = useUpdateUserAddressMutation();
    const [activeStep, setActiveStep] = useState(0);
    const [saveAddressChecked, setSaveAddressChecked] = useState(false);
    const elements = useElements();
    const stripe = useStripe();
    const [addressComplete, setAddressComplete] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleNext = async () => {
        if (activeStep === 0 && saveAddressChecked && elements) {
            const address = await getStripeAddress();
            if (address) await updateAddress(address);
        }
        if (activeStep === 1) {
            if (!elements || !stripe) return;
            const result = await elements.submit();
            if (result.error) return toast.error(result.error.message);

            const stripeResult = await stripe.createConfirmationToken({elements});
            if (stripeResult.error) return toast.error(stripeResult.error.message);
            setConfirmationToken(stripeResult.confirmationToken);
        }
        if (activeStep === 2) {
            await confirmPayment();
        }
        if (activeStep < 2) setActiveStep(step => step + 1)
    }

    const handleBack = () => {
        setActiveStep(step => step - 1);
    }

    const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
        setAddressComplete(event.complete);
    }

    const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
        setPaymentComplete(event.complete);
    }

    const getStripeAddress = async () => {
        const addressElement = elements?.getElement('address');
        if (!addressElement) return null;
        const {value: {name, address}} = await addressElement.getValue();

        if (name && address) return {...address, name};

        return null;
    }

    const confirmPayment = async () => {
        setSubmitting(true);
        try {
            if (!confirmationToken || !basket?.clientSecret) throw new Error('Unable to process payment');

            const orderModel = await createOrderModel();
            const orderResult = await createOrder(orderModel);

            console.log(orderResult);

            if (!orderResult) throw new Error('Order creation failed or out of stock');

            const paymentResult = await stripe?.confirmPayment({
                clientSecret: basket.clientSecret,
                redirect: 'if_required',
                confirmParams: {
                    confirmation_token: confirmationToken.id
                }
            });

            if (paymentResult?.paymentIntent?.status === 'succeeded') {
                navigate('/checkout/success', {state: orderResult});
                await clearBasket();
            } else if (paymentResult?.error) {
                throw new Error(paymentResult.error.message);
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error: unknown) {
            if (error instanceof Error)
                toast.error(error?.message || 'Something went wrong');
            setActiveStep(step => step - 1);
        } finally {
            setSubmitting(false);
        }
    }

    const createOrderModel = async () => {
        const shippingAddress = await getStripeAddress();
        const paymentSummary = confirmationToken?.payment_method_preview.card;

        if (!shippingAddress || !paymentSummary) throw new Error('Problem creating order');

        return {shippingAddress, paymentSummary}
    }

    if (isLoading) return <Typography>Loading checkout...</Typography>

    return (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>

            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: activeStep === 0 ? 'block' : 'none' }}>
                    <CheckoutAddress 
                        address={address} 
                        onChange={handleAddressChange} 
                        checked={saveAddressChecked} 
                        onCheckChange={setSaveAddressChecked}
                    />
                </Box>
                <Box sx={{ display: activeStep === 1 ? 'block' : 'none' }}>
                    <PaymentElement 
                        onChange={handlePaymentChange}
                    />
                </Box>
                <Box sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
                    <Review confirmationToken={confirmationToken} />
                </Box>
            </Box>

            <Box display='flex' paddingTop={2} justifyContent='space-between'>
                <Button onClick={handleBack}>Back</Button>
                <LoadingButton 
                    onClick={handleNext}
                    loading={submitting}
                    disabled={
                        (activeStep === 0 && !addressComplete) ||
                        (activeStep === 1 && !paymentComplete)
                    }
                >
                    {activeStep === steps.length - 1 ? `Pay ${currencyFormat(subtotal + deliveryFee)}` : 'Next'}
                </LoadingButton>
            </Box>
        </Paper>
    )
}