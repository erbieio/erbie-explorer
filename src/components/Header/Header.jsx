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
    // const params = window.location.search;
    useEffect(() => {}, []);
    //路由跳转
    function handleClick(e) {
        if (e == 'Ranking') {
            history.push('/ranking');
        } else if (e == 'exchangeRanking') {
            history.push('/exchangeRanking');
        } else if (e == 'SNFTRanking') {
            history.push('/SNFTRanking');
        } else if (e == 'NFTRanking') {
            history.push('/NFTRanking');
        } else if (e == 'Trade') {
            history.push('/Trade');
        }
    }
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
                    pathname: `/AccountDetail/${data}`,
                    state: data,
                });
            } else if (
                (data.slice(0, 2) == '0x' || data.slice(0, 2) == '0X') &&
                data.length == 66
            ) {
                //交易hash
                history.push({
                    pathname: `/TradeDetail/${data}`,
                    state: data,
                });
            }
        } else {
            message.error('Cannot be empty！');
        }
    }
    return (
        <>
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
                        Wormholes
                    </span>
                </Link>
                {/* 导航 */}
                <div className={Header_ls.HeaderBox_navigationBox}>
                    <Link
                        to={{ pathname: '/BlockChain', state: '' }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        BLOCKCHAIN
                    </Link>
                    <Link
                        to={{ pathname: '/Validator', state: '' }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        VALIDATOR
                    </Link>
                    <Link
                        to={{ pathname: '/Account', state: '' }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        ACCOUNT
                    </Link>
                    <Link
                        to={{ pathname: '/SNFT', state: '' }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        S-NFT
                    </Link>
                    <Link
                        to={{ pathname: '/NFT', state: '' }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        NFT
                    </Link>
                    <Link
                        to={{ pathname: '/Exchange', state: '' }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        MARKETPLACE
                    </Link>
                    <Link
                        to={{ pathname: '/Trade', state: '' }}
                        className={Header_ls.HeaderBox_navigationBox_text}
                    >
                        TRANSACT
                    </Link>
                    <p className={Header_ls.HeaderBox_navigationBox_text}>
                        <span onClick={handleClick.bind(this, 'Ranking')}>
                            RANKINGS
                        </span>
                    </p>
                </div>
                {/* 模式切换 */}
                {/* <div className={Header_ls.HeaderBox_patternBox}> */}
                {/* <FaRegMoon /> */}
                {/* </div> */}
            </div>
            {window.location.hash == '#/BlockChain' ||
            window.location.hash == '#/NFT' ||
            window.location.hash == '#/SNFT' ||
            window.location.hash == '#/Exchange' ||
            window.location.hash == '#/Trade' ||
            window.location.hash == '#/ranking' ||
            window.location.hash == '#/Validator' ||
            window.location.hash == '#/Account' ? (
                <div className={Header_ls.HeaderBox_SearchBox}>
                    <img
                        src={require('../../assets/images/Header/Search.png')}
                    />
                    <div
                        className={Header_ls.HeaderBox_SearchBox_inputBox}
                        id="headerselect"
                    >
                        <Select
                            defaultValue="AllFilters"
                            onChange={handleChange}
                            suffixIcon={
                                <>
                                    <GoTriangleDown
                                        style={{
                                            color: '#ffffff',
                                            fontSize: '18px',
                                        }}
                                    />
                                </>
                            }
                            className={
                                Header_ls.HeaderBox_SearchBox_inputBox_select
                            }
                        >
                            <Option value="AllFilters">All Filters</Option>
                        </Select>
                        <input
                            placeholder="Search by Address / Txn Hash / Block / Token"
                            className={
                                Header_ls.HeaderBox_SearchBox_inputBox_input
                            }
                            id="homepageinput"
                            autocomplete="off"
                        />
                    </div>
                    <div
                        className={Header_ls.HeaderBox_Search}
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
