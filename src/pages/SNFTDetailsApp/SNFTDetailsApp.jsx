import SNFTDetailsApp_ls from './SNFTDetailsApp.less';
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
export default function SNFTDetailsApp(props) {
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
                    to={{ pathname: `/TradeDetailApp/${text}`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
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
                        pathname: '/ExchangeApp/ExchangeDetailsApp',
                        state: { exchangeid: text },
                    }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
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
                    to={{ pathname: `/AccountDetailApp/${text}`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
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
                    to={{ pathname: `/AccountDetailApp/${text}`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
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
    const handleChange = (value) => {};
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
            // } else if (
            //     props.location.state == undefined &&
            //     Object.keys(props.location.query).length != 0
            // ) {
            //     localStorage.setItem(
            //         'snfttext',
            //         JSON.stringify(props.location.query.snftid),
            //     );
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
        if (data) {
            setSnftdata(data);
        }
    };
    //snft交易查询
    const snft_nft_tx_q = async (item) => {
        const data = await snft_nft_tx(item);
        if (data) {
            setSnfttxdata(data);
        }
    };
    //meta查询
    const metainformation_q = async (item) => {
        const data = await metainformation(item);
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
                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_d
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
    function onChange1(newValue) {}
    return (
        <>
            <div className={SNFTDetailsApp_ls.SNFTDetailsBox}>
                <div className={SNFTDetailsApp_ls.SNFTDetailsBox_title}>
                    S-NFT Details
                </div>
                <div className={SNFTDetailsApp_ls.SNFTDetailsBox_titleData}>
                    <div
                        className={
                            SNFTDetailsApp_ls.SNFTDetailsBox_titleData_imgBox
                        }
                    >
                        <img
                            className={
                                SNFTDetailsApp_ls.SNFTDetailsBox_titleData_imgBox_img
                            }
                            src={snftdata.source_url}
                        />
                        {/* 图片 */}
                    </div>
                    <div
                        className={
                            SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text
                        }
                    >
                        <div
                            className={
                                SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute
                            }
                        >
                            <div
                                className={
                                    SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_left
                                }
                            >
                                <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_left_namebig
                                    }
                                >
                                    {snftdata.name}
                                </p>
                                <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Address
                                </p>
                                <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Price
                                </p>
                                <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Owner
                                </p>
                                {/* <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Author
                                </p> */}
                                <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Belong To
                                </p>
                                <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    S-NFT Creator
                                </p>
                                <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Royalties
                                </p>
                            </div>
                            <div
                                className={
                                    SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right
                                }
                            >
                                <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_namebig
                                    }
                                >
                                    {/* {Object.keys(snftdata) != 0 ? (
                                        <span>
                                            {snftdata.address.length >= 39 ? (
                                                <Tooltip
                                                    title="L3"
                                                    color="#4D4D55"
                                                >
                                                    <span
                                                        className={
                                                            SNFTDetailsApp_ls.SNFTBox_tablelevelPeriod
                                                        }
                                                    >
                                                        {parseInt(
                                                            '0x' +
                                                                snftdata.address.slice(
                                                                    4,
                                                                    39,
                                                                ),
                                                        ) + 1}
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                ' '
                                            )}
                                            {snftdata.address.length >= 40 ? (
                                                <Tooltip
                                                    title="L2"
                                                    color="#4D4D55"
                                                >
                                                    <span
                                                        className={
                                                            SNFTDetailsApp_ls.SNFTBox_tablelevelCollection
                                                        }
                                                    >
                                                        {parseInt(
                                                            '0x' +
                                                                snftdata.address.slice(
                                                                    39,
                                                                    40,
                                                                ),
                                                        ) + 1}
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                ''
                                            )}
                                            {snftdata.address.length >= 41 ? (
                                                <Tooltip
                                                    title="L1"
                                                    color="#4D4D55"
                                                >
                                                    <span
                                                        className={
                                                            SNFTDetailsApp_ls.SNFTBox_tablelevelnft
                                                        }
                                                    >
                                                        {parseInt(
                                                            '0x' +
                                                                snftdata.address.slice(
                                                                    40,
                                                                    41,
                                                                ),
                                                        ) + 1}
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                ''
                                            )}
                                            {snftdata.address.length >= 42 ? (
                                                <Tooltip
                                                    title="L0"
                                                    color="#4D4D55"
                                                >
                                                    <span
                                                        className={
                                                            SNFTDetailsApp_ls.SNFTBox_tablelevelsnft
                                                        }
                                                    >
                                                        {parseInt(
                                                            '0x' +
                                                                snftdata.address.slice(
                                                                    41,
                                                                    42,
                                                                ),
                                                        ) + 1}
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                ''
                                            )}
                                        </span>
                                    ) : (
                                        ''
                                    )} */}
                                    {Object.keys(snftdata) != 0 ? (
                                        snftdata.address.length == 42 ? (
                                            <span
                                                className={
                                                    SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftname_lx1
                                                }
                                            >
                                                S-NFT
                                            </span>
                                        ) : snftdata.address.length == 41 ? (
                                            <span
                                                className={
                                                    SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftname_lx2
                                                }
                                            >
                                                NFT
                                            </span>
                                        ) : snftdata.address.length == 40 ? (
                                            <span
                                                className={
                                                    SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftname_lx3
                                                }
                                            >
                                                Collection
                                            </span>
                                        ) : snftdata.address.length == 39 ? (
                                            <span
                                                className={
                                                    SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftname_lx4
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
                                            SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftname_block
                                        }
                                    >
                                        #{snftdata.reward_number}
                                    </span>
                                    <span
                                        className={
                                            SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftname_blocktime
                                        }
                                    >
                                        {moment(
                                            parseInt(snftdata.reward_at) * 1000,
                                        ).format('YYYY-MM-DD')}
                                    </span>
                                </p>
                                <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                >
                                    {snftdata.address
                                        ? ellipsis(snftdata.address)
                                        : '-'}
                                </p>
                                {snftdata.last_price ? (
                                    <p
                                        className={
                                            SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
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
                                            SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                    >
                                        No Bid
                                    </p>
                                )}
                                <Link
                                    to={{
                                        pathname: `/AccountDetailApp/${snftdata.owner}`,
                                        state: snftdata.owner,
                                    }}
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                    style={{ color: '#7AA4FF' }}
                                >
                                    {snftdata.owner
                                        ? ellipsis(snftdata.owner)
                                        : '-'}
                                </Link>
                                {/* {snftdata.exchanger ==
                                '0x0000000000000000000000000000000000000000' ? (
                                    <p
                                        className={
                                            SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                    >
                                        Official Account
                                    </p>
                                ) : (
                                    <Link
                                        to={{
                                            pathname: `/AccountDetailApp/${snftdata.creator}`,
                                            state: snftdata.creator,
                                        }}
                                        className={
                                            SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                        style={{ color: '#7AA4FF' }}
                                    >
                                        {snftdata.creator
                                            ? ellipsis(snftdata.creator)
                                            : '-'}
                                    </Link>
                                )} */}
                                <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
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
                                            SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                        id="soloimg"
                                    >
                                        Official S-NFT
                                    </p>
                                ) : (
                                    <Link
                                        to={{
                                            pathname: `/AccountDetailApp/${snftdata.creator}`,
                                            state: snftdata.creator,
                                        }}
                                        className={
                                            SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                        style={{ color: '#7AA4FF' }}
                                        id="soloimg"
                                    >
                                        {snftdata.exchanger
                                            ? ellipsis(snftdata.exchanger)
                                            : '-'}
                                    </Link>
                                )}
                                <p
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
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
                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_buttonBox
                    }
                >
                    {transactionmetadata == 0 ? (
                        <div
                            className={
                                SNFTDetailsApp_ls.SNFTDetailsBox_titleData_buttonBox_Transactionhistory1
                            }
                            onClick={transactionmeta.bind(this, 0)}
                        >
                            TXN History
                        </div>
                    ) : (
                        <div
                            className={
                                SNFTDetailsApp_ls.SNFTDetailsBox_titleData_buttonBox_Transactionhistory2
                            }
                        >
                            TXN History
                        </div>
                    )}
                    {transactionmetadata == 1 ? (
                        <div
                            className={
                                SNFTDetailsApp_ls.SNFTDetailsBox_titleData_buttonBox_metaData1
                            }
                            onClick={transactionmeta.bind(this, 1)}
                        >
                            Metadata
                        </div>
                    ) : (
                        <div
                            className={
                                SNFTDetailsApp_ls.SNFTDetailsBox_titleData_buttonBox_metaData2
                            }
                        >
                            Metadata
                        </div>
                    )}
                </div>
                {transactionmetadata == 1 ? (
                    <div className={SNFTDetailsApp_ls.tableBox}>
                        <div
                            className={SNFTDetailsApp_ls.SNFTDetailsBox_table}
                            id="SNFTDetailsTableApp"
                        >
                            <Table
                                columns={columns}
                                dataSource={snfttxdata.nft_txs}
                                pagination={false}
                            />
                            <div
                                className={
                                    SNFTDetailsApp_ls.SNFTDetailsBox_Pagination
                                }
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
                                        SNFTDetailsApp_ls.SNFTDetailsBox_Pagination_d
                                    }
                                >
                                    10/Page
                                </div>
                                <span
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_Pagination_span1
                                    }
                                >
                                    To
                                </span>
                                <input
                                    id="SNFTDetailsinputnumber"
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_Pagination_input
                                    }
                                    onKeyDown={SNFTDetailsinputnumberonclick}
                                />
                                <span
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_Pagination_span2
                                    }
                                >
                                    Page
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={SNFTDetailsApp_ls.SNFTDetailsBox_meta}>
                        <p
                            className={
                                SNFTDetailsApp_ls.SNFTDetailsBox_meta_title
                            }
                            id="SNFTDetailsBoxmetatitleApp"
                        >
                            <p
                                className={
                                    SNFTDetailsApp_ls.SNFTDetailsBox_meta_title_whaturl
                                }
                            >
                                Metadata retrieved from token URL: <br />
                            </p>
                            <p
                                onClick={() => {
                                    window.open(
                                        'https://hub.wormholes.com' +
                                            snftdata.meta_url,
                                    );
                                }}
                                className={
                                    SNFTDetailsApp_ls.SNFTDetailsBox_meta_title_url
                                }
                            >
                                <span>
                                    https://hub.wormholes.com{snftdata.meta_url}
                                </span>
                            </p>
                            <Select
                                defaultValue="ViewMetaplexMetadata"
                                style={{
                                    width: 174,
                                    marginLeft: '140px',
                                }}
                                suffixIcon={
                                    <>
                                        <DownOutlined
                                            style={{
                                                color: '#ffffff',
                                                fontSize: '11px',
                                                lineHeight: '11px',
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
                        <div className={SNFTDetailsApp_ls.tableBox2}>
                            <div
                                className={
                                    SNFTDetailsApp_ls.SNFTDetailsBox_meta_codeBox
                                }
                            >
                                <pre>
                                    <code style={{ color: '#ffffff' }}>
                                        {JSON.stringify(metadata, null, ' ')}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
