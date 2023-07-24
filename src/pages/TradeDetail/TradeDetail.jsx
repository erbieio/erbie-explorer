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
import { utils } from 'ethers';
const { Option } = Select;
const { Column, ColumnGroup } = Table;
import zhCN from 'antd/es/locale/zh_CN';
import { AiOutlineCopy } from 'react-icons/ai';
import TradeDetail_ls from '../TradeDetail/TradeDetail.less';
import Search from '../../components/SearchBox/SearchBox';
import { GoTriangleDown } from 'react-icons/go';
import {
    transactionDetail,
    transaction,
    recycle_tx,
    nfttx,
} from '../../api/request_data/Trade_request';
import copy from 'copy-to-clipboard';
import { history } from '../../.umi/core/history';
import { Link } from 'umi';
import AccountDetail_ls from '../AccountDetail/AccountDetail.less';
import { knownHashes } from './inputData';
const deal = require('../../assets/json/dealType.json');
const { dealType } = deal;
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
function ex16hex(value) {
    return parseInt(value, 16) || 0;
}
function hexCharCodeToStr(hexCharCodeStr) {
    // console.log(hexCharCodeStr)
    var trimedStr = hexCharCodeStr.trim();
    if (trimedStr === '0x') {
        return { name: 'Transfer', type: 999 };
    }
    var rawStr =
        trimedStr.substr(0, 2).toLowerCase() === '0x'
            ? trimedStr.substr(2)
            : trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
        return { name: '', type: 999 };
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode));
    }

    let StrTran = resultStr.join('');
    if (StrTran.substring(0, StrTran.indexOf(':')) !== 'wormholes') {
        return { name: 'contract based transaction', type: 999 };
    } else {
        let obj = JSON.parse(StrTran.substring(10));
        dealType.forEach((item) => {
            obj.type === item.type ? (obj.name = item.name) : '';
        });
        // obj.name = `Deal No. ${obj.type}`
        return obj;
    }
    // return StrTran.substring(0,StrTran.indexOf(":")) + " transaction";
}
class TradeDetail extends React.Component {
    //Clock构造函数
    constructor(props) {
        super(props);
        this.state = {
            dataLog: [],
            type: 'Dec',
            hash: '0xea674fdde71sssssdsffaa9716b898ec8',
            detailData: {
                hash: '',
                input: '',
                from: '',
                to: '',
            },
            newDetailData: {},
            transType: '',
            detailDataLog: [],
            topicsType: 'Hex',
            Trastate: '',
            typeGroup: 'log',
            inputData: [],
            nfttxdata: {},
        };
    }
    componentWillReceiveProps(nextProps) {
        const id = nextProps.location.state;
        if (id) {
            window.sessionStorage.setItem('Trastate', id);
        }
        this.state.Trastate = window.sessionStorage.getItem('Trastate');
        this.commonFunc();
        // history.replace({ pathname: nextProps.location.pathname, state: id })
    }

