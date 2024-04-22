import request from '../request';
let host =
    window.location.origin == 'https://www.erbiescan.io'
        ? 'https://scanapi.erbie.io'
        : 'https://scanapi.erbie.io';
// let host = 'http://43.132.176.185:3001'
//totals
export const totals = (data) => {
    return request.get(`${host}/stats`);
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
    return request.get(`${host}/transaction/erbie/${data}`);
};
export const nfttx = (data) => {
    return request.get(`${host}/transaction/erbie/${data}`);
};
