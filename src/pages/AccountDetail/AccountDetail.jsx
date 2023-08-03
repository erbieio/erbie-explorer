import React, { useState, useEffect } from 'react';
import {
    Avatar,
    ConfigProvider,
    Radio,
    Select,
    Tooltip,
    Table,
    Tag,
    Button,
    message,
    List,
    Pagination,
} from 'antd';
import {
    CaretUpOutlined,
    CaretDownOutlined,
    QuestionCircleOutlined,
    DownOutlined,
} from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
const { Option } = Select;
const { Column, ColumnGroup } = Table;
import zhCN from 'antd/es/locale/zh_CN';
import { AiOutlineCopy } from 'react-icons/ai';
import AccountDetail_ls from '../AccountDetail/AccountDetail.less';
import Search from '../../components/SearchBox/SearchBox';
import other from './../../assets/images/AccountDetail/other.png';
import {
    accountDetail,
    nftPage,
    transactionPage,
    snftPage,
    totals,
    epochpage,
    creatorAddressdetailed,
    pledge,
} from '../../api/request_data/AccountDetail_request';
import Trade_ls from '../Trade/Trade.less';
import copy from 'copy-to-clipboard';
import {
    timestamp,
    ellipsis,
    hexCharCodeToStr,
    hexCharCodeToStrmath,
    hexToString,
    parseUrlParams,
    getDevice,
} from '../../utils/methods/Methods';
import { utils } from 'ethers';
import { Link, history } from 'umi';
import moment from 'moment';
const handleCopy = (value) => {
    copy(value);
    message.success('copy Success');
};
const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;
function batchTime(baseTime) {
    // let time = moment(baseTime).format()
    let d = new Date(baseTime * 1000);
    let batchTime =
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    return batchTime;
}
//期数判断
function stagenumber(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i] == 0) {
                if (i == data.length - 1) {
                    return 1;
                }
            } else {
                return data.slice(i, 37);
            }
        }
    }
}
class AccountDetail extends React.Component {
    //Clock构造函数
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            data3: [],
            pageOption: {
                page: 1,
                page_size: 10,
            },
            pageOptionbs: {
                page: 1,
                page_size: 10,
            },
            loading: false,
            paginationProps: {},
            type: 'trade',
            hash: '0xea674fdde714fd979de3edf0f56aa9716b898ec8',
            accountData: {
                balance: 0,
                pledgeAmount: 0,
                rewardCoinCount: 0,
                nonce: 0,
                rewardSNFTCount: 0,
            },
            stakevaluecolor: 0,
            orderdata: '',
            stateHash: '',
            detailFrom: '',
            totaldata: {},
            epochtableData: {},
            addressid: {},
            transcolumns: [
                {
                    title: 'TXN Hash',
                    dataIndex: 'hash',
                    key: 'hash',
                    render: (tags) => (
                        <Link
                            title={tags}
                            to={{
                                pathname: `/TradeDetail`,
                                state: tags,
                            }}
                            replace={true}
                            className={Trade_ls.tableName}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {tags ? ellipsis(tags) : '-'}
                        </Link>
                    ),
                },
                {
                    title: 'Block Height',
                    dataIndex: 'blockNumber',
                    key: 'blockNumber',
                    // render: (text) => <span>{moment(parseInt(text) * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>,
                },
                {
                    title: 'TXN Time',
                    dataIndex: 'timestamp',
                    key: 'timestamp',
                    render: (text) => (
                        <span>
                            {moment(parseInt(text) * 1000).format('YYYY-MM-DD')}
                        </span>
                    ),
                    ellipsis: true,
                },
                {
                    title: 'Sender',
                    key: 'from',
                    dataIndex: 'from',
                    render: (tags, data) => (
                        <Link
                            title={tags}
                            to={{
                                pathname: `/AccountDetail`,
                                state: tags,
                            }}
                            replace={true}
                            className={Trade_ls.tableName}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {tags ? ellipsis(tags) : '-'}
                        </Link>
                    ),
                    ellipsis: true,
                },
                {
                    title: 'Receiver',
                    key: 'to',
                    dataIndex: 'to',
                    render: (tags) => (
                        <Link
                            title={tags}
                            to={{
                                pathname: `/AccountDetail`,
                                state: tags,
                            }}
                            replace={true}
                            className={Trade_ls.tableName}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {tags ? ellipsis(tags) : '-'}
                        </Link>
                    ),
                    ellipsis: true,
                },
                {
                    title: 'Value',
                    key: 'value',
                    dataIndex: 'value',
                    render: (tags) => (
                        <span
                            title={(
                                tags / 1000000000000000000
                            ).toLocaleString()}
                        >
                            {(tags / 1000000000000000000).toLocaleString()}
                        </span>
                    ),
                    ellipsis: true,
                    width: '100px',
                },
                {
                    title: 'TXN Type',
                    key: 'aaaa',
                    dataIndex: 'aaaa',
                    render: (text, data) => (
                        <span>{hexCharCodeToStr(data.input)}</span>
                    ),
                    ellipsis: true,
                    width: '190px',
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'status',
                    render: (text, data) => (
                        <span>
                            {
                                <Tag
                                    color={
                                        text == 1
                                            ? 'rgba(168, 255, 210, .2)'
                                            : 'rgba(254, 79, 167, .2)'
                                    }
                                    style={{
                                        color:
                                            text == 1
                                                ? 'rgba(158, 255, 204, 1)'
                                                : '#FE4FA7',
                                    }}
                                >
                                    {text == 1 ? 'Success' : 'Defeat'}
                                </Tag>
                            }
                        </span>
                    ),
                    width: '90px',
                },
                {
                    title: 'TXN Fee',
                    key: 'aaaa',
                    dataIndex: 'aaaa',
                    render: (text, data) => (
                        <span>
                            {data
                                ? utils.formatEther(
                                      String(data.gasPrice * data.gasUsed),
                                  )
                                : 0}
                        </span>
                    ),
                    ellipsis: true,
                },
            ],
            stakercolumns: [
                {
                    title: 'Account',
                    dataIndex: 'validator',
                    key: 'validator',
                    render: (tags) => (
                        <Link
                            title={tags}
                            to={{
                                pathname: `/AccountDetail`,
                                state: tags,
                            }}
                            replace={true}
                            className={Trade_ls.tableName}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {tags ? ellipsis(tags) : '-'}
                        </Link>
                    ),
                },
                {
                    title: 'TXN Hash',
                    dataIndex: 'tx_hash',
                    key: 'tx_hash',
                    render: (tags) => (
                        <Link
                            title={tags}
                            to={{
                                pathname: `/TradeDetail`,
                                state: tags,
                            }}
                            replace={true}
                            className={Trade_ls.tableName}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {tags ? ellipsis(tags) : '-'}
                        </Link>
                    ),
                },
                {
                    title: 'Block Height',
                    dataIndex: 'block_number',
                    key: 'block_number',
                    render: (text, data) => (
                        <Link
                            to={{
                                pathname: '/BlockDetails',
                                state: { blockid: text },
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {text}
                        </Link>
                    ),
                    ellipsis: true,
                },
                {
                    title: 'Stake Time',
                    key: 'timestamp',
                    dataIndex: 'timestamp',
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
                    title: 'Value',
                    key: 'amount',
                    dataIndex: 'amount',
                    render: (text) => (
                        <>
                            {text
                                ? Number(
                                      utils.formatEther(String(text)),
                                  ).toFixed(2)
                                : 0}
                        </>
                    ),
                    ellipsis: true,
                },
            ],
            validatorcolumns: [
                {
                    title: 'Account',
                    dataIndex: 'staker',
                    key: 'staker',
                    render: (tags) => (
                        <Link
                            title={tags}
                            to={{
                                pathname: `/AccountDetail`,
                                state: tags,
                            }}
                            replace={true}
                            className={Trade_ls.tableName}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {tags ? ellipsis(tags) : '-'}
                        </Link>
                    ),
                },
                {
                    title: 'TXN Hash',
                    dataIndex: 'tx_hash',
                    key: 'tx_hash',
                    render: (tags) => (
                        <Link
                            title={tags}
                            to={{
                                pathname: `/TradeDetail`,
                                state: tags,
                            }}
                            replace={true}
                            className={Trade_ls.tableName}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {tags ? ellipsis(tags) : '-'}
                        </Link>
                    ),
                },
                {
                    title: 'Block Height',
                    dataIndex: 'block_number',
                    key: 'block_number',
                    render: (text, data) => (
                        <Link
                            to={{
                                pathname: '/BlockDetails',
                                state: { blockid: text },
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {text}
                        </Link>
                    ),
                    ellipsis: true,
                },
                {
                    title: 'Stake Time',
                    key: 'timestamp',
                    dataIndex: 'timestamp',
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
                    title: 'Value',
                    key: 'amount',
                    dataIndex: 'amount',
                    render: (text) => (
                        <>
                            {text
                                ? Number(
                                      utils.formatEther(String(text)),
                                  ).toFixed(2)
                                : 0}
                        </>
                    ),
                    ellipsis: true,
                },
            ],
            nftcolumns: [
                {
                    title: 'NFT Address',
                    dataIndex: 'address',
                    key: 'address',
                    render: (text, data) => (
                        <Link
                            to={{
                                pathname: '/NFTDetails',
                                state: { nftid: data },
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {ellipsis(text)}
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
                    title: 'Author',
                    key: 'creator',
                    dataIndex: 'creator',
                    ellipsis: true,
                    render: (text, data) => (
                        <Link
                            to={{ pathname: `/AccountDetail`, state: text }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
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
                            to={{ pathname: `/AccountDetail`, state: text }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {ellipsis(text)}
                        </Link>
                    ),
                },
                {
                    title: 'Royalties',
                    key: 'royalty_ratio',
                    dataIndex: 'royalty_ratio',
                    ellipsis: true,
                    render: (text, data) => <span>{text / 100} %</span>,
                },
                {
                    title: 'Type',
                    key: 'raw_meta_url',
                    dataIndex: 'raw_meta_url',
                    ellipsis: true,
                    render: (text) => (
                        <span>{hexToString(text) == 1 ? 'AI' : 'Normal'}</span>
                    ),
                },
            ],
            snftcolumns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text, data) => (
                        <Link
                            title={text}
                            to={{
                                pathname: '/SNFTDetails',
                                state: { snftid: data.address },
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {text ? (
                                text
                            ) : data.address ? (
                                data.address.length == 42 ? (
                                    <>SNFT - L0</>
                                ) : data.address.length == 41 ? (
                                    <>SNFT - L1</>
                                ) : data.address.length == 40 ? (
                                    <>SNFT - L2</>
                                ) : data.address.length == 39 ? (
                                    <>SNFT - L3</>
                                ) : (
                                    ' '
                                )
                            ) : (
                                ''
                            )}
                        </Link>
                    ),
                    width: '120px',
                    ellipsis: true,
                },
                {
                    title: () => (
                        <div className={AccountDetail_ls.tablexbox2}>
                            <span> SNFT Number</span>
                            <Tooltip
                                placement="bottom"
                                title={() => {
                                    return (
                                        <div
                                            className={
                                                AccountDetail_ls.tablexbox2_Period
                                            }
                                        >
                                            <p>
                                                SNFT Grades Are LO, L1, L2, And
                                                L3 From The Lowest To The
                                                Highest. YouCan Synthesize It To
                                                Higher Levels For Higher
                                                Revenue.
                                            </p>
                                            <p>The Rules Are As Below:</p>
                                            <p>
                                                16 Specifc SNFT LO Synthesizes A
                                                Unique SNFT L1.
                                            </p>
                                            <p>
                                                16 Specifc SNFT L1 Synthesizes A
                                                Unique SNFT L2.
                                            </p>
                                            <p>
                                                16 Specifc SNFT L2 Synthesizes A
                                                Unique SNFT L3.{' '}
                                            </p>
                                            <p>
                                                The Blue Number Indicates The
                                                SNFT LO Position Number In An
                                                SNFT L1.
                                            </p>
                                            <p>
                                                The Green Number Indicates The
                                                Position Number Of SNFT L1In An
                                                SNFT L2.
                                            </p>
                                            <p>
                                                The Yellow Number Indicates The
                                                SNFT L2 Position Number In An
                                                SNFT L3.
                                            </p>
                                            <p>
                                                The Red Number Refers To The
                                                Position Number Of An SNFT L3.
                                            </p>
                                        </div>
                                    );
                                }}
                                color="#4D4D55"
                            >
                                <span
                                    className={AccountDetail_ls.tablexbox2_icon}
                                >
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip>
                        </div>
                    ),
                    dataIndex: 'address',
                    key: 'address',
                    render: (text) =>
                        text ? (
                            <span>
                                {text.length >= 39 ? (
                                    <Tooltip title="L3" color="#4D4D55">
                                        <span
                                            className={
                                                AccountDetail_ls.SNFTBox_tablelevelPeriod
                                            }
                                        >
                                            {parseInt('0x' + text.slice(4, 39))}
                                        </span>
                                    </Tooltip>
                                ) : (
                                    ' '
                                )}
                                {text.length >= 40 ? (
                                    <Tooltip title="L2" color="#4D4D55">
                                        <span
                                            className={
                                                AccountDetail_ls.SNFTBox_tablelevelCollection
                                            }
                                        >
                                            {parseInt(
                                                '0x' + text.slice(39, 40),
                                            ) + 1}
                                        </span>
                                    </Tooltip>
                                ) : (
                                    ''
                                )}
                                {text.length >= 41 ? (
                                    <Tooltip title="L1" color="#4D4D55">
                                        <span
                                            className={
                                                AccountDetail_ls.SNFTBox_tablelevelnft
                                            }
                                        >
                                            {parseInt(
                                                '0x' + text.slice(40, 41),
                                            ) + 1}
                                        </span>
                                    </Tooltip>
                                ) : (
                                    ''
                                )}
                                {text.length >= 42 ? (
                                    <Tooltip title="L0" color="#4D4D55">
                                        <span
                                            className={
                                                AccountDetail_ls.SNFTBox_tablelevelsnft
                                            }
                                        >
                                            {parseInt(
                                                '0x' + text.slice(41, 42),
                                            ) + 1}
                                        </span>
                                    </Tooltip>
                                ) : (
                                    ''
                                )}
                            </span>
                        ) : (
                            ''
                        ),
                },
                {
                    title: 'Creation Time',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
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
                    title: 'Creator',
                    key: 'creator',
                    dataIndex: 'creator',
                    ellipsis: true,
                    render: (text, data) => (
                        <Link
                            to={{
                                pathname: `/AccountDetail`,
                                state: text,
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                            title={text}
                            replace={true}
                        >
                            {text ? ellipsis(text) : '-'}
                        </Link>
                    ),
                },
                {
                    title: 'Owner',
                    dataIndex: 'owner',
                    key: 'owner',
                    ellipsis: true,
                    render: (text, data) => (
                        <Link
                            to={{
                                pathname: `/AccountDetail`,
                                state: text,
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                            title={text}
                            replace={true}
                        >
                            {text ? ellipsis(text) : '-'}
                        </Link>
                    ),
                },
                {
                    title: 'Owner Get Time',
                    dataIndex: 'reward_at',
                    key: 'reward_at',
                    render: (text) => (
                        <span>
                            {moment(parseInt(text) * 1000).format(
                                'YYYY-MM-DD HH:mm:ss',
                            )}
                        </span>
                    ),
                    ellipsis: true,
                    width: '250px',
                },
            ],
            creatorcolumns: [
                {
                    title: 'Period Address',
                    dataIndex: 'id',
                    key: 'id',
                    render: (text) => (
                        <Link
                            to={{
                                pathname: `/AccountDetail`,
                                state: text,
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {ellipsis(text)}
                        </Link>
                    ),
                },
                {
                    title: () => (
                        <div className={AccountDetail_ls.tablexbox2}>
                            <span>Period</span>
                            <Tooltip
                                placement="bottom"
                                title={() => {
                                    return (
                                        <div
                                            className={
                                                AccountDetail_ls.tablexbox2_Period
                                            }
                                        >
                                            <p>
                                                SNFT Grades Are LO, L1, L2, And
                                                L3 From The Lowest To The
                                                Highest. YouCan Synthesize It To
                                                Higher Levels For Higher
                                                Revenue.
                                            </p>
                                            <p>The Rules Are As Below:</p>
                                            <p>
                                                16 Specifc SNFT LO Synthesizes A
                                                Unique SNFT L1.
                                            </p>
                                            <p>
                                                16 Specifc SNFT L1 Synthesizes A
                                                Unique SNFT L2.
                                            </p>
                                            <p>
                                                16 Specifc SNFT L2 Synthesizes A
                                                Unique SNFT L3.{' '}
                                            </p>
                                            <p>
                                                The Blue Number Indicates The
                                                SNFT LO Position Number In An
                                                SNFT L1.
                                            </p>
                                            <p>
                                                The Green Number Indicates The
                                                Position Number Of SNFT L1In An
                                                SNFT L2.
                                            </p>
                                            <p>
                                                The Yellow Number Indicates The
                                                SNFT L2 Position Number In An
                                                SNFT L3.
                                            </p>
                                            <p>
                                                The Red Number Refers To The
                                                Position Number Of An SNFT L3.
                                            </p>
                                        </div>
                                    );
                                }}
                                color="#4D4D55"
                            >
                                <span
                                    className={AccountDetail_ls.tablexbox2_icon}
                                >
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip>
                        </div>
                    ),
                    dataIndex: 'id',
                    key: 'id',
                    render: (text) => (
                        <span className={AccountDetail_ls.table_redblock}>
                            {text
                                ? parseInt('0x' + text.slice(4, text.length))
                                : 0}
                        </span>
                    ),
                },
                {
                    title: () => (
                        <div className={AccountDetail_ls.tablexbox}>
                            TXN Time
                            {this.state.stakevaluecolor == 0 ? (
                                <div className={AccountDetail_ls.tablex}>
                                    <CaretUpOutlined
                                        onClick={StakeValue.bind(this, 1)}
                                    />
                                    <CaretDownOutlined
                                        onClick={StakeValue.bind(this, 2)}
                                    />
                                </div>
                            ) : this.state.stakevaluecolor == 1 ? (
                                <div className={AccountDetail_ls.tablex}>
                                    <CaretUpOutlined
                                        onClick={StakeValue.bind(this, 1)}
                                        style={{ color: '#7AA4FF' }}
                                    />
                                    <CaretDownOutlined
                                        onClick={StakeValue.bind(this, 2)}
                                    />
                                </div>
                            ) : (
                                <div className={AccountDetail_ls.tablex}>
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
                    dataIndex: 'startTime',
                    key: 'startTime',
                    render: (text) => (
                        <span>
                            {moment(parseInt(text) * 1000).format(
                                'YYYY-MM-DD HH:mm:ss',
                            )}
                        </span>
                    ),
                },
                {
                    title: () => (
                        <div className={AccountDetail_ls.tablexbox2}>
                            <span>Block Height</span>
                            <Tooltip
                                title={() => {
                                    return (
                                        <div
                                            className={
                                                AccountDetail_ls.tablexbox2_Period
                                            }
                                        >
                                            <p>
                                                The lastest block height that
                                                user been CreatorEvery creators'
                                                block height is different.
                                            </p>
                                        </div>
                                    );
                                }}
                                color="#4D4D55"
                            >
                                <span
                                    className={AccountDetail_ls.tablexbox2_icon}
                                >
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip>
                        </div>
                    ),
                    dataIndex: 'startNumber',
                    key: 'startNumber',
                    render: (text, data) =>
                        data.number != 0 ? (
                            data.miner ==
                            '0x0000000000000000000000000000000000000000' ? (
                                <Link
                                    to={{
                                        pathname: '/BlackholeBlockDeta',
                                        state: { blockid: text },
                                    }}
                                    style={{
                                        color: '#7AA4FF',
                                        fontFamily: 'CustomFontMedium',
                                    }}
                                >
                                    {text}
                                </Link>
                            ) : (
                                <Link
                                    to={{
                                        pathname: '/BlockDetails',
                                        state: { blockid: text },
                                    }}
                                    style={{
                                        color: '#7AA4FF',
                                        fontFamily: 'CustomFontMedium',
                                    }}
                                >
                                    {text}
                                </Link>
                            )
                        ) : (
                            '-'
                        ),
                },
                {
                    title: () => (
                        <div className={AccountDetail_ls.tablexbox2}>
                            <span>TXN Hash</span>
                        </div>
                    ),
                    dataIndex: 'tx_hash',
                    key: 'tx_hash',
                    render: (text) => (
                        <Link
                            to={{
                                pathname: `/TradeDetail`,
                                state: text,
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {ellipsis(text)}
                        </Link>
                    ),
                },
                {
                    title: () => (
                        <div className={AccountDetail_ls.tablexbox}>
                            TXN Type
                        </div>
                    ),
                    dataIndex: 'txType',
                    key: 'txType',
                    render: (text) => <span>{hexCharCodeToStrmath(text)}</span>,
                },
                {
                    title: () => (
                        <div className={AccountDetail_ls.tablexbox2}>
                            <span>Rewards</span>
                            <Tooltip
                                title={() => {
                                    return (
                                        <div
                                            className={
                                                AccountDetail_ls.tablexbox2_Period
                                            }
                                        >
                                            <p>
                                                Creators can get a rewards as a
                                                transaction creator.creators can
                                                get 10% of total tansactions
                                                amount as royalty
                                            </p>
                                        </div>
                                    );
                                }}
                                color="#4D4D55"
                            >
                                <span
                                    className={AccountDetail_ls.tablexbox2_icon}
                                >
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip>
                        </div>
                    ),
                    dataIndex: 'reward',
                    key: 'reward',
                    render: (text) => <span>{text}</span>,
                },
                // {
                //     title: () => (
                //         <div className={AccountDetail_ls.tablexbox2}>
                //             <span>Action</span>
                //             <Tooltip
                //                 title={() => {
                //                     return (
                //                         <div
                //                             className={
                //                                 AccountDetail_ls.tablexbox2_Period
                //                             }
                //                         >
                //                             <p>
                //                                 Go to marketplace to check the
                //                                 details.
                //                             </p>
                //                         </div>
                //                     );
                //                 }}
                //                 color="#4D4D55"
                //             >
                //                 <span
                //                     className={AccountDetail_ls.tablexbox2_icon}
                //                 >
                //                     <QuestionCircleOutlined />
                //                 </span>
                //             </Tooltip>
                //         </div>
                //     ),
                //     dataIndex: 'aaaa',
                //     key: 'aaaa',
                //     render: (text) => <span>Go it</span>,
                // },
            ],
        };
    }
    componentWillReceiveProps(nextProps) {
        const id = nextProps.location.state;
        if (id) {
            window.sessionStorage.setItem('hash', id);
        }
        this.state.stateHash = window.sessionStorage.getItem('hash');
        // this.state.detailFrom = this.state.stateHash;
        this.setState({
            detailFrom: this.state.stateHash,
        });
        this.setState({
            type: 'trade',
        });
        this.commonFunc();
        // history.replace({ pathname: nextProps.location.pathname, state: id })
    }
    //插入DOM前的回调函数
    componentDidMount() {
        if (getDevice().device != 'pc' && window.location.search) {
            sessionStorage.setItem(
                'hash',
                parseUrlParams(window.location.search).addr,
            );
            history.push('/AccountDetailApp');
        }
        if (window.location.search) {
            sessionStorage.setItem(
                'hash',
                parseUrlParams(window.location.search).addr,
            );
        }

        console.log(this.props);
        if (this.props.location.state) {
            window.sessionStorage.setItem('hash', this.props.location.state);
        }
        this.state.stateHash = window.sessionStorage.getItem('hash');
        this.setState({
            detailFrom: this.state.stateHash,
        });
        this.commonFunc = () => {
            this.total = () => {
                let total1 = 0;
                this.state.chartData.forEach((item) => {
                    total1 += item.population;
                });
                return total1;
            };
            (async () => {
                this.setState({
                    loading: true,
                });
                const res = await accountDetail(this.state.stateHash);

                let state = JSON.stringify(res);
                if (
                    JSON.parse(state).useCache != undefined &&
                    JSON.parse(state).useCache == false
                ) {
                    this.comingsoon404();
                }
                if (res) {
                    // console.log(res);
                    this.setState({
                        accountData: res,
                        loading: false,
                    });
                }
            })();
            (async () => {
                const res = await totals();
                // console.log(res);
                if (res) {
                    this.setState({
                        totaldata: res,
                    });
                }
            })();
            this.nftPage = async () => {
                this.setState({
                    tableData: [],
                    tableTotal: 0,
                    loading: true,
                });
                const res = await nftPage({
                    owner: this.state.stateHash,
                    ...this.state.pageOption,
                });
                if (res) {
                    this.setState({
                        tableData: res.nfts,
                        tableTotal: res.total,
                        loading: false,
                    });
                    // this.state.totalTransaction = res.totalTransaction
                }
            };

            this.transPage = async () => {
                this.loading = true;
                this.setState({
                    tableData: [],
                    tableTotal: 0,
                    loading: true,
                });
                const res = await transactionPage({
                    addr: this.state.stateHash,
                    ...this.state.pageOption,
                });
                if (res) {
                    this.setState({
                        tableData: res.transactions,
                        tableTotal: res.total,
                        loading: false,
                    });
                    // this.state.totalTransaction = res.totalTransaction
                }
                this.loading = false;
            };
            this.transPage();
            this.snftPage = async () => {
                this.setState({
                    loading: true,
                });
                const res = await snftPage({
                    owner: this.state.stateHash,
                    ...this.state.pageOption,
                });
                if (res) {
                    console.log(res);
                    this.setState({
                        tableData: res.nfts,
                        tableTotal: res.total,
                        loading: false,
                    });
                }
            };
            this.epochpage = async () => {
                this.setState({
                    loading: true,
                });
                const res = await epochpage({
                    creator: this.state.stateHash,
                    ...this.state.pageOption,
                    order: this.state.orderdata,
                });
                if (res) {
                    // console.log(res);
                    if (res.epochs) {
                        for (let i = 0; i < res.epochs.length; i++) {
                            res.epochs[i].key = i;
                        }
                        console.log('===' + res.epochs);
                        this.setState({
                            tableData: res.epochs,
                            tableTotal: res.total,
                            loading: false,
                        });
                    } else {
                        this.setState({
                            tableData: [],
                            tableTotal: 0,
                            loading: false,
                        });
                    }
                }
            };
            this.creatorAddressdetailed = async (data) => {
                // console.log(data);
                this.setState({
                    loading: true,
                });
                const res = await creatorAddressdetailed({
                    ...this.state.pageOptionbs,
                    id: data.id,
                });
                // console.log(res);
                if (res) {
                    if (Object.keys(this.state.epochtableData).length == 0) {
                        // console.log(111);
                        this.setState({
                            epochtableData: res,
                            loading: false,
                        });
                    } else {
                        // console.log(this.state.epochtableData);
                        let text = [];
                        for (
                            let i = 0;
                            i < this.state.epochtableData.nft_txs.length;
                            i++
                        ) {
                            text.push(this.state.epochtableData.nft_txs[i]);
                        }
                        for (let i = 0; i < res.nft_txs.length; i++) {
                            text.push(res.nft_txs[i]);
                        }
                        this.setState({
                            epochtableData: {
                                nft_txs: text,
                            },
                            loading: false,
                        });
                    }
                }
            };
            this.pledgestaker = async () => {
                this.setState({
                    loading: true,
                });
                const res = await pledge({
                    ...this.state.pageOption,
                    staker: this.state.detailFrom,
                });
                if (res) {
                    console.log(res);
                    this.setState({
                        tableData: res.data,
                        tableTotal: res.total,
                        loading: false,
                    });
                    // this.state.totalTransaction = res.totalTransaction
                }
            };
            this.pledgevalidator = async () => {
                this.setState({
                    loading: true,
                });
                const res = await pledge({
                    ...this.state.pageOption,
                    validator: this.state.detailFrom,
                });
                if (res) {
                    console.log(res);
                    this.setState({
                        tableData: res.data,
                        tableTotal: res.total,
                        loading: false,
                    });
                    // this.state.totalTransaction = res.totalTransaction
                }
            };
            this.ceratoronChange = (data) => {
                this.state.pageOption.page = data;
                this.epochpage();
            };
            this.tablearrowclick = (index, data, datalenght) => {
                // console.log(data);
                localStorage.setItem('creator_arrowhead', datalenght);

                this.state.epochtableData = {};
                this.state.addressid = data;
                this.creatorAddressdetailed(data);
                if (
                    document.getElementsByClassName(`undefined${index}`)[0]
                        .style.height == '0px'
                ) {
                    for (let i = 0; i < datalenght; i++) {
                        document.getElementsByClassName(
                            `undefined${i}`,
                        )[0].style.height = '0px';
                    }
                }
                if (
                    document.getElementsByClassName(`undefined${index}`)[0]
                        .style.height == '276px'
                ) {
                    document.getElementsByClassName(
                        `undefined${index}`,
                    )[0].style.height = '0px';
                } else if (
                    document.getElementsByClassName(`undefined${index}`)[0]
                        .style.height == '0px'
                ) {
                    document.getElementsByClassName(
                        `undefined${index}`,
                    )[0].style.height = '276px';
                }
                if (
                    document.getElementsByClassName(`undefinedicon${index}`)[0]
                        .style.transform == 'rotate(0deg)'
                ) {
                    for (let i = 0; i < datalenght; i++) {
                        document.getElementsByClassName(
                            `undefinedicon${i}`,
                        )[0].style.transform = 'rotate(0deg)';
                    }
                }
                if (
                    document.getElementsByClassName(`undefinedicon${index}`)[0]
                        .style.transform == 'rotate(180deg)'
                ) {
                    document.getElementsByClassName(
                        `undefinedicon${index}`,
                    )[0].style.transform = 'rotate(0deg)';
                } else if (
                    document.getElementsByClassName(`undefinedicon${index}`)[0]
                        .style.transform == 'rotate(0deg)'
                ) {
                    document.getElementsByClassName(
                        `undefinedicon${index}`,
                    )[0].style.transform = 'rotate(180deg)';
                }
            };
            //Stake Value 排序
            this.StakeValue = (text) => {
                if (localStorage.getItem('creator_arrowhead')) {
                    for (
                        let i = 0;
                        i < localStorage.getItem('creator_arrowhead');
                        i++
                    ) {
                        document.getElementsByClassName(
                            `undefined${i}`,
                        )[0].style.height = '0px';
                    }

                    for (
                        let i = 0;
                        i < localStorage.getItem('creator_arrowhead');
                        i++
                    ) {
                        document.getElementsByClassName(
                            `undefinedicon${i}`,
                        )[0].style.transform = 'rotate(0deg)';
                    }
                }

                if (text == 1) {
                    if (this.state.stakevaluecolor == 1) {
                        this.setState({
                            stakevaluecolor: 0,
                            orderdata: '',
                        });
                        this.epochpage();
                        // this.state.stakevaluecolor = 0;
                        // this.state.orderdata = '';
                    } else {
                        this.setState({
                            stakevaluecolor: 1,
                            orderdata: 'start_time ASC',
                        });
                        this.epochpage();
                        // this.state.stakevaluecolor = 1;
                        // this.state.orderdata = 'start_time ASC';
                    }
                } else {
                    if (this.state.stakevaluecolor == 2) {
                        this.setState({
                            stakevaluecolor: 0,
                            orderdata: '',
                        });
                        this.epochpage();
                        // this.state.stakevaluecolor = 0;
                        // this.state.orderdata = '';
                    } else {
                        this.setState({
                            stakevaluecolor: 2,
                            orderdata: 'start_time DESC',
                        });
                        this.epochpage();
                        // this.state.stakevaluecolor = 2;
                        // this.state.orderdata = 'start_time DESC';
                    }
                }
            };
            this.creatorScroll = (e) => {
                if (
                    e.target.scrollHeight - e.target.scrollTop ===
                    e.target.clientHeight
                ) {
                    // console.log('header bottom reached');
                    this.state.pageOptionbs.page =
                        this.state.pageOptionbs.page + 1;
                    this.creatorAddressdetailed(this.state.addressid);
                }
            };

            //BLOCK LIST 表格组件
            this.tableblocklist = (data) => {
                console.log(data);
                if (data) {
                    return data.map((item, index) => {
                        return (
                            <div className={AccountDetail_ls.tableblocklistbox}>
                                <div
                                    className={
                                        AccountDetail_ls.tableblocklisttitbox
                                    }
                                    style={{
                                        backgroundColor:
                                            index % 2 == 0
                                                ? '#FFFFFF10'
                                                : '#FFFFFF20',
                                    }}
                                >
                                    <div
                                        className={
                                            AccountDetail_ls.tableblocklistdatabox
                                        }
                                    >
                                        <div
                                            style={{
                                                fontFamily: 'CustomFontMedium',
                                                width: '250px',
                                            }}
                                            className={
                                                AccountDetail_ls.zztable_redblock
                                            }
                                        >
                                            {ellipsis(item.id)}
                                        </div>
                                        <div
                                            className={
                                                AccountDetail_ls.zztable_redblock
                                            }
                                            style={{ width: '200px' }}
                                        >
                                            <span
                                                className={
                                                    AccountDetail_ls.table_redblock
                                                }
                                            >
                                                {item.id
                                                    ? parseInt(
                                                          '0x' +
                                                              item.id.slice(
                                                                  4,
                                                                  item.id
                                                                      .length,
                                                              ),
                                                      )
                                                    : 0}
                                            </span>
                                        </div>
                                        <span
                                            className={
                                                AccountDetail_ls.zztable_redblock
                                            }
                                            style={{ width: '250px' }}
                                        >
                                            {moment(
                                                parseInt(item.startTime) * 1000,
                                            ).format('YYYY-MM-DD HH:mm:ss')}
                                        </span>
                                        {item.startNumber != 0 ? (
                                            item.miner ==
                                            '0x0000000000000000000000000000000000000000' ? (
                                                <Link
                                                    to={{
                                                        pathname:
                                                            '/BlackholeBlockDeta',
                                                        state: {
                                                            blockid:
                                                                item.startNumber,
                                                        },
                                                    }}
                                                    style={{
                                                        color: '#7AA4FF',
                                                        fontFamily:
                                                            'CustomFontMedium',
                                                        width: '200px',
                                                    }}
                                                    className={
                                                        AccountDetail_ls.zztable_redblock
                                                    }
                                                >
                                                    {item.startNumber}
                                                </Link>
                                            ) : (
                                                <Link
                                                    to={{
                                                        pathname:
                                                            '/BlockDetails',
                                                        state: {
                                                            blockid:
                                                                item.startNumber,
                                                        },
                                                    }}
                                                    style={{
                                                        color: '#7AA4FF',
                                                        fontFamily:
                                                            'CustomFontMedium',
                                                        width: '200px',
                                                    }}
                                                    className={
                                                        AccountDetail_ls.zztable_redblock
                                                    }
                                                >
                                                    {item.startNumber}
                                                </Link>
                                            )
                                        ) : (
                                            '-'
                                        )}
                                        ,
                                        <Link
                                            to={{
                                                pathname: `/TradeDetail`,
                                                state: item.tx_hash,
                                            }}
                                            style={{
                                                color: '#7AA4FF',
                                                fontFamily: 'CustomFontMedium',
                                                width: '200px',
                                            }}
                                            className={
                                                AccountDetail_ls.zztable_redblock
                                            }
                                        >
                                            {ellipsis(item.tx_hash)}
                                        </Link>
                                        <Tooltip
                                            title={hexCharCodeToStrmath(
                                                item.txType,
                                            )}
                                            color="#4D4D55"
                                        >
                                            <span
                                                className={
                                                    AccountDetail_ls.zztable_redblock
                                                }
                                                style={{
                                                    width: '170px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {hexCharCodeToStrmath(
                                                    item.txType,
                                                )}
                                            </span>
                                        </Tooltip>
                                        <span
                                            className={
                                                AccountDetail_ls.zztable_redblock
                                            }
                                            style={{
                                                width: '200px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {item.reward
                                                ? Number(
                                                      utils.formatEther(
                                                          item.reward,
                                                      ),
                                                  ).toFixed(4)
                                                : 0}
                                        </span>
                                    </div>
                                    {}
                                    <p
                                        onClick={this.tablearrowclick.bind(
                                            this,
                                            index,
                                            item,
                                            data.length,
                                        )}
                                        className={
                                            AccountDetail_ls.tableblocklistarrowp
                                        }
                                    >
                                        <DownOutlined
                                            className={
                                                AccountDetail_ls.tableblocklistarrow +
                                                `icon${index}`
                                            }
                                            style={{
                                                fontSize: '14px',
                                                color: 'white',
                                                lineHeight: '48px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s',
                                                transform: 'rotate(0deg)',
                                            }}
                                        />
                                    </p>
                                </div>
                                <div
                                    className={
                                        AccountDetail_ls.tableblocklistselectbox +
                                        `${index}`
                                    }
                                    style={{
                                        height: '0px',
                                        backgroundColor: '#1E1E4380',
                                        transition: 'all 0.3s',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        className={
                                            AccountDetail_ls.tableblocklistselectbox_div
                                        }
                                        id="creatorScrollheight"
                                        onScroll={this.creatorScroll}
                                    >
                                        <div
                                            className={
                                                AccountDetail_ls.tableblocklistselectbox_div_longblock
                                            }
                                            id="creatorScrollheightsmor"
                                        >
                                            <div
                                                className={
                                                    AccountDetail_ls.tableztableboxless
                                                }
                                            >
                                                <div
                                                    style={{
                                                        fontFamily:
                                                            'CustomFontMedium',
                                                        width: '250px',
                                                    }}
                                                    className={
                                                        AccountDetail_ls.zztable_redblock
                                                    }
                                                >
                                                    {ellipsis(item.id)}
                                                </div>
                                                <div
                                                    className={
                                                        AccountDetail_ls.zztable_redblock
                                                    }
                                                    style={{ width: '200px' }}
                                                >
                                                    <span
                                                        className={
                                                            AccountDetail_ls.table_redblock
                                                        }
                                                    >
                                                        {item.id
                                                            ? parseInt(
                                                                  '0x' +
                                                                      item.id.slice(
                                                                          4,
                                                                          item
                                                                              .id
                                                                              .length,
                                                                      ),
                                                              )
                                                            : 0}
                                                    </span>
                                                </div>
                                                <span
                                                    className={
                                                        AccountDetail_ls.zztable_redblock
                                                    }
                                                    style={{ width: '250px' }}
                                                >
                                                    {moment(
                                                        parseInt(
                                                            item.startTime,
                                                        ) * 1000,
                                                    ).format(
                                                        'YYYY-MM-DD HH:mm:ss',
                                                    )}
                                                </span>
                                                {item.startNumber != 0 ? (
                                                    item.miner ==
                                                    '0x0000000000000000000000000000000000000000' ? (
                                                        <Link
                                                            to={{
                                                                pathname:
                                                                    '/BlackholeBlockDeta',
                                                                state: {
                                                                    blockid:
                                                                        item.startNumber,
                                                                },
                                                            }}
                                                            style={{
                                                                color: '#7AA4FF',
                                                                fontFamily:
                                                                    'CustomFontMedium',
                                                                width: '200px',
                                                            }}
                                                            className={
                                                                AccountDetail_ls.zztable_redblock
                                                            }
                                                        >
                                                            {item.startNumber}
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            to={{
                                                                pathname:
                                                                    '/BlockDetails',
                                                                state: {
                                                                    blockid:
                                                                        item.startNumber,
                                                                },
                                                            }}
                                                            style={{
                                                                color: '#7AA4FF',
                                                                fontFamily:
                                                                    'CustomFontMedium',
                                                                width: '200px',
                                                            }}
                                                            className={
                                                                AccountDetail_ls.zztable_redblock
                                                            }
                                                        >
                                                            {item.startNumber}
                                                        </Link>
                                                    )
                                                ) : (
                                                    '-'
                                                )}
                                                ,
                                                <Link
                                                    to={{
                                                        pathname: `/TradeDetail`,
                                                        state: item.tx_hash,
                                                    }}
                                                    style={{
                                                        color: '#7AA4FF',
                                                        fontFamily:
                                                            'CustomFontMedium',
                                                        width: '200px',
                                                    }}
                                                    className={
                                                        AccountDetail_ls.zztable_redblock
                                                    }
                                                >
                                                    {ellipsis(item.tx_hash)}
                                                </Link>
                                                <Tooltip
                                                    title={hexCharCodeToStrmath(
                                                        item.txType,
                                                    )}
                                                    color="#4D4D55"
                                                >
                                                    <span
                                                        className={
                                                            AccountDetail_ls.zztable_redblock
                                                        }
                                                        style={{
                                                            width: '170px',
                                                            textOverflow:
                                                                'ellipsis',
                                                            whiteSpace:
                                                                'nowrap',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        {hexCharCodeToStrmath(
                                                            item.txType,
                                                        )}
                                                    </span>
                                                </Tooltip>
                                                <span
                                                    className={
                                                        AccountDetail_ls.zztable_redblock
                                                    }
                                                    style={{
                                                        width: '200px',
                                                        marginLeft: '20px',
                                                    }}
                                                >
                                                    {item.reward
                                                        ? Number(
                                                              utils.formatEther(
                                                                  item.reward,
                                                              ),
                                                          ).toFixed(4)
                                                        : 0}
                                                </span>
                                            </div>
                                            {this.tableztablebox(
                                                this.state.epochtableData,
                                                item,
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    });
                }
            };
            this.BlockChaininputnumberonclick = (e) => {
                let data = document.getElementById(
                    'BlockChaininputnumber',
                ).value;
                if (e.keyCode == 13) {
                    if (Number(data) != NaN) {
                        this.state.pageOption.page = Number(data);
                    }
                }
            };
            this.tableztablebox = (data, itembs) => {
                // console.log(data);
                if (data.nft_txs) {
                    return data.nft_txs.map((item, index) => {
                        return (
                            <div
                                className={AccountDetail_ls.tableztableboxless}
                            >
                                <div
                                    style={{
                                        fontFamily: 'CustomFontMedium',
                                        width: '250px',
                                    }}
                                    className={
                                        AccountDetail_ls.zztable_redblock
                                    }
                                >
                                    {ellipsis(itembs.id)}
                                </div>
                                <div
                                    className={
                                        AccountDetail_ls.zztable_redblock
                                    }
                                    style={{ width: '200px' }}
                                >
                                    <span
                                        className={
                                            AccountDetail_ls.table_redblock
                                        }
                                    >
                                        {itembs.id
                                            ? parseInt(
                                                  '0x' +
                                                      itembs.id.slice(
                                                          4,
                                                          itembs.id.length,
                                                      ),
                                              )
                                            : 0}
                                    </span>
                                </div>
                                <span
                                    className={
                                        AccountDetail_ls.zztable_redblock
                                    }
                                    style={{ width: '250px' }}
                                >
                                    {moment(
                                        parseInt(item.timestamp) * 1000,
                                    ).format('YYYY-MM-DD HH:mm:ss')}
                                </span>
                                {item.block_number != 0 ? (
                                    item.miner ==
                                    '0x0000000000000000000000000000000000000000' ? (
                                        <Link
                                            to={{
                                                pathname: '/BlackholeBlockDeta',
                                                state: {
                                                    blockid: item.block_number,
                                                },
                                            }}
                                            style={{
                                                color: '#7AA4FF',
                                                fontFamily: 'CustomFontMedium',
                                                width: '200px',
                                            }}
                                            className={
                                                AccountDetail_ls.zztable_redblock
                                            }
                                        >
                                            {item.block_number}
                                        </Link>
                                    ) : (
                                        <Link
                                            to={{
                                                pathname: '/BlockDetails',
                                                state: {
                                                    blockid: item.block_number,
                                                },
                                            }}
                                            style={{
                                                color: '#7AA4FF',
                                                fontFamily: 'CustomFontMedium',
                                                width: '200px',
                                            }}
                                            className={
                                                AccountDetail_ls.zztable_redblock
                                            }
                                        >
                                            {item.block_number}
                                        </Link>
                                    )
                                ) : (
                                    '-'
                                )}
                                ,
                                <Link
                                    to={{
                                        pathname: `/TradeDetail`,
                                        state: item.tx_hash,
                                    }}
                                    style={{
                                        color: '#7AA4FF',
                                        fontFamily: 'CustomFontMedium',
                                        width: '200px',
                                    }}
                                    className={
                                        AccountDetail_ls.zztable_redblock
                                    }
                                >
                                    {ellipsis(item.tx_hash)}
                                </Link>
                                <Tooltip
                                    title={hexCharCodeToStrmath(item.tx_type)}
                                    color="#4D4D55"
                                >
                                    <span
                                        className={
                                            AccountDetail_ls.zztable_redblock
                                        }
                                        style={{
                                            width: '170px',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {hexCharCodeToStrmath(item.tx_type)}
                                    </span>
                                </Tooltip>
                                <span
                                    className={
                                        AccountDetail_ls.zztable_redblock
                                    }
                                    style={{
                                        width: '200px',
                                        marginLeft: '20px',
                                    }}
                                >
                                    {item.royalty
                                        ? Number(
                                              utils.formatEther(item.royalty),
                                          ).toFixed(4)
                                        : 0}
                                </span>
                            </div>
                        );
                    });
                }
            };

            this.paginationChange = async (current, size) => {
                this.state.pageOption.page = current;
                this.state.pageOption.page_size = size;
                this.state.type == 'trade'
                    ? this.transPage()
                    : this.state.type == 'NFT'
                    ? this.nftPage()
                    : this.state.type == 'SNFT'
                    ? this.snftPage()
                    : this.state.type == 'CREATOR'
                    ? this.epochpage()
                    : this.state.type == 'STAKER'
                    ? this.pledgestaker()
                    : this.state.type == 'VALIDATOR'
                    ? this.pledgevalidator()
                    : '';
            };
        };
        this.commonFunc();
    }
    handleRouter = (e, query) => {
        history.replace({ pathname: e + '/' + query, state: query });
    };
    comingsoon404() {
        history.push('/NoSearchResults');
    }
    componentDidUpdate() {}
    //组件销毁前的回调
    componentWillUnmount() {}
    render() {
        this.onChangeExchange = (e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            this.setState({
                type: e.target.value,
            });
            this.state.type = e.target.value;
            this.paginationChange(1, 10);
        };
        return (
            <>
                <div className={AccountDetail_ls.AccountDetailBox}>
                    <div style={{ display: 'flex' }}>
                        <div className={AccountDetail_ls.AccountDetailBoxTop}>
                            <div className={AccountDetail_ls.titleAndSearch}>
                                <h2>Account Details</h2>
                            </div>
                            <div className={AccountDetail_ls.hash}>
                                <span>{this.state.detailFrom}</span>{' '}
                                <AiOutlineCopy
                                    onClick={handleCopy.bind(
                                        this,
                                        this.state.detailFrom,
                                    )}
                                />
                            </div>
                            <div className={AccountDetail_ls.tags}>
                                <div>
                                    {this.state.data3.map((item) => (
                                        <Tag
                                            color="rgba(168, 255, 210, .2)"
                                            style={{
                                                color: 'rgba(158, 255, 204, 1)',
                                                padding: '0 15px',
                                            }}
                                        >
                                            {'Success'}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                            <div
                                className={
                                    AccountDetail_ls.AccountDetailBoxBottom
                                }
                            >
                                <div>
                                    <p>ERB Balance</p>{' '}
                                    <span
                                        title={(
                                            this.state.accountData.balance /
                                            1000000000000000000
                                        ).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 9,
                                        })}
                                    >
                                        {(
                                            this.state.accountData.balance /
                                            1000000000000000000
                                        ).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 9,
                                        })}
                                    </span>
                                    &nbsp; ERB
                                </div>

                                <div>
                                    <p>Total Staking</p>{' '}
                                    <span>
                                        {(
                                            this.state.accountData
                                                .stakerAmount /
                                                1000000000000000000 || 0
                                        ).toLocaleString() || 0}
                                    </span>
                                </div>
                                <div>
                                    <p>Total Staked</p>{' '}
                                    <span>
                                        {(
                                            this.state.accountData
                                                .validatorAmount /
                                                1000000000000000000 || 0
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <div>
                                    <p>Online Weight</p>{' '}
                                    {this.state.accountData.weight ? (
                                        this.state.accountData.weight == 0 ? (
                                            <span>non-validator</span>
                                        ) : this.state.accountData.weight > 0 &&
                                          this.state.accountData.weight < 40 ? (
                                            <span>
                                                {this.state.accountData.weight}
                                                &nbsp;&nbsp;
                                                <Tooltip
                                                    title={() => {
                                                        return (
                                                            <>
                                                                This credibility
                                                                is lower than 40
                                                            </>
                                                        );
                                                    }}
                                                    color="#4D4D55"
                                                >
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
                                                </Tooltip>
                                            </span>
                                        ) : this.state.accountData.weight >=
                                              40 &&
                                          this.state.accountData.weight <=
                                              50 ? (
                                            <span>
                                                {this.state.accountData.weight}
                                                &nbsp;&nbsp;
                                                <Tooltip
                                                    title={() => {
                                                        return (
                                                            <>
                                                                This credibility
                                                                is lower than 51
                                                            </>
                                                        );
                                                    }}
                                                    color="#4D4D55"
                                                >
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
                                                </Tooltip>
                                            </span>
                                        ) : (
                                            <span>
                                                {this.state.accountData.weight}
                                                &nbsp;&nbsp;
                                                <Tooltip
                                                    title={() => {
                                                        return (
                                                            <>
                                                                This credibility
                                                                is good, 70
                                                            </>
                                                        );
                                                    }}
                                                    color="#4D4D55"
                                                >
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
                                                </Tooltip>
                                            </span>
                                        )
                                    ) : (
                                        <span>non-validator</span>
                                    )}
                                </div>
                                <div>
                                    <p>ERB Income</p>{' '}
                                    <span>
                                        {(
                                            this.state.accountData
                                                .rewardCoinCount * 0.11
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                {/* <div>
                                    <p>Annualized Return</p>{' '}
                                    <span>
                                        {this.state.accountData.apr
                                            ? (
                                                  this.state.accountData.apr *
                                                  100
                                              ).toFixed(2)
                                            : '0'}{' '}
                                        %
                                    </span>
                                </div> */}

                                {/* <div>
                                    <p>SNFT Staking</p>{' '}
                                    <span>
                                        {(
                                            this.state.accountData
                                                .snftAmount /
                                            1000000000000000000
                                            || 0
                                        ).toLocaleString() }
                                    </span>
                                </div> */}
                                <div>
                                    <p>SNFT Income</p>{' '}
                                    <span>
                                        {this.state.accountData.rewardSNFTCount.toLocaleString()}
                                    </span>
                                </div>
                                <div>
                                    <p>TXN</p>{' '}
                                    <span>{this.state.accountData.nonce}</span>
                                </div>
                            </div>
                        </div>
                        <div className={AccountDetail_ls.other}>
                            <h3>Other Information</h3>
                            {/* <ul>
                                <p>Owned NFTs</p>
                                <span title={this.state.accountData.totalNFT}>
                                    {this.state.accountData.nftCount || 0}
                                </span>
                            </ul> */}
                            <ul>
                                <p>Owned SNFTs</p>
                                <span title={this.state.accountData.totalSNFT}>
                                    {this.state.accountData.snftCount || 0}
                                </span>
                            </ul>

                            <ul>
                                <p>Royalty profits</p>
                                <span>
                                    {this.state.accountData.profit
                                        ? Number(
                                              utils.formatEther(
                                                  this.state.accountData.profit,
                                              ),
                                          ).toFixed(2)
                                        : 0}{' '}
                                    ERB
                                </span>
                            </ul>
                            <ul>
                                <p>Owned NFTs</p>
                                <span>
                                    {this.state.accountData.nftCount
                                        ? this.state.accountData.nftCount
                                        : 0}
                                </span>
                            </ul>
                        </div>
                    </div>
                </div>
                <div
                    style={{ marginLeft: 40 }}
                    className={AccountDetail_ls.changeButton}
                >
                    <Radio.Group
                        value={this.state.type}
                        onChange={this.onChangeExchange}
                        className={AccountDetail_ls.AccountDetailButtonGroup}
                        style={{
                            marginBottom: 0,
                        }}
                    >
                        <Radio.Button defaultChecked={true} value="trade">
                            TXN
                        </Radio.Button>
                        <Radio.Button value="STAKER">Stake</Radio.Button>
                        <Radio.Button value="VALIDATOR">Staked</Radio.Button>
                        <Radio.Button value="SNFT">SNFT</Radio.Button>
                        <Radio.Button value="NFT">NFT</Radio.Button>
                        <Radio.Button value="CREATOR">CREATOR</Radio.Button>
                    </Radio.Group>
                </div>
                {this.state.type == 'CREATOR' ? (
                    <div className={AccountDetail_ls.Blockrewardbox_center}>
                        <div
                            className={AccountDetail_ls.Blockrewardbox_titlebox}
                        >
                            <div
                                className={
                                    AccountDetail_ls.Blockrewardbox_namebox
                                }
                            >
                                <p
                                    className={
                                        AccountDetail_ls.Blockrewardbox_nameboxp
                                    }
                                    style={{ width: '250px' }}
                                >
                                    Period Address
                                </p>
                                <div
                                    className={
                                        AccountDetail_ls.Blockrewardbox_nameboxp
                                    }
                                    style={{ width: '200px' }}
                                >
                                    <div
                                        className={AccountDetail_ls.tablexbox2}
                                    >
                                        <span>Period</span>
                                        <Tooltip
                                            placement="bottom"
                                            title={() => {
                                                return (
                                                    <div
                                                        className={
                                                            AccountDetail_ls.tablexbox2_Period
                                                        }
                                                    >
                                                        <p>
                                                            SNFT Grades Are LO,
                                                            L1, L2, And L3 From
                                                            The Lowest To The
                                                            Highest. YouCan
                                                            Synthesize It To
                                                            Higher Levels For
                                                            Higher Revenue.
                                                        </p>
                                                        <p>
                                                            The Rules Are As
                                                            Below:
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
                                                            Indicates The SNFT
                                                            LO Position Number
                                                            In An SNFT L1.
                                                        </p>
                                                        <p>
                                                            The Green Number
                                                            Indicates The
                                                            Position Number Of
                                                            SNFT L1In An SNFT
                                                            L2.
                                                        </p>
                                                        <p>
                                                            The Yellow Number
                                                            Indicates The SNFT
                                                            L2 Position Number
                                                            In An SNFT L3.
                                                        </p>
                                                        <p>
                                                            The Red Number
                                                            Refers To The
                                                            Position Number Of
                                                            An SNFT L3.
                                                        </p>
                                                    </div>
                                                );
                                            }}
                                            color="#4D4D55"
                                        >
                                            <span
                                                className={
                                                    AccountDetail_ls.tablexbox2_icon
                                                }
                                            >
                                                <QuestionCircleOutlined />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </div>
                                <p
                                    className={
                                        AccountDetail_ls.Blockrewardbox_nameboxp
                                    }
                                    style={{ width: '250px' }}
                                >
                                    <div className={AccountDetail_ls.tablexbox}>
                                        TXN Time
                                        {this.state.stakevaluecolor == 0 ? (
                                            <div
                                                className={
                                                    AccountDetail_ls.tablex
                                                }
                                            >
                                                <CaretUpOutlined
                                                    onClick={this.StakeValue.bind(
                                                        this,
                                                        1,
                                                    )}
                                                />
                                                <CaretDownOutlined
                                                    onClick={this.StakeValue.bind(
                                                        this,
                                                        2,
                                                    )}
                                                />
                                            </div>
                                        ) : this.state.stakevaluecolor == 1 ? (
                                            <div
                                                className={
                                                    AccountDetail_ls.tablex
                                                }
                                            >
                                                <CaretUpOutlined
                                                    onClick={this.StakeValue.bind(
                                                        this,
                                                        1,
                                                    )}
                                                    style={{ color: '#7AA4FF' }}
                                                />
                                                <CaretDownOutlined
                                                    onClick={this.StakeValue.bind(
                                                        this,
                                                        2,
                                                    )}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    AccountDetail_ls.tablex
                                                }
                                            >
                                                <CaretUpOutlined
                                                    onClick={this.StakeValue.bind(
                                                        this,
                                                        1,
                                                    )}
                                                />
                                                <CaretDownOutlined
                                                    onClick={this.StakeValue.bind(
                                                        this,
                                                        2,
                                                    )}
                                                    style={{ color: '#7AA4FF' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </p>
                                <div
                                    className={
                                        AccountDetail_ls.Blockrewardbox_nameboxp
                                    }
                                    style={{ width: '200px' }}
                                >
                                    <div
                                        className={AccountDetail_ls.tablexbox2}
                                    >
                                        <span>Block Height</span>
                                        <Tooltip
                                            title={() => {
                                                return (
                                                    <div
                                                        className={
                                                            AccountDetail_ls.tablexbox2_Period
                                                        }
                                                    >
                                                        <p>
                                                            The lastest block
                                                            height that user
                                                            been CreatorEvery
                                                            creators' block
                                                            height is different.
                                                        </p>
                                                    </div>
                                                );
                                            }}
                                            color="#4D4D55"
                                        >
                                            <span
                                                className={
                                                    AccountDetail_ls.tablexbox2_icon
                                                }
                                            >
                                                <QuestionCircleOutlined />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </div>
                                <p
                                    className={
                                        AccountDetail_ls.Blockrewardbox_nameboxp
                                    }
                                    style={{ width: '200px' }}
                                >
                                    TXN Hash
                                </p>
                                <p
                                    className={
                                        AccountDetail_ls.Blockrewardbox_nameboxp
                                    }
                                    style={{ width: '170px' }}
                                >
                                    TXN Type
                                </p>
                                <div
                                    className={
                                        AccountDetail_ls.Blockrewardbox_nameboxp
                                    }
                                    style={{
                                        width: '200px',
                                        marginLeft: '20px',
                                    }}
                                >
                                    <div
                                        className={AccountDetail_ls.tablexbox2}
                                    >
                                        <span>Rewards</span>
                                        <Tooltip
                                            title={() => {
                                                return (
                                                    <div
                                                        className={
                                                            AccountDetail_ls.tablexbox2_Period
                                                        }
                                                    >
                                                        <p>
                                                            Creators can get a
                                                            rewards as a
                                                            transaction
                                                            creator.creators can
                                                            get 10% of total
                                                            tansactions amount
                                                            as royalty
                                                        </p>
                                                    </div>
                                                );
                                            }}
                                            color="#4D4D55"
                                        >
                                            <span
                                                className={
                                                    AccountDetail_ls.tablexbox2_icon
                                                }
                                            >
                                                <QuestionCircleOutlined />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.tableData ? (
                            this.state.tableData.length != 0 ? (
                                this.tableblocklist(this.state.tableData)
                            ) : (
                                <div className={AccountDetail_ls.nodatabox}>
                                    <svg
                                        class="ant-empty-img-simple"
                                        width="64"
                                        height="41"
                                        viewBox="0 0 64 41"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            transform="translate(0 1)"
                                            fill="none"
                                            fill-rule="evenodd"
                                        >
                                            <ellipse
                                                class="ant-empty-img-simple-ellipse"
                                                cx="32"
                                                cy="33"
                                                rx="32"
                                                ry="7"
                                            ></ellipse>
                                            <g
                                                class="ant-empty-img-simple-g"
                                                fill-rule="nonzero"
                                            >
                                                <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                                                <path
                                                    d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                                    class="ant-empty-img-simple-path"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <div className={AccountDetail_ls.nodata}>
                                        No Data
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className={AccountDetail_ls.nodatabox}>
                                <svg
                                    class="ant-empty-img-simple"
                                    width="64"
                                    height="41"
                                    viewBox="0 0 64 41"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        transform="translate(0 1)"
                                        fill="none"
                                        fill-rule="evenodd"
                                    >
                                        <ellipse
                                            class="ant-empty-img-simple-ellipse"
                                            cx="32"
                                            cy="33"
                                            rx="32"
                                            ry="7"
                                        ></ellipse>
                                        <g
                                            class="ant-empty-img-simple-g"
                                            fill-rule="nonzero"
                                        >
                                            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                                            <path
                                                d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                                class="ant-empty-img-simple-path"
                                            ></path>
                                        </g>
                                    </g>
                                </svg>
                                <div className={AccountDetail_ls.nodata}>
                                    No Data
                                </div>
                            </div>
                        )}
                        {}
                        <div
                            className={
                                AccountDetail_ls.BlockChainBox_Pagination
                            }
                            id="BlockChainBoxPagination"
                        >
                            <Pagination
                                defaultCurrent={1}
                                total={this.state.tableTotal}
                                onChange={this.ceratoronChange}
                                showSizeChanger={false}
                                current={this.state.pageOption.page}
                            />
                            <div
                                className={
                                    AccountDetail_ls.BlockChainBox_Pagination_d
                                }
                            >
                                10/Page
                            </div>
                            <span
                                className={
                                    AccountDetail_ls.BlockChainBox_Pagination_span1
                                }
                            >
                                To
                            </span>
                            <input
                                id="BlockChaininputnumber"
                                className={
                                    AccountDetail_ls.BlockChainBox_Pagination_input
                                }
                                onKeyDown={this.BlockChaininputnumberonclick}
                            />
                            <span
                                className={
                                    AccountDetail_ls.BlockChainBox_Pagination_span2
                                }
                            >
                                Page
                            </span>
                        </div>
                    </div>
                ) : (
                    <div
                        className={AccountDetail_ls.AccountDetailBox1}
                        id="AccountDetailTable"
                    >
                        <ConfigProvider
                        // locale={zhCN}
                        >
                            <Table
                                dataSource={this.state.tableData}
                                id={'AccountDetailTable'}
                                columns={
                                    this.state.type == 'trade'
                                        ? this.state.transcolumns
                                        : this.state.type == 'NFT'
                                        ? this.state.nftcolumns
                                        : this.state.type == 'SNFT'
                                        ? this.state.snftcolumns
                                        : this.state.type == 'CREATOR'
                                        ? this.state.creatorcolumns
                                        : this.state.type == 'STAKER'
                                        ? this.state.stakercolumns
                                        : this.state.type == 'VALIDATOR'
                                        ? this.state.validatorcolumns
                                        : ''
                                }
                                loading={this.state.loading}
                                pagination={{
                                    current: this.state.pageOption.page,
                                    pageSize: this.state.pageOption.pageSize,
                                    showQuickJumper: true,
                                    defaultCurrent: 1,
                                    total: this.state.tableTotal,
                                    onChange: (current, size) =>
                                        this.paginationChange(current, size),
                                }}
                                expandable={
                                    this.state.type == 'CREATOR'
                                        ? {
                                              expandedRowRender: (record) => (
                                                  <div
                                                      className={
                                                          AccountDetail_ls.tableselect_blockbox
                                                      }
                                                  >
                                                      <div
                                                          className={
                                                              AccountDetail_ls.tableselect_blockbox_center
                                                          }
                                                      >
                                                          {record.id}
                                                      </div>
                                                  </div>
                                              ),
                                              fixed: true,
                                              defaultExpandedRowKeys: [0],
                                          }
                                        : ''
                                }
                            ></Table>
                        </ConfigProvider>
                    </div>
                )}
            </>
        );
    }
}

export default AccountDetail;
