import * as Yup from 'yup';

const PettyCashValidations = Yup.object().shape({
    date: Yup.string().required('This field is required'),
    balance: Yup.string().required('This field is required'),
    amount: Yup.string().required('This field is required'),
    petty_cash_details: Yup.string().required('This field is required'),
});

export default PettyCashValidations;