import NFT_ls from './NFT.less';
import { Space, Table, Tag, Pagination } from 'antd';
import { Link } from 'umi';
import {
    erbprice,
    total,
    epoch,
    block,
    rewardperson,
    nft,
    nftchart,
} from '../../api/request_data/block_request';
import moment from 'moment';
import { utils } from 'ethers';
import { stagenumber, timestamp, ellipsis } from '../../utils/methods/Methods';
import { Chart, LineAdvance } from 'bizcharts';
import FileViewer from 'react-file-viewer';
import React, { useState, useEffect } from 'react';
export default function NFT() {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    //总数
    const [totaldata, setTotaldata] = useState({});
    //nft
    const [nftdata, setNftdata] = useState({});
    //nft折线图
    const [nftchartdata, setNftchartdata] = useState([]);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, data) => (
                <Link
                    to={{ pathname: '/NFT/NFTDetails', state: { nftid: data } }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {Number(text) != 0 ? text : ''}
                </Link>
            ),
            ellipsis: true,
        },
        {
            title: 'Creation Time',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (text) => (
                <span>
                    {moment(parseInt(text) * 1000).format(
                        'YYYY-MM-DD HH:mm:ss',
                    )}
                </span>
            ),
            ellipsis: true,
        },
        {
            title: 'Price',
            dataIndex: 'last_price',
            key: 'last_price',
            render: (text) => (
                <span>
                    {text != 0 && text != null
                        ? text / 1000000000000000000 + ' ERB'
                        : 'No Bid'}{' '}
                </span>
            ),
            ellipsis: true,
        },
        {
            title: 'Collection',
            key: 'collectionName',
            dataIndex: 'collectionName',
            ellipsis: true,
        },
        {
            title: 'Author',
            key: 'creator',
            dataIndex: 'creator',
            ellipsis: true,
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetail/${text}`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
        },
        {
            title: 'Owner',
            key: 'owner',
            dataIndex: 'owner',
            ellipsis: true,
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetail/${text}`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
        },
        {
            title: 'Listed Marketplaces',
            key: 'exchanger_addr',
            dataIndex: 'exchanger_addr',
            ellipsis: true,
            render: (text, data) => (
                <Link
                    to={{
                        pathname: '/Exchange/ExchangeDetails',
                        state: { exchangeid: text },
                    }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
        },
    ];
    //nft分页
    let pagedata = {
        exchanger: '',
        owner: '',
        collection_id: '',
        page: pagenumber,
        page_size: pagenumbersize,
    };
    const onChange = (data) => {
        setPagenumber(data);
    };
    useEffect(() => {
        total_q();
        nft_q(pagedata);
        nftchart_q();
    }, []);
    useEffect(() => {
        nft_q(pagedata);
    }, [pagenumber]);
    //总数查询
    const total_q = async () => {
        const data = await total();
        if (data) {
            setTotaldata(data);
        }
    };
    //NFT折线图
    const nftchart_q = async () => {
        const data = await nftchart();
        let text = [
            {
                hour: 0,
                num: 0,
            },
            {
                hour: 1,
                num: 0,
            },
            {
                hour: 2,
                num: 0,
            },
            {
                hour: 3,
                num: 0,
            },
            {
                hour: 4,
                num: 0,
            },
            {
                hour: 5,
                num: 0,
            },
            {
                hour: 6,
                num: 0,
            },
            {
                hour: 7,
                num: 0,
            },
            {
                hour: 8,
                num: 0,
            },
            {
                hour: 9,
                num: 0,
            },
            {
                hour: 10,
                num: 0,
            },
            {
                hour: 11,
                num: 0,
            },
            {
                hour: 12,
                num: 0,
            },
            {
                hour: 13,
                num: 0,
            },
            {
                hour: 14,
                num: 0,
            },
            {
                hour: 15,
                num: 0,
            },
            {
                hour: 16,
                num: 0,
            },
            {
                hour: 17,
                num: 0,
            },
            {
                hour: 18,
                num: 0,
            },
            {
                hour: 19,
                num: 0,
            },
            {
                hour: 20,
                num: 0,
            },
            {
                hour: 21,
                num: 0,
            },
            {
                hour: 22,
                num: 0,
            },
            {
                hour: 23,
                num: 0,
            },
        ];
        if (data) {
            if (data) {
                for (let i = 0; i < text.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (text[i].hour == data[j].hour) {
                            text[i] = data[j];
                        }
                    }
                }
                setNftchartdata(text);
            }
        } else {
            setNftchartdata(text);
        }
    };
    //nft查询
    const nft_q = async (item) => {
        const data = await nft(item);
        if (data) {
            setNftdata(data);
        }
    };
    function NFTinputnumberonclick(e) {
        let data = document.getElementById('NFTinputnumber').value;
        if (e.keyCode == 13) {
            if (Number(data) != NaN) {
                setPagenumber(Number(data));
            }
        }
    }
    return (
        <>
            <div className={NFT_ls.NFTBox}>
                {/* 头部三块数据 */}
                <div className={NFT_ls.NFTBox_headerTitle}>
                    <div className={NFT_ls.NFTBox_headerTitle_d}>
                        <div className={NFT_ls.NFTBox_headerTitle_d_left}>
                            <p
                                className={
                                    NFT_ls.NFTBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalNFT || 0}
                            </p>
                            <p
                                className={
                                    NFT_ls.NFTBox_headerTitle_d_left_name
                                }
                            >
                                Total Number of NFTs
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/NFT/NFT1.png')}
                        />
                    </div>
                    <div className={NFT_ls.NFTBox_headerTitle_d}>
                        <div className={NFT_ls.NFTBox_headerTitle_d_left}>
                            <p
                                className={
                                    NFT_ls.NFTBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalNFTCreator || 0}
                            </p>
                            <p
                                className={
                                    NFT_ls.NFTBox_headerTitle_d_left_name
                                }
                            >
                                Number of NFT Creators
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/NFT/NFT2.png')}
                        />
                    </div>
                    <div className={NFT_ls.NFTBox_headerTitle_d}>
                        <div className={NFT_ls.NFTBox_headerTitle_d_left}>
                            <p
                                className={
                                    NFT_ls.NFTBox_headerTitle_d_left_data
                                }
                                style={{ color: '#FF1A8D' }}
                            >
                                +
                                {Math.floor(
                                    (totaldata.total24HNFT /
                                        totaldata.totalNFT) *
                                        100,
                                ) / 100 || 0}
                                %
                            </p>
                            <p
                                className={
                                    NFT_ls.NFTBox_headerTitle_d_left_name
                                }
                            >
                                Growth in Total NFTs
                            </p>
                        </div>
                        <div className={NFT_ls.NFTBox_headerTitle_d_right}>
                            <Chart
                                autoFit
                                height="84px"
                                data={nftchartdata}
                                width="159px"
                                pure
                            >
                                <LineAdvance
                                    shape="smooth"
                                    point={false}
                                    area
                                    size={2}
                                    position="hour*num"
                                    color="#FF34AA"
                                />
                            </Chart>
                        </div>
                    </div>
                </div>
                {/* 表格 */}
                <div className={NFT_ls.NFTBox_table} id="NFTTable">
                    <p className={NFT_ls.NFTBox_table_title}>NFT</p>
                    <Table
                        columns={columns}
                        dataSource={nftdata.nfts}
                        pagination={false}
                    />
                    <div
                        className={NFT_ls.NFTBox_Pagination}
                        id="NFTBoxPagination"
                    >
                        <Pagination
                            defaultCurrent={1}
                            total={nftdata.total}
                            onChange={onChange}
                            showSizeChanger={false}
                            current={pagenumber}
                        />
                        <div className={NFT_ls.NFTBox_Pagination_d}>
                            10/Page
                        </div>
                        <span className={NFT_ls.NFTBox_Pagination_span1}>
                            To
                        </span>
                        <input
                            id="NFTinputnumber"
                            className={NFT_ls.NFTBox_Pagination_input}
                            onKeyDown={NFTinputnumberonclick}
                        />
                        <span className={NFT_ls.NFTBox_Pagination_span2}>
                            Page
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
