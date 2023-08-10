import request from '../request';
let host = 'https://api.erbiescan.io';
// let host = 'http://43.132.176.185:3001'
//exchanger ranking
export const rankingExchanger = (data) => {
    return request.get(`${host}/ranking/exchanger`, {
        params: {
            ...data,
        },
    });
};
//snft ranking
export const rankingSnft = (data) => {
    return request.get(`${host}/ranking/snft`, {
        params: {
            ...data,
        },
    });
};
//nft ranking
export const rankingNft = (data) => {
    return request.get(`${host}/ranking/nft`, {
        params: {
            ...data,
        },
    });
};
