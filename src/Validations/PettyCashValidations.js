import * as Yup from 'yup';

const PettyCashValidations = Yup.object().shape({
    seelctedDay: Yup.string().required('Day is required'),
    remAmount: Yup.string().required('Remaining Amount is required'),
    amount: Yup.string().required('Amount is required'),
    reason: Yup.string().required('Reason is required'),
});

export default PettyCashValidations;