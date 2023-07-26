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
                { path: '/Staker', component: './Staker/Staker.jsx' },
                {
                    path: '/StakerApp',
                    component: './StakerApp/Staker.jsx',
                },
                {
                    path: '/BlockDetails',
                    component: './BlockDetails/BlockDetails.jsx',
                },
                {
                    path: '/BlackholeBlockDeta',
                    component: './BlackholeBlockDeta/BlackholeBlockDeta.jsx',
                },
                {
                    path: '/BlackholeBlockDetaApp',
                    component:
                        './BlackholeBlockDetaApp/BlackholeBlockDetaApp.jsx',
                },
                {
                    path: '/BlockDetailsApp',
                    component: './BlockDetailsApp/BlockDetailsApp.jsx',
                },
                {
                    path: '/NFTDetails',
                    component: './NFTDetails/NFTDetails.jsx',
                },
                {
                    path: '/NFTDetailsApp',
                    component: './NFTDetailsApp/NFTDetailsApp.jsx',
                },
                {
                    path: '/SNFTDetails',
                    component: './SNFTDetails/SNFTDetails.jsx',
                },
                {
                    path: '/SNFTDetailsApp',
                    component: './SNFTDetailsApp/SNFTDetailsApp.jsx',
                },
                {
                    path: '/StakerDetails',
                    component: './StakerDetails/StakerDetails.jsx',
                },
                {
                    path: '/StakerDetailsApp',
                    component: './StakerDetailsApp/StakerDetails.jsx',
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
                    path: '/StakerRanking',
                    component: './StakerRanking/StakerRanking.jsx',
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
                    path: '/TradeDetail',
                    exact: true,
                    component: './TradeDetail/TradeDetail.jsx',
                },
                {
                    path: '/TradeDetailApp',
                    exact: true,
                    component: './TradeDetailApp/TradeDetail.jsx',
                },
                {
                    path: `/AccountDetail`,
                    exact: true,
                    component: './AccountDetail/AccountDetail.jsx',
                },
                {
                    path: `/AccountDetailApp`,
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
                {
                    path: '/MapBs',
                    component: './MapBs/MapBs.jsx',
                },
                {
                    path: '/MapBs2',
                    component: './MapBs2/MapBs2.jsx',
                },
                {
                    path: '/Creator',
                    component: './Creator/Creator.jsx',
                },
                {
                    path: '/CreatorApp',
                    component: './CreatorApp/CreatorApp.jsx',
                },
                {
                    path: '/PrivacyNotice',
                    component: './PrivacyNotice/PrivacyNotice.jsx',
                },
                {
                    path: '/PrivacyNoticeApp',
                    component: './PrivacyNoticeApp/PrivacyNoticeApp.jsx',
                },
                {
                    path: '/TermsOfServiceApp',
                    component: './TermsOfServiceApp/TermsOfServiceApp.jsx',
                },
                {
                    path: '/TermsOfService',
                    component: './TermsOfService/TermsOfService.jsx',
                },
                {
                    path: '/NoNetwork',
                    component: './NoNetwork/NoNetwork.jsx',
                },
                {
                    path: '/EmptyPage',
                    component: './EmptyPage/EmptyPage.jsx',
                },
            ],
        },
    ],
    dva: {
        immer: true,
    },
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
            target: 'http://192.168.1.235:9006/',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/ipfs': '/ipfs',
            },
        },
        '/v1': {
            target: 'http://192.168.1.235:18081',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/v1': '/v1',
            },
        },
    },
    fastRefresh: {},
    publicPath: './',
    runtimePublicPath: true,
    // history: {
    //     type: 'hash',
    // },
    // hash: true,
    links: [
        // href的图片你可以放在public里面，直接./图片名.png 就可以了，也可以是cdn链接
        { rel: 'ico', href: './src/assets/images/logo.ico' },
    ],
    title: false,
});
