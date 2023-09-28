export interface PixBRParams {
    payloadVersion?: string;
    key: string;
    city: string;
    name: string;
    amount?: number;
    transactionId?: string;
    message?: string;
    postalCode?: string;
    currencyCode?: string;
    countryCode?: string;
}
export declare function PixBR({ payloadVersion, key, city, name, amount, transactionId, message, postalCode, currencyCode, countryCode }: PixBRParams): string;
export default PixBR;
