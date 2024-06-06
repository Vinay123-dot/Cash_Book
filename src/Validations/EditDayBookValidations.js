import * as Yup from 'yup';

const EditDayBookValidations = Yup.object().shape({
    Date : Yup.string().required('This field is required.'),
    Sales_Type :  Yup.string().required('This field is required.'),
    Bill_No : Yup.string().required('This field is required.'),
    Customer_Type: Yup.string().required('This field is required.'),
    Bill_Value: Yup.string().required('This field is required.'),
    Party_Code: Yup.string().when("customer_type", {
        is: (val) => val != 3,
        then: (schema) => schema.required('This field is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    Party_Name: Yup.string().required('This field is required.'),
});

export default EditDayBookValidations;