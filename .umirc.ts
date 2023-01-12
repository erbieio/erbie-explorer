import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    devServer: {
        port: 8080,
    },
    routes: [
        {
            path: '/',
            component: '@/pages/index',
            routes: [
                { path: '/', component: './HomePage/HomePage.jsx' },
                {
                    path: '/BlockChain',
                    component: './BlockChain/BlockChain.jsx',
                },
                { path: '/NFT', component: './NFT/NFT.jsx' },
                { path: '/NFTApp', component: './NFTApp/NFTApp.jsx' },
                { path: '/SNFT', component: './SNFT/SNFT.jsx' },
                { path: '/SNFTApp', component: './SNFTApp/SNFTApp.jsx' },
                { path: '/Exchange', component: './Exchange/Exchange.jsx' },
                {
                    path: '/ExchangeApp',
                    component: './ExchangeApp/Exchange.jsx',
                },
                {
                    path: '/BlockChain/BlockDetails',
                    component: './BlockDetails/BlockDetails.jsx',
                },
                {
                    path: '/BlockChain/BlackholeBlockDeta',
                    component: './BlackholeBlockDeta/BlackholeBlockDeta.jsx',
                },
                {
                    path: '/BlockChainApp/BlackholeBlockDetaApp',
                    component: './BlackholeBlockDetaApp/BlackholeBlockDetaApp.jsx',
                },
                {
                    path: '/BlockChainApp/BlockDetailsApp',
                    component: './BlockDetailsApp/BlockDetailsApp.jsx',
                },
                {
                    path: '/NFT/NFTDetails',
                    component: './NFTDetails/NFTDetails.jsx',
                },
                {
                    path: '/NFTApp/NFTDetailsApp',
                    component: './NFTDetailsApp/NFTDetailsApp.jsx',
                },
                {
                    path: '/SNFT/SNFTDetails',
                    component: './SNFTDetails/SNFTDetails.jsx',
                },
                {
                    path: '/SNFTApp/SNFTDetailsApp',
                    component: './SNFTDetailsApp/SNFTDetailsApp.jsx',
                },
                {
                    path: '/Exchange/ExchangeDetails',
                    component: './ExchangeDetails/ExchangeDetails.jsx',
                },
                {
                    path: '/ExchangeApp/ExchangeDetailsApp',
                    component: './ExchangeDetailsApp/ExchangeDetails.jsx',
                },
                { path: '/Validator', component: './Validator/Validator.jsx' },
                {
                    path: '/ValidatorApp',
                    component: './ValidatorApp/ValidatorApp.jsx',
                },
                { path: '/TestPage', component: './TestPage/TestPage.jsx' },
                { path: '/ranking', component: './Ranking/Ranking.jsx' },
                {
                    path: '/rankingApp',
                    component: './RankingApp/RankingApp.jsx',
                },
                {
                    path: '/exchangeRanking',
                    component: './ExchangeRanking/ExchangeRanking.jsx',
                },
                {
                    path: '/SNFTRanking',
                    component: './SNFTRanking/SNFTRanking.jsx',
                },
                {
                    path: '/NFTRanking',
                    component: './NFTRanking/NFTRanking.jsx',
                },
                {
                    path: '/Trade',
                    component: './Trade/Trade.jsx',
                },
                {
                    path: '/TradeApp',
                    component: './TradeApp/Trade.jsx',
                },
                {
                    path: '/TradeDetail/:id',
                    exact: true,
                    component: './TradeDetail/TradeDetail.jsx',
                },
                {
                    path: '/TradeDetailApp/:id',
                    exact: true,
                    component: './TradeDetailApp/TradeDetail.jsx',
                },
                {
                    path: `/AccountDetail/:id`,
                    exact: true,
                    component: './AccountDetail/AccountDetail.jsx',
                },
                {
                    path: `/AccountDetailApp/:id`,
                    exact: true,
                    component: './AccountDetailApp/AccountDetail.jsx',
                },
                {
                    path: '/NoSearchResults',
                    component: './NoSearchResults/NoSearchResults.jsx',
                },
                {
                    path: '/Account',
                    component: './Account/Account.jsx',
                },
                {
                    path: '/AccountApp',
                    component: './AccountApp/AccountApp.jsx',
                },
                {
                    path: '/BlockChainApp',
                    component: './BlockChainApp/BlockChainApp.jsx',
                },
                {
                    path: '/NullPage',
                    component: './NullPage/NullPage.jsx',
                },
                {
                    path: '/NullPageApp',
                    component: './NullPageApp/NullPageApp.jsx',
                },
            ],
        },
    ],
    proxy: {
        '/api': {
            target: 'https://www.wormholestest.com',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/api': '/api',
            },
        },
        '/ipfs': {
            target: 'https://www.wormholestest.com',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/ipfs': '/ipfs',
            },
        },
    },
    publicPath: './',
    runtimePublicPath: true,
    history: {
        type: 'hash',
    },
    hash: true,
    links: [
        // href的图片你可以放在public里面，直接./图片名.png 就可以了，也可以是cdn链接
        { rel: 'ico', href: './src/assets/images/logo.ico' },
    ],
    title: false,
});
