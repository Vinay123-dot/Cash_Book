import * as Yup from 'yup';

const BankDepositTypeValidations = Yup.object({

  type: Yup.string().required(`This field is required`),
  date: Yup.string().required('This field is required'),
  amount: Yup.number().typeError("This field is required")
    .when("type", {
      is: (val) => val == 1 || val == 2,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
    }),
  remaining_balance: Yup.number().typeError("This field is required")
    .when("type", {
      is: (val) => val == 1 || val == 2,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
    }),
  deposit_mode: Yup.string().typeError("This field is required")
    .when("type", {
      is: (val) => val === 2,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
    }),
  advance_receipt_no : Yup.number().typeError("This field is required")
    .when("type", {
      is: (val) => val === 3,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
    }),
  reason: Yup.string().typeError("This field is required")
    .when("type", {
      is: (val) => val === 3,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
    }),

})

export default BankDepositTypeValidations;