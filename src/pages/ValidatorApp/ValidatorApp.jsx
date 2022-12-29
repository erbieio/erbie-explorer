import ValidatorApp_ls from './ValidatorApp.less';
import { Space, Table, Tag, Pagination } from 'antd';
import { Link } from 'umi';
import {
    erbprice,
    total,
    epoch,
    validators,
    rewardperson,
} from '../../api/request_data/block_request';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { timestamp, ellipsis } from '../../utils/methods/Methods';
import moment from 'moment';
import { utils } from 'ethers';
import React, { useState, useEffect } from 'react';
export default function ValidatorApp() {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    //Validator
    const [validatordata, setValidatordata] = useState({});
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
    const [orderdata, setOrderdata] = useState('');
    const columns = [
        {
            title: 'Validator',
            dataIndex: 'address',
            key: 'address',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetail/${text}`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
            ellipsis: true,
        },
        {
            title: () => (
                <div className={ValidatorApp_ls.tablexbox}>
                    Staking Numbers(ERB)
                    {stakevaluecolor == 0 ? (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : stakevaluecolor == 1 ? (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={ValidatorApp_ls.tablex}>
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
            dataIndex: 'amount',
            key: 'amount',
            render: (text, data) => (
                <span>
                    {text
                        ? Number(utils.formatEther(String(text))).toFixed(2)
                        : 0}
                </span>
            ),
            width: '200px',
        },
        {
            title: () => (
                <div className={ValidatorApp_ls.tablexbox}>
                    Total Rewards(ERB)
                    {totalcollectionscolor == 0 ? (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                            />
                        </div>
                    ) : totalcollectionscolor == 1 ? (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={ValidatorApp_ls.tablex}>
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
            dataIndex: 'reward',
            key: 'reward',
            render: (text, data) => (
                <>
                    {text
                        ? Number(utils.formatEther(String(text))).toFixed(2)
                        : 0}
                </>
            ),
            width: '180px',
        },
        {
            title: () => (
                <div className={ValidatorApp_ls.tablexbox}>
                    Time
                    {totalnftscolor == 0 ? (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalNFTs.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalNFTs.bind(this, 2)}
                            />
                        </div>
                    ) : totalnftscolor == 1 ? (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalNFTs.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TotalNFTs.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={ValidatorApp_ls.tablex}>
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
            key: 'timestamp',
            dataIndex: 'timestamp',
            render: (text, data) => (
                <span>
                    {moment(parseInt(text) * 1000).format(
                        'YYYY-MM-DD HH:mm:ss',
                    )}
                </span>
            ),
            ellipsis: true,
        },
        {
            title: () => (
                <div className={ValidatorApp_ls.tablexbox}>
                    Last Attestation Block Height
                    {feeratecolor == 0 ? (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined onClick={FeeRate.bind(this, 1)} />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                            />
                        </div>
                    ) : feeratecolor == 1 ? (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={FeeRate.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined onClick={FeeRate.bind(this, 1)} />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                                style={{ color: '#7AA4FF' }}
                            />
                        </div>
                    )}
                </div>
            ),
            key: 'last_number',
            dataIndex: 'last_number',
            render: (text, data) => (
                <Link
                    to={{
                        pathname: '/BlockChain/BlockDetails',
                        state: { blockid: text },
                    }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {text}
                </Link>
            ),
            width: '250px',
        },
        {
            title: () => (
                <div className={ValidatorApp_ls.tablexbox}>
                    Online Weight
                    {transactionvaluecolor == 0 ? (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TransactionValue.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TransactionValue.bind(this, 2)}
                            />
                        </div>
                    ) : transactionvaluecolor == 1 ? (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TransactionValue.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TransactionValue.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={ValidatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TransactionValue.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TransactionValue.bind(this, 2)}
                                style={{ color: '#7AA4FF' }}
                            />
                        </div>
                    )}
                </div>
            ),
            key: 'weight',
            dataIndex: 'weight',
            render: (text, data) => <>{text}</>,
            width: '150px',
        },
    ];

    const onChange = (data) => {
        setPagenumber(data);
    };
    //Validator分页
    let pagedata = {
        order: orderdata,
        page: pagenumber,
        page_size: pagenumbersize,
    };
    useEffect(() => {
        validators_q(pagedata);
        total_q();
    }, []);
    useEffect(() => {
        validators_q(pagedata);
    }, [pagenumber]);
    useEffect(() => {
        if (orderdata) {
            validators_q(pagedata);
        }
    }, [orderdata]);
    //Validator查询
    const validators_q = async (item) => {
        const data = await validators(item);
        if (data) {
            setValidatordata(data);
        }
        console.log('Validator查询');
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
    function Validatorinputnumberonclick(e) {
        let data = document.getElementById('Validatorinputnumber').value;
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
                setOrderdata('LENGTH(amount) ASC, amount ASC');
            }
        } else {
            if (stakevaluecolor == 2) {
                setStakevaluecolor(0);
                setOrderdata('');
            } else {
                setStakevaluecolor(2);
                setOrderdata('LENGTH(amount) DESC, amount DESC');
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
                setOrderdata('LENGTH(reward) ASC, reward ASC');
            }
        } else {
            if (totalcollectionscolor == 2) {
                setTotalcollectionscolor(0);
                setOrderdata('');
            } else {
                setTotalcollectionscolor(2);
                setOrderdata('LENGTH(reward) DESC, reward DESC');
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
                setOrderdata('timestamp ASC');
            }
        } else {
            if (totalnftscolor == 2) {
                setTotalnftscolor(0);
                setOrderdata('');
            } else {
                setTotalnftscolor(2);
                setOrderdata('timestamp DESC');
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
                setOrderdata('last_number ASC');
            }
        } else {
            if (feeratecolor == 2) {
                setFeeratecolor(0);
                setOrderdata('');
            } else {
                setFeeratecolor(2);
                setOrderdata('last_number DESC');
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
            <div className={ValidatorApp_ls.ValidatorBox}>
                {/* 头部三块数据 */}
                <div className={ValidatorApp_ls.ValidatorBox_headerTitle}>
                    <div className={ValidatorApp_ls.ValidatorBox_headerTitle_d}>
                        <div
                            className={
                                ValidatorApp_ls.ValidatorBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    ValidatorApp_ls.ValidatorBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalValidator || 0}
                            </p>
                            <p
                                className={
                                    ValidatorApp_ls.ValidatorBox_headerTitle_d_left_name
                                }
                            >
                                Validator Numbers
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/ValidatorApp/1.png')}
                        />
                    </div>
                    <div className={ValidatorApp_ls.ValidatorBox_headerTitle_d}>
                        <div
                            className={
                                ValidatorApp_ls.ValidatorBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    ValidatorApp_ls.ValidatorBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalValidatorPledge
                                    ? Number(
                                          utils.formatEther(
                                              String(
                                                  totaldata.totalValidatorPledge,
                                              ),
                                          ),
                                      ).toFixed(2)
                                    : 0}
                            </p>
                            <p
                                className={
                                    ValidatorApp_ls.ValidatorBox_headerTitle_d_left_name
                                }
                            >
                                Total Staking ERBs
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/ValidatorApp/2.png')}
                        />
                    </div>
                </div>
                {/* 表格 */}
                <div className={ValidatorApp_ls.tableBox}>
                    <div
                        className={ValidatorApp_ls.ValidatorBox_table}
                        id="ValidatorTableApp"
                    >
                        <p className={ValidatorApp_ls.ValidatorBox_table_title}>
                            VALIDATOR INFORMATION
                        </p>
                        <Table
                            columns={columns}
                            dataSource={validatordata.data}
                            pagination={false}
                        />
                        <div
                            className={ValidatorApp_ls.ValidatorBox_Pagination}
                            id="ValidatorBoxPagination"
                        >
                            <Pagination
                                defaultCurrent={1}
                                total={validatordata.total}
                                onChange={onChange}
                                showSizeChanger={false}
                                current={pagenumber}
                            />
                            <div
                                className={
                                    ValidatorApp_ls.ValidatorBox_Pagination_d
                                }
                            >
                                10/Page
                            </div>
                            <span
                                className={
                                    ValidatorApp_ls.ValidatorBox_Pagination_span1
                                }
                            >
                                To
                            </span>
                            <input
                                id="Validatorinputnumber"
                                className={
                                    ValidatorApp_ls.ValidatorBox_Pagination_input
                                }
                                onKeyDown={Validatorinputnumberonclick}
                            />
                            <span
                                className={
                                    ValidatorApp_ls.ValidatorBox_Pagination_span2
                                }
                            >
                                Page
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
