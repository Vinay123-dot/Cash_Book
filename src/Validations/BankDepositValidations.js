import * as Yup from 'yup';

const BankDepositTypeValidations = Yup.object({
  type: Yup.string().required(`This field is required`),
  date: Yup.string().required('This field is required'),
  amount: Yup.string()
    .when('type', {
      is: val => val == 1 || val == 2 || val == 3,
      then: schema => schema.required('This field is required')
            .test('is-positive', 'Amount must be greater than zero', value => {
                  return Number(value) > 0;
      }),
      otherwise: schema => schema.notRequired()
  }),
  remaining_balance: Yup.string()
    .when("type", {
      is: (val) => val == 1 || val == 2,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),
  deposit_mode: Yup.string()
    .when("type", {
      is: (val) => val == 2,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    receipt_type_id : Yup.string()
    .when("type", {
      is: (val) => val == 3,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),
  advance_receipt_no: Yup.string()
    .when(['type', 'return_type'], {
    is: (type, return_type) => type == 3 && return_type == 1,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),
  bill_number: Yup.string()
    .when(['type', 'return_type'], {
      is: (type, return_type) => type == 3 && return_type == 2,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),
  // store_id : Yup.string()
  //   .when("type", {
  //     is: (val) => val == 3,
  //     then: (schema) => schema.required('This field is required'),
  //     otherwise: (schema) => schema.notRequired()
  //   }),
  reason: Yup.string()
    .when("type", {
      is: (val) => val == 3,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    person_name : Yup.string()
    .when("type", {
      is: (val) => val == 5,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    person_mobile : Yup.string()
    .when("type", {
      is: (val) => val == 5,
      then: (schema) => schema.required('This field is required'),
      otherwise: (schema) => schema.notRequired()
    }),

})


export default BankDepositTypeValidations;