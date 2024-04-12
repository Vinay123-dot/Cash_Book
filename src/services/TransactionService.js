import ApiServiceV2 from "./ApiServiceV2";
import ApiService from "./ApiService";

export async function apiTerminalList() {
    return ApiServiceV2.fetchData({
        url: '/v1/mos/merchantTerminal',
        method: 'get',
    })
}

export async function apiGetTransactions(data) {
    return ApiService.fetchData({
        url: '/v1/mos/getTransactionHistory',
        method: 'post',
        data,
    })
}