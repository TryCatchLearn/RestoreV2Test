import { FormControlLabel, Checkbox } from "@mui/material";
import { AddressElement } from "@stripe/react-stripe-js";
import { Address } from "../../lib/types/user";
import { StripeAddressElementChangeEvent } from "@stripe/stripe-js";

type Props = {
    address?: Address;
    onChange: (event: StripeAddressElementChangeEvent) => void;
    checked: boolean;
    onCheckChange: (value: boolean) => void;
}

export default function CheckoutAddress({address, onChange, checked, onCheckChange}: Props) {
    return (
        <>
            <AddressElement
                options={{
                    mode: 'shipping',
                    defaultValues: address && address.country ? {
                        address: {
                            line1: address?.line1,
                            line2: address?.line2,
                            city: address?.city,
                            country: address.country,
                            postal_code: address.postal_code
                        },
                        name: address?.name
                    } : undefined
                }}
                onChange={onChange}
            />
            <FormControlLabel
                sx={{ display: 'flex', justifyContent: 'end' }}
                control={<Checkbox
                    checked={checked}
                    onChange={e => onCheckChange(e.target.checked)}
                />}
                label="Save as default address" />
        </>
    )
}