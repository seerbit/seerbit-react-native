"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRequiredFields = void 0;
const validateRequiredFields = (transactionRef, amount, email, publicKey) => {
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
};
exports.validateRequiredFields = validateRequiredFields;
//# sourceMappingURL=index.js.map