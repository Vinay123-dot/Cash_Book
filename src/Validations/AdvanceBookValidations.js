import * as Yup from 'yup';

const AdvanceBookValidations = Yup.object().shape({
    date: Yup.string().required('This field is required.'),
    // receipt_no: Yup.string().required('This field is required.'),
    receipt_no: Yup.string()
    .required('This field is required.')
    .matches(/^[a-zA-Z0-9-_\/]+$/, 'Invalid receipt number. Only alphanumeric characters, dashes (-), underscores (_), and slashes (/) are allowed.'),
    customer_type: Yup.string().required('This field is required.'),
    customer_name : Yup.string().required('This field is required.'),
    phone_no : Yup.string()
                .required('This field is required.')
                .min(10, 'Please enter 10 digits only')
                .matches(/^[6-9]\d{9}$/, {
                    message: 'Please enter valid number.',
                    excludeEmptyString: false,
                }),
    bill_value: Yup.string()
                .required('This field is required')
                .test('is-positive', 'Amount must be greater than zero', value => {
                    return Number(value) > 0;
                }),
    // bill_value : Yup.string().required('This field is required.'),
});

export default AdvanceBookValidations;