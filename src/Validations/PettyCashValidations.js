import * as Yup from 'yup';

const PettyCashValidations = Yup.object().shape({
    date: Yup.string().required('Day is required'),
    balance: Yup.string().required('Remaining Amount is required'),
    amount: Yup.string().required('Amount is required'),
    petty_cash_details: Yup.string().required('Reason is required'),
});

export default PettyCashValidations;