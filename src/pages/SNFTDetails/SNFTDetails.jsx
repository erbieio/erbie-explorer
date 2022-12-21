import SNFTDetails_ls from './SNFTDetails.less';
import SearchBox from '@/components/SearchBox/SearchBox';
import Icon, { DownOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import { Space, Table, Tag, Pagination, Tooltip, Select } from 'antd';
import { Link } from 'umi';
import {
    erbprice,
    total,
    epoch,
    block,
    rewardperson,
    nft,
    snft,
    snftdetails,
    snft_nft_tx,
    metainformation,
} from '../../api/request_data/block_request';
import moment from 'moment';
import { stagenumber, timestamp, ellipsis } from '../../utils/methods/Methods';
import { utils } from 'ethers';
const { Option } = Select;
export default function SNFTDetails(props) {
    // console.log(props.location.state.snftid);
    const [transactionmetadata, setTransactionmeta] = useState(1);
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    //snft
    const [snftdata, setSnftdata] = useState({});
    //snft交易
    const [snfttxdata, setSnfttxdata] = useState({});
    //meta
    const [metadata, setMetadata] = useState({});
    const columns = [
        {
            title: 'TXN Hash',
            dataIndex: 'tx_hash',
            key: 'tx_hash',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/TradeDetail/${text}`, state: text }}
                    style={{ color: '#7AA4FF',fontFamily:'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
            ellipsis: true,
        },
        {
            title: 'TXN Time',
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
            title: 'Transaction Marketplace',
            dataIndex: 'exchanger_addr',
            key: 'exchanger_addr',
            ellipsis: true,
            render: (text, data) => (
                <Link
                    to={{
                        pathname: '/Exchange/ExchangeDetails',
                        state: { exchangeid: text },
                    }}
                    style={{ color: '#7AA4FF',fontFamily:'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
        },
        {
            title: 'Sender',
            key: 'from',
            dataIndex: 'from',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetail/${text}`, state: text }}
                    style={{ color: '#7AA4FF',fontFamily:'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
        },
        {
            title: 'Receiver',
            key: 'to',
            dataIndex: 'to',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetail/${text}`, state: text }}
                    style={{ color: '#7AA4FF',fontFamily:'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
        },
        {
            title: 'Transaction Value (ERB)',
            key: 'price',
            dataIndex: 'price',
            render: (text) => (
                <span style={{ color: '#7AA4FF' }}>
                    {text ? utils.formatEther(String(text)) : 0}
                </span>
            ),
        },
    ];
    const onChange = (data) => {
        setPagenumber(data);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    //snft交易分页
    let pagedata = {
        address:
            props.location.state != undefined
                ? props.location.state.snftid
                : JSON.parse(localStorage.getItem('snfttext')),
        exchanger: '',
        account: '',
        page: pagenumber,
        page_size: pagenumbersize,
    };
    useEffect(() => {
        // console.log('传过来的地址' +props.location.state?props.location.state.snftid:JSON.parse(localStorage.getItem('snfttext')));
        // console.log('传过来的meta' );
        // console.log(props.location.state?props.location.state.snftmata:JSON.parse(localStorage.getItem('snftmata')));
        if (props.location.state != undefined) {
            localStorage.setItem(
                'snfttext',
                JSON.stringify(props.location.state.snftid),
            );
            localStorage.setItem(
                'snftmata',
                JSON.stringify(props.location.state.snftmata),
            );
        }
        snftdetails_q(
            JSON.parse(localStorage.getItem('snfttext')) ||
                props.location.state.snftid,
        );
        snft_nft_tx_q(pagedata);
    }, []);
    useEffect(() => {
        snft_nft_tx_q(pagedata);
    }, [pagenumber]);
    useEffect(() => {
        if (Object.keys(snftdata).length != 0) {
            metainformation_q(snftdata.meta_url);
        }
    }, [snftdata]);
    //snft详情查询
    const snftdetails_q = async (item) => {
        const data = await snftdetails(item);
        console.log('snft详情查询');
        console.log(data);
        if (data) {
            setSnftdata(data);
        }
    };
    //snft交易查询
    const snft_nft_tx_q = async (item) => {
        const data = await snft_nft_tx(item);
        console.log('snft交易查询');
        console.log(data);
        if (data) {
            setSnfttxdata(data);
        }
    };
    //meta查询
    const metainformation_q = async (item) => {
        const data = await metainformation(item);
        console.log('meta查询');
        console.log(data);
        if (data) {
            setMetadata(data);
        }
    };
    function SNFTDetailsinputnumberonclick(e) {
        let data = document.getElementById('SNFTDetailsinputnumber').value;
        if (e.keyCode == 13) {
            if (Number(data) != NaN) {
                setPagenumber(Number(data));
            }
        }
    }
    function nftattribute(data) {
        return data.map((item) => {
            return (
                <div
                    className={
                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_d
                    }
                >
                    {item}
                </div>
            );
        });
    }
    function transactionmeta(data) {
        if (data == 0) {
            setTransactionmeta(1);
        } else {
            setTransactionmeta(0);
        }
    }
    function onChange1(newValue) {
        console.log('change', newValue);
    }
    return (
        <>
            <div className={SNFTDetails_ls.SNFTDetailsBox}>
                <div className={SNFTDetails_ls.SNFTDetailsBox_title}>
                    S-NFT Details
                    <SearchBox />
                </div>
                <div className={SNFTDetails_ls.SNFTDetailsBox_titleData}>
                    <div
                        className={
                            SNFTDetails_ls.SNFTDetailsBox_titleData_imgBox
                        }
                    >
                        <img
                            className={
                                SNFTDetails_ls.SNFTDetailsBox_titleData_imgBox_img
                            }
                            src={snftdata.source_url}
                        />
                        {/* 图片 */}
                    </div>
                    <div
                        className={SNFTDetails_ls.SNFTDetailsBox_titleData_text}
                    >
                        <p
                            className={
                                SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftname
                            }
                        >
                            <span
                                className={
                                    SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftname_time
                                }
                            >
                                {moment(
                                    parseInt(snftdata.reward_at) * 1000,
                                ).format('YYYY-MM-DD')}
                            </span>
                        </p>
                        <div
                            className={
                                SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute
                            }
                        >
                            <div
                                className={
                                    SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_left
                                }
                            >
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_left_namebig
                                    }
                                >
                                    {snftdata.name}
                                </p>
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Address
                                </p>
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Price
                                </p>
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Owner
                                </p>
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Author
                                </p>
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Belong To
                                </p>
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    S-NFT Creator
                                </p>
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Royalties
                                </p>
                            </div>
                            <div
                                className={
                                    SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right
                                }
                            >
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_namebig
                                    }
                                >
                                    {Object.keys(snftdata) != 0 ? (
                                        snftdata.address.length == 42 ? (
                                            <span
                                                className={
                                                    SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftname_lx1
                                                }
                                            >
                                                S-NFT
                                            </span>
                                        ) : snftdata.address.length == 41 ? (
                                            <span
                                                className={
                                                    SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftname_lx2
                                                }
                                            >
                                                NFT
                                            </span>
                                        ) : snftdata.address.length == 40 ? (
                                            <span
                                                className={
                                                    SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftname_lx3
                                                }
                                            >
                                                Collection
                                            </span>
                                        ) : snftdata.address.length == 39 ? (
                                            <span
                                                className={
                                                    SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftname_lx4
                                                }
                                            >
                                                Period
                                            </span>
                                        ) : (
                                            ''
                                        )
                                    ) : (
                                        ''
                                    )}
                                    <span
                                        className={
                                            SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftname_block
                                        }
                                    >
                                        #{snftdata.reward_number}
                                    </span>
                                </p>
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                >
                                    {snftdata.address}
                                </p>
                                {snftdata.last_price ? (
                                    <p
                                        className={
                                            SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                    >
                                        {utils.formatEther(snftdata.last_price)}{' '}
                                        ERB (${' '}
                                        {utils.formatEther(snftdata.last_price)}
                                        )
                                    </p>
                                ) : (
                                    <p
                                        className={
                                            SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                    >
                                        No Bid
                                    </p>
                                )}
                                <Link
                                    to={{
                                        pathname: `/AccountDetail/${snftdata.owner}`,
                                        state: snftdata.owner,
                                    }}
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                    style={{ color: '#7AA4FF' }}
                                >
                                    {snftdata.owner ? snftdata.owner : '-'}
                                </Link>
                                {snftdata.exchanger ==
                                '0x0000000000000000000000000000000000000000' ? (
                                    <p
                                        className={
                                            SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                    >
                                        Official Account
                                    </p>
                                ) : (
                                    <Link
                                        to={{
                                            pathname: `/AccountDetail/${snftdata.creator}`,
                                            state: snftdata.creator,
                                        }}
                                        className={
                                            SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                        style={{ color: '#7AA4FF' }}
                                    >
                                        {snftdata.creator
                                            ? snftdata.creator
                                            : '-'}
                                    </Link>
                                )}
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                    // style={{ color: '#7AA4FF' }}
                                >
                                    {snftdata.collectionName}
                                    &nbsp;Collection&nbsp;&nbsp;/&nbsp;&nbsp;
                                    {snftdata.address
                                        ? stagenumber(
                                              snftdata.address.slice(3, 39),
                                          )
                                        : ''}{' '}
                                    Stage
                                </p>
                                {/* {
                                    snftdata.exchanger
                                } */}
                                {snftdata.creator ==
                                '0x0000000000000000000000000000000000000000' ? (
                                    <p
                                        className={
                                            SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                        id="soloimg"
                                    >
                                        Official S-NFT
                                    </p>
                                ) : (
                                    <Link
                                        to={{
                                            pathname: `/AccountDetail/${snftdata.creator}`,
                                            state: snftdata.creator,
                                        }}
                                        className={
                                            SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                        style={{ color: '#7AA4FF' }}
                                        id="soloimg"
                                    >
                                        {snftdata.exchanger}
                                    </Link>
                                )}
                                <Link
                                    to={{
                                        pathname: '/Exchange/ExchangeDetails',
                                        state: {
                                            exchangeid: snftdata.exchanger,
                                        },
                                    }}
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                    style={{ color: '#7AA4FF' }}
                                    id="soloimg"
                                >
                                    {}
                                </Link>
                                <p
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                >
                                    {snftdata.royaltyRatio / 100}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 交易历史-Meta信息   按钮 */}
                <div
                    className={
                        SNFTDetails_ls.SNFTDetailsBox_titleData_buttonBox
                    }
                >
                    {transactionmetadata == 0 ? (
                        <div
                            className={
                                SNFTDetails_ls.SNFTDetailsBox_titleData_buttonBox_Transactionhistory1
                            }
                            onClick={transactionmeta.bind(this, 0)}
                        >
                            TXN History
                        </div>
                    ) : (
                        <div
                            className={
                                SNFTDetails_ls.SNFTDetailsBox_titleData_buttonBox_Transactionhistory2
                            }
                        >
                            TXN History
                        </div>
                    )}
                    {transactionmetadata == 1 ? (
                        <div
                            className={
                                SNFTDetails_ls.SNFTDetailsBox_titleData_buttonBox_metaData1
                            }
                            onClick={transactionmeta.bind(this, 1)}
                        >
                            Metadata
                        </div>
                    ) : (
                        <div
                            className={
                                SNFTDetails_ls.SNFTDetailsBox_titleData_buttonBox_metaData2
                            }
                        >
                            Metadata
                        </div>
                    )}
                </div>
                {transactionmetadata == 1 ? (
                    <div
                        className={SNFTDetails_ls.SNFTDetailsBox_table}
                        id="SNFTDetailsTable"
                    >
                        <Table
                            columns={columns}
                            dataSource={snfttxdata.nft_txs}
                            pagination={false}
                        />
                        <div
                            className={SNFTDetails_ls.SNFTDetailsBox_Pagination}
                            id="SNFTDetailsBoxPagination"
                        >
                            <Pagination
                                defaultCurrent={1}
                                total={snfttxdata.total}
                                onChange={onChange}
                                showSizeChanger={false}
                                current={pagenumber}
                            />
                            <div
                                className={
                                    SNFTDetails_ls.SNFTDetailsBox_Pagination_d
                                }
                            >
                                10/Page
                            </div>
                            <span
                                className={
                                    SNFTDetails_ls.SNFTDetailsBox_Pagination_span1
                                }
                            >
                                To
                            </span>
                            <input
                                id="SNFTDetailsinputnumber"
                                className={
                                    SNFTDetails_ls.SNFTDetailsBox_Pagination_input
                                }
                                onKeyDown={SNFTDetailsinputnumberonclick}
                            />
                            <span
                                className={
                                    SNFTDetails_ls.SNFTDetailsBox_Pagination_span2
                                }
                            >
                                Page
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className={SNFTDetails_ls.SNFTDetailsBox_meta}>
                        <p
                            className={SNFTDetails_ls.SNFTDetailsBox_meta_title}
                            id="SNFTDetailsBoxmetatitle"
                        >
                            <span
                                className={
                                    SNFTDetails_ls.SNFTDetailsBox_meta_title_whaturl
                                }
                            >
                                Metadata retrieved from token URL: <br />
                                <a
                                    href={
                                        'https://hub.wormholes.com' +
                                        snftdata.meta_url
                                    }
                                    className={
                                        SNFTDetails_ls.SNFTDetailsBox_meta_title_url
                                    }
                                >
                                    https://hub.wormholes.com{snftdata.meta_url}
                                </a>
                            </span>
                            <Select
                                defaultValue="ViewMetaplexMetadata"
                                style={{
                                    width: 256,
                                }}
                                suffixIcon={
                                    <>
                                        <DownOutlined
                                            style={{
                                                color: '#ffffff',
                                                fontSize: '12px',
                                                lineHeight: '25px',
                                            }}
                                        />
                                    </>
                                }
                                onChange={handleChange}
                            >
                                <Option value="ViewMetaplexMetadata">
                                    View Metaplex Metadata
                                </Option>
                            </Select>
                        </p>
                        <div
                            className={
                                SNFTDetails_ls.SNFTDetailsBox_meta_codeBox
                            }
                        >
                            <pre>
                                <code style={{ color: '#ffffff' }}>
                                    {JSON.stringify(metadata, null, ' ')}
                                </code>
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
