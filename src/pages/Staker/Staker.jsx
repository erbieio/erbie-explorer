import Exchange_ls from './Staker.less';
import { Space, Table, Tag, Pagination } from 'antd';
import { Link } from 'umi';
import {
    erbprice,
    total,
    epoch,
    block,
    rewardperson,
    nft,
    exchanger,
} from '../../api/request_data/block_request';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { utils } from 'ethers';
import { Buffer } from 'buffer';
import React, { useState, useEffect } from 'react';
import { timestamp, ellipsis } from '../../utils/methods/Methods';
export default function Exchange() {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    //总数
    const [totaldata, setTotaldata] = useState({});
    //交易所
    const [exchangerdata, setExchangerdata] = useState([]);
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
            title: 'Staker Address',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetail`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
            width: '240px',
        },
        {
            title: 'Block Height',
            dataIndex: 'block_number',
            key: 'block_number',
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
                <div className={Exchange_ls.tablexbox}>
                    Stake Value
                    {stakevaluecolor == 0 ? (
                        <div className={Exchange_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : stakevaluecolor == 1 ? (
                        <div className={Exchange_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Exchange_ls.tablex}>
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
            key: 'amount',
            dataIndex: 'amount',
            ellipsis: true,
            render: (text) => <span>{utils.formatEther(String(text))}</span>,
            width: '240px',
        },
        {
            title: 'SNFT Value',
            dataIndex: 'reward',
            key: 'reward',
            render: (text) => <span>{utils.formatEther(String(text))}</span>,
            width: '240px',
        },
        {
            title: 'Stake Time',
            dataIndex: 'timestamp',
            key: 'timestamp',

            render: (text, data) =>
                text != 0 ? (
                    <span>
                        {moment(parseInt(text) * 1000).format(
                            'YYYY-MM-DD HH:mm:ss',
                        )}
                    </span>
                ) : (
                    '-'
                ),
            ellipsis: true,
            width: '180px',
        },
    ];
    const onChange = (data) => {
        setPagenumber(data);
    };
    //交易所分页
    let pagedata = {
        name: '',
        page: pagenumber,
        page_size: pagenumbersize,
        order: orderdata,
    };
    useEffect(() => {
        total_q();
        exchanger_q(pagedata);
    }, []);
    useEffect(() => {
        exchanger_q(pagedata);
    }, [pagenumber]);
    //总数查询
    const total_q = async () => {
        const data = await total();
        if (data) {
            setTotaldata(data);
        }
    };
    //交易所查询
    const exchanger_q = async (item) => {
        const data = await exchanger(item);
        if (data) {
            //console.log(data);
            setExchangerdata(data);
        }
    };
    useEffect(() => {
        if (orderdata) {
            exchanger_q(pagedata);
        }
    }, [orderdata]);
    function Exchangeinputnumberonclick(e) {
        let data = document.getElementById('Exchangeinputnumber').value;
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
                setOrderdata('amount asc');
            }
        } else {
            if (stakevaluecolor == 2) {
                setStakevaluecolor(0);
                setOrderdata('');
            } else {
                setStakevaluecolor(2);
                setOrderdata('amount desc');
            }
        }
    }
    return (
        <>
            <div className={Exchange_ls.ExchangeBox}>
                {/* 头部三块数据 */}
                <div className={Exchange_ls.ExchangeBox_headerTitle}>
                    {/* 
                    <div className={Exchange_ls.ExchangeBox_headerTitle_d}>
                        <div
                            className={
                                Exchange_ls.ExchangeBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    Exchange_ls.ExchangeBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalExchangerPledge
                                    ? Number(
                                          utils.formatEther(
                                              totaldata.totalExchangerPledge,
                                          ),
                                      )
                                    : 0}{' '}
                                ERB
                            </p>
                            <p
                                className={
                                    Exchange_ls.ExchangeBox_headerTitle_d_left_name
                                }
                            >
                                Total Staker Pledge Amount
                            </p>
                        </div>
                        {/* <img
                            src={require('../../assets/images/Staker/Staker1.png')}
                        /> 
                </div> 
                    */}
                    <div className={Exchange_ls.ExchangeBox_headerTitle_d}>
                        <div
                            className={
                                Exchange_ls.ExchangeBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    Exchange_ls.ExchangeBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalStaker || 0}
                            </p>
                            <p
                                className={
                                    Exchange_ls.ExchangeBox_headerTitle_d_left_name
                                }
                            >
                                Staker Number
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/Staker/Staker2.png')}
                        />
                    </div>
                    <div className={Exchange_ls.ExchangeBox_headerTitle_d}>
                        <div
                            className={
                                Exchange_ls.ExchangeBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    Exchange_ls.ExchangeBox_headerTitle_d_left_data
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
                                    Exchange_ls.ExchangeBox_headerTitle_d_left_name
                                }
                            >
                                Total Staking ERBs
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/Staker/Staker3.png')}
                        />
                    </div>
                </div>
                {/* 表格 */}
                <div
                    className={Exchange_ls.ExchangeBox_table}
                    id="ExchangeTable"
                >
                    <p className={Exchange_ls.ExchangeBox_table_title}>
                        STAKER INFORMATION
                    </p>
                    <Table
                        columns={columns}
                        dataSource={exchangerdata}
                        pagination={false}
                    />
                    <div
                        className={Exchange_ls.ExchangeBox_Pagination}
                        id="ExchangeBoxPagination"
                    >
                        <Pagination
                            defaultCurrent={1}
                            total={totaldata.totalStaker}
                            onChange={onChange}
                            showSizeChanger={false}
                            current={pagenumber}
                        />
                        <div className={Exchange_ls.ExchangeBox_Pagination_d}>
                            10/Page
                        </div>
                        <span
                            className={Exchange_ls.ExchangeBox_Pagination_span1}
                        >
                            To
                        </span>
                        <input
                            id="Exchangeinputnumber"
                            className={Exchange_ls.ExchangeBox_Pagination_input}
                            onKeyDown={Exchangeinputnumberonclick}
                        />
                        <span
                            className={Exchange_ls.ExchangeBox_Pagination_span2}
                        >
                            Page
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
