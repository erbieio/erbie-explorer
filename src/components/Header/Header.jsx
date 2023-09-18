import Header_ls from './Header.less';
import { FaRegMoon } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { GoTriangleDown } from 'react-icons/go';
import { Select, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { history, Link } from 'umi';
const { Option } = Select;
export default function Header() {
    const handleChange = (value) => {};
    const [messageApi, contextHolder] = message.useMessage();
    // const params = window.location.search;
    useEffect(() => {
        if (window.location.pathname) {
            console.log(window.location.pathname);
        }
    }, [window.location.pathname]);
    //搜索按钮
    function homepageinputclick() {
        let data = document.getElementById('homepageinput').value;
        if (data) {
            if (
                Number(data) == data &&
                data.slice(0, 2) != '0x' &&
                data.slice(0, 2) != '0X'
            ) {
                // 区块
                history.push({
                    pathname: '/NullPage',
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
                    pathname: `/AccountDetail`,
                    state: data,
                });
            } else if (
                (data.slice(0, 2) == '0x' || data.slice(0, 2) == '0X') &&
                data.length == 66
            ) {
                //交易hash
                history.push({
                    pathname: `/TradeDetail`,
                    state: data,
                });
            }
        } else {
            message.open({
                type: 'error',
                content: 'Cannot be empty！',
            });
        }
    }
    return (
        <>
            {contextHolder}
            <div className={Header_ls.HeaderBox}>
                {/* logo */}
                <Link
                    to={{ pathname: '/', state: '' }}
                    className={Header_ls.HeaderBox_logoBox}
                >
                    <img
                        src={require('../../assets/images/Header/whiteLogo.png')}
                    />
                    <span className={Header_ls.HeaderBox_logoBox_name}>
                        Erbie
                    </span>
                </Link>
                {/* 导航 */}
                <div className={Header_ls.HeaderBox_navigationBox}>
                    <Link
                        to={{ pathname: '/BlockChain', state: '' }}
                        style={{
                            backgroundColor:
                                window.location.pathname == '/BlockChain'
                                    ? '#fe4fa7'
                                    : '',
                        }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        BLOCKCHAIN
                    </Link>
                    <Link
                        to={{ pathname: '/Validator', state: '' }}
                        style={{
                            backgroundColor:
                                window.location.pathname == '/Validator'
                                    ? '#fe4fa7'
                                    : '',
                        }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        VALIDATOR
                    </Link>
                    <Link
                        to={{ pathname: '/Staker', state: '' }}
                        style={{
                            backgroundColor:
                                window.location.pathname == '/Staker'
                                    ? '#fe4fa7'
                                    : '',
                        }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        STAKER
                    </Link>
                    <Link
                        to={{ pathname: '/Creator', state: '' }}
                        style={{
                            backgroundColor:
                                window.location.pathname == '/Creator'
                                    ? '#fe4fa7'
                                    : '',
                        }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        CREATOR
                    </Link>
                    <Link
                        to={{ pathname: '/Account', state: '' }}
                        style={{
                            backgroundColor:
                                window.location.pathname == '/Account'
                                    ? '#fe4fa7'
                                    : '',
                        }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        ACCOUNT
                    </Link>
                    <Link
                        to={{ pathname: '/NFT', state: '' }}
                        style={{
                            backgroundColor:
                                window.location.pathname == '/NFT'
                                    ? '#fe4fa7'
                                    : '',
                        }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        NFT
                    </Link>
                    <Link
                        to={{ pathname: '/SNFT', state: '' }}
                        style={{
                            backgroundColor:
                                window.location.pathname == '/SNFT'
                                    ? '#fe4fa7'
                                    : '',
                        }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        SNFT
                    </Link>
                    <Link
                        to={{ pathname: '/Trade', state: '' }}
                        style={{
                            backgroundColor:
                                window.location.pathname == '/Trade'
                                    ? '#fe4fa7'
                                    : '',
                        }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        TRANSACT
                    </Link>
                </div>
            </div>
            {window.location.pathname == '/BlockChain' ||
            window.location.pathname == '/NFT' ||
            window.location.pathname == '/SNFT' ||
            window.location.pathname == '/Staker' ||
            window.location.pathname == '/Trade' ||
            window.location.pathname == '/ranking' ||
            window.location.pathname == '/Validator' ||
            window.location.pathname == '/Account' ||
            window.location.pathname == '/Creator' ? (
                <div className={Header_ls.HeaderBox_SearchBox}>
                    <img
                        src={require('../../assets/images/Header/Search.png')}
                    />
                    <div
                        className={Header_ls.HeaderBox_SearchBox_inputBox}
                        id="headerselect"
                    >
                        <input
                            placeholder="Search by Address / Txn Hash / Block / Token"
                            className={
                                Header_ls.HeaderBox_SearchBox_inputBox_input
                            }
                            id="homepageinput"
                            autocomplete="off"
                        />
                        <div
                            className={Header_ls.HeaderBox_Search}
                            onClick={homepageinputclick}
                        >
                            <BsSearch />
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
}
