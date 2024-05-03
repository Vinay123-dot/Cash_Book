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

export async function apiStoreBankDepositInfo(data){
    let url = `${appConfig.apiPrefix}/v21/bank_deposit/save_BankDeposit`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
    
}
export async function apiStoreDayBookInfo(data){
    console.log("S",data)

    let url = `${appConfig.apiPrefix}/v21/day_book/save_DayBook`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
}

export async function apiStorePettyCashInfo(data){
    console.log("DATA",data);
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
    console.log("DATA",data);
    let url = `${appConfig.apiPrefix}/v21/advance_book/verify_advanceReceipt`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
}




export async function apiGetCommonOpeningBalance(){
    //   const data = {
    //     input_date: '2024-04-24',
    //   }; //Not working
    const date = '2024-04-24';
    let url = `${appConfig.apiPrefix}/v21/opening_balancecommon_opening_balance?input_date=${date}`;
    const response = await axios.get(url,{headers});
    return response.data;
}

export async function apiGetPettyCashCommonBalance(date){
    let url = `${appConfig.apiPrefix}/v21/opening_balance/pettycash_opening_balance?input_date=${date}`;
    const response = await axios.get(url,{headers});
    return response.data;
}

export async function apiGetBookTypeServices(data) {
    const {book_type,history_type} = data;
    let url = `${appConfig.apiPrefix}/v21/book_type/get_BookType?book_type=${book_type}&history_type=${history_type}`;
    const response = await axios.get(url,{headers});
    return response;
}

export async function apiGetSalesTypeInfo(){
    let url = `${appConfig.apiPrefix}/v21/master/get_SalesType`;
    const response = await axios.get(url,{headers});
    console.log("RES..",response)
    return response;
 
}

// export async function apiGetTransactions(data) {
//     return ApiService.fetchData({
//         url: '/v1/mos/getTransactionHistory',
//         method: 'post',
//         data,
//     })
// }

// export async function apiGetBookTypeServices(data) {
//     return ApiService.fetchData({
//         url: '/v21/book_type/get_BookType',
//         method: 'get',
//         data,
//     })
// }

