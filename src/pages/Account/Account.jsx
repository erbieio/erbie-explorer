import Account_ls from './Account.less';
import { Space, Table, Tag, Pagination } from 'antd';
import { Link } from 'umi';
import {
    erbprice,
    total,
    epoch,
    accounts,
    rewardperson,
} from '../../api/request_data/block_request';
import moment from 'moment';
import { utils } from 'ethers';
import { timestamp, ellipsis } from '../../utils/methods/Methods';
import React, { useState, useEffect } from 'react';
export default function Account() {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    //Account
    const [Accountdata, setAccountdata] = useState({});
    //总数
    const [totaldata, setTotaldata] = useState({});
    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetail/${text}`, state: text }}
                    style={{ color: '#7AA4FF',fontFamily:'CustomFontMedium'  }}
                >
                    {ellipsis(text)}
                </Link>
            ),
            ellipsis: true,
        },
        {
            title: 'Balance(ERB)',
            dataIndex: 'balance',
            key: 'balance',
            render: (text, data) => (
                <span>
                    {text
                        ? Number(utils.formatEther(String(text))).toFixed(2)
                        : 0}
                </span>
            ),
            ellipsis: true,
        },
        {
            title: 'Validator Pledge(ERB)',
            dataIndex: 'validatorAmount',
            key: 'validatorAmount',
            render: (text, data) => (
                <>
                    {text
                        ? Number(utils.formatEther(String(text))).toFixed(2)
                        : 0}
                </>
            ),
        },
        {
            title: 'Exchange Pledge(ERB)',
            dataIndex: 'exchangerAmount',
            key: 'exchangerAmount',
            render: (text, data) => (
                <>
                    {text
                        ? Number(utils.formatEther(String(text))).toFixed(2)
                        : 0}
                </>
            ),
        },
        {
            title: 'S-NFT Weight',
            key: 'snftValue',
            dataIndex: 'snftValue',
            render: (text, data) => (
                <>
                    {text
                        ? Number(utils.formatEther(String(text))).toFixed(2)
                        : 0}
                </>
            ),
            ellipsis: true,
        },
    ];

    const onChange = (data) => {
        setPagenumber(data);
    };
    //Account分页
    let pagedata = {
        page: pagenumber,
        page_size: pagenumbersize,
    };
    useEffect(() => {
        Account_q(pagedata);
        total_q();
    }, []);
    useEffect(() => {
        Account_q(pagedata);
    }, [pagenumber]);
    //Account查询
    const Account_q = async (item) => {
        const data = await accounts(item);
        if (data) {
            setAccountdata(data);
        }
        console.log('Account查询');
        console.log(data);
    };
    //总数查询
    const total_q = async () => {
        const data = await total();
        console.log('总数查询');
        console.log(data);
        if (data) {
            setTotaldata(data);
        }
    };
    function Accountinputnumberonclick(e) {
        let data = document.getElementById('Accountinputnumber').value;
        if (e.keyCode == 13) {
            if (Number(data) != NaN) {
                setPagenumber(Number(data));
            }
        }
    }
    return (
        <>
            <div className={Account_ls.AccountBox}>
                {/* 头部三块数据 */}
                <div className={Account_ls.AccountBox_headerTitle}>
                    <div className={Account_ls.AccountBox_headerTitle_d}>
                        <div
                            className={Account_ls.AccountBox_headerTitle_d_left}
                        >
                            <p
                                className={
                                    Account_ls.AccountBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalAccount || 0}
                            </p>
                            <p
                                className={
                                    Account_ls.AccountBox_headerTitle_d_left_name
                                }
                            >
                                Total Coin Addresses
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/Account/Account1.png')}
                        />
                    </div>
                    <div className={Account_ls.AccountBox_headerTitle_d}>
                        <div
                            className={Account_ls.AccountBox_headerTitle_d_left}
                        >
                            <p
                                className={
                                    Account_ls.AccountBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.activeAccount || 0}
                            </p>
                            <p
                                className={
                                    Account_ls.AccountBox_headerTitle_d_left_name
                                }
                            >
                                Total Active Addresses
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/Account/Account2.png')}
                        />
                    </div>
                </div>
                {/* 表格 */}
                <div className={Account_ls.AccountBox_table} id="AccountTable">
                    <p className={Account_ls.AccountBox_table_title}>
                        Account INFORMATION
                    </p>
                    <Table
                        columns={columns}
                        dataSource={Accountdata.accounts}
                        pagination={false}
                    />
                    <div
                        className={Account_ls.AccountBox_Pagination}
                        id="AccountBoxPagination"
                    >
                        <Pagination
                            defaultCurrent={1}
                            total={Accountdata.total}
                            onChange={onChange}
                            showSizeChanger={false}
                            current={pagenumber}
                        />
                        <div className={Account_ls.AccountBox_Pagination_d}>
                            10/Page
                        </div>
                        <span
                            className={Account_ls.AccountBox_Pagination_span1}
                        >
                            To
                        </span>
                        <input
                            id="Accountinputnumber"
                            className={Account_ls.AccountBox_Pagination_input}
                            onKeyDown={Accountinputnumberonclick}
                        />
                        <span
                            className={Account_ls.AccountBox_Pagination_span2}
                        >
                            Page
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
