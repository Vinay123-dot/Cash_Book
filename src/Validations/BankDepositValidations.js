import * as Yup from 'yup';

const BankDepositTypeValidations = Yup.object({
  type: Yup.string().required(`This field is required`),
  date: Yup.string().required('This field is required'),
  amount: Yup.string()
    .when("type", {
      is: (val) => val == 1 || val == 2,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),
  remaining_balance: Yup.string()
    .when("type", {
      is: (val) => val == 1 || val == 2,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),
  deposit_mode: Yup.string()
    .when("type", {
      is: (val) => val === 2,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),
  advance_receipt_no : Yup.string()
    .when("type", {
      is: (val) => val === 3,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),
  reason: Yup.string()
    .when("type", {
      is: (val) => val === 3,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),

})


export default BankDepositTypeValidations;