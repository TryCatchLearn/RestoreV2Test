import { LoadingButton } from "@mui/lab";
import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Review from "./Review";
import { useFetchUserAddressQuery, useUpdateUserAddressMutation } from "../account/accountApi";
import { Address } from "../../app/types/user";
import { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { currencyFormat } from "../../lib/util";
import { useBasket } from "../../lib/hooks/useBasket";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const steps = ['Address', 'Payment', 'Review'];

export default function CheckoutStepper() {
    const { data: { name, ...restAddress } = {} as Address} = useFetchUserAddressQuery();
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

            const paymentResult = await stripe?.confirmPayment({
                clientSecret: basket.clientSecret,
                redirect: 'if_required',
                confirmParams: {
                    confirmation_token: confirmationToken.id
                }
            });

            if (paymentResult?.paymentIntent?.status === 'succeeded') {
                navigate('/checkout/success');
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
                    <AddressElement
                        options={{
                            mode: 'shipping',
                            defaultValues: {
                                address: restAddress,
                                name: name
                            }
                        }}
                        onChange={handleAddressChange}
                    />
                    <FormControlLabel
                        sx={{ display: 'flex', justifyContent: 'end' }}
                        control={<Checkbox 
                            checked={saveAddressChecked}
                            onChange={e => setSaveAddressChecked(e.target.checked)}
                        />}
                        label="Save as default address" />
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