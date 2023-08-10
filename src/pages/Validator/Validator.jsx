import Validator_ls from './Validator.less';
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
export default function Validator() {
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
    // totalAnnualizedcolor
    const [totalAnnualizedcolor, setTotalAnnualizedcolor] = useState(0);
    //分页排序order参数
    const [orderdata, setOrderdata] = useState('');
    const columns = [
        {
            title: 'Validator',
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
            // width: '140px',
        },
        {
            title: () => (
                <div className={Validator_ls.tablexbox}>
                    Total Staking
                    {stakevaluecolor == 0 ? (
                        <div className={Validator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : stakevaluecolor == 1 ? (
                        <div className={Validator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Validator_ls.tablex}>
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
            ellipsis: true,
        },
        {
            title: () => (
                <div className={Validator_ls.tablexbox}>
                    Total Rewards(ERB)
                    {totalcollectionscolor == 0 ? (
                        <div className={Validator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                            />
                        </div>
                    ) : totalcollectionscolor == 1 ? (
                        <div className={Validator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Validator_ls.tablex}>
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
        },
        {
            title: () => (
                <div className={Validator_ls.tablexbox}>
                    Time
                    {totalnftscolor == 0 ? (
                        <div className={Validator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalNFTs.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalNFTs.bind(this, 2)}
                            />
                        </div>
                    ) : totalnftscolor == 1 ? (
                        <div className={Validator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalNFTs.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TotalNFTs.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Validator_ls.tablex}>
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
            // width: '130px',
        },
        {
            title: () => (
                <div className={Validator_ls.tablexbox}>
                    Last Attestation Block Height
                    {feeratecolor == 0 ? (
                        <div className={Validator_ls.tablex}>
                            <CaretUpOutlined onClick={FeeRate.bind(this, 1)} />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                            />
                        </div>
                    ) : feeratecolor == 1 ? (
                        <div className={Validator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={FeeRate.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Validator_ls.tablex}>
                            <CaretUpOutlined onClick={FeeRate.bind(this, 1)} />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                                style={{ color: '#7AA4FF' }}
                            />
                        </div>
                    )}
                </div>
            ),
            key: 'block_number',
            dataIndex: 'block_number',
            render: (text, data) => (
                <Link
                    to={{
                        pathname: '/NullPage',
                        state: { blockid: text },
                    }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {text}
                </Link>
            ),
            width: '240px',
        },
        {
            title: () => (
                <div className={Validator_ls.tablexbox}>
                    Online Weight
                    {transactionvaluecolor == 0 ? (
                        <div className={Validator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TransactionValue.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TransactionValue.bind(this, 2)}
                            />
                        </div>
                    ) : transactionvaluecolor == 1 ? (
                        <div className={Validator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TransactionValue.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TransactionValue.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Validator_ls.tablex}>
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
            render: (text, data) => (
                <span className={Validator_ls.tablespan}>
                    <span>{text}</span>
                    &nbsp;&nbsp;
                    {text < 40 ? (
                        <svg
                            width="16px"
                            height="16px"
                            viewBox="0 0 16 16"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xlink="http://www.w3.org/1999/xlink"
                        >
                            <title>切片</title>
                            <g
                                id="英文版"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                            >
                                <g
                                    id="Validator"
                                    transform="translate(-1150.000000, -495.000000)"
                                    fill="#F72D86"
                                    fill-rule="nonzero"
                                >
                                    <g
                                        id="区块信息列表"
                                        transform="translate(99.000000, 369.000000)"
                                    >
                                        <g
                                            id="表情-meh"
                                            transform="translate(1051.000000, 126.000000)"
                                        >
                                            <rect
                                                id="矩形"
                                                opacity="0"
                                                x="0"
                                                y="0"
                                                width="16"
                                                height="16"
                                            ></rect>
                                            <path
                                                d="M8,1 C11.865625,1 15,4.134375 15,8 C15,11.865625 11.865625,15 8,15 C4.134375,15 1,11.865625 1,8 C1,4.134375 4.134375,1 8,1 Z M8,8.328125 C6.6640625,8.328125 5.56875,9.3796875 5.5,10.696875 C5.496875,10.76875 5.553125,10.828125 5.625,10.828125 L5.625,10.828125 L6.3765625,10.828125 C6.4421875,10.828125 6.4984375,10.778125 6.503125,10.7125 C6.5609375,9.9390625 7.2109375,9.328125 8,9.328125 C8.7890625,9.328125 9.4375,9.9390625 9.496875,10.7125 C9.5015625,10.778125 9.5578125,10.828125 9.6234375,10.828125 L9.6234375,10.828125 L10.375,10.828125 C10.446875,10.828125 10.503125,10.76875 10.5,10.696875 C10.43125,9.3796875 9.3359375,8.328125 8,8.328125 Z M5.25,5.828125 C4.83578644,5.828125 4.5,6.16391144 4.5,6.578125 C4.5,6.99233856 4.83578644,7.328125 5.25,7.328125 C5.66421356,7.328125 6,6.99233856 6,6.578125 C6,6.16391144 5.66421356,5.828125 5.25,5.828125 Z M10.75,5.828125 C10.3357864,5.828125 10,6.16391144 10,6.578125 C10,6.99233856 10.3357864,7.328125 10.75,7.328125 C11.1642136,7.328125 11.5,6.99233856 11.5,6.578125 C11.5,6.16391144 11.1642136,5.828125 10.75,5.828125 Z"
                                                id="形状"
                                            ></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ) : text >= 40 && text <= 50 ? (
                        <svg
                            width="16px"
                            height="16px"
                            viewBox="0 0 16 16"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xlink="http://www.w3.org/1999/xlink"
                        >
                            <title>切片</title>
                            <g
                                id="英文版"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                            >
                                <g
                                    id="Validator"
                                    transform="translate(-1150.000000, -543.000000)"
                                    fill="#FFC35A"
                                    fill-rule="nonzero"
                                >
                                    <g
                                        id="区块信息列表"
                                        transform="translate(99.000000, 369.000000)"
                                    >
                                        <g
                                            id="表情"
                                            transform="translate(1051.000000, 126.000000)"
                                        >
                                            <g
                                                id="表情-meh备份"
                                                transform="translate(0.000000, 48.000000)"
                                            >
                                                <rect
                                                    id="矩形"
                                                    opacity="0"
                                                    x="0"
                                                    y="0"
                                                    width="16"
                                                    height="16"
                                                ></rect>
                                                <path
                                                    d="M8,1 C11.865625,1 15,4.134375 15,8 C15,11.865625 11.865625,15 8,15 C4.134375,15 1,11.865625 1,8 C1,4.134375 4.134375,1 8,1 Z M10.375,8.828125 L5.625,8.828125 C5.55625,8.828125 5.5,8.884375 5.5,8.953125 L5.5,9.703125 C5.5,9.771875 5.55625,9.828125 5.625,9.828125 L10.375,9.828125 C10.44375,9.828125 10.5,9.771875 10.5,9.703125 L10.5,8.953125 C10.5,8.884375 10.44375,8.828125 10.375,8.828125 Z M5.25,5.828125 C4.83578644,5.828125 4.5,6.16391144 4.5,6.578125 C4.5,6.99233856 4.83578644,7.328125 5.25,7.328125 C5.66421356,7.328125 6,6.99233856 6,6.578125 C6,6.16391144 5.66421356,5.828125 5.25,5.828125 Z M10.75,5.828125 C10.3357864,5.828125 10,6.16391144 10,6.578125 C10,6.99233856 10.3357864,7.328125 10.75,7.328125 C11.1642136,7.328125 11.5,6.99233856 11.5,6.578125 C11.5,6.16391144 11.1642136,5.828125 10.75,5.828125 Z"
                                                    id="形状"
                                                ></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ) : text > 50 ? (
                        <svg
                            width="16px"
                            height="16px"
                            viewBox="0 0 16 16"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xlink="http://www.w3.org/1999/xlink"
                        >
                            <title>切片</title>
                            <g
                                id="英文版"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                            >
                                <g
                                    id="Validator"
                                    transform="translate(-1150.000000, -591.000000)"
                                    fill="#89FFC2"
                                    fill-rule="nonzero"
                                >
                                    <g
                                        id="区块信息列表"
                                        transform="translate(99.000000, 369.000000)"
                                    >
                                        <g
                                            id="表情"
                                            transform="translate(1051.000000, 126.000000)"
                                        >
                                            <g
                                                id="表情-meh备份-2"
                                                transform="translate(0.000000, 96.000000)"
                                            >
                                                <rect
                                                    id="矩形"
                                                    opacity="0"
                                                    x="0"
                                                    y="0"
                                                    width="16"
                                                    height="16"
                                                ></rect>
                                                <path
                                                    d="M8,1 C11.865625,1 15,4.134375 15,8 C15,11.865625 11.865625,15 8,15 C4.134375,15 1,11.865625 1,8 C1,4.134375 4.134375,1 8,1 Z M6.3765625,8.328125 L5.625,8.328125 C5.553125,8.328125 5.496875,8.3875 5.5,8.459375 C5.56875,9.7765625 6.6640625,10.828125 8,10.828125 C9.3359375,10.828125 10.43125,9.7765625 10.5,8.459375 C10.503125,8.3875 10.446875,8.328125 10.375,8.328125 L9.6234375,8.328125 C9.5578125,8.328125 9.5015625,8.378125 9.496875,8.44375 C9.4375,9.2171875 8.7890625,9.828125 8,9.828125 C7.2109375,9.828125 6.5609375,9.2171875 6.503125,8.44375 C6.4984375,8.378125 6.4421875,8.328125 6.3765625,8.328125 Z M5.25,5.828125 C4.83578644,5.828125 4.5,6.16391144 4.5,6.578125 C4.5,6.99233856 4.83578644,7.328125 5.25,7.328125 C5.66421356,7.328125 6,6.99233856 6,6.578125 C6,6.16391144 5.66421356,5.828125 5.25,5.828125 Z M10.75,5.828125 C10.3357864,5.828125 10,6.16391144 10,6.578125 C10,6.99233856 10.3357864,7.328125 10.75,7.328125 C11.1642136,7.328125 11.5,6.99233856 11.5,6.578125 C11.5,6.16391144 11.1642136,5.828125 10.75,5.828125 Z"
                                                    id="形状"
                                                ></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ) : (
                        ''
                    )}
                </span>
            ),
            width: '155px',
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
        //console.log(data);
        if (data) {
            setValidatordata(data);
        }
    };
    //总数查询
    const total_q = async () => {
        const data = await total();
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
        setTotalAnnualizedcolor(0);
        if (text == 1) {
            if (stakevaluecolor == 1) {
                setStakevaluecolor(0);
                setOrderdata('');
            } else {
                setStakevaluecolor(1);
                setOrderdata('amount ASC');
            }
        } else {
            if (stakevaluecolor == 2) {
                setStakevaluecolor(0);
                setOrderdata('');
            } else {
                setStakevaluecolor(2);
                setOrderdata('amount DESC');
            }
        }
    }
    //Total Collections 排序
    function TotalCollections(text) {
        setStakevaluecolor(0);
        setTotalnftscolor(0);
        setFeeratecolor(0);
        setTransactionvaluecolor(0);
        setTotalAnnualizedcolor(0);
        if (text == 1) {
            if (totalcollectionscolor == 1) {
                setTotalcollectionscolor(0);
                setOrderdata('');
            } else {
                setTotalcollectionscolor(1);
                setOrderdata('reward ASC');
            }
        } else {
            if (totalcollectionscolor == 2) {
                setTotalcollectionscolor(0);
                setOrderdata('');
            } else {
                setTotalcollectionscolor(2);
                setOrderdata('reward DESC');
            }
        }
    }
    //Total NFTs 排序
    function TotalNFTs(text) {
        setStakevaluecolor(0);
        setTotalcollectionscolor(0);
        setFeeratecolor(0);
        setTransactionvaluecolor(0);
        setTotalAnnualizedcolor(0);
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
    //AnnualizedCollections 排序
    function AnnualizedCollections(text) {
        setStakevaluecolor(0);
        setTotalcollectionscolor(0);
        setTotalnftscolor(0);
        setTransactionvaluecolor(0);
        setFeeratecolor(0);
        if (text == 1) {
            if (totalAnnualizedcolor == 1) {
                setTotalAnnualizedcolor(0);
                setOrderdata('');
            } else {
                setTotalAnnualizedcolor(1);
                setOrderdata('apr ASC');
            }
        } else {
            if (totalAnnualizedcolor == 2) {
                setTotalAnnualizedcolor(0);
                setOrderdata('');
            } else {
                setTotalAnnualizedcolor(2);
                setOrderdata('apr DESC');
            }
        }
    }
    //Fee Rate 排序
    function FeeRate(text) {
        setStakevaluecolor(0);
        setTotalcollectionscolor(0);
        setTotalnftscolor(0);
        setTransactionvaluecolor(0);
        setTotalAnnualizedcolor(0);
        if (text == 1) {
            if (feeratecolor == 1) {
                setFeeratecolor(0);
                setOrderdata('');
            } else {
                setFeeratecolor(1);
                setOrderdata('block_number ASC');
            }
        } else {
            if (feeratecolor == 2) {
                setFeeratecolor(0);
                setOrderdata('');
            } else {
                setFeeratecolor(2);
                setOrderdata('block_number DESC');
            }
        }
    }
    //Transaction Value 排序
    function TransactionValue(text) {
        setStakevaluecolor(0);
        setTotalcollectionscolor(0);
        setTotalnftscolor(0);
        setFeeratecolor(0);
        setTotalAnnualizedcolor(0);
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
            <div className={Validator_ls.ValidatorBox}>
                {/* 头部三块数据 */}
                <div className={Validator_ls.ValidatorBox_headerTitle}>
                    <div className={Validator_ls.ValidatorBox_headerTitle_d}>
                        <div
                            className={
                                Validator_ls.ValidatorBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    Validator_ls.ValidatorBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalValidator || 0}
                            </p>
                            <p
                                className={
                                    Validator_ls.ValidatorBox_headerTitle_d_left_name
                                }
                            >
                                Validator Numbers
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/Validator/Validator1.png')}
                        />
                    </div>
                    <div className={Validator_ls.ValidatorBox_headerTitle_d}>
                        <div
                            className={
                                Validator_ls.ValidatorBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    Validator_ls.ValidatorBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalPledge
                                    ? Number(
                                          utils.formatEther(
                                              String(totaldata.totalPledge),
                                          ),
                                      ).toFixed(2)
                                    : 0}
                            </p>
                            <p
                                className={
                                    Validator_ls.ValidatorBox_headerTitle_d_left_name
                                }
                            >
                                Total Staking in the Erbie network
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/Validator/Validator2.png')}
                        />
                    </div>
                </div>
                {/* 表格 */}
                <div
                    className={Validator_ls.ValidatorBox_table}
                    id="ValidatorTable"
                >
                    <p className={Validator_ls.ValidatorBox_table_title}>
                        VALIDATOR INFORMATION
                    </p>
                    <Table
                        columns={columns}
                        dataSource={validatordata.data}
                        pagination={false}
                    />
                    <div
                        className={Validator_ls.ValidatorBox_Pagination}
                        id="ValidatorBoxPagination"
                    >
                        <Pagination
                            defaultCurrent={1}
                            total={validatordata.total}
                            onChange={onChange}
                            showSizeChanger={false}
                            current={pagenumber}
                        />
                        <div className={Validator_ls.ValidatorBox_Pagination_d}>
                            10/Page
                        </div>
                        <span
                            className={
                                Validator_ls.ValidatorBox_Pagination_span1
                            }
                        >
                            To
                        </span>
                        <input
                            id="Validatorinputnumber"
                            className={
                                Validator_ls.ValidatorBox_Pagination_input
                            }
                            onKeyDown={Validatorinputnumberonclick}
                        />
                        <span
                            className={
                                Validator_ls.ValidatorBox_Pagination_span2
                            }
                        >
                            Page
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
