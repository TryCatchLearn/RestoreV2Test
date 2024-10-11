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