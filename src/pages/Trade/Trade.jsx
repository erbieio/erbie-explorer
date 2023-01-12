import React, { Component, useState, useEffect } from 'react';
import Trade_ls from './Trade.less';
import {
    Chart,
    Interval,
    RoseChart,
    Tooltip as AntdTooltip,
    LineChart,
    Axis,
    Coordinate,
    Annotation,
    Legend,
    Geom,
} from 'bizcharts';
import moment from 'moment';
import topLeftImg1 from './assets/topLeftBlock.png';
import topLeftImg2 from './assets/topLeftBlock2.png';
import topCenterImg from './assets/topLeftBlock1.png';
import {
    Avatar,
    ConfigProvider,
    Radio,
    Tooltip,
    Table,
    Tag,
    Pagination,
} from 'antd';
const { Column, ColumnGroup } = Table;
const deal = require('../../assets/json/dealType.json');
const { dealType } = deal;
import zhCN from 'antd/es/locale/zh_CN';
import { history, Link } from 'umi';
import {
    chartTx,
    totals,
    transactionPage,
} from '../../api/request_data/Trade_request';
import {
    stagenumber,
    timestamp,
    ellipsis,
    digitalreduction,
    ellipsisfour,
} from '../../utils/methods/Methods';
import { utils } from 'ethers';
const scale = {
    price: {
        min: 0,
        max: 1.5,
    },
    year: {
        range: [0.05, 0.95],
    },
};
function batchTime(baseTime) {
    let d = new Date(baseTime * 1000);
    let batchTime =
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    return batchTime;
}
function hexCharCodeToStr(hexCharCodeStr) {
    // console.log(hexCharCodeStr)
    var trimedStr = hexCharCodeStr.trim();
    if (trimedStr === '0x') {
        return 'Transfer';
    }
    var rawStr =
        trimedStr.substr(0, 2).toLowerCase() === '0x'
            ? trimedStr.substr(2)
            : trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
        // alert("Illegal Format ASCII Code!");
        return '';
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode));
    }
    let StrTran = resultStr.join('');
    if (StrTran.substring(0, StrTran.indexOf(':')) !== 'wormholes') {
        return 'Contract Based Transaction';
    } else {
        let obj = JSON.parse(StrTran.substring(10));
        dealType.forEach((item) => {
            obj.type === item.type ? (obj.name = item.name) : '';
        });
        return obj.name;
    }
    // return StrTran.substring(0, StrTran.indexOf(':')) + ' transaction';
}
// function SNFTinputnumberonclick(e) {
//     let data = document.getElementById('SNFTinputnumber').value;
//     if (e.keyCode == 13) {
//         if (Number(data) != NaN) {
//             // this.state.pagenumber = Number(data);
//             console.log(Number(data));
//             // this.state.pageOption.page = Number(data);
//             //     this.paginationChange(this.state.pageOption.page, 16)
//         }
//     }
// }
class Trade extends React.Component {
    //Clock构造函数
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            chartData: [],
            lineData: [],
            pagenumber: 1,
            colors: [
                '#FCCF38',
                '#B968FF',
                '#16CEB9',
                '#426CEB',
                '#FD4BA5',
                '#FCCF38',
            ],
            tableData: [],
            onChange: (data) => {
                this.state.pageOption.page = data;
                this.paginationChange(this.state.pageOption.page, 16),
                    console.log(this.state.pageOption.page);
            },
            SNFTinputnumberonclick: (e) => {
                let data = document.getElementById('SNFTinputnumber').value;
                if (e.keyCode == 13) {
                    if (Number(data) != NaN) {
                        // this.state.pagenumber = Number(data);
                        console.log(Number(data));
                        this.state.pageOption.page = Number(data);
                        this.paginationChange(this.state.pageOption.page, 16);
                    }
                }
            },
            columns: [
                {
                    title: 'TXN Hash',
                    dataIndex: 'hash',
                    key: 'hash',
                    render: (text, data) => (
                        <Link
                            to={{
                                pathname: `/TradeDetail/${text}`,
                                state: text,
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {ellipsisfour(text)}
                        </Link>
                    ),
                    // ellipsis: true,
                    // width: '150px',
                },
                {
                    title: 'TXN Time',
                    dataIndex: 'timestamp',
                    key: 'timestamp',
                    render: (text, data) => (
                        <span>
                            {moment(parseInt(text) * 1000).format(
                                'YYYY-MM-DD HH:mm:ss',
                            )}
                        </span>
                    ),
                    ellipsis: true,
                    width: '180px',
                },
                {
                    title: 'Block Height',
                    dataIndex: 'blockNumber',
                    key: 'blockNumber',
                    render: (text, data) => (
                        <Link
                            to={{
                                pathname: '/BlockChain/BlockDetails',
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
                },
                {
                    title: 'Sender',
                    key: 'from',
                    dataIndex: 'from',
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
                        >
                            {ellipsisfour(text)}
                        </Link>
                    ),
                    // width: '150px',
                },
                {
                    title: 'Reciever',
                    key: 'to',
                    dataIndex: 'to',
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
                        >
                            {ellipsisfour(text)}
                        </Link>
                    ),
                    // width: '150px',
                },
                {
                    title: 'Value (ERB)',
                    key: 'value',
                    dataIndex: 'value',
                    render: (text, data) => (
                        <>{text ? utils.formatEther(text) : 0}</>
                    ),
                },
                {
                    title: 'TXN Type',
                    key: 'aaaa',
                    dataIndex: 'aaaa',
                    render: (text, data) => (
                        <span>{hexCharCodeToStr(data.input)}</span>
                    ),
                    ellipsis: true,
                    width: '200px',
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
            pageOption: {
                page: 1,
                page_size: 16,
            },
            paginationProps: {},
            totalAll: {},
            totalTransaction: '',
            totalAmount: '',
            proportion: 0,
            tableTotal: '',
        };
    }
    handleRouter = (e, query) => {
        history.push({ pathname: e + '/' + query, state: query });
    };

    //插入DOM前的回调函数
    componentDidMount() {
        // this.timerID=setInterval(()=>{
        //     this.tick()
        // },1000)
        (async () => {
            const res = await totals();
            if (res) {
                this.setState({
                    totalAll: res,
                    totalTransaction: Number(
                        res.totalTransaction,
                    ).toLocaleString(),
                    totalAmount: Number(res.totalAmount / 1000000000000000000),
                    proportion: (res.total24HTx / res.totalTransaction).toFixed(
                        1,
                    ),
                    chartData: [
                        {
                            year: 'Exchange Trading',
                            population: res.totalExchangerTx,
                        },
                        { year: 'NFT Trading', population: res.totalNFTTx },
                        { year: 'S-NFT Trading', population: res.totalSNFTTx },
                        {
                            year: 'Wormholes Trading',
                            population: res.totalWormholesTx,
                        },
                        // { year: 'Transfer Trading', population: res.totalTransferTx},
                    ],
                });
                // const upline = this.state.lineData.forEach(item=> {
                //      item.value = this.state.proportion
                //     return item
                //  })
                // this.setState({
                //     lineData: upline
                // })
                // this.state.totalTransaction = res.totalTransaction
            }
        })();
        this.transactionPage = async () => {
            const res = await transactionPage(this.state.pageOption);
            if (res) {
                console.log(res);
                this.setState({
                    tableData: res.transactions,
                    tableTotal: res.total,
                });
                // this.state.totalTransaction = res.totalTransaction
            }
        };
        this.transactionPage();
        this.chartTx = async () => {
            const res = await chartTx();
            if (res) {
                let arr = [];
                res.forEach((item, index) => {
                    arr.push({ hour: index, num: item.num });
                });
                this.setState({
                    lineData: arr,
                });
            }
        };
        this.chartTx();
        this.total = () => {
            let total1 = 0;
            this.state.chartData.forEach((item) => {
                total1 += item.population;
            });
            return total1;
        };
        this.paginationChange = async (current, size) => {
            this.state.pageOption.page = current;
            this.state.pageOption.page_size = size;
            this.transactionPage();
        };
    }
    //组件销毁前的回调
    componentWillUnmount() {
        // clearInterval(this.timerID);
    }

    render() {
        return (
            <>
                <div className={Trade_ls.TradeBox}>
                    <div className={Trade_ls.TradeTopLeft}>
                        <div>
                            <ul>
                                <Tooltip
                                    placement="topLeft"
                                    title={this.state.totalAmount}
                                >
                                    <li>
                                        <h5>
                                            {this.state.totalAmount
                                                ? digitalreduction(
                                                      parseInt(
                                                          this.state
                                                              .totalAmount,
                                                      ),
                                                  )
                                                : '0'}
                                        </h5>
                                        <span>ERB</span>
                                    </li>
                                </Tooltip>
                                <p>Total Transaction Volume</p>
                            </ul>
                            <li>
                                <img src={topLeftImg1} />
                            </li>
                        </div>
                        <div>
                            <ul>
                                <h5>{this.state.totalTransaction || 0}</h5>
                                <p>Total Transactions</p>
                            </ul>
                            <li>
                                <img src={topLeftImg2} />
                            </li>
                        </div>
                    </div>
                    <div className={Trade_ls.TradeTopCenter}>
                        <div className={Trade_ls.TradeTopCenterTitle}>
                            <ul>
                                <h5>+{this.state.proportion || 0}%</h5>
                                <p>24h TXN Volume Growth</p>
                            </ul>
                            <li>
                                <img
                                    src={topCenterImg}
                                    style={{ width: 64, height: 64 }}
                                />
                            </li>
                        </div>
                        <div>
                            <LineChart
                                height={160}
                                data={this.state.lineData}
                                smooth={true}
                                lineStyle={{
                                    stroke: 'rgba(66, 108, 235, 1)',
                                    lineDash: 10,
                                }}
                                xField="hour"
                                yField="num"
                                xAxis={{
                                    visible: false,
                                }}
                                yAxis={{
                                    visible: false,
                                }}
                            >
                                <AntdTooltip
                                    showMarkers={true}
                                    title={' '}
                                    marker={{
                                        stroke: 'rgba(254, 79, 167, 0',
                                        fill: 'rgba(254, 79, 167, 1)',
                                    }}
                                    fields={'交易量：'}
                                    visible={true}
                                    showContent={true}
                                    itemTpl={
                                        '<li data-index={index} >' +
                                        '<span style="background:rgba(64, 69, 77, 1);  min-width:140px;height:21px;text-align: center; line-height: 21px;font-size:6px;  position:absolute;top:0;left:0"> Trading volume：{value} </span>' +
                                        '</li>'
                                    }
                                    domStyles={{
                                        'g2-tooltip': {
                                            background: 'none',
                                            color: '#eee',
                                            boxShadow: 'none',
                                        },
                                        'g2-tooltip-title': {},
                                        'g2-tooltip-list': {},
                                        'g2-tooltip-list-item': {},
                                        'g2-tooltip-marker': {
                                            background: 'rgba(254, 79, 167, 1)',
                                        },
                                        'g2-tooltip-value': {},
                                        'g2-tooltip-name': {},
                                    }}
                                ></AntdTooltip>
                                <Geom
                                    tooltip={[
                                        'year*value',
                                        (year, value) => {
                                            return {
                                                //自定义 tooltip 上显示的 title 显示内容等。
                                                name: '增长率',
                                                title: ' ',
                                                value: value,
                                            };
                                        },
                                    ]}
                                />
                                <Axis visible={false} grid={null} />
                            </LineChart>
                        </div>
                    </div>
                    <div className={Trade_ls.TradeChart}>
                        <h2>TRANSACTIONS BY TYPE</h2>
                        <Chart
                            height={270}
                            width={550}
                            data={this.state.chartData}
                            autoFit
                            appendPadding={[0, 0, 0, 200]}
                        >
                            <Annotation.Text
                                position={['50%', '45%']}
                                content={this.state.totalTransaction}
                                style={{
                                    lineHeight: '240px',
                                    fontSize: '20',
                                    fill: '#fff',
                                    textAlign: 'center',
                                }}
                            />
                            <Annotation.Text
                                position={['50%', '55%']}
                                content="Total Transactions"
                                style={{
                                    lineHeight: '240px',
                                    fontSize: '14',
                                    fill: '#fff',
                                    textAlign: 'center',
                                }}
                            />
                            {/*<Title  visible={true}/>*/}
                            <Axis visible={false} />
                            <AntdTooltip showTitle={false} />
                            <Coordinate type="theta" innerRadius={0.65} />
                            <Interval
                                position="population"
                                content={'Dera'}
                                adjust="stack"
                                color={['year', this.state.colors]}
                                intervalStyle={{
                                    stroke: '#7AA4FF',
                                }}
                                element-highlight
                                title={{
                                    visible: true,
                                    text: 'Various types of transaction detail',
                                }}
                                style={{
                                    lineWidth: 0,
                                    stroke: '#eee',
                                }}
                                label={[
                                    'population',
                                    (xValue) => {
                                        return {
                                            content:
                                                xValue === 0
                                                    ? '0%'
                                                    : (
                                                          (xValue /
                                                              this.total()) *
                                                          100
                                                      ).toFixed(1) + '%',
                                            offset: -5,
                                        };
                                    },
                                ]}
                            />
                            <Legend
                                position={'left'}
                                visible={true}
                                offsetX={20}
                                itemName={{
                                    style: {
                                        fill: '#eee',
                                    },
                                }}
                            />
                        </Chart>
                    </div>
                </div>
                <div className={Trade_ls.TradeBox1} id="TradeTable">
                    <p className={Trade_ls.TradeTitle}>TRANSACT</p>
                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.tableData}
                        pagination={false}
                    />
                    <div
                        className={Trade_ls.SNFTBox_Pagination}
                        id="SNFTBoxPagination"
                    >
                        <Pagination
                            defaultCurrent={1}
                            total={this.state.tableTotal}
                            onChange={this.state.onChange}
                            pageSize={this.state.pageOption.page_size}
                            showSizeChanger={false}
                            current={this.state.pageOption.page}
                        />
                        <div className={Trade_ls.SNFTBox_Pagination_d}>
                            16/Page
                        </div>
                        <span className={Trade_ls.SNFTBox_Pagination_span1}>
                            To
                        </span>
                        <input
                            id="SNFTinputnumber"
                            className={Trade_ls.SNFTBox_Pagination_input}
                            onKeyDown={this.state.SNFTinputnumberonclick}
                        />
                        <span className={Trade_ls.SNFTBox_Pagination_span2}>
                            Page
                        </span>
                    </div>
                </div>
            </>
        );
    }
}

export default Trade;
