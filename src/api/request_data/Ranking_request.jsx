import request from '../request';
let host =
    window.location.origin == 'https://www.erbiescan.io'
        ? 'https://scanapi.erbie.io'
        : 'https://scanapi.erbie.io';
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
