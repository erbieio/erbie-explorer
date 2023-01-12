import NFTDetails_ls from './NFTDetails.less';
import SearchBox from '@/components/SearchBox/SearchBox';
import Icon, { DownOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import { Space, Table, Tag, Pagination, Tooltip, Select } from 'antd';
import { Link } from 'umi';
import moment from 'moment';
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
    nftdetails,
} from '../../api/request_data/block_request';
import { utils } from 'ethers';
import FileViewer from 'react-file-viewer';
import { stagenumber, timestamp, ellipsis } from '../../utils/methods/Methods';
const { Option } = Select;
export default function NFTDetails(props) {
    console.log(JSON.parse(localStorage.getItem('nfttext')));
    const [transactionmetadata, setTransactionmeta] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    const [pagenumber, setPagenumber] = useState(1);
    //nft
    const [nftdata, setNftdata] = useState({});
    //nft交易
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
            title: 'Sender',
            dataIndex: 'from',
            key: 'from',
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
            title: 'Receiver',
            key: 'to',
            dataIndex: 'to',
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
            title: 'Block Height',
            key: 'block_number',
            dataIndex: 'block_number',
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
        },
        {
            title: 'Value',
            key: 'price',
            dataIndex: 'price',
            render: (text) => (
                <span>{text ? utils.formatEther(String(text)) : 0}</span>
            ),
        },
    ];
    //snft交易分页
    let pagedata = {
        address:
            props.location.state != undefined
                ? props.location.state.nftid.address
                : JSON.parse(localStorage.getItem('nfttext')).address,
        exchanger: '',
        account: '',
        page: pagenumber,
        page_size: pagenumbersize,
    };
    const onChange = (data) => {
        setPagenumber(data);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    useEffect(() => {
        console.log(props.location.state.nftid);
        if (props.location.state != undefined) {
            localStorage.setItem(
                'nfttext',
                JSON.stringify(props.location.state.nftid),
            );
        }
        nftdetails_q(
            JSON.parse(localStorage.getItem('nfttext')).address ||
                props.location.state.nftid.address,
        );
        snft_nft_tx_q(pagedata);

        console.log(Object.keys(metadata).length);
    }, []);
    useEffect(() => {
        snft_nft_tx_q(pagedata);
    }, [pagenumber]);
    useEffect(() => {
        if (Object.keys(nftdata).length != 0) {
            metainformation_q(nftdata.meta_url);
        }
    }, [nftdata]);
    //snft详情查询
    const nftdetails_q = async (item) => {
        const data = await nftdetails(item);
        console.log('nft详情查询');
        console.log(data);
        if (data) {
            setNftdata(data);
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
        if (item != '') {
            const data = await metainformation(item);
            console.log('meta查询');
            console.log(data);
            if (data) {
                setMetadata(data);
            }
        }
    };
    function NFTDetailsinputnumberonclick(e) {
        let data = document.getElementById('NFTDetailsinputnumber').value;
        if (e.keyCode == 13) {
            if (Number(data) != NaN) {
                setPagenumber(Number(data));
            }
        }
    }
    function nftattribute(data) {
        if (data) {
            if (JSON.parse(data).length != 0) {
                return JSON.parse(data).map((item) => {
                    if (Object.keys(item).length == 2) {
                        return (
                            <div
                                className={
                                    NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right_d
                                }
                            >
                                <p>{item.trait_type}</p>
                                <br />
                                <p>{item.value}</p>
                            </div>
                        );
                    } else if (Object.keys(item).length == 3) {
                        return (
                            <div
                                className={
                                    NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right_d
                                }
                            >
                                <p>{item.trait_type}</p>
                                <br />
                                <p>
                                    {item.value}~{item.max_value}
                                </p>
                            </div>
                        );
                    } else if (Object.keys(item).length == 4) {
                        return (
                            <div
                                className={
                                    NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right_d
                                }
                            >
                                <p>{item.trait_type}</p>
                                <br />
                                <p>
                                    {item.value}~{item.max_value}
                                </p>
                            </div>
                        );
                    }
                });
            } else {
                return <div>No Properties</div>;
            }
        }
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
            <div className={NFTDetails_ls.NFTDetailsBox}>
                <div className={NFTDetails_ls.NFTDetailsBox_title}>
                    NFT Details
                    <SearchBox />
                </div>
                <div className={NFTDetails_ls.NFTDetailsBox_titleData}>
                    <div
                        className={NFTDetails_ls.NFTDetailsBox_titleData_imgBox}
                    >
                        {/* 图片 */}
                        {/* <img className={NFTDetails_ls.NFTDetailsBox_titleData_imgBoximg} src={nftdata.source_url} /> */}
                        {Object.keys(metadata).length != 0 &&
                        metadata.fileType != 'mp3' ? (
                            <FileViewer
                                className={
                                    NFTDetails_ls.NFTDetailsBox_titleData_imgBoximg
                                }
                                fileType={metadata.fileType.toLowerCase()} //文件类型
                                filePath={nftdata.source_url} //文件地址
                            />
                        ) : Object.keys(metadata).length != 0 &&
                          metadata.fileType == 'mp3' ? (
                            <div
                                style={{ width: '100%', height: '100%' }}
                                className={
                                    NFTDetails_ls.NFTDetailsBox_titleData_imgBox_bg
                                }
                            >
                                <FileViewer
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_imgBoximg
                                    }
                                    fileType={metadata.fileType.toLowerCase()} //文件类型
                                    filePath={nftdata.source_url} //文件地址
                                />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className={NFTDetails_ls.NFTDetailsBox_titleData_text}>
                        <p
                            className={
                                NFTDetails_ls.NFTDetailsBox_titleData_text_nftname
                            }
                        >
                            {nftdata.name}
                        </p>
                        <div
                            className={
                                NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute
                            }
                        >
                            <div
                                className={
                                    NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_left
                                }
                            >
                                <p
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Price
                                </p>
                                <p
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Collection Name
                                </p>
                                <p
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Author
                                </p>
                                <p
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Owner
                                </p>
                                <p
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Minting Marketplace
                                </p>
                                <p
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Royalties
                                </p>
                                <p
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    NFT Properties
                                </p>
                            </div>
                            <div
                                className={
                                    NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right
                                }
                            >
                                <p
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                >
                                    {nftdata.last_price &&
                                    nftdata.last_price != 0
                                        ? utils.formatEther(
                                              String(nftdata.last_price),
                                          ) + ' ERB'
                                        : 'No Bid'}
                                    {/* ($ {nftdata.last_price ? utils.formatEther(nftdata.last_price) : 0}) */}
                                </p>
                                <p
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                >
                                    {nftdata.collectionName || '-'}
                                </p>
                                <Link
                                    to={{
                                        pathname: `/AccountDetail/${nftdata.creator}`,
                                        state: nftdata.creator,
                                    }}
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                    style={{ color: '#7AA4FF' }}
                                >
                                    {nftdata.creator || '-'}
                                </Link>
                                <Link
                                    to={{
                                        pathname: `/AccountDetail/${nftdata.owner}`,
                                        state: nftdata.owner,
                                    }}
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                    style={{ color: '#7AA4FF' }}
                                >
                                    {nftdata.owner || '-'}
                                </Link>
                                {nftdata.exchanger_addr ? (
                                    <Link
                                        to={{
                                            pathname:
                                                '/Exchange/ExchangeDetails',
                                            state: {
                                                exchangeid:
                                                    nftdata.exchanger_addr,
                                            },
                                        }}
                                        className={
                                            NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                        style={{ color: '#7AA4FF' }}
                                        id="soloimg"
                                    >
                                        {nftdata.exchanger_addr} Marketplace
                                        <Tooltip
                                            title="Exclusive"
                                            color="#3F4357"
                                        >
                                            <img
                                                className={
                                                    NFTDetails_ls.NFTDetailsBox_soloimg
                                                }
                                                src={require('@/assets/images/NFTDetails/1.png')}
                                            />
                                        </Tooltip>
                                    </Link>
                                ) : (
                                    <span
                                        className={
                                            NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                        }
                                        id="soloimg"
                                    >
                                        -
                                    </span>
                                )}

                                <p
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                >
                                    {nftdata.royalty_ratio / 100}%
                                </p>
                                <div
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                >
                                    {nftattribute(nftdata.attributes)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 交易历史-Meta信息   按钮 */}
                <div
                    className={NFTDetails_ls.NFTDetailsBox_titleData_buttonBox}
                >
                    {transactionmetadata == 0 ? (
                        <div
                            className={
                                NFTDetails_ls.NFTDetailsBox_titleData_buttonBox_Transactionhistory1
                            }
                            onClick={transactionmeta.bind(this, 0)}
                        >
                            TXN History
                        </div>
                    ) : (
                        <div
                            className={
                                NFTDetails_ls.NFTDetailsBox_titleData_buttonBox_Transactionhistory2
                            }
                        >
                            TXN History
                        </div>
                    )}
                    {transactionmetadata == 1 ? (
                        <div
                            className={
                                NFTDetails_ls.NFTDetailsBox_titleData_buttonBox_metaData1
                            }
                            onClick={transactionmeta.bind(this, 1)}
                        >
                            Metadata
                        </div>
                    ) : (
                        <div
                            className={
                                NFTDetails_ls.NFTDetailsBox_titleData_buttonBox_metaData2
                            }
                        >
                            Metadata
                        </div>
                    )}
                </div>
                {transactionmetadata == 1 ? (
                    <div
                        className={NFTDetails_ls.NFTDetailsBox_table}
                        id="NFTDetailsTable"
                    >
                        <Table
                            columns={columns}
                            dataSource={snfttxdata.nft_txs}
                            pagination={false}
                        />
                        <div
                            className={NFTDetails_ls.NFTDetailsBox_Pagination}
                            id="NFTDetailsBoxPagination"
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
                                    NFTDetails_ls.NFTDetailsBox_Pagination_d
                                }
                            >
                                10/Page
                            </div>
                            <span
                                className={
                                    NFTDetails_ls.NFTDetailsBox_Pagination_span1
                                }
                            >
                                To
                            </span>
                            <input
                                id="NFTDetailsinputnumber"
                                className={
                                    NFTDetails_ls.NFTDetailsBox_Pagination_input
                                }
                                onKeyDown={NFTDetailsinputnumberonclick}
                            />
                            <span
                                className={
                                    NFTDetails_ls.NFTDetailsBox_Pagination_span2
                                }
                            >
                                Page
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className={NFTDetails_ls.NFTDetailsBox_meta}>
                        <p
                            className={NFTDetails_ls.NFTDetailsBox_meta_title}
                            id="NFTDetailsBoxmetatitle"
                        >
                            <span
                                className={
                                    NFTDetails_ls.NFTDetailsBox_meta_title_whaturl
                                }
                            >
                                Metadata retrieved from token URL: <br />
                                <a
                                    href={
                                        'https://hub.wormholes.com' +
                                        nftdata.meta_url
                                    }
                                    className={
                                        NFTDetails_ls.NFTDetailsBox_meta_title_url
                                    }
                                >
                                    https://hub.wormholes.com{nftdata.meta_url}
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
                            className={NFTDetails_ls.NFTDetailsBox_meta_codeBox}
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
