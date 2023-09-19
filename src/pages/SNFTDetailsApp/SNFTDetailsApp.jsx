import SNFTDetailsApp_ls from './SNFTDetailsApp.less';
import SearchBox from '@/components/SearchBox/SearchBox';
import Icon, {
    DownOutlined,
    QuestionCircleOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import { Space, Table, Tag, Pagination, Tooltip, Select, Spin } from 'antd';
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
    snftimageaddress,
} from '../../api/request_data/block_request';
import moment from 'moment';
import { stagenumber, timestamp, ellipsis } from '../../utils/methods/Methods';
import { utils } from 'ethers';
import imgmr from '../../assets/images/HomePage/mr.png';
import nullimg from '../../assets/images/HomePage/null.png';
const { Option } = Select;
export default function SNFTDetailsApp(props) {
    // //console.log(props.location.state.snftid);
    const [transactionmetadata, setTransactionmeta] = useState(1);
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    //snft
    const [snftdata, setSnftdata] = useState({});
    //snft交易
    const [snfttxdata, setSnfttxdata] = useState({});
    //meta
    const [metadata, setMetadata] = useState({});
    // nft图片
    const [snftimage, setSnftimage] = useState('');
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
                color: '#9f54ba',
            }}
            spin
        />
    );
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
            key: 'from',
            dataIndex: 'from',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetailApp`, state: text }}
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
                    to={{ pathname: `/AccountDetailApp`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
        },
        {
            title: 'Transaction Value (ERB)',
            key: 'value',
            dataIndex: 'value',
            render: (text) => (
                <span style={{ color: '#7AA4FF' }}>
                    {text ? utils.formatEther(String(text)) : 0}
                </span>
            ),
            ellipsis: true,
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
                : localStorage.getItem('snfttext'),
        exchanger: '',
        account: '',
        page: pagenumber,
        page_size: pagenumbersize,
    };
    useEffect(() => {
        // //console.log('传过来的地址' +props.location.state?props.location.state.snftid:JSON.parse(localStorage.getItem('snfttext')));
        // //console.log('传过来的meta' );
        // //console.log(props.location.state?props.location.state.snftmata:JSON.parse(localStorage.getItem('snftmata')));
        if (props.location.state != undefined) {
            localStorage.setItem('snfttext', props.location.state.snftid);
            localStorage.setItem(
                'snftmata',
                JSON.stringify(props.location.state.snftmata),
            );
        }
        snftdetails_q(
            localStorage.getItem('snfttext') || props.location.state.snftid,
        );
        snft_nft_tx_q(pagedata);
    }, []);
    useEffect(() => {
        snft_nft_tx_q(pagedata);
    }, [pagenumber]);
    useEffect(() => {
        if (Object.keys(snftdata).length != 0) {
            hexToStringbs(snftdata.meta_url);
        }
    }, [snftdata]);
    //snft详情查询
    const snftdetails_q = async (item) => {
        const data = await snftdetails(item);
        if (data) {
            //console.log(data);
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
    // 图片查询
    const snftimageaddress_q = async (item) => {
        const data = await snftimageaddress(item);
        if (data) {
            //console.log(data);
            if (data.code == 200) {
                if (data.data) {
                    setSnftimage('ipfs/' + data.data);
                } else {
                    setSnftimage(nullimg);
                }
            } else {
                setSnftimage(imgmr);
            }
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
    function hexToStringbs(str) {
        if (str.slice(0, 2) == '0x') {
            var val = '',
                len = str.length / 2;
            for (var i = 0; i < len; i++) {
                val += String.fromCharCode(parseInt(str.substr(i * 2, 2), 16));
            }

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
                    snftimageaddress_q(snftdata.address);
                } else {
                    //console.log('=======' + val.meta_url);
                    setSnftimage(JSON.parse(val.slice(1, val.length)).meta_url);
                }
            } catch (error) {
                setSnftimage(imgmr);
            }
        } else if (str.slice(0, 6) == '/ipfs/') {
            setSnftimage(str);
        } else {
            setSnftimage(imgmr);
        }
    }
    return (
        <>
            <div className={SNFTDetailsApp_ls.SNFTDetailsBox}>
                <div className={SNFTDetailsApp_ls.SNFTDetailsBox_titleData}>
                    <div className={SNFTDetailsApp_ls.SNFTDetailsBox_title}>
                        SNFT Details
                    </div>
                    <div
                        className={
                            SNFTDetailsApp_ls.SNFTDetailsBox_titleData_imgBox
                        }
                    >
                        {snftimage ? (
                            <img
                                src={snftimage}
                                onError={() => {
                                    setSnftimage(imgmr);
                                }}
                            />
                        ) : (
                            <Spin indicator={antIcon} />
                        )}
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
                                    {snftdata.name ? (
                                        snftdata.name
                                    ) : snftdata.address ? (
                                        snftdata.address.length == 42 ? (
                                            <>SNFT - L0</>
                                        ) : snftdata.address.length == 41 ? (
                                            <>SNFT - L1</>
                                        ) : snftdata.address.length == 40 ? (
                                            <>SNFT - L2</>
                                        ) : snftdata.address.length == 39 ? (
                                            <>SNFT - L3</>
                                        ) : (
                                            ' '
                                        )
                                    ) : (
                                        ''
                                    )}
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
                                    Creator
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
                                    {Object.keys(snftdata) != 0 ? (
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
                                                        )}
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
                                    )}
                                    <Tooltip
                                        placement="bottom"
                                        title={() => {
                                            return (
                                                <div
                                                    className={
                                                        SNFTDetailsApp_ls.tablexbox2_Period
                                                    }
                                                >
                                                    <p>
                                                        SNFT Grades Are LO, L1,
                                                        L2, And L3 From The
                                                        Lowest To The Highest.
                                                        YouCan Synthesize It To
                                                        Higher Levels For Higher
                                                        Revenue.
                                                    </p>
                                                    <p>
                                                        The Rules Are As Below:
                                                    </p>
                                                    <p>
                                                        16 Specifc SNFT LO
                                                        Synthesizes A Unique
                                                        SNFT L1.
                                                    </p>
                                                    <p>
                                                        16 Specifc SNFT L1
                                                        Synthesizes A Unique
                                                        SNFT L2.
                                                    </p>
                                                    <p>
                                                        16 Specifc SNFT L2
                                                        Synthesizes A Unique
                                                        SNFT L3.{' '}
                                                    </p>
                                                    <p>
                                                        The Blue Number
                                                        Indicates The SNFT LO
                                                        Position Number In An
                                                        SNFT L1.
                                                    </p>
                                                    <p>
                                                        The Green Number
                                                        Indicates The Position
                                                        Number Of SNFT L1In An
                                                        SNFT L2.
                                                    </p>
                                                    <p>
                                                        The Yellow Number
                                                        Indicates The SNFT L2
                                                        Position Number In An
                                                        SNFT L3.
                                                    </p>
                                                    <p>
                                                        The Red Number Refers To
                                                        The Position Number Of
                                                        An SNFT L3.
                                                    </p>
                                                </div>
                                            );
                                        }}
                                        color="#4D4D55"
                                    >
                                        <span
                                            className={
                                                SNFTDetailsApp_ls.tablexbox2_icon
                                            }
                                        >
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
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
                                        pathname: `/AccountDetailApp`,
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
                                <Link
                                    to={{
                                        pathname: `/AccountDetailApp`,
                                        state: snftdata.creator,
                                    }}
                                    className={
                                        SNFTDetailsApp_ls.SNFTDetailsBox_titleData_text_nftattribute_right_name
                                    }
                                    style={{ color: '#7AA4FF' }}
                                    id="soloimg"
                                >
                                    {snftdata.creator
                                        ? ellipsis(snftdata.creator)
                                        : '-'}
                                </Link>
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
                </div>
                {transactionmetadata == 1 ? (
                    <div className={SNFTDetailsApp_ls.tableBox}>
                        <div
                            className={SNFTDetailsApp_ls.SNFTDetailsBox_table}
                            id="SNFTDetailsTableApp"
                        >
                            <Table
                                columns={columns}
                                dataSource={snfttxdata.data}
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
                    ''
                )}
            </div>
        </>
    );
}
