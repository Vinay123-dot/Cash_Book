import * as Yup from 'yup';

const PettyCashValidations = Yup.object().shape({
    date: Yup.string().required('This field is required.'),
    customer_type: Yup.string().required('This field is required.'),
    // bill_value: Yup.string().required('This field is required.'),
    bill_value: Yup.string()
                .required('This field is required')
                .test('is-positive', 'Amount must be greater than zero', value => {
                    return Number(value) > 0;
                }),
    party_code: Yup.string().when("customer_type", {
        is: (val) => val != 3,
        then: (schema) => schema.required('This field is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    party_name: Yup.string().required('This field is required.'),
});

export default PettyCashValidations;