    //插入DOM前的回调函数
    componentDidMount() {
        let subArr = this.props.location.pathname.split('/');
        if (this.props.location.state) {
            window.sessionStorage.setItem(
                'Trastate',
                this.props.location.state,
            );
        } else if (subArr.lastItem) {
            window.sessionStorage.setItem('Trastate', subArr.lastItem);
        }
        this.state.Trastate = window.sessionStorage.getItem('Trastate');
        this.commonFunc = () => {
            this.total = () => {
                let total1 = 0;
                this.state.chartData.forEach((item) => {
                    total1 += item.population;
                });
                return total1;
            };
            this.handleChange = (value, index1, index, index2) => {
                let rea = [...this.state.dataLog];
                if (index2 === 'Hex') {
                    this.state.dataLog.map((item, ind) => {
                        let detail = [];
                        ind === index
                            ? item.topics.forEach((item1, ind1) => {
                                  ind1 === index1
                                      ? detail.push(
                                            JSON.stringify({
                                                type: true,
                                                value: JSON.parse(item1).value,
                                            }),
                                        )
                                      : detail.push(item1);
                              })
                            : this.state.dataLog;
                        rea.forEach((reaitem) => {
                            return (reaitem.topics = detail);
                        });
                    });
                    // val = JSON.stringify(JSON.parse(this.state.dataLog[index].topics[index1]).type = true)
                } else {
                    this.state.dataLog.forEach((item, ind) => {
                        let detail = [];
                        ind === index
                            ? item.topics.forEach((item1, ind1) => {
                                  ind1 === index1
                                      ? detail.push(
                                            JSON.stringify({
                                                type: false,
                                                value: JSON.parse(item1).value,
                                            }),
                                        )
                                      : detail.push(item1);
                              })
                            : this.state.dataLog;
                        rea.forEach((reaitem) => {
                            return (reaitem.topics = detail);
                        });
                    });
                    // rea.topics = detail;

                    // val = JSON.stringify(JSON.parse(this.state.dataLog[index].topics[index1]).type = false)
                }
                // switch (value) {
                // case `Hex${}` :
                // this.state.topicsType = "Hex"
                // case "Dec" :
                //     this.state.topicsType = value
                // }
                this.setState({
                    dataLog: rea,
                });
            };
            this.onChangeExchange = (e) => {
                this.setState({ type: e.target.value });
            };
            this.onChangeinput = (e) => {
                this.setState({ typeGroup: e.target.value });
            };
            // (async () => {
            //     const res = await nfttx(transactionres.hash);
            //     console.log(res);
            //     if (res) {
            //         this.setState({
            //             nfttxdata: res,
            //         });
            //     }
            // })();
            // this.setState( {
            //     Trastate: window.sessionStorage.getItem("Trastate")
            // })
            (async () => {
                const res = await transactionDetail(this.state.Trastate);
                if (res) {
                    console.log(res);
                    res.forEach((item) => {
                        let val = [];
                        item.topics.forEach((value) => {
                            val.push(
                                JSON.stringify({ type: true, value: value }),
                            );
                        });
                        item.topics = val;
                    });
                    let logdata = res;
                    this.setState({
                        dataLog: logdata,
                    });
                }
                const transactionres = await transaction(this.state.Trastate);
                console.log(transactionres);
                if (transactionres) {
                    console.log(transactionres);
                    const res = await nfttx(transactionres.hash);
                    console.log(res);
                    if (res) {
                        this.setState({
                            nfttxdata: res,
                        });
                    }
                }
                let state = JSON.stringify(transactionres);
                if (state === 'null') {
                    return this.comingsoon404();
                }
                if (
                    JSON.parse(state).useCache !== undefined &&
                    JSON.parse(state).useCache === false
                ) {
                    this.comingsoon404();
                } else {
                    // console.log(transactionres)
                    let arr = transactionres.input.substring(10);
                    let num = Math.floor(arr.length / 64);
                    let arr1 = [];
                    for (let i = 0; i < num; i++) {
                        arr1.push(arr.substr(i * 64, 64));
                    }
                    this.state.inputData = arr1;
                    transactionres.transType = hexCharCodeToStr(
                        transactionres.input,
                    );
                    this.setState({
                        detailData: transactionres,
                        inputData: arr1,
                        transType: hexCharCodeToStr(transactionres.input),
                    });
                    if (
                        transactionres instanceof Object &&
                        transactionres.transType.type === 6
                    ) {
                        const recycle_tx1 = await recycle_tx({
                            hash: this.state.detailData.hash,
                            addr: '',
                        });
                        if (recycle_tx1) {
                            // let got = recycle_tx1.count
                            // recycle_tx1.address.length === 42 ? got = got * 0.095 : recycle_tx1.address.length === 41 ?got= got * 0.143 :recycle_tx1.address.length === 40 ?got= got * 0.271 : recycle_tx1.address.length === 39 ? got * 0.65 :got * 0
                            // let obj = recycle_tx1
                            // obj.got = got;

                            this.setState({
                                newDetailData: recycle_tx1,
                            });
                            // console.log(obj);
                        }
                    }
                }
            })();
        };
        this.commonFunc();
    }
    comingsoon404() {
        history.push('/NoSearchResults');
    }
    handleRouter = (e, query) => {
        history.push({ pathname: e + '/' + query, state: query });
    };
    componentDidUpdate() {}
    //组件销毁前的回调
    componentWillUnmount() {}
    render() {
        return (
            <>
                <div className={TradeDetail_ls.TradeDetailBox}>
                    <div className={TradeDetail_ls.titleAndSearch}>
                        <h2>Transaction Details</h2>
                    </div>
                    <div className={TradeDetail_ls.TradeDetailBoxTop}>
                        <div className={TradeDetail_ls.hash}>
                            {this.state.detailData.hash}{' '}
                            <AiOutlineCopy
                                onClick={handleCopy.bind(
                                    this,
                                    this.state.detailData.hash,
                                )}
                            />
                        </div>
                        <div className={TradeDetail_ls.tags}>
                            <div>
                                <Tag
                                    color={
                                        this.state.detailData.status == 1
                                            ? 'rgba(168, 255, 210, .2)'
                                            : 'rgba(254, 79, 167, .2)'
                                    }
                                    style={{
                                        color:
                                            this.state.detailData.status == 1
                                                ? 'rgba(158, 255, 204, 1)'
                                                : '#FE4FA7',
                                        padding: '0 15px',
                                    }}
                                >
                                    {this.state.detailData.status == 1
                                        ? 'Success'
                                        : 'Defeat'}
                                </Tag>
                            </div>
                            {/*<div className={TradeDetail_ls.TradeDetailButton}>*/}
                            {/*    <Button>View Transaction Details</Button>*/}
                            {/*</div>*/}
                        </div>
                        <div className={TradeDetail_ls.TradeDetailBoxBottom}>
                            {/*<div className={TradeDetail_ls.common} style={{visibility: "hidden"}}>*/}
                            {/*    <p>Marketplace</p> <span >{hexCharCodeToStr(this.state.detailData.input)}</span>*/}
                            {/*</div>*/}
                            <div className={TradeDetail_ls.common}>
                                <p>Transaction Block</p>{' '}
                                <span>
                                    <Link
                                        to={{
                                            pathname: '/NullPage',
                                            state: {
                                                blockid:
                                                    this.state.detailData
                                                        .blockNumber,
                                            },
                                        }}
                                        style={{ color: '#7AA4FF' }}
                                    >
                                        {this.state.detailData.blockNumber}
                                    </Link>
                                </span>
                            </div>
                            <div>
                                <p>TXN Hash</p>
                                <Tooltip
                                    placement="top"
                                    title={this.state.detailData.hash}
                                >
                                    <span style={{ paddingRight: 8 }}>
                                        {this.state.detailData.hash.slice(
                                            0,
                                            12,
                                        ) +
                                            '...' +
                                            this.state.detailData.hash.slice(
                                                -16,
                                                this.state.detailData.hash
                                                    .length,
                                            )}
                                    </span>
                                </Tooltip>
                                <AiOutlineCopy
                                    onClick={handleCopy.bind(
                                        this,
                                        this.state.detailData.hash,
                                    )}
                                />
                            </div>
                            <div>
                                <p>Timestamp</p>{' '}
                                <span>
                                    {batchTime(this.state.detailData.timestamp)}
                                </span>
                            </div>
                            <div className={TradeDetail_ls.common}>
                                <p>From</p>
                                <Tooltip
                                    placement="top"
                                    title={this.state.detailData.from}
                                >
                                    <span
                                        style={{ paddingRight: 8 }}
                                        onClick={this.handleRouter.bind(
                                            this,
                                            '/AccountDetail',
                                            this.state.detailData.from,
                                        )}
                                    >
                                        {this.state.detailData.from.slice(
                                            0,
                                            12,
                                        ) +
                                            '...' +
                                            this.state.detailData.from.slice(
                                                -16,
                                                this.state.detailData.from
                                                    .length,
                                            )}
                                    </span>
                                </Tooltip>
                                <AiOutlineCopy
                                    onClick={handleCopy.bind(
                                        this,
                                        this.state.detailData.from,
                                    )}
                                />
                            </div>
                            <div>
                                <p>Gas Price</p>
                                <span>
                                    {Number(
                                        this.state.detailData.gasPrice /
                                            1000000000,
                                    )}{' '}
                                    Gwei
                                </span>
                            </div>
                            <div className={TradeDetail_ls.common}>
                                <p>Receiver</p>
                                <Tooltip
                                    placement="top"
                                    title={this.state.detailData.to}
                                >
                                    {this.state.detailData.to ? (
                                        <span
                                            style={{ paddingRight: 8 }}
                                            onClick={this.handleRouter.bind(
                                                this,
                                                '/AccountDetail',
                                                this.state.detailData.to,
                                            )}
                                        >
                                            {this.state.detailData.to.slice(
                                                0,
                                                12,
                                            ) +
                                                '...' +
                                                this.state.detailData.to.slice(
                                                    -16,
                                                    this.state.detailData.to
                                                        .length,
                                                )}
                                        </span>
                                    ) : (
                                        '-'
                                    )}
                                </Tooltip>
                                {this.state.detailData.to ? (
                                    <AiOutlineCopy
                                        onClick={handleCopy.bind(
                                            this,
                                            this.state.detailData.to,
                                        )}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                            <div>
                                <p>TXN Type</p>
                                <span>{this.state.transType.name} </span>
                            </div>
                            {/* <div>
                                <p>Marketplace commission profits</p>
                                <span>
                                    {this.state.nfttxdata.fee
                                        ? Number(
                                              utils.formatEther(
                                                  this.state.nfttxdata.fee,
                                              ),
                                          ).toFixed(2)
                                        : 0.0}{' '}
                                    ERB
                                </span>
                            </div> */}
                            <div>
                                <p>TXN Fee</p>{' '}
                                <span>
                                    {(this.state.detailData.gasPrice *
                                        this.state.detailData.gasUsed) /
                                        1000000000000000000}{' '}
                                    ERB
                                </span>
                            </div>
                            <div>
                                <p>Seller profits</p>
                                <span>
                                    {this.state.nfttxdata.royalty &&
                                    this.state.nfttxdata.fee &&
                                    this.state.nfttxdata.price
                                        ? (
                                              Number(
                                                  utils.formatEther(
                                                      this.state.nfttxdata
                                                          .price,
                                                  ),
                                              ) -
                                              Number(
                                                  utils.formatEther(
                                                      this.state.nfttxdata.fee,
                                                  ),
                                              ) -
                                              Number(
                                                  utils.formatEther(
                                                      this.state.nfttxdata
                                                          .royalty,
                                                  ),
                                              )
                                          ).toFixed(2)
                                        : 0.0}{' '}
                                    ERB
                                </span>
                            </div>
                            <div>
                                <p>Volume</p>{' '}
                                <span>
                                    {this.state.detailData.value /
                                        1000000000000000000}{' '}
                                    ERB
                                </span>
                            </div>
                            <div>
                                <p>Creator royalty profits</p>
                                <span>
                                    {this.state.nfttxdata.royalty
                                        ? Number(
                                              utils.formatEther(
                                                  this.state.nfttxdata.royalty,
                                              ),
                                          ).toFixed(2)
                                        : 0.0}{' '}
                                    ERB
                                </span>
                            </div>

                            <div>
                                <p>Gas Used</p>
                                <span>
                                    {Number(
                                        this.state.detailData.gasUsed,
                                    ).toLocaleString()}{' '}
                                    gas
                                </span>
                            </div>

                            {this.state.transType.type === 6 ? (
                                <div>
                                    <p>ERB Got</p>
                                    <span>
                                        {Number(
                                            this.state.newDetailData.price /
                                                1000000000000000000 || 0.0,
                                        ).toLocaleString()}{' '}
                                        ERB
                                    </span>
                                </div>
                            ) : (
                                ''
                            )}
                            {this.state.transType.type === 6 ? (
                                <div>
                                    {/*<p>SNFT Address</p>*/}
                                    {/*<Link to={{ pathname: '/SNFTDetails', state: { snftid: this.state.newDetailData.address,snftmata:this.state.detailData } }} style={{ color: '#7AA4FF' }}>*/}
                                    {/*<span>{*/}
                                    {/*    this.state.newDetailData.address ?*/}
                                    {/*        this.state.newDetailData.address.slice(0, 12) +*/}
                                    {/*    '...' +*/}
                                    {/*        this.state.newDetailData.address.slice(*/}
                                    {/*    -16, this.state.newDetailData.address.length,*/}
                                    {/*    ):""*/}
                                    {/*}</span>*/}
                                    {/*</Link>*/}
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
                <div
                    style={{ marginLeft: 40 }}
                    className={AccountDetail_ls.changeButton}
                >
                    <Radio.Group
                        value={this.state.typeGroup}
                        onChange={this.onChangeinput}
                        className={TradeDetail_ls.AccountDetailButtonGroup}
                        style={{
                            marginBottom: 0,
                            margin: '20px 0 12px 0',
                        }}
                    >
                        <Radio.Button defaultChecked={true} value="log">
                            Log({this.state.dataLog.length})
                        </Radio.Button>
                        <Radio.Button value="input">Input Data</Radio.Button>
                    </Radio.Group>
                </div>
                <div
                    className={TradeDetail_ls.TradeDetailBox1}
                    style={this.state.typeGroup === 'log' ? {} : { padding: 0 }}
                >
                    {this.state.typeGroup === 'log' ? (
                        <div>
                            <div
                                className={TradeDetail_ls.TradeDetailBox1Title}
                            >
                                <ul>Transaction Ledger</ul>
                                <span>Transaction Receipt Event Logs</span>
                            </div>
                            <div>
                                {this.state.dataLog.length !== 0 ? (
                                    this.state.dataLog.map((item, index1) => (
                                        <div
                                            className={
                                                TradeDetail_ls.TradeDetailBox1Logs
                                            }
                                        >
                                            <ul>
                                                <Avatar
                                                    shape={'circle'}
                                                    size={56}
                                                    style={{
                                                        background:
                                                            'rgba(89, 73, 19, 1)',
                                                        margin: '16px 40px 0 10px',
                                                    }}
                                                >
                                                    {
                                                        this.state.detailData
                                                            .blockNumber
                                                    }
                                                </Avatar>
                                            </ul>
                                            <div
                                                className={
                                                    TradeDetail_ls.TradeDetailBox1LogsContent
                                                }
                                            >
                                                <div
                                                    className={
                                                        TradeDetail_ls.TradeDetailBox1LogsContentMsg
                                                    }
                                                >
                                                    <ul>
                                                        <p>Address</p>
                                                        <span>
                                                            {item.address}
                                                        </span>
                                                        <AiOutlineCopy
                                                            onClick={handleCopy.bind(
                                                                this,
                                                                item.address,
                                                            )}
                                                        />
                                                    </ul>
                                                    <ul style={{ margin: '0' }}>
                                                        {/*<p>Name</p>*/}
                                                        {/*<li style={{ display: 'flex' }}>*/}
                                                        {/*    Deposit (index_topic_1*/}
                                                        {/*    {this.state.detailDataLog.map(*/}
                                                        {/*        (item) => (*/}
                                                        {/*            <div>*/}
                                                        {/*                &nbsp;*/}
                                                        {/*                <p*/}
                                                        {/*                    style={{*/}
                                                        {/*                        color: 'RGBA(28, 184, 168, 1)',*/}
                                                        {/*                    }}*/}
                                                        {/*                >*/}
                                                        {/*                    address*/}
                                                        {/*                </p>*/}
                                                        {/*                &nbsp;*/}
                                                        {/*                <span*/}
                                                        {/*                    style={{*/}
                                                        {/*                        color: 'RGBA(254, 76, 165, 1)',*/}
                                                        {/*                    }}*/}
                                                        {/*                >*/}
                                                        {/*            dist*/}
                                                        {/*        </span>*/}
                                                        {/*                {item ==*/}
                                                        {/*                this.state.dataLog[*/}
                                                        {/*                this.state.dataLog*/}
                                                        {/*                    .length - 1*/}
                                                        {/*                    ]*/}
                                                        {/*                    ? ''*/}
                                                        {/*                    : ','}*/}
                                                        {/*            </div>*/}
                                                        {/*        ),*/}
                                                        {/*    )}*/}
                                                        {/*    )*/}
                                                        {/*</li>*/}
                                                    </ul>
                                                    <ul>
                                                        <p>Topics</p>
                                                        <li>
                                                            <div>
                                                                <p>0</p>
                                                                <span>
                                                                    {
                                                                        JSON.parse(
                                                                            item
                                                                                .topics[0],
                                                                        ).value
                                                                    }
                                                                </span>
                                                            </div>
                                                            {item.topics
                                                                .length > 1
                                                                ? item.topics.map(
                                                                      (
                                                                          item1,
                                                                          index,
                                                                      ) => (
                                                                          <div
                                                                              style={{
                                                                                  marginTop:
                                                                                      '10px;',
                                                                              }}
                                                                              className={
                                                                                  TradeDetail_ls.topicsMap
                                                                              }
                                                                          >
                                                                              <p>
                                                                                  {index +
                                                                                      1}
                                                                              </p>
                                                                              <Select
                                                                                  defaultValue={`Hex`}
                                                                                  onChange={this.handleChange.bind(
                                                                                      this,
                                                                                      index,
                                                                                      index,
                                                                                      index1,
                                                                                  )}
                                                                                  suffixIcon={
                                                                                      <>
                                                                                          <GoTriangleDown
                                                                                              style={{
                                                                                                  color: '#ffffff',
                                                                                                  fontSize:
                                                                                                      '16px',
                                                                                              }}
                                                                                          />
                                                                                      </>
                                                                                  }
                                                                                  className={
                                                                                      TradeDetail_ls.TradeDetail_select
                                                                                  }
                                                                              >
                                                                                  <Option
                                                                                      value={`Hex`}
                                                                                  >
                                                                                      Hex
                                                                                  </Option>
                                                                                  <Option
                                                                                      value={`Dec`}
                                                                                  >
                                                                                      Dec
                                                                                  </Option>
                                                                              </Select>
                                                                              <span
                                                                                  title={
                                                                                      JSON.parse(
                                                                                          item1,
                                                                                      )
                                                                                          .type
                                                                                          ? JSON.parse(
                                                                                                item1,
                                                                                            )
                                                                                                .value
                                                                                          : ex16hex(
                                                                                                JSON.parse(
                                                                                                    item1,
                                                                                                )
                                                                                                    .value,
                                                                                            ).toLocaleString(
                                                                                                18,
                                                                                            )
                                                                                  }
                                                                              >
                                                                                  {JSON.parse(
                                                                                      item1,
                                                                                  )
                                                                                      .type
                                                                                      ? JSON.parse(
                                                                                            item1,
                                                                                        )
                                                                                            .value
                                                                                      : ex16hex(
                                                                                            JSON.parse(
                                                                                                item1,
                                                                                            )
                                                                                                .value,
                                                                                        ).toLocaleString(
                                                                                            18,
                                                                                        )}
                                                                              </span>
                                                                          </div>
                                                                      ),
                                                                  )
                                                                : ''}
                                                        </li>
                                                    </ul>
                                                    <ul>
                                                        <p>Data</p>
                                                        <div
                                                            className={
                                                                TradeDetail_ls.TradeDetailButton1
                                                            }
                                                        >
                                                            <Radio.Group
                                                                value={
                                                                    this.state
                                                                        .type
                                                                }
                                                                onChange={
                                                                    this
                                                                        .onChangeExchange
                                                                }
                                                                className={
                                                                    TradeDetail_ls.TradeDetailButtonGroup
                                                                }
                                                                style={{
                                                                    marginBottom: 0,
                                                                }}
                                                            >
                                                                <Radio.Button
                                                                    defaultChecked={
                                                                        true
                                                                    }
                                                                    value="Dec"
                                                                >
                                                                    Dec
                                                                </Radio.Button>
                                                                <Radio.Button value="Hex">
                                                                    Hex
                                                                </Radio.Button>
                                                            </Radio.Group>
                                                            <p>
                                                                {this.state
                                                                    .type ==
                                                                'Hex' ? (
                                                                    <li>
                                                                        wad:
                                                                    </li>
                                                                ) : (
                                                                    <li>
                                                                        wad1:
                                                                    </li>
                                                                )}
                                                                {this.state
                                                                    .type ==
                                                                'Hex' ? (
                                                                    <span
                                                                        title={
                                                                            item.data
                                                                        }
                                                                    >
                                                                        {
                                                                            item.data
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        title={ex16hex(
                                                                            item.data,
                                                                        ).toLocaleString(
                                                                            18,
                                                                        )}
                                                                    >
                                                                        {ex16hex(
                                                                            item.data,
                                                                        ).toLocaleString(
                                                                            18,
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={TradeDetail_ls.notData}>
                                        No Data
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className={TradeDetail_ls.TradeDetailBox2}>
                            <div
                                style={{
                                    padding: '24px',
                                    wordWrap: 'break-word',
                                }}
                            >
                                {!this.state.detailData.to ||
                                this.state.detailData.input.length <= 10 ? (
                                    this.state.detailData.input
                                ) : this.state.detailData.input.slice(0, 22) ===
                                  '0x776f726d686f6c65733a' ? (
                                    this.state.detailData.input
                                ) : (
                                    <div>
                                        {knownHashes[
                                            this.state.detailData.input.slice(
                                                0,
                                                10,
                                            )
                                        ] ? (
                                            <p style={{ pddingBottom: '33px' }}>
                                                {'Function: ' +
                                                    knownHashes[
                                                        this.state.detailData.input.slice(
                                                            0,
                                                            10,
                                                        )
                                                    ]}
                                            </p>
                                        ) : (
                                            <p></p>
                                        )}
                                        <p>
                                            MethodID:
                                            {this.state.detailData.input.slice(
                                                0,
                                                10,
                                            )}
                                        </p>
                                        {this.state.inputData.map(
                                            (item, index) => (
                                                <p key={index}>
                                                    <span>[{index}]: </span>
                                                    {item}
                                                </p>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default TradeDetail;
