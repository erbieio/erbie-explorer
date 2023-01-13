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
import AccountDetail_ls from '../AccountDetail/AccountDetail.less';
import Search from '../../components/SearchBox/SearchBox';
import other from './../../assets/images/AccountDetail/other.png';
import {
    accountDetail,
    nftPage,
    transactionPage,
    snftPage,
    totals,
} from '../../api/request_data/AccountDetail_request';
import Trade_ls from '../Trade/Trade.less';
import copy from 'copy-to-clipboard';
import { history } from '../../.umi/core/history';
import {
    timestamp,
    ellipsis,
    hexCharCodeToStr,
} from '../../utils/methods/Methods';
import { utils } from 'ethers';
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
            transcolumns: [
                {
                    title: 'TXN Hash',
                    dataIndex: 'hash',
                    key: 'hash',
                    render: (tags) => (
                        <Link
                            title={tags}
                            to={{
                                pathname: `/TradeDetail/${tags}`,
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
                                pathname: `/AccountDetail/${tags}`,
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
                                pathname: `/AccountDetail/${tags}`,
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
                                pathname: '/NFT/NFTDetails',
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
                    title: 'Creator',
                    key: 'creator',
                    dataIndex: 'creator',
                    ellipsis: true,
                    render: (text) =>
                        text == '0x0000000000000000000000000000000000000000' ? (
                            <span>Official S-NFT</span>
                        ) : (
                            <Link
                                to={{
                                    pathname: `/AccountDetail/${text}`,
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
                    ellipsis: true,
                    render: (text, data) => (
                        <Link
                            to={{
                                pathname: `/AccountDetail/${text}`,
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
                    ellipsis: true,
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
                                pathname: '/SNFT/SNFTDetails',
                                state: { snftid: data.address },
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
                    ellipsis: true,
                },
                {
                    title: 'Creator',
                    key: 'creator',
                    dataIndex: 'creator',
                    ellipsis: true,
                    render: (text, data) =>
                        text == '0x0000000000000000000000000000000000000000' ? (
                            <span>Official S-NFT</span>
                        ) : (
                            <Link
                                to={{
                                    pathname: `/AccountDetail/${text}`,
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
                                pathname: `/AccountDetail/${text}`,
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
        };
    }
    componentWillReceiveProps(nextProps) {
        const id = nextProps.location.state;
        console.log(nextProps);
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
        console.log(this.props.location);
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
                console.log(JSON.parse(state).useCache);
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
                    console.log(res);
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
                console.log('nft查询');
                console.log(res);
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
                console.log('交易查询');
                console.log(res);
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
                console.log('snft查询');
                console.log(res);
                if (res) {
                    this.setState({
                        tableData: res.nfts,
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
                        <h2>Account Details</h2>
                        <Search></Search>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className={AccountDetail_ls.AccountDetailBoxTop}>
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
                                    <p>Staked Amount</p>{' '}
                                    <span>
                                        {(
                                            this.state.accountData
                                                .validatorAmount /
                                                1000000000000000000 || 0
                                        ).toLocaleString()}
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
                                    <p>ERB Income</p>{' '}
                                    <span>
                                        {(
                                            this.state.accountData
                                                .rewardCoinCount * 0.11
                                        ).toLocaleString()}
                                    </span>
                                </div>
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
                    </Radio.Group>
                </div>
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
                        ></Table>
                    </ConfigProvider>
                </div>
            </>
        );
    }
}

export default AccountDetail;
