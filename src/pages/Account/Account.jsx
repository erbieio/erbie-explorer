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
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
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
    //Stake Value
    const [stakevaluecolor, setStakevaluecolor] = useState(0);
    //Total Collections
    const [totalcollectionscolor, setTotalcollectionscolor] = useState(0);
    //Total NFTs
    const [totalnftscolor, setTotalnftscolor] = useState(0);
    //Fee Rate
    const [feeratecolor, setFeeratecolor] = useState(0);
    //Transaction Value
    const [transactionvaluecolor, setTransactionvaluecolor] = useState(0);
    //分页排序order参数
    const [orderdata, setOrderdata] = useState('balance DESC');
    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetail`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
            ellipsis: true,
        },
        {
            title: () => (
                <div className={Account_ls.tablexbox}>
                    Balance(ERB)
                    {stakevaluecolor == 0 ? (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : stakevaluecolor == 1 ? (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                                style={{ color: '#7AA4FF' }}
                            />
                        </div>
                    )}
                </div>
            ),
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
            title: () => (
                <div className={Account_ls.tablexbox}>
                    Total Staking
                    {totalcollectionscolor == 0 ? (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                            />
                        </div>
                    ) : totalcollectionscolor == 1 ? (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                                style={{ color: '#7AA4FF' }}
                            />
                        </div>
                    )}
                </div>
            ),
            dataIndex: 'stakerAmount',
            key: 'stakerAmount',
            render: (text, data) => (
                <>
                    {text
                        ? Number(utils.formatEther(String(text))).toFixed(2)
                        : 0}
                </>
            ),
        },
        {
            title: () => (
                <div className={Account_ls.tablexbox}>
                    Total Staked
                    {totalnftscolor == 0 ? (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalNFTs.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalNFTs.bind(this, 2)}
                            />
                        </div>
                    ) : totalnftscolor == 1 ? (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalNFTs.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TotalNFTs.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalNFTs.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalNFTs.bind(this, 2)}
                                style={{ color: '#7AA4FF' }}
                            />
                        </div>
                    )}
                </div>
            ),
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
            title: () => (
                <div className={Account_ls.tablexbox}>
                    Owned SNFTs
                    {feeratecolor == 0 ? (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined onClick={FeeRate.bind(this, 1)} />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                            />
                        </div>
                    ) : feeratecolor == 1 ? (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined
                                onClick={FeeRate.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Account_ls.tablex}>
                            <CaretUpOutlined onClick={FeeRate.bind(this, 1)} />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                                style={{ color: '#7AA4FF' }}
                            />
                        </div>
                    )}
                </div>
            ),
            key: 'snftCount',
            dataIndex: 'snftCount',
            render: (text, data) => <>{text}</>,
            ellipsis: true,
            width: '170px',
        },
    ];

    const onChange = (data) => {
        setPagenumber(data);
    };
    //Account分页
    let pagedata = {
        order: orderdata,
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
    useEffect(() => {
        if (orderdata) {
            Account_q(pagedata);
        }
    }, [orderdata]);
    //Account查询
    const Account_q = async (item) => {
        const data = await accounts(item);
        if (data) {
            setAccountdata(data);
        }
    };
    //总数查询
    const total_q = async () => {
        const data = await total();
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
    //Stake Value 排序
    function StakeValue(text) {
        setTotalcollectionscolor(0);
        setTotalnftscolor(0);
        setFeeratecolor(0);
        setTransactionvaluecolor(0);
        if (text == 1) {
            if (stakevaluecolor == 1) {
                setStakevaluecolor(0);
                setOrderdata('');
            } else {
                setStakevaluecolor(1);
                setOrderdata('balance ASC');
            }
        } else {
            if (stakevaluecolor == 2) {
                setStakevaluecolor(0);
                setOrderdata('');
            } else {
                setStakevaluecolor(2);
                setOrderdata('balance DESC');
            }
        }
    }
    //Total Collections 排序
    function TotalCollections(text) {
        setStakevaluecolor(0);
        setTotalnftscolor(0);
        setFeeratecolor(0);
        setTransactionvaluecolor(0);
        if (text == 1) {
            if (totalcollectionscolor == 1) {
                setTotalcollectionscolor(0);
                setOrderdata('');
            } else {
                setTotalcollectionscolor(1);
                setOrderdata('staker_amount ASC');
            }
        } else {
            if (totalcollectionscolor == 2) {
                setTotalcollectionscolor(0);
                setOrderdata('');
            } else {
                setTotalcollectionscolor(2);
                setOrderdata('staker_amount DESC');
            }
        }
    }
    //Total NFTs 排序
    function TotalNFTs(text) {
        setStakevaluecolor(0);
        setTotalcollectionscolor(0);
        setFeeratecolor(0);
        setTransactionvaluecolor(0);
        if (text == 1) {
            if (totalnftscolor == 1) {
                setTotalnftscolor(0);
                setOrderdata('');
            } else {
                setTotalnftscolor(1);
                setOrderdata('validator_amount ASC');
            }
        } else {
            if (totalnftscolor == 2) {
                setTotalnftscolor(0);
                setOrderdata('');
            } else {
                setTotalnftscolor(2);
                setOrderdata('validator_amount DESC');
            }
        }
    }
    //Fee Rate 排序
    function FeeRate(text) {
        setStakevaluecolor(0);
        setTotalcollectionscolor(0);
        setTotalnftscolor(0);
        setTransactionvaluecolor(0);
        if (text == 1) {
            if (feeratecolor == 1) {
                setFeeratecolor(0);
                setOrderdata('');
            } else {
                setFeeratecolor(1);
                setOrderdata('snft_count ASC');
            }
        } else {
            if (feeratecolor == 2) {
                setFeeratecolor(0);
                setOrderdata('');
            } else {
                setFeeratecolor(2);
                setOrderdata('snft_count DESC');
            }
        }
    }
    //Transaction Value 排序
    function TransactionValue(text) {
        setStakevaluecolor(0);
        setTotalcollectionscolor(0);
        setTotalnftscolor(0);
        setFeeratecolor(0);
        if (text == 1) {
            if (transactionvaluecolor == 1) {
                setTransactionvaluecolor(0);
                setOrderdata('');
            } else {
                setTransactionvaluecolor(1);
                setOrderdata('weight ASC');
            }
        } else {
            if (transactionvaluecolor == 2) {
                setTransactionvaluecolor(0);
                setOrderdata('');
            } else {
                setTransactionvaluecolor(2);
                setOrderdata('weight DESC');
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
