import request from '../request';
let host = 'https://api.wormholesscan.com';
// let host = 'http://43.132.176.185:3001'
//totals
export const totals = (data) => {
    return request.get(`${host}/totals`);
};
export const transactionPage = (data) => {
    return request.get(`${host}/transaction/page`, {
        params: {
            ...data,
        },
    });
};
export const transactionDetail = (data) => {
    return request.get(`${host}/transaction_logs/${data}`, {
        timeout: 80000,
    });
};
export const transaction = (data) => {
    return request.get(`${host}/transaction/${data}`, {});
};
export const chartTx = () => {
    return request.get(`${host}/chart/tx`, {});
};
export const recycle_tx = (data) => {
    return request.get(`${host}/snft/recycle_tx`, {
        params: {
            ...data,
        },
    });
};
