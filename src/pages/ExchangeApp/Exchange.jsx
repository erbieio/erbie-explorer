import Exchange_ls from './Exchange.less';
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // render: (text, data) => <Link to={{ pathname: '/Exchange/ExchangeDetails', state: { exchangeid: data.address } }} style={{ color: '#7AA4FF' }}> {data.block_number != 0 ? hexCharCodeToStr(text) : text}</Link>,
            render: (text, data) => (
                <Link
                    to={{
                        pathname: '/ExchangeApp/ExchangeDetailsApp',
                        state: { exchangeid: data.address },
                    }}
                    style={{ color: '#7AA4FF' ,fontFamily:'CustomFontMedium' }}
                >
                    {text}
                </Link>
            ),
            // ellipsis: true,
        },
        {
            title: 'Block Height',
            dataIndex: 'block_number',
            key: 'block_number',
            render: (text, data) => (
                <Link
                    to={{
                        pathname: '/BlockChainApp/BlockDetailsApp',
                        state: { blockid: text },
                    }}
                    style={{ color: '#7AA4FF' ,fontFamily:'CustomFontMedium' }}
                >
                    {text}
                </Link>
            ),
        },
        {
            title: 'Owner',
            dataIndex: 'creator',
            key: 'creator',
            // ellipsis: true,
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetailApp/${text}`, state: text }}
                    style={{ color: '#7AA4FF' ,fontFamily:'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
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
            // ellipsis: true,
            render: (text) => <span>{utils.formatEther(String(text))}</span>,
            width: '140px',
        },
        {
            title: () => (
                <div className={Exchange_ls.tablexbox}>
                    Collections
                    {totalcollectionscolor == 0 ? (
                        <div className={Exchange_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                            />
                        </div>
                    ) : totalcollectionscolor == 1 ? (
                        <div className={Exchange_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Exchange_ls.tablex}>
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
            key: 'collectionCount',
            dataIndex: 'collectionCount',
            width: '140px',
            // ellipsis: true,
        },
        {
            title: () => (
                <div className={Exchange_ls.tablexbox}>
                    NFTs
                    {totalnftscolor == 0 ? (
                        <div className={Exchange_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalNFTs.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalNFTs.bind(this, 2)}
                            />
                        </div>
                    ) : totalnftscolor == 1 ? (
                        <div className={Exchange_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalNFTs.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TotalNFTs.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Exchange_ls.tablex}>
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
            key: 'nft_count',
            dataIndex: 'nft_count',
            width: '100px',
        },
        {
            title: () => (
                <div className={Exchange_ls.tablexbox}>
                    Fee Rate
                    {feeratecolor == 0 ? (
                        <div className={Exchange_ls.tablex}>
                            <CaretUpOutlined onClick={FeeRate.bind(this, 1)} />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                            />
                        </div>
                    ) : feeratecolor == 1 ? (
                        <div className={Exchange_ls.tablex}>
                            <CaretUpOutlined
                                onClick={FeeRate.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Exchange_ls.tablex}>
                            <CaretUpOutlined onClick={FeeRate.bind(this, 1)} />
                            <CaretDownOutlined
                                onClick={FeeRate.bind(this, 2)}
                                style={{ color: '#7AA4FF' }}
                            />
                        </div>
                    )}
                </div>
            ),
            key: 'fee_ratio',
            dataIndex: 'fee_ratio',
            render: (text) => <span>{text / 100} %</span>,
            width: '130px',
        },
        {
            title: () => (
                <div className={Exchange_ls.tablexbox}>
                    Transaction Value
                    {transactionvaluecolor == 0 ? (
                        <div className={Exchange_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TransactionValue.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TransactionValue.bind(this, 2)}
                            />
                        </div>
                    ) : transactionvaluecolor == 1 ? (
                        <div className={Exchange_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TransactionValue.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TransactionValue.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Exchange_ls.tablex}>
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
            key: 'tx_amount',
            dataIndex: 'tx_amount',
            render: (text) => <span>{utils.formatEther(text || 0)}</span>,
            width: '185px',
            // ellipsis: true,
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
        console.log('总数查询');
        console.log(data);
        if (data) {
            setTotaldata(data);
        }
    };
    //交易所查询
    const exchanger_q = async (item) => {
        const data = await exchanger(item);
        console.log('交易所查询');
        console.log(data);
        if (data) {
            // setExchangerdata(data);
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
    function hexCharCodeToStr(hexCharCodeStr) {
        try {
            let data = new Buffer(hexCharCodeStr, 'base64').toString();
            return data;
        } catch (error) {
            return hexCharCodeStr;
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
                setOrderdata('length(amount) asc, amount asc');
            }
        } else {
            if (stakevaluecolor == 2) {
                setStakevaluecolor(0);
                setOrderdata('');
            } else {
                setStakevaluecolor(2);
                setOrderdata('length(amount) desc, amount desc');
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
                setOrderdata('collection_count asc');
            }
        } else {
            if (totalcollectionscolor == 2) {
                setTotalcollectionscolor(0);
                setOrderdata('');
            } else {
                setTotalcollectionscolor(2);
                setOrderdata('collection_count desc');
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
                setOrderdata('nft_count asc');
            }
        } else {
            if (totalnftscolor == 2) {
                setTotalnftscolor(0);
                setOrderdata('');
            } else {
                setTotalnftscolor(2);
                setOrderdata('nft_count desc');
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
                setOrderdata('fee_ratio asc');
            }
        } else {
            if (feeratecolor == 2) {
                setFeeratecolor(0);
                setOrderdata('');
            } else {
                setFeeratecolor(2);
                setOrderdata('fee_ratio desc');
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
                setOrderdata('length(tx_amount) asc, tx_amount asc');
            }
        } else {
            if (transactionvaluecolor == 2) {
                setTransactionvaluecolor(0);
                setOrderdata('');
            } else {
                setTransactionvaluecolor(2);
                setOrderdata('length(tx_amount) desc, tx_amount desc');
            }
        }
    }
    return (
        <>
            <div className={Exchange_ls.ExchangeBox}>
                {/* 头部三块数据 */}
                <div className={Exchange_ls.ExchangeBox_headerTitle}>
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
                                {totaldata.totalNFTAmount
                                    ? Number(
                                          Number(
                                              utils.formatEther(
                                                  totaldata.totalNFTAmount,
                                              ),
                                          ) +
                                              Number(
                                                  utils.formatEther(
                                                      totaldata.totalSNFTAmount,
                                                  ),
                                              ),
                                      ).toFixed(5)
                                    : 0}{' '}
                                ERB
                            </p>
                            <p
                                className={
                                    Exchange_ls.ExchangeBox_headerTitle_d_left_name
                                }
                            >
                                Total Exchange Transaction Volume
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/Exchange/Exchange1.png')}
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
                                {totaldata.totalExchangerTx || 0}
                            </p>
                            <p
                                className={
                                    Exchange_ls.ExchangeBox_headerTitle_d_left_name
                                }
                            >
                                Total Transactions
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/Exchange/Exchange2.png')}
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
                                {totaldata.total24HExchangerTx != undefined &&
                                totaldata.totalExchangerTx != undefined &&
                                totaldata.totalExchangerTx != 0
                                    ? (
                                          (totaldata.total24HExchangerTx /
                                              totaldata.totalExchangerTx) *
                                          100
                                      ).toFixed(2) || 0
                                    : 0}
                                %
                            </p>
                            <p
                                className={
                                    Exchange_ls.ExchangeBox_headerTitle_d_left_name
                                }
                            >
                                Transaction Volume Growth Rate
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/Exchange/Exchange3.png')}
                        />
                    </div>
                </div>
                {/* 表格 */}
                <div
                    className={Exchange_ls.ExchangeBox_table}
                    id="ExchangeTable"
                >
                    <p className={Exchange_ls.ExchangeBox_table_title}>
                        MARKETPLACE
                    </p>
                    <Table
                        columns={columns}
                        dataSource={exchangerdata}
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                    />
                    <div
                        className={Exchange_ls.ExchangeBox_Pagination}
                        id="ExchangeBoxPagination"
                    >
                        <Pagination
                            defaultCurrent={1}
                            total={totaldata.totalExchanger}
                            onChange={onChange}
                            showSizeChanger={false}
                            current={pagenumber}
                        />
                        <div className={Exchange_ls.flexBox}>
                            <div
                                className={Exchange_ls.ExchangeBox_Pagination_d}
                            >
                                10/Page
                            </div>
                            <span
                                className={
                                    Exchange_ls.ExchangeBox_Pagination_span1
                                }
                            >
                                To
                            </span>
                            <input
                                id="Exchangeinputnumber"
                                className={
                                    Exchange_ls.ExchangeBox_Pagination_input
                                }
                                onKeyDown={Exchangeinputnumberonclick}
                            />
                            <span
                                className={
                                    Exchange_ls.ExchangeBox_Pagination_span2
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
