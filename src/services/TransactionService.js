import ApiServiceV2 from "./ApiServiceV2";
import axios from "axios";
import appConfig from "../configs/app.config";
import { getToday,getDaybeforeYesterday } from "../utils/dateFormatter";

const headers = {
    'Content-Type': 'application/json',
  };
const excelHeader = {
    'Content-Type': 'multipart/form-data',
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

export async function apiGetReturnType(){
    return ApiServiceV2.fetchData({
        url: '/v21/master/get_Bank_Deposit_Order_Cancel_Receipt_Types',
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

export async function apiStorePaymentCollectionInfo(data){

    let url = `${appConfig.apiPrefix}/v21/payment_collection/save_PaymentCollection`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
}

export async function apiStorePettyCashInfo(data){
    let url = `${appConfig.apiPrefix}/v21/petty_cash/save_PettyCash`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
};

export async function apiSaveRequestBook(data) {
    let url = `${appConfig.apiPrefix}/v21/request_book/save_RequestBook`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
}

export const apiVerifyReturnOrder = async(data) => {
    console.log("d",data)
    let url = `${appConfig.apiPrefix}/v21/day_book/verify_daybook?key=${data.key}&Bill_No=${data.Bill_No}`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
};



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
    let url = `${appConfig.apiPrefix}/v21/opening_balance/pettycash_opening_balance?key=${uniqueId}&input_date=${date}`;
    const response = await axios.get(url,{headers});
    return response.data;
}
export async function apiGetRemainingCashBalance({uniqueId}){
    let url = `${appConfig.apiPrefix}/v21/opening_balance/common_remaining_balance?key=${uniqueId}`;
    const response = await axios.get(url,{headers});
    return response.data;
}
export async function apiGetPettyCashRemainingBalance({uniqueId}){
    let url = `${appConfig.apiPrefix}/v21/opening_balance/pettycash_remaining_balance?key=${uniqueId}`;
    const response = await axios.get(url,{headers});
    return response.data;
}

export  function apiGetTestCommonOpeningBalance({uniqueId,date}){
  
    let url = `${appConfig.apiPrefix}/v21/opening_balance/common_opening_balance?input_date=${date}&key=${uniqueId}`;
    return axios.get(url,{headers});
}

export function apiGetTestPettyCashCommonBalance({uniqueId,date}){
    let url = `${appConfig.apiPrefix}/v21/opening_balance/pettycash_opening_balance?key=${uniqueId}&input_date=${date}`;
    return axios.get(url,{headers});
   
}
export  function apiGetTestRemainingCashBalance({uniqueId}){
    let url = `${appConfig.apiPrefix}/v21/opening_balance/common_remaining_balance?key=${uniqueId}`;
    return axios.get(url,{headers});
}
export  function apiGetTestPettyCashRemainingBalance({uniqueId}){
    let url = `${appConfig.apiPrefix}/v21/opening_balance/pettycash_remaining_balance?key=${uniqueId}`;
    return axios.get(url,{headers});
}

export async function apiGetBookTypeServices(data) {
    const {book_type,history_type,terminal_id,key,fromDate,toDate,filter_value} = data;
    let hType = 0
    let url ;
    if(!fromDate && !toDate){
        
        url = `${appConfig.apiPrefix}/v21/book_type/view_BookData?book_type=${book_type}&history_type=${history_type}&key=${key}&terminal_id=${terminal_id}`;
    }else {
        url = `${appConfig.apiPrefix}/v21/book_type/view_BookData?book_type=${book_type}&history_type=${hType}&key=${key}&terminal_id=${terminal_id}&start_date=${fromDate}&end_date=${toDate}`;
    }
    if(filter_value){
        url = `${url}&filter_value=${filter_value}`
    }

    const response = await axios.get(url,{headers});
    return response;
}

export async function apiGetDayBookExcelData(data) {
    const {terminal_id,key,fromDate,toDate} = data;
    let history_type = 0;
    // let startDate = getDaybeforeYesterday();
    // let endDate = getToday();
    let url = `${appConfig.apiPrefix}/v21/day_book/get_dayBook?history_type=${history_type}&key=${key}&terminal_id=${terminal_id}&start_date=${fromDate}&end_date=${toDate}`;
    const response = await axios.get(url,{headers});
    return response;
}

export async function apiGetSalesTypeInfo(){
    let url = `${appConfig.apiPrefix}/v21/master/get_SalesType`;
    const response = await axios.get(url,{headers});
    return response;
 
}

export async function apiUploadDayBookExcel(data) {
    let url = `${appConfig.apiPrefix}/v21/day_book/upload_DayBook`;
    const response = await axios.post(url,data,{excelHeader});
    return response;
}


// export async function apiGetTransactionHistory(values,Id){
//     // let url = `${appConfig.apiPrefix}/v21/book_type/download_book?book_type=${values.book_type}&history_type=${values.history_type}&terminal_id=${Id}&key=${Id}`;
//    let url = `https://web.rampeylabs.com/api/v21/book_type/download_book?book_type=DayBook&history_type=5&terminal_id=SF7DB8&key=SF7DB8`
//     const response = await axios.get(url,
//         { 
//             headers,
//         });
//     return response;

// }

export async function apiGetTerminal(id){
    let url = `${appConfig.apiPrefix}/v21/master/get_Terminal?key=${id}`;
    const response = await axios.get(url,{headers});
    return response.data;
}

export async function apiGetPettyCashReason(id){
    let url = `${appConfig.apiPrefix}/v21/master/get_PettyCashReason?key=${id}`;
    const response = await axios.get(url,{headers});
    return response.data;
}



export async function apiCreateSession(data){
    let url = `${appConfig.apiPrefix}/v21/session/add_Session`;
    const response = await axios.post(url,JSON.stringify(data),{headers});
    return response.data;
};

export async function apiDeleteDayBook(data){
    let url = `${appConfig.apiPrefix}/v21/day_book/delete_DayBook`;
    const response = await axios.delete(url,{
        data,
        headers
    });
    return response;
}

export async function apiDeleteAdvanceBook(data){
    let url = `${appConfig.apiPrefix}/v21/advance_book/delete_AdvancedBook`;
    const response = await axios.delete(url,{
        data,
        headers
    });
    return response;
}

export async function apiDeletePaymentModal(data){
    let url = `${appConfig.apiPrefix}/v21/payment_collection/delete_PaymentCollection`;
    const response = await axios.delete(url,{
        data,
        headers
    });
    return response;
}

export async function apiDeleteBankDeposit(data){
    let url = `${appConfig.apiPrefix}/v21/bank_deposit/delete_BankDeposit`;
    const response = await axios.delete(url,{
        data,
        headers
    });
    return response;
}

export async function apiDeletePettyCash(data){
    let url = `${appConfig.apiPrefix}/v21/petty_cash/delete_pettycash`;
    const response = await axios.delete(url,{
        data,
        headers
    });
    return response;
};


export async function apiGetRequestHistory(data) {
    const { terminal_id,key,history_type = 5,book_name,fromDate,toDate } = data;
    
    let tempUrl = `${appConfig.apiPrefix}/v21/request_book/get_RequestBook?book_type=${book_name}&key=${key}&terminal_id=${terminal_id}`
    let url;
    if(!fromDate || !toDate){
        url = `${tempUrl}&history_type=${history_type}`
    }else{
        url = `${tempUrl}&history_type=${0}&fromDate=${fromDate}&toDate=${toDate}`;
    }
    const response = await axios.get(url,{headers});
    return response;
};

export async function apiDeleteRequestBook(data){
    let url = `${appConfig.apiPrefix}/v21/request_book/delete_RequestBook`;
    const response = await axios.delete(url,{
        data,
        headers
    });
    return response;
};

export async function apiGetPaymentHistory(data) {
    const { terminal_id,key,history_type = 0,party_code,fromDate,toDate } = data;
    let tempUrl = `${appConfig.apiPrefix}/v21/day_book/get_dayBook_partycode?party_code=${party_code}&key=${key}&terminal_id=${terminal_id}`
    let url;
    if(!fromDate || !toDate){
        url = `${tempUrl}&history_type=${history_type}`
    }else{
        url = `${tempUrl}&history_type=${0}&start_date=${fromDate}&end_date=${toDate}`;
    }
    const response = await axios.get(url,{headers});
    return response;
};


