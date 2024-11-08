export const validateRequiredFields = (transactionRef: string, amount: string, email: string, publicKey: string) : string => {
  if (!transactionRef) {
    return 'transaction_reference field is required!';
  } else if (!amount) {
    return 'amount field is required!';
  } else if (!email) {
    return 'email field is required!';
  } else if (!publicKey) {
    return 'public_key field is required!';
  }
  return '';
}