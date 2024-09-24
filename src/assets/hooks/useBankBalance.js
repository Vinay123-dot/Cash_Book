import { useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';

import { 
    apiGetTestCommonOpeningBalance, 
    apiGetTestRemainingCashBalance, 
    apiGetTestPettyCashCommonBalance, 
    apiGetTestPettyCashRemainingBalance 
} from '../../services/TransactionService'; // Import your API functions
import { getToday } from '../../utils/dateFormatter';
import { 
    setCommonCashBalance,
    setRemainingCommonBalance,
    setPettyCashBalance,
    setPettyCashRemainingBalance, } from '../../QuickBook/store/stateSlice';
import { setMainPageLoader } from '../../QuickBook/store/dataSlice';




const useBankBalance = (uniqueId) => {

    const dispatch = useDispatch();
    const [allBalance,setAllBalance] = useState({
        mainBalance : 0 ,remBankBalance : 0
    });

    const getBankBalance = useCallback(async () => {
        try {
            console.log("BankBalance")
            dispatch(setMainPageLoader(true));
            const [openingBal, remBalance, pettyOpBal, pettyRembal] = await Promise.all([
                apiGetTestCommonOpeningBalance({ uniqueId, date: getToday() }),
                apiGetTestRemainingCashBalance({ uniqueId, date: getToday() }),
                apiGetTestPettyCashCommonBalance({ uniqueId, date: getToday() }),
                apiGetTestPettyCashRemainingBalance({ uniqueId, date: getToday() })
            ]);

            dispatch(setCommonCashBalance(openingBal?.data?.opening_balance));
            dispatch(setRemainingCommonBalance(remBalance?.data?.opening_balance));
            dispatch(setPettyCashBalance(pettyOpBal?.data?.opening_balance));
            dispatch(setPettyCashRemainingBalance(pettyRembal?.data?.opening_balance));

            // Optionally store balance data in local state
            setAllBalance({
                mainBalance: openingBal?.data?.opening_balance,
                remBankBalance: remBalance?.data?.opening_balance
            });

            dispatch(setMainPageLoader(false));
        } catch (e) {
            dispatch(setMainPageLoader(false));
        }
    }, [dispatch, uniqueId]);

    return {
        allBalance,
        getBankBalance
    };
};

export default useBankBalance;
