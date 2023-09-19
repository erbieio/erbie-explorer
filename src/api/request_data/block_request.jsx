import request from '../request';
// let host = 'https://api.erbiescan.io';
let host =
    window.location.origin == 'https://www.erbiescan.io'
        ? 'https://api.erbiescan.io'
        : 'http://43.129.181.130:3001';
let host2 =
    window.location.origin == 'https://www.erbiescan.io'
        ? 'https://snft.erbie.io/nftscan'
        : 'http://192.168.1.235:9006/nftscan';
console.log(window.location);
//erb价格查询
export const erbprice = () => {
    return request.get(`${host}/erb_price`);
};
//总数查询
export const total = () => {
    return request.get(`${host}/stats`);
};
//查询系统NFT周期
export const epoch = () => {
    return request.get(`${host}/epoch/current`);
};
//区块查询
export const block = (data) => {
    return request.get(`${host}/block/page`, {
        params: {
            page: data.page,
            page_size: data.page_size,
            filter: data.filter,
        },
    });
};
//单个区块查询
export const soloblock = (data) => {
    return request.get(`${host}/block/${data}`);
};
//单个区块交易列表查询
export const slashings = (data) => {
    return request.get(`${host}/slashings`, {
        params: {
            page: data.page,
            page_size: data.page_size,
            address: data.address,
            number: data.number,
            reason: data.reason,
        },
    });
};
export const soloblocktransaction = (data) => {
    return request.get(`${host}/transaction/page`, {
        params: {
            page: data.page,
            page_size: data.page_size,
            number: data.number,
        },
    });
};
//奖励人查询
export const rewardperson = () => {
    return request.get(`${host}/reward`, {
        params: {
            page: 1,
            page_size: 11,
        },
    });
};
// 区块奖励人查询
export const blockrewardperson = (data) => {
    return request.get(`${host}/reward/${data}`);
};

//NFT查询
export const nft = (data) => {
    return request.get(`${host}/nft/page`, {
        params: {
            exchanger: data.exchanger,
            owner: data.owner,
            collection_id: data.collection_id,
            page: data.page,
            page_size: data.page_size,
        },
    });
};
//SNFT查询
export const snft = (data) => {
    return request.get(`${host}/snft_meta/page`, {
        params: {
            collection_id: data.collection_id,
            owner: data.owner,
            page: data.page,
            page_size: data.page_size,
            exchanger: data.exchanger,
        },
    });
};
//NFT详情查询
export const nftdetails = (data) => {
    return request.get(`${host}/nft/${data}`);
};
//SNFT详情查询
export const snftdetails = (data) => {
    return request.get(`${host}/snft/${data}`);
};
//SNFT、NFT交易历史查询
export const snft_nft_tx = (data) => {
    return request.get(`${host}/transaction/erbie/page`, {
        params: {
            address: data.address,
            exchanger: data.exchanger,
            account: data.account,
            page: data.page,
            page_size: data.page_size,
        },
    });
};
//meta查询
export const metainformation = (data) => {
    return request.get(`${data}`);
    // return request.get(`${host}${data}`)
};
//交易所查询
export const exchanger = (data) => {
    return request.get(`${host}/staker/page`, {
        params: {
            name: data.name,
            page: data.page,
            page_size: data.page_size,
            order: data.order,
        },
    });
};
//单个交易所查询
export const soloexchanger = (data) => {
    return request.get(`${host}/staker/${data}`);
};
//交易所柱状图查询
export const exchangermap = (data) => {
    return request.get(`${host}/staker/tx_count/${data}`);
};
//首页折线图查询
export const homepagechart = () => {
    return request.get(`${host}/chart/line`);
};
//NFT折线图查询
export const nftchart = () => {
    return request.get(`${host}/chart/nft`);
};
//validators查询
export const validators = (data) => {
    return request.get(`${host}/validator/page`, {
        params: {
            order: data.order,
            page: data.page,
            page_size: data.page_size,
        },
    });
};
//地图数据
export const locations = () => {
    return request.get(`${host}/validator/locations`);
};
//地图fromto数据
export const lastmsg = () => {
    return request.get(`${host}/validator/last_msg`);
};
//account查询
export const accounts = (data) => {
    return request.get(`${host}/account/page`, {
        params: {
            order: data.order,
            page: data.page,
            page_size: data.page_size,
        },
    });
};
// 在线验证者查询
export const onlineAddr = () => {
    return request.get(`https://www.erbiescan.io/upload/onlineAddr.json`);
};
//creator查询
export const creator = (data) => {
    return request.get(`${host}/creator/page`, {
        params: {
            page: data.page,
            page_size: data.page_size,
            order: data.order,
        },
    });
};
//creator柱状图查询
export const creatorHistogram = () => {
    return request.get(`${host}/creator/top`, {
        params: {
            size: 7,
        },
    });
};
//creator账户查询
export const creatorAddress = (data) => {
    return request.get(`${host}/creator`, {
        params: {
            addr: data,
        },
    });
};
// snft图片查询
export const snftimageaddress = (data) => {
    // console.log(data);
    return request.post(`${host2}/v1/getIpfsHash`, {
        body: JSON.stringify({
            nftaddr: data,
        }),
    });
};
