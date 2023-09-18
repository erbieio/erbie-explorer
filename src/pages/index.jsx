import styles from './index.less';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HeaderApp from '../components/HeaderApp/HeaderApp';
import HomePageApp from './HomePageApp/HomePageApp';
import FooterApp from '../components/FooterApp/FooterApp';
import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'umi';
import { message } from 'antd';
const params = window.location.search;
export default function IndexPage(props) {
    const [messageApi, contextHolder] = message.useMessage();
    message.config({
        duration: 3,
        maxCount: 1,
    });
    useEffect(() => {
        message.destroy('sds');
        if (document.getElementsByClassName('ant-message-notice')[0]) {
            document.getElementsByClassName('ant-message-notice')[0].remove();
        }

        document.body.scrollTop = document.documentElement.scrollTop = 0;
        if (props.location.pathname != '/') {
            var i = 0;
            var highestTimeoutId = setTimeout(';');
            for (var i = 0; i < highestTimeoutId; i++) {
                clearTimeout(i);
            }
        }
    }, [props.location.pathname]);
    const getDevice = () => {
        let agent = navigator.userAgent.toLowerCase();
        // message.error(agent);
        let result = {
            device: (function () {
                if (/windows/.test(agent)) {
                    return 'pc';
                } else if (/iphone|ipod/.test(agent) && /mobile/.test(agent)) {
                    return 'mobilemove';
                } else if (/ipad/.test(agent) && /mobile/.test(agent)) {
                    return 'mobilemove';
                } else if (/android/.test(agent)) {
                    return 'mobile';
                } else if (/linux/.test(agent)) {
                    return 'pc';
                } else if (/mac/.test(agent)) {
                    return 'pc';
                } else {
                    return 'pc';
                }
            })(),
        };
        return result;
    };
    //导航收缩
    function pubsubclick() {
        PubSub.publish('pubsubNavigationdata', {
            Navigationicon: 0,
            Navigationheight: '0px',
        });
    }
    return (
        <>
            {contextHolder}
            <Helmet encodeSpecialCharacters={false}>
                <meta charSet="utf-8" />
                <title>Erbie Blockchain Explorer</title>
                <link
                    rel="shortcut ico"
                    href="../assets/images/logo.ico"
                    type="images/ico"
                />
                <script
                    type="text/javascript"
                    src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=b7zlNRGt9jMR0MrCk3tGldiREpd5Wi6Q"
                ></script>
            </Helmet>
            {getDevice().device == 'pc' ? (
                <div
                    className={
                        props.location.pathname == '/'
                            ? styles.IndexPageBox
                            : props.location.pathname == '/BlockDetails' ||
                              props.location.pathname ==
                                  '/BlackholeBlockDeta' ||
                              props.location.pathname == '/NFTDetails' ||
                              props.location.pathname == '/SNFTDetails' ||
                              props.location.pathname == '/StakerDetails' ||
                              props.location.pathname.split('/')[1] ==
                                  'TradeDetail' ||
                              props.location.pathname.split('/')[1] ==
                                  'AccountDetail' ||
                              props.location.pathname == '/ComingSoon404'
                            ? styles.IndexPageBox1
                            : styles.IndexPageBox2
                    }
                >
                    <Header></Header>
                    <div className={styles.IndexPageBox_d}>
                        {props.location.pathname == '/BlockChain' ||
                        props.location.pathname == '/NFT' ||
                        props.location.pathname == '/SNFT' ||
                        props.location.pathname == '/Staker' ||
                        props.location.pathname == '/Trade' ||
                        props.location.pathname == '/ranking' ||
                        props.location.pathname == '/Validator' ||
                        props.location.pathname == '/Creator' ? (
                            <img
                                className={styles.IndexPageBox_img}
                                src={require('../assets/images/HomePage/4.png')}
                            />
                        ) : (
                            ''
                        )}
                        {props.children}
                    </div>
                    <Footer></Footer>
                    {props.location.pathname == '/' ? (
                        <img
                            className={styles.indexBoximg}
                            src={require('../assets/images/HomePage/back.png')}
                        />
                    ) : (
                        ''
                    )}
                </div>
            ) : (
                <div className={styles.IndexPageBoxApp}>
                    <HeaderApp props={props} />
                    <div
                        className={styles.IndexPageBox_d}
                        onClick={pubsubclick}
                    >
                        {props.location.pathname == '/BlockChainApp' ||
                        props.location.pathname == '/NFTApp' ||
                        props.location.pathname == '/SNFTApp' ||
                        props.location.pathname == '/StakerApp' ||
                        props.location.pathname == '/TradeApp' ||
                        props.location.pathname == '/rankingApp' ||
                        (props.location.pathname == '/ValidatorApp' &&
                            props.location.pathname != '/') ? (
                            <img
                                className={styles.IndexPageBox_imgApp}
                                src={require('../assets/images/HomePage/4.png')}
                            />
                        ) : props.location.pathname != '/' ? (
                            <img
                                className={styles.IndexPageBox_imgApp}
                                src={require('../assets/images/HomePage/background2.png')}
                            />
                        ) : (
                            ''
                        )}
                        {props.location.pathname == '/' ? (
                            <HomePageApp />
                        ) : (
                            props.children
                        )}
                    </div>
                    <FooterApp />
                    {props.location.pathname == '/' ? (
                        <img
                            className={styles.indexBoximgphone}
                            src={require('../assets/images/HomePageApp/phone.png')}
                        />
                    ) : (
                        ''
                    )}
                </div>
            )}
        </>
    );
}
