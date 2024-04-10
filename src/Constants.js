const Options = [
    {
      value: '1',
      label: 'Not Identified',
    },
    {
      value: '2',
      label: 'Closed',
    },
    {
      value: '3',
      label: 'Communicated',
    },
    {
      value: '4',
      label: 'Identified',
    },
    {
      value: '5',
      label: 'Resolved',
    },
    {
      value: '6',
      label: 'Cancelled',
    },
  ];
const HeaderSelectOptions = [ 
  { value: 1,label: 'Day Book'},
  { value: 2,label: 'Advanced Book'},
  { value: 3,label: 'Petty Cash'},
  { value: 4,label: 'Bank Deposit'}
];


const DepositType = [
  { label: 'Withdrawal', value: 'w0' },
  { label: 'Deposit', value: 'd1' }
];
const DepostMode = [
  { label: 'Bank', value: 'dm0' },
  { label: 'Heade Office', value: 'dm1' }

]
const PERSIST_STORE_NAME = "quickBookRedux";
export {Options,HeaderSelectOptions,DepositType,DepostMode,PERSIST_STORE_NAME};