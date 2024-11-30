import * as Yup from 'yup';

const RequestBookValidations = Yup.object().shape({
    request_date: Yup.string().required('This field is required.'),
    book_type: Yup.string().required('This field is required.'),
    reason: Yup.string().required('This field is required.'),
    requested_by: Yup.string().required('This field is required.'),
});

export default RequestBookValidations;