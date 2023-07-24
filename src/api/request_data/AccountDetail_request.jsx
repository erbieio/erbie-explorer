import request from '../request';
let host = 'https://api.wormholesscan.com';
// let host = 'http://43.132.176.185:3001'
//totals
export const totals = (data) => {
    return request.get(`${host}/totals`);
};
export const accountDetail = (data) => {
    return request.get(`${host}/account/${data}`);
};
export const nftPage = (data) => {
    return request.get(`${host}/nft_meta/page`, {
        params: {
            ...data,
        },
    });
};
export const snftPage = (data) => {
    return request.get(`${host}/snft_meta/page`, {
        params: {
            ...data,
        },
    });
};
export const transactionPage = (data) => {
    return request.get(`${host}/transaction/page`, {
        params: {
            ...data,
        },
    });
};
export const epochpage = (data) => {
    return request.get(`${host}/epoch`, {
        params: {
            ...data,
        },
    });
};
//creator详细账户查询
export const creatorAddressdetailed = (data) => {
    console.log(data);
    return request.get(`${host}/nft/tx/epoch`, {
        params: {
            ...data,
        },
    });
};
//账户stker以及validator查询
export const pledge = (data) => {
    return request.get(`${host}/pledge/page`, {
        params: {
            page: data.page,
            page_size: data.page_size,
            staker: data.staker,
            validator: data.validator,
        },
    });
};
