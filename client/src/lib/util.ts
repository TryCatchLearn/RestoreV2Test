import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function extractErrorMessage(error: unknown): string[] {
    if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message: unknown }).message === 'string'
    ) {
        return (error as { message: string }).message.split(', ');
    }
    return [];
}

export function currencyFormat(amount: number) {
    return '$' + (amount / 100).toFixed(2);
}

export function filterEmptyValues(values: object) {
    return Object.fromEntries(
        Object.entries(values).filter(
            ([, value]) => value !== '' && value !== null && value !== undefined && value.length !== 0
        )
    )
}

export function handleApiError<T extends FieldValues>(
    error: unknown,
    setError: UseFormSetError<T>,
    fieldNames: Path<T>[]
) {
    const apiError = (error as { message: string }) || {};

    if (apiError.message && typeof apiError.message === 'string') {
        const errorArray = apiError.message.split(',');

        errorArray.forEach((e: string) => {
            const matchedField = fieldNames.find(fieldName => 
                e.toLowerCase().includes(fieldName.toString().toLowerCase()));

            if (matchedField) setError(matchedField, { message: e.trim() });
        })
    }
}