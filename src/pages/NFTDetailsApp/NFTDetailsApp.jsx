import NFTDetailsApp_ls from './NFTDetailsApp.less';
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
    snftimageaddress,
} from '../../api/request_data/block_request';
import { utils } from 'ethers';
import FileViewer from 'react-file-viewer';
import {
    stagenumber,
    timestamp,
    ellipsis,
    hexToString,
    parseUrlParams,
} from '../../utils/methods/Methods';
import imgmr from '../../assets/images/HomePage/mr.png';
const { Option } = Select;
export default function NFTDetailsApp(props) {
    const [transactionmetadata, setTransactionmeta] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    const [pagenumber, setPagenumber] = useState(1);
    //nft
    const [nftdata, setNftdata] = useState({});
    //nft交易
    const [snfttxdata, setSnfttxdata] = useState({});
    //meta
    const [metadata, setMetadata] = useState({});
    // nft图片
    const [nftimage, setNftimage] = useState('');
    const columns = [
        {
            title: 'TXN Hash',
            dataIndex: 'tx_hash',
            key: 'tx_hash',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/TradeDetailApp`, state: text }}
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
                    to={{ pathname: `/AccountDetailApp`, state: text }}
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
                    to={{ pathname: `/AccountDetailApp`, state: text }}
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
                        pathname: '/NullPageApp',
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
                : localStorage.getItem('nfttext'),
        exchanger: '',
        account: '',
        page: pagenumber,
        page_size: pagenumbersize,
    };
    const onChange = (data) => {
        setPagenumber(data);
    };
    const handleChange = (value) => {};
    useEffect(() => {
        if (window.location.search) {
            localStorage.setItem(
                'nfttext',
                parseUrlParams(window.location.search).addr,
            );
        }
        if (props.location.state != undefined) {
            localStorage.setItem('nfttext', props.location.state.nftid.address);
        }
        nftdetails_q(
            localStorage.getItem('nfttext') ||
                props.location.state.nftid.address,
        );
        snft_nft_tx_q(pagedata);
    }, []);
    useEffect(() => {
        snft_nft_tx_q(pagedata);
    }, [pagenumber]);
    useEffect(() => {
        if (Object.keys(nftdata).length != 0) {
            metainformation_q(nftdata.meta_url);
            hexToStringbs(nftdata.meta_url);
        }
    }, [nftdata]);
    //snft详情查询
    const nftdetails_q = async (item) => {
        const data = await nftdetails(item);
        if (data) {
            setNftdata(data);
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
    // 图片查询
    const snftimageaddress_q = async (item) => {
        const data = await snftimageaddress(item);
        if (data) {
            //console.log(data);
            if (data.code == 200) {
                setNftimage('ipfs/' + data.data);
            } else {
                setNftimage(imgmr);
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
                                    NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_right_d
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
                                    NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_right_d
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
                                    NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_right_d
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
    function onChange1(newValue) {}
    function hexToStringbs(str) {
        if (str.slice(0, 2) == '0x') {
            var val = '',
                len = str.length / 2;
            for (var i = 0; i < len; i++) {
                val += String.fromCharCode(parseInt(str.substr(i * 2, 2), 16));
            }
            //console.log(JSON.parse(val.slice(1, val.length)));
            try {
                let text = 0;
                for (
                    let i = 0;
                    i <
                    Object.keys(JSON.parse(val.slice(1, val.length))).length;
                    i++
                ) {
                    if (
                        Object.keys(JSON.parse(val.slice(1, val.length)))[i] ==
                            'prompt' ||
                        Object.keys(JSON.parse(val.slice(1, val.length)))[i] ==
                            'randomNumber'
                    ) {
                        text++;
                    }
                }
                //console.log(text);
                if (text == 2) {
                    // ai
                    snftimageaddress_q(nftdata.address);
                } else {
                    //console.log('=======' + val.meta_url);
                    setNftimage(JSON.parse(val.slice(1, val.length)).meta_url);
                }
            } catch (error) {
                setNftimage(imgmr);
            }
        } else if (str.slice(0, 6) == '/ipfs/') {
            setNftimage(str);
        } else {
            setNftimage(imgmr);
        }
    }
    return (
        <>
            <div className={NFTDetailsApp_ls.NFTDetailsBox}>
                <div className={NFTDetailsApp_ls.NFTDetailsBox_titleData}>
                    <div className={NFTDetailsApp_ls.NFTDetailsBox_title}>
                        NFT Details
                    </div>
                    <div
                        className={
                            NFTDetailsApp_ls.NFTDetailsBox_titleData_imgBox
                        }
                    >
                        {/* 图片 */}
                        {/* <img className={NFTDetailsApp_ls.NFTDetailsBox_titleData_imgBoximg} src={nftdata.source_url} /> */}
                        {/* {Object.keys(metadata).length != 0 &&
                        metadata.fileType != 'mp3' ? (
                            <FileViewer
                                className={
                                    NFTDetailsApp_ls.NFTDetailsBox_titleData_imgBoximg
                                }
                                fileType={metadata.fileType.toLowerCase()} //文件类型
                                filePath={nftdata.source_url} //文件地址
                            />
                        ) : Object.keys(metadata).length != 0 &&
                          metadata.fileType == 'mp3' ? (
                            <div
                                style={{ width: '100%', height: '100%' }}
                                className={
                                    NFTDetailsApp_ls.NFTDetailsBox_titleData_imgBox_bg
                                }
                            >
                                <FileViewer
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_imgBoximg
                                    }
                                    fileType={metadata.fileType.toLowerCase()} //文件类型
                                    filePath={nftdata.source_url} //文件地址
                                />
                            </div>
                        ) : (
                            ''
                        )} */}
                        {nftimage ? (
                            <img src={nftimage} />
                        ) : (
                            <img
                                src={require('../../assets/images/HomePage/mr.png')}
                            />
                        )}
                    </div>
                    <div
                        className={
                            NFTDetailsApp_ls.NFTDetailsBox_titleData_text
                        }
                    >
                        {/* <p
                            className={
                                NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftname
                            }
                        >
                            {nftdata.name}
                        </p> */}
                        <div
                            className={
                                NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute
                            }
                        >
                            <div
                                className={
                                    NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_left
                                }
                            >
                                <p
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Address
                                </p>
                                <p
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Creation Time
                                </p>
                                <p
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Author
                                </p>
                                <p
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Owner
                                </p>
                                <p
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Royalties
                                </p>
                                <p
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_left_name
                                    }
                                >
                                    Type
                                </p>
                            </div>
                            <div
                                className={
                                    NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_right
                                }
                            >
                                <p
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                >
                                    {nftdata.address
                                        ? ellipsis(nftdata.address)
                                        : '-'}
                                </p>
                                <p
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                >
                                    {moment(
                                        parseInt(nftdata.timestamp) * 1000,
                                    ).format('YYYY-MM-DD HH:mm:ss') || '-'}
                                </p>
                                <Link
                                    to={{
                                        pathname: `/AccountDetailApp`,
                                        state: nftdata.creator,
                                    }}
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                    style={{ color: '#7AA4FF' }}
                                >
                                    {nftdata.creator
                                        ? ellipsis(nftdata.creator)
                                        : '-'}
                                </Link>
                                <Link
                                    to={{
                                        pathname: `/AccountDetailApp`,
                                        state: nftdata.owner,
                                    }}
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                    style={{ color: '#7AA4FF' }}
                                >
                                    {nftdata.owner
                                        ? ellipsis(nftdata.owner)
                                        : '-'}
                                </Link>
                                <p
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                >
                                    {nftdata.royalty_ratio / 100}%
                                </p>
                                <div
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                >
                                    {nftdata.meta_url
                                        ? hexToString(nftdata.meta_url) == 1
                                            ? 'AI'
                                            : 'Normal'
                                        : '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 交易历史-Meta信息   按钮 */}
                <div
                    className={
                        NFTDetailsApp_ls.NFTDetailsBox_titleData_buttonBox
                    }
                >
                    {transactionmetadata == 0 ? (
                        <div
                            className={
                                NFTDetailsApp_ls.NFTDetailsBox_titleData_buttonBox_Transactionhistory1
                            }
                            onClick={transactionmeta.bind(this, 0)}
                        >
                            TXN History
                        </div>
                    ) : (
                        <div
                            className={
                                NFTDetailsApp_ls.NFTDetailsBox_titleData_buttonBox_Transactionhistory2
                            }
                        >
                            TXN History
                        </div>
                    )}
                </div>
                {transactionmetadata == 1 ? (
                    <div className={NFTDetailsApp_ls.tableBox}>
                        <div
                            className={NFTDetailsApp_ls.NFTDetailsBox_table}
                            id="NFTDetailsTableApp"
                        >
                            <Table
                                columns={columns}
                                dataSource={snfttxdata.nft_txs}
                                pagination={false}
                            />
                            <div
                                className={
                                    NFTDetailsApp_ls.NFTDetailsBox_Pagination
                                }
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
                                        NFTDetailsApp_ls.NFTDetailsBox_Pagination_d
                                    }
                                >
                                    10/Page
                                </div>
                                <span
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_Pagination_span1
                                    }
                                >
                                    To
                                </span>
                                <input
                                    id="NFTDetailsinputnumber"
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_Pagination_input
                                    }
                                    onKeyDown={NFTDetailsinputnumberonclick}
                                />
                                <span
                                    className={
                                        NFTDetailsApp_ls.NFTDetailsBox_Pagination_span2
                                    }
                                >
                                    Page
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}
