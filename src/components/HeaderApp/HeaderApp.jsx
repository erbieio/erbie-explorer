import HeaderApp_ls from './HeaderApp.less';
import { FaRegMoon } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { GoTriangleDown } from 'react-icons/go';
import { Link, history } from 'umi';
import { UnorderedListOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import { Select, message } from 'antd';
const { Option } = Select;
export default function HeaderApp(props) {
    const [navigationicon, setNavigationicon] = useState(0);
    const [navigationheight, setNavigationheight] = useState('0px');
    const handleChange = (value) => {};
    PubSub.subscribe('pubsubNavigationdata', (msg, index) => {
        setNavigationicon(index.Navigationicon);
        setNavigationheight(index.Navigationheight);
    });

    useEffect(() => {
        setNavigationheight('0px');
        setNavigationicon(0);
    }, [props.props.location.pathname]);
    //搜索按钮
    function homepageinputclick() {
        // location.reload()
        let data = document.getElementById('homepageinput').value;
        if (data) {
            if (
                Number(data) == data &&
                data.slice(0, 2) != '0x' &&
                data.slice(0, 2) != '0X'
            ) {
                localStorage.setItem('blocktext', JSON.stringify(data));
                //  location.reload()
                // 区块
                history.push({
                    pathname: '/NullPageApp',
                    state: {
                        blockid: data,
                    },
                });
            } else if (
                (data.slice(0, 2) == '0x' || data.slice(0, 2) == '0X') &&
                data.length == 42
            ) {
                //账户详情
                history.push({
                    pathname: `/AccountDetailApp/${data}`,
                    state: data,
                });
            } else if (
                (data.slice(0, 2) == '0x' || data.slice(0, 2) == '0X') &&
                data.length == 66
            ) {
                //交易hash
                history.push({
                    pathname: `/TradeDetailApp/${data}`,
                    state: data,
                });
            }
        } else {
            message.error('Cannot be empty！');
        }
    }
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
            {window.location.hash == '#/BlockChainApp' ||
            window.location.hash == '#/NFTApp' ||
            window.location.hash == '#/SNFTApp' ||
            window.location.hash == '#/ExchangeApp' ||
            window.location.hash == '#/TradeApp' ||
            window.location.hash == '#/rankingApp' ||
            window.location.hash == '#/ValidatorApp' ||
            window.location.hash == '#/AccountApp' ? (
                <div className={HeaderApp_ls.HeaderBox_SearchBox}>
                    <img
                        src={require('../../assets/images/Header/Search.png')}
                    />
                    <div
                        className={HeaderApp_ls.HeaderBox_SearchBox_inputBox}
                        id="headerselect"
                    >
                        <input
                            placeholder="Search by Address/Txn Hash/Block/Token"
                            className={
                                HeaderApp_ls.HeaderBox_SearchBox_inputBox_input
                            }
                            id="homepageinput"
                            autocomplete="off"
                        />
                    </div>
                    <div
                        className={HeaderApp_ls.HeaderBox_Search}
                        onClick={homepageinputclick}
                    >
                        <BsSearch />
                    </div>
                </div>
            ) : (
                ''
            )}
            {window.location.hash != '#/BlockChainApp' &&
            window.location.hash != '#/NFTApp' &&
            window.location.hash != '#/SNFTApp' &&
            window.location.hash != '#/ExchangeApp' &&
            window.location.hash != '#/TradeApp' &&
            window.location.hash != '#/rankingApp' &&
            window.location.hash != '#/ValidatorApp' &&
            window.location.hash != '#/' &&
            window.location.hash != '#/AccountApp' ? (
                <div className={HeaderApp_ls.HeaderBox_SearchBox}>
                    <div
                        className={HeaderApp_ls.HeaderBox_SearchBox_inputBox}
                        id="headerselect"
                        style={{ width: '293px' }}
                    >
                        <input
                            placeholder="Search by Address/Txn Hash/Block/Token"
                            className={
                                HeaderApp_ls.HeaderBox_SearchBox_inputBox_input
                            }
                            id="homepageinput"
                            style={{ width: '291px' }}
                            autocomplete="off"
                        />
                    </div>
                    <div
                        className={HeaderApp_ls.HeaderBox_Search}
                        onClick={homepageinputclick}
                    >
                        <BsSearch />
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
}
