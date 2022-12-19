import HeaderApp_ls from './HeaderApp.less';
import { FaRegMoon } from 'react-icons/fa';
import { Link } from 'umi';
import { UnorderedListOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
export default function HeaderApp(props) {
    const [navigationicon, setNavigationicon] = useState(0);
    const [navigationheight, setNavigationheight] = useState('0px');
    PubSub.subscribe('pubsubNavigationdata', (msg, index) => {
        setNavigationicon(index.Navigationicon);
        setNavigationheight(index.Navigationheight);
    });
    useEffect(()=>{
        setNavigationheight('0px')
    },[props.props.location.pathname])
    return (
        <>
            <div className={HeaderApp_ls.HeaderAppbox}>
                <div className={HeaderApp_ls.HeaderAppbox_center}>
                    <Link
                        to={{ pathname: '/', state: '' }}
                        className={HeaderApp_ls.HeaderAppbox_logobox}
                    >
                        <img
                            src={require('../../assets/images/HeaderApp/logo.png')}
                        />
                        <span>Wormholes</span>
                    </Link>
                    <div className={HeaderApp_ls.HeaderAppbox_glbox}>
                        {/* <span><FaRegMoon /></span> */}
                        {/* <div></div> */}
                        {navigationicon == 0 ? (
                            <span
                                onClick={() => {
                                    setNavigationicon(1);
                                    setNavigationheight('392px');
                                }}
                            >
                                <UnorderedListOutlined />
                            </span>
                        ) : (
                            <span
                                onClick={() => {
                                    setNavigationicon(0);
                                    setNavigationheight('0px');
                                }}
                            >
                                <CloseOutlined />
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div
                className={HeaderApp_ls.Navigationbox}
                style={{ height: `${navigationheight}` }}
            >
                <Link
                    to={{ pathname: '/BlockChainApp', state: '' }}
                    className={HeaderApp_ls.Navigationbox_div}
                >
                    <div className={HeaderApp_ls.Navigationbox_divcenter}>
                        <span>BLOCKCHAIN</span>
                    </div>
                </Link>
                <Link
                    to={{ pathname: '/ValidatorApp', state: '' }}
                    className={HeaderApp_ls.Navigationbox_div}
                >
                    <div className={HeaderApp_ls.Navigationbox_divcenter}>
                        <span>VALIDATOR</span>
                    </div>
                </Link>
                <Link
                    to={{ pathname: '/AccountApp', state: '' }}
                    className={HeaderApp_ls.Navigationbox_div}
                >
                    <div className={HeaderApp_ls.Navigationbox_divcenter}>
                        <span>ACCOUNT</span>
                    </div>
                </Link>
                <Link
                    to={{ pathname: '/SNFTApp', state: '' }}
                    className={HeaderApp_ls.Navigationbox_div}
                >
                    <div className={HeaderApp_ls.Navigationbox_divcenter}>
                        <span>S-NFT</span>
                    </div>
                </Link>
                <Link
                    to={{ pathname: '/NFTApp', state: '' }}
                    className={HeaderApp_ls.Navigationbox_div}
                >
                    <div className={HeaderApp_ls.Navigationbox_divcenter}>
                        <span>NFT</span>
                    </div>
                </Link>
                <Link
                    to={{ pathname: '/ExchangeApp', state: '' }}
                    className={HeaderApp_ls.Navigationbox_div}
                >
                    <div className={HeaderApp_ls.Navigationbox_divcenter}>
                        <span>MARKETPLACE</span>
                    </div>
                </Link>
                <Link
                    to={{ pathname: '/TradeApp', state: '' }}
                    className={HeaderApp_ls.Navigationbox_div}
                >
                    <div className={HeaderApp_ls.Navigationbox_divcenter}>
                        <span>TRANSACT</span>
                    </div>
                </Link>
                <Link
                    to={{ pathname: '/rankingApp', state: '' }}
                    className={HeaderApp_ls.Navigationbox_div}
                >
                    <div className={HeaderApp_ls.Navigationbox_divcenter}>
                        <span>RANKINGS</span>
                    </div>
                </Link>
            </div>
        </>
    );
}
