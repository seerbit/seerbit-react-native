export type ISeerbit = {
    startPayment: () => void;
    endPayment: () => void;
};
export interface SeerbitSuccessResponse {
    code: string;
    message: string;
    payments: {
        linkingReference: string;
        reference: string;
    };
}
export interface SeerBitCallBackResponse {
    event: string;
    response: string;
}
type Props = {
    buttonText?: string;
    currency?: string;
    full_name?: string;
    email: string;
    amount: string;
    country?: string;
    public_key: string;
    productId?: string;
    planId?: string;
    pocket_reference?: string;
    vendor_id?: string;
    description?: string;
    callbackurl?: string;
    autoLoad?: boolean;
    showButton?: boolean;
    tokenize?: boolean;
    recurrent?: boolean;
    setAmountByCustomer?: boolean;
    close_on_success?: boolean;
    close_prompt?: boolean;
    ActivityIndicatorColor?: string;
    transaction_reference: string;
    onSuccess?: (response: SeerbitSuccessResponse) => void;
    onCancel?: () => void;
    onError?: () => void;
    btnStyles?: {
        alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
        backgroundColor?: string;
        padding?: number;
        marginTop?: number;
        marginLeft?: number;
        marginRight?: number;
        borderRadius?: number;
    };
    textStyles?: {
        color: string;
    };
    customization?: object;
};
declare const _default: import("react").ForwardRefExoticComponent<Props & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<ISeerbit>>;
export default _default;
//# sourceMappingURL=index.d.ts.map