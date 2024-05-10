import ApiServiceV2 from "./ApiServiceV2";
import ApiService from "./ApiService";
import axios from "axios";
import appConfig from "../configs/app.config";

const headers = {
    'Content-Type': 'application/json',
  };

export async function apiTerminalList() {
    return ApiServiceV2.fetchData({
        url: '/v1/mos/merchantTerminal',
        method: 'get',
    })
}

export async function apiGetBookTypeInfo(){
    
    return ApiServiceV2.fetchData({
        url: '/v21/master/get_BookTypeInfo',
        method: 'get',
    })
}
export async function apiGetCustomerTypeInfo(){
    
    return ApiServiceV2.fetchData({
        url: '/v21/master/get_CustomerType',
        method: 'get',
    })
}

export async function apiGetPaymentTypeInfo(){
    
    return ApiServiceV2.fetchData({
        url: '/v21/master/get_PaymentType',
        method: 'get',
    })
}
// export async function apiGetSalesTypeInfo(){
    
//     return ApiServiceV2.fetchData({
//         url: '/v21/master/get_SalesType',
//         method: 'get',
//     })
// }
export async function apiGetUPITypeInfo(){
    
    return ApiServiceV2.fetchData({
        url: '/v21/master/get_UPIType',
        method: 'get',
    })
}
export async function apiGetDepositModeInfo(){
    
    return ApiServiceV2.fetchData({
        url: '/v21/master/get_DepositMode',
        method: 'get',
    })
}
export async function apiGetDepositTypeInfo(){
    
    return ApiServiceV2.fetchData({
        url: '/v21/master/get_DepositType',
        method: 'get',
    })
}
export async function apiGetDayInfo(){
    return ApiServiceV2.fetchData({
        url: '/v21/master/get_DayInfo',
        method: 'get',
    })
}

export async function apiGetBankDepositInfo(){
    return ApiServiceV2.fetchData({
        url: '/v21/bank_deposit/get_BankDeposit',
        method: 'get',
    })
}

export async function apiGetTerminalList(){
    return ApiServiceV2.fetchData({
        url: '/v21/get_AAPTerminal`',
        method: 'get',
    })
}


export async function apiStoreBankDepositInfo(data){
    let url = `${appConfig.apiPrefix}/v21/bank_deposit/save_BankDeposit`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
    
}
export async function apiStoreDayBookInfo(data){

    let url = `${appConfig.apiPrefix}/v21/day_book/save_DayBook`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
}

export async function apiStorePettyCashInfo(data){
    let url = `${appConfig.apiPrefix}/v21/petty_cash/save_PettyCash`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
}



// export async function apiStoreDayBookInfo(data){
//     console.log("S",data)
//     return ApiServiceV2.fetchData({
//         url: '/v21/day_book/save_DayBook',
//         method: 'post',
//         data
//     })
// }

export async function apiStoreAdvancedBookInfo(data){
    return ApiServiceV2.fetchData({
        url: '/v21/advance_book/save_AdvancedBook',
        method: 'post',
        data
    })
}

// export async function apiVerifyAdvancedBookReceipt(data){
//     return ApiServiceV2.fetchData({
//         url: '/v21/advance_book/verify_advanceReceipt',
//         method: 'post',
//         data
//     })
// }
export async function apiVerifyAdvancedBookReceipt(data){
    const {key,id} = data;
    let url = `${appConfig.apiPrefix}/v21/advance_book/verify_advanceReceipt?key=${key}&Advanced_Receipt_No=${id}`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
}




export async function apiGetCommonOpeningBalance({uniqueId,date}){
  
    let url = `${appConfig.apiPrefix}/v21/opening_balance/common_opening_balance?input_date=${date}&key=${uniqueId}`;
    const response = await axios.get(url,{headers});
    return response.data;
}

export async function apiGetPettyCashCommonBalance({uniqueId,date}){
    let url = `${appConfig.apiPrefix}/v21/opening_balance/pettycash_opening_balance?input_date=${date}&key=${uniqueId}`;
    const response = await axios.get(url,{headers});
    return response.data;
}

export async function apiGetBookTypeServices(data) {
    const {book_type,history_type,terminal_id,key} = data;
    let url = `${appConfig.apiPrefix}/v21/book_type/view_BookData?book_type=${book_type}&history_type=${history_type}&key=${key}&terminal_id=${terminal_id}`;
    const response = await axios.get(url,{headers});
    return response;
}

export async function apiGetSalesTypeInfo(){
    let url = `${appConfig.apiPrefix}/v21/master/get_SalesType`;
    const response = await axios.get(url,{headers});
    return response;
 
}

// export async function apiGetTransactions(data) {
//     return ApiService.fetchData({
//         url: '/v1/mos/getTransactionHistory',
//         method: 'post',
//         data,
//     })
// }
// export async function apiGetTransactionHistory(data) {
//     return ApiService.fetchData({
//         url: '/v1/mos/transactionhistory',
//         method: 'post',
//         responseType: 'arraybuffer',
//         data,
//     })
// }

export async function apiGetTransactionHistory(values,Id){
    // let url = `${appConfig.apiPrefix}/v21/book_type/download_book?book_type=${values.book_type}&history_type=${values.history_type}&terminal_id=${Id}&key=${Id}`;
   let url = `https://web.rampeylabs.com/api/v21/book_type/download_book?book_type=DayBook&history_type=5&terminal_id=SF7DB8&key=SF7DB8`
    const response = await axios.get(url,
        { 
            headers,
        });
    return response;

}

export async function apiGetTerminal(id){
    let url = `${appConfig.apiPrefix}/v21/master/get_Terminal?key=${id}`;
    const response = await axios.get(url,{headers});
    return response.data;
}

// export async function apiGetBookTypeServices(data) {
//     return ApiService.fetchData({
//         url: '/v21/book_type/get_BookType',
//         method: 'get',
//         data,
//     })
// }

export async function apiCreateSession(data){
    let url = `${appConfig.apiPrefix}/v21/session/add_Session`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
}


