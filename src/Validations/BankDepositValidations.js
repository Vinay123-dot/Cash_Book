import * as Yup from 'yup';

const BankDepositTypeValidations = Yup.object({

  depositType: Yup.string().required(`Deposit type is required for`),
  date: Yup.string().required('Date is required'),
  amount: Yup.number().typeError("You must specify a number")
    .when("depositType", {
      is: (val) => val !== "2",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
    }),
  remAmount: Yup.number().typeError("You must specify a number")
    .when("depositType", {
      is: (val) => val !== "2",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
    }),
  depositMode: Yup.string().typeError("Field is required")
    .when("depositType", {
      is: (val) => val === "1",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
    }),
  receiptNumber: Yup.number().typeError("You must specify a number")
    .when("depositType", {
      is: (val) => val === "2",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
    }),
  resAmount: Yup.number().typeError("You must specify a number")
    .when("depositType", {
      is: (val) => val === "2",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
    }),
  reason: Yup.string().typeError("Field is required")
    .when("depositType", {
      is: (val) => val === "2",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
    }),

})

export default BankDepositTypeValidations;