import React, { Component } from 'react';
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
} from 'antd';
const { Option } = Select;
const { Column, ColumnGroup } = Table;
import zhCN from 'antd/es/locale/zh_CN';
import { AiOutlineCopy } from 'react-icons/ai';
import AccountDetail_ls from './AccountDetail.less';
import Search from '../../components/SearchBox/SearchBox';
import other from './../../assets/images/AccountDetail/other.png';
import {
    accountDetail,
    nftPage,
    transactionPage,
    snftPage,
    totals,
    epochpage,
} from '../../api/request_data/AccountDetail_request';
import {
    CaretUpOutlined,
    CaretDownOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import Trade_ls from '../Trade/Trade.less';
import copy from 'copy-to-clipboard';
import { history } from '../../.umi/core/history';
import { utils } from 'ethers';
import {
    timestamp,
    ellipsis,
    hexCharCodeToStr,
} from '../../utils/methods/Methods';
import { Link } from 'umi';
import moment from 'moment';
const handleCopy = (value) => {
    copy(value);
    message.success('copy Success');
};
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
//Stake Value 排序
function StakeValue(text) {
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
}
class AccountDetail extends React.Component {
    //Clock构造函数
    constructor(props) {
        super(props);
        this.state = {
            data3: [],
            pageOption: {
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
            stateHash: '',
            detailFrom: '',
            stakevaluecolor: 0,
            orderdata: '',
            totaldata: {},
            transcolumns: [
                {
                    title: 'TXN Hash',
                    dataIndex: 'hash',
                    key: 'hash',
                    render: (tags) => (
                        <Link
                            title={tags}
                            to={{
                                pathname: `/TradeDetailApp/${tags}`,
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
                    width: '120px',
                },
                {
                    title: 'Block Height',
                    dataIndex: 'blockNumber',
                    key: 'blockNumber',
                    render: (text, data) =>
                        data.number != 0 ? (
                            data.miner ==
                            '0x0000000000000000000000000000000000000000' ? (
                                <Link
                                    to={{
                                        pathname:
                                            '/BlockChainApp/BlackholeBlockDetaApp',
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
                                        pathname:
                                            '/BlockChainApp/BlockDetailsApp',
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
                    width: '110px',
                    ellipsis: true,
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
                    width: '120px',
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
                                pathname: `/AccountDetailApp/${tags}`,
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
                    width: '120px',
                },
                {
                    title: 'Receiver',
                    key: 'to',
                    dataIndex: 'to',
                    render: (tags) => (
                        <Link
                            title={tags}
                            to={{
                                pathname: `/AccountDetailApp/${tags}`,
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
                    width: '120px',
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
                    width: '120px',
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
                    width: '150px',
                },
            ],
            nftcolumns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    showSorterTooltip: true,
                    onCell: () => {
                        return {
                            style: {
                                maxWidth: 120,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer',
                                color: '#7AA4FF',
                            },
                        };
                    },
                    render: (text, data) => (
                        <Link
                            title={text}
                            to={{
                                pathname: '/NFTApp/NFTDetailsApp',
                                state: { nftid: data },
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {text}
                        </Link>
                    ),
                },
                {
                    title: 'Price(ERB)',
                    dataIndex: 'last_price',
                    key: 'last_price',
                    render: (text) => <span>{text / 1000000000000000000}</span>,
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
                },
                {
                    title: 'Creator',
                    key: 'creator',
                    dataIndex: 'creator',

                    render: (text, data) =>
                        text == '0x0000000000000000000000000000000000000000' ? (
                            <span>Official S-NFT</span>
                        ) : (
                            <Link
                                to={{
                                    pathname: `/AccountDetailApp/${text}`,
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
                    key: 'owner',
                    dataIndex: 'owner',

                    render: (text, data) => (
                        <Link
                            to={{
                                pathname: `/AccountDetailApp/${text}`,
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
                    title: 'Collection',
                    key: 'collectionName',
                    dataIndex: 'collectionName',
                },
            ],
            snftcolumns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    onCell: () => {
                        return {
                            style: {
                                maxWidth: 120,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer',
                                color: '#7AA4FF',
                            },
                        };
                    },
                    render: (text, data) => (
                        <Link
                            title={text}
                            to={{
                                pathname: '/SNFTApp/SNFTDetailsApp',
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
                },
                {
                    title: 'Creation Time',
                    dataIndex: 'reward_at',
                    key: 'reward_at',
                    render: (text) => (
                        <span>
                            {moment(parseInt(text) * 1000).format(
                                'YYYY-MM-DD HH:mm:ss',
                            )}
                        </span>
                    ),
                },
                {
                    title: 'Author',
                    key: 'creator',
                    dataIndex: 'creator',

                    render: (text, data) => (
                        <Link
                            to={{
                                pathname: `/AccountDetailApp/${text}`,
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

                    render: (text, data) => (
                        <Link
                            to={{
                                pathname: `/AccountDetailApp/${text}`,
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
            ],
            creatorcolumns: [
                {
                    title: 'Period Address',
                    dataIndex: 'id',
                    key: 'id',
                    render: (text) => (
                        <Link
                            to={{
                                pathname: `/AccountDetailApp/${text}`,
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
                                                S-NFT Grades Are LO, L1, L2, And
                                                L3 From The Lowest To The
                                                Highest. YouCan Synthesize It To
                                                Higher Levels For Higher
                                                Revenue.
                                            </p>
                                            <p>The Rules Are As Below:</p>
                                            <p>
                                                16 Specifc S-NFT LO Synthesizes
                                                A Unique S-NFT L1.
                                            </p>
                                            <p>
                                                16 Specifc S-NFT L1 Synthesizes
                                                A Unique S-NFT L2.
                                            </p>
                                            <p>
                                                16 Specifc S-NFT L2 Synthesizes
                                                A Unique S-NFT L3.{' '}
                                            </p>
                                            <p>
                                                The Blue Number Indicates The
                                                S-NFT LO Position Number In An
                                                S-NFT L1.
                                            </p>
                                            <p>
                                                The Green Number Indicates The
                                                Position Number Of S-NFT L1In An
                                                S-NFT L2.
                                            </p>
                                            <p>
                                                The Yellow Number Indicates The
                                                S-NFT L2 Position Number In An
                                                S-NFT L3.
                                            </p>
                                            <p>
                                                The Red Number Refers To The
                                                Position Number Of An S-NFT L3.
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
                                        {parseInt('0x' + text.slice(39, 40)) +
                                            1}
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
                                        {parseInt('0x' + text.slice(40, 41)) +
                                            1}
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
                                        {parseInt('0x' + text.slice(41, 42)) +
                                            1}
                                    </span>
                                </Tooltip>
                            ) : (
                                ''
                            )}
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
                                        pathname:
                                            '/BlockChainApp/BlackholeBlockDetaApp',
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
                                        pathname:
                                            '/BlockChainApp/BlockDetailsApp',
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
                                pathname: `/TradeDetailApp/${text}`,
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
                    dataIndex: 'number',
                    key: 'number',
                    render: (text) => <span>{text}</span>,
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
                {
                    title: () => (
                        <div className={AccountDetail_ls.tablexbox2}>
                            <span>Action</span>
                            <Tooltip
                                title={() => {
                                    return (
                                        <div
                                            className={
                                                AccountDetail_ls.tablexbox2_Period
                                            }
                                        >
                                            <p>
                                                Go to marketplace to check the
                                                details.
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
                    dataIndex: 'aaaa',
                    key: 'aaaa',
                    render: (text) => <span>Go it</span>,
                },
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
        if (this.props.location.state) {
            window.sessionStorage.setItem('hash', this.props.location.state);
        } else {
            let pathhash = this.props.location.pathname.split('/');
            pathhash
                ? window.sessionStorage.setItem(
                      'hash',
                      pathhash[pathhash.length - 1],
                  )
                : '';
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
                    this.setState({
                        accountData: res,
                        loading: false,
                    });
                }
            })();
            (async () => {
                const res = await totals();
                console.log(res);
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
                console.log(res);
                if (res) {
                    this.setState({
                        tableData: res.epochs,
                        tableTotal: res.total,
                        loading: false,
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
                    <div className={AccountDetail_ls.titleAndSearch}>
                        Account Details
                    </div>
                    <div className={AccountDetail_ls.flexColBox}>
                        <div className={AccountDetail_ls.AccountDetailBoxTop}>
                            <div className={AccountDetail_ls.hash}>
                                <span>
                                    {this.state.detailFrom.slice(0, 16) +
                                        '...' +
                                        this.state.detailFrom.slice(
                                            -12,
                                            this.state.detailFrom.length,
                                        )}
                                </span>{' '}
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
                                    <p>Validator Staking</p>{' '}
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
                                            </span>
                                        ) : this.state.accountData.weight >=
                                              40 &&
                                          this.state.accountData.weight <=
                                              50 ? (
                                            <span>
                                                {this.state.accountData.weight}
                                                &nbsp;&nbsp;
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
                                            </span>
                                        ) : (
                                            <span>
                                                {this.state.accountData.weight}
                                                &nbsp;&nbsp;
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
                                <div>
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
                                </div>
                                <div>
                                    <p>Marketplace Staking</p>{' '}
                                    <span>
                                        {(
                                            this.state.accountData
                                                .exchangerAmount /
                                                1000000000000000000 || 0
                                        ).toLocaleString() || 0}
                                    </span>
                                </div>
                                {/* <div>
                                    <p>S-NFT Staking</p>{' '}
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
                                    <p>S-NFT Income</p>{' '}
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
                            <div>
                                <h3>Other Information</h3>
                                <ul>
                                    <p>Owned NFTs</p>
                                    <span
                                        title={this.state.accountData.totalNFT}
                                    >
                                        {this.state.accountData.nftCount || 0}
                                    </span>
                                </ul>
                                <ul>
                                    <p>Owned S-NFTs</p>
                                    <span
                                        title={this.state.accountData.totalSNFT}
                                    >
                                        {this.state.accountData.snftCount || 0}
                                    </span>
                                </ul>
                                <ul>
                                    <p>Direct rewards</p>
                                    <span>
                                        {this.state.accountData.reward
                                            ? Number(
                                                  utils.formatEther(
                                                      this.state.accountData
                                                          .reward,
                                                  ),
                                              ).toFixed(2)
                                            : 0}{' '}
                                        ERB
                                    </span>
                                </ul>
                                <ul>
                                    <p>Royalty profits</p>
                                    <span>
                                        {this.state.accountData.profit
                                            ? Number(
                                                  utils.formatEther(
                                                      this.state.accountData
                                                          .profit,
                                                  ),
                                              ).toFixed(2)
                                            : 0}{' '}
                                        ERB
                                    </span>
                                </ul>
                                <ul>
                                    <p>Total Profits of Being a Creator</p>
                                    <span>
                                        {this.state.accountData.profit &&
                                        this.state.accountData.reward
                                            ? (
                                                  Number(
                                                      utils.formatEther(
                                                          this.state.accountData
                                                              .reward,
                                                      ),
                                                  ) +
                                                  Number(
                                                      utils.formatEther(
                                                          this.state.accountData
                                                              .profit,
                                                      ),
                                                  )
                                              ).toFixed(2)
                                            : 0}{' '}
                                        ERB
                                    </span>
                                </ul>
                                <ul>
                                    <p
                                        className={
                                            AccountDetail_ls.tablexbox2_titletext
                                        }
                                    >
                                        S-NFT Value{' '}
                                        <Tooltip
                                            title={() => {
                                                return (
                                                    <div
                                                        className={
                                                            AccountDetail_ls.tablexbox2_Period
                                                        }
                                                    >
                                                        <p>
                                                            Go to marketplace to
                                                            check the details.
                                                        </p>
                                                    </div>
                                                );
                                            }}
                                            color="#4D4D55"
                                        >
                                            <span>
                                                <QuestionCircleOutlined />
                                            </span>
                                        </Tooltip>
                                    </p>
                                    <span>
                                        {' '}
                                        {this.state.accountData.snftValue
                                            ? Number(
                                                  utils.formatEther(
                                                      this.state.accountData
                                                          .snftValue,
                                                  ),
                                              ).toFixed(2)
                                            : 0}
                                    </span>
                                </ul>
                                <ul>
                                    <p
                                        className={
                                            AccountDetail_ls.tablexbox2_titletext
                                        }
                                    >
                                        Blocks Number{' '}
                                        <Tooltip
                                            title={() => {
                                                return (
                                                    <div
                                                        className={
                                                            AccountDetail_ls.tablexbox2_Period
                                                        }
                                                    >
                                                        <p>
                                                            The block height of
                                                            the last time this
                                                            account was
                                                            nominated as a
                                                            Creator.
                                                        </p>
                                                    </div>
                                                );
                                            }}
                                            color="#4D4D55"
                                        >
                                            <span>
                                                <QuestionCircleOutlined />
                                            </span>
                                        </Tooltip>
                                    </p>
                                    <span>
                                        {this.state.accountData.lastNumber}
                                    </span>
                                </ul>
                                <ul>
                                    <p
                                        className={
                                            AccountDetail_ls.tablexbox2_titletext
                                        }
                                    >
                                        Creator Pre-nomination Weight{' '}
                                        <Tooltip
                                            title={() => {
                                                return (
                                                    <div
                                                        className={
                                                            AccountDetail_ls.tablexbox2_Period
                                                        }
                                                    >
                                                        <p>
                                                            Current block height
                                                            * S-NFT value.
                                                        </p>
                                                    </div>
                                                );
                                            }}
                                            color="#4D4D55"
                                        >
                                            <span>
                                                <QuestionCircleOutlined />
                                            </span>
                                        </Tooltip>
                                    </p>
                                    <span>
                                        {this.state.totaldata.totalBlock &&
                                        this.state.accountData.lastNumber &&
                                        this.state.accountData.snftValue
                                            ? Number(
                                                  String(
                                                      (this.state.totaldata
                                                          .totalBlock -
                                                          this.state.accountData
                                                              .lastNumber) *
                                                          utils.formatEther(
                                                              this.state
                                                                  .accountData
                                                                  .snftValue,
                                                          ),
                                                  ),
                                              ).toFixed(2)
                                            : 0}
                                    </span>
                                </ul>
                            </div>
                            <div>
                                <img src={other} />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{ marginLeft: 40 }}
                    className={AccountDetail_ls.changeButton}
                    id="AccountDetailButtonGroup"
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
                        <Radio.Button value="SNFT">S-NFT</Radio.Button>
                        <Radio.Button value="NFT">NFT</Radio.Button>
                        <Radio.Button value="CREATOR">CREATOR</Radio.Button>
                    </Radio.Group>
                </div>
                <div
                    className={AccountDetail_ls.AccountDetailBox1}
                    id="AccountDetailTableApp"
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
                                    : ''
                            }
                            // loading={this.state.loading}
                            pagination={{
                                position: ['bottomCenter'],
                                current: this.state.pageOption.page,
                                pageSize: this.state.pageOption.pageSize,
                                showQuickJumper: false,
                                defaultCurrent: 1,
                                total: this.state.tableTotal,
                                onChange: (current, size) =>
                                    this.paginationChange(current, size),
                            }}
                            scroll={{ x: 'max-content' }}
                        ></Table>
                    </ConfigProvider>
                </div>
            </>
        );
    }
}

export default AccountDetail;
