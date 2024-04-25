import * as Yup from 'yup';

const AdvanceBookValidations = Yup.object().shape({
    receiptNum: Yup.string().required('Receipt Number is required'),
    date: Yup.string().required('Date is required'),
    depositMode: Yup.string().required('Deposit Mode is required'),
    customerName: Yup.string().required('Customer Name is required'),
    customerMobileNumber: Yup.string().required('Customer MobileNumber is required'),
    remAmount: Yup.string().required('Remaining amout is required'),
    depositType: Yup.string().required('Deposit type is required'),
});

export default AdvanceBookValidations;