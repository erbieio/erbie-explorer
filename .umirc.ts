import { defineConfig } from 'umi';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
let prodGzipList = ['js', 'css'];
export default defineConfig({
    chainWebpack: (config) => {
        // if (process.env.NODE_ENV === 'production') {
        // 生产模式开启
        config.plugin('compression-webpack-plugin').use(
            new CompressionWebpackPlugin({
                // 文件名称，这里我们不设置，让它保持和未压缩的文件同一个名称
                // filename: 'umi.js',
                algorithm: 'gzip', // 指定生成gzip格式
                test: new RegExp('\\.(' + prodGzipList.join('|') + ')$'), // 匹配哪些格式文件需要压缩
                threshold: 10240, //对超过10k的数据进行压缩
                minRatio: 0.4, // 压缩比例，值为0 ~ 1
                deleteOriginalAssets: false,
            }),
        );
        // }
    },
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
                { path: '/Validator', component: './Validator/Validator.jsx' },
                {
                    path: '/ValidatorApp',
                    component: './ValidatorApp/ValidatorApp.jsx',
                },
                { path: '/TestPage', component: './TestPage/TestPage.jsx' },
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
    fastRefresh: {},
    publicPath: './',
    runtimePublicPath: true,
    hash: true,
    links: [{ rel: 'ico', href: './src/assets/images/logo.ico' }],
    title: false,
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
});
