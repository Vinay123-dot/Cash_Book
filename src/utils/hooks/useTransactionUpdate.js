import {apiTerminalList} from "../../services/TransactionService";

function useTransactionUpdate() {
    

    const getTerminalList = async (values) => {
        try {
            const resp = await apiTerminalList(values)
            if (resp?.data?.status === 0) {
                return {
                    status: 'success',
                    data: resp?.data?.data,
                }
            } else {
                return {
                    status: 'failed',
                    message: resp.data?.message,
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message:
                    errors?.response?.data?.error?.errorMessage ||
                    errors.toString(),
            }
        }
    }

    
    return {
        getTerminalList
        
    }
}

export default useTransactionUpdate;