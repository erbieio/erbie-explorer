import BlackholeBlockDeta_ls from './BlackholeBlockDeta.less';
import SearchBox from '../../components/SearchBox/SearchBox';
import { Space, Table, Tag, Pagination, Progress } from 'antd';
import { Link } from 'umi';
import {
    soloblock,
    soloblocktransaction,
} from '../../api/request_data/block_request';
import { utils } from 'ethers';
import moment from 'moment';
import { history } from 'umi';
import {
    timestamp,
    ellipsis,
    hexCharCodeToStr,
} from '../../utils/methods/Methods';
import React, { useState, useEffect } from 'react';
import { map } from '@antv/util';
export default function BlackholeBlockDeta(props) {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    const [transactionmetadata, setTransactionmeta] = useState(1);
    //单个区块
    const [rewarderdata, setRewarderdata] = useState({});
    //单个区块交易
    const [soloblocktransactiondata, setSoloblocktransactiondata] = useState(
        {},
    );
    const onChange = (data) => {
        setPagenumber(data);
    };
    //单个区块交易列表分页
    let pagedata = {
        page: pagenumber,
        page_size: pagenumbersize,
        number:
            props.location.state != undefined
                ? props.location.state.blockid
                : JSON.parse(localStorage.getItem('blocktext')),
    };
    //单个区块交易列表
    const columns = [
        {
            title: 'TXN Hash',
            dataIndex: 'hash',
            key: 'hash',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/TradeDetail`, state: text }}
                    style={{ color: '#7AA4FF' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
            ellipsis: true,
        },
        {
            title: 'TXN Time',
            dataIndex: 'aaa',
            key: 'aaa',
            render: (text) => (
                <span>
                    {moment(parseInt(rewarderdata.timestamp) * 1000).format(
                        'YYYY-MM-DD HH:mm:ss',
                    )}
                </span>
            ),
            width: '180px',
        },
        {
            title: 'Sender',
            key: 'from',
            dataIndex: 'from',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetail`, state: text }}
                    style={{ color: '#7AA4FF' }}
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
                    to={{ pathname: `/AccountDetail`, state: text }}
                    style={{ color: '#7AA4FF' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
            ellipsis: true,
        },
        {
            title: 'Transaction Value',
            key: 'value',
            dataIndex: 'value',
            render: (text) => <span>{utils.formatEther(text)}</span>,
            width: '170px',
        },
        {
            title: 'TXN Type',
            key: 'aaaa',
            dataIndex: 'aaaa',
            render: (text, data) => <span>{hexCharCodeToStr(data.input)}</span>,
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
    ];
    //单个区块查询
    const soloblock_q = async (item) => {
        const data = await soloblock(item);
        if (data) {
            setRewarderdata(data);
        }
        let state = JSON.stringify(data);
        if (
            JSON.parse(state).useCache != undefined &&
            JSON.parse(state).useCache == false
        ) {
            comingsoon404();
        }
    };
    //单个区块交易列表查询
    const soloblocktransaction_q = async (item) => {
        const data = await soloblocktransaction(item);
        if (data) {
            setSoloblocktransactiondata(data);
        }
    };
    useEffect(() => {
        if (props.location.state != undefined) {
            localStorage.setItem(
                'blocktext',
                JSON.stringify(props.location.state.blockid),
            );
        }
        soloblocktransaction_q(pagedata);
        soloblock_q(JSON.parse(localStorage.getItem('blocktext')));
    }, []);
    useEffect(() => {
        soloblocktransaction_q(pagedata);
    }, [pagenumber]);
    useEffect(() => {
        let pagedatabs = {
            page: pagenumber,
            page_size: pagenumbersize,
            number: JSON.parse(localStorage.getItem('blocktext')),
        };
        soloblock_q(JSON.parse(localStorage.getItem('blocktext')));
        soloblocktransaction_q(pagedatabs);
    }, [JSON.parse(localStorage.getItem('blocktext'))]);
    //404

    function comingsoon404() {
        props.history.push('/NoSearchResults');
    }
    function BlockDetailsinputnumberonclick(e) {
        let data = document.getElementById('BlockDetailsinputnumber').value;
        if (e.keyCode == 13) {
            if (Number(data) != NaN) {
                setPagenumber(Number(data));
            }
        }
    }
    function rewarderblock(data) {
        if (data) {
            return data.map((item) => {
                return (
                    <div
                        className={BlackholeBlockDeta_ls.Rewarderdatabox_block}
                    >
                        <p
                            className={
                                BlackholeBlockDeta_ls.Rewarderdatabox_block_title
                            }
                        >
                            Penalty Address
                        </p>
                        <Link
                            to={{
                                pathname: `/AccountDetail`,
                                state: item.address,
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                            className={
                                BlackholeBlockDeta_ls.Rewarderdatabox_block_address
                            }
                        >
                            {ellipsis(item.address)}
                        </Link>
                        <div
                            className={
                                BlackholeBlockDeta_ls.Rewarderdatabox_block_bottom
                            }
                        >
                            <div>
                                <p>Penalty Weight</p>
                                <span>20</span>
                            </div>
                            <div>
                                <p>Current Weight</p>
                                <span>{item.weight}</span>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }
    function nodeaddressdata(data) {
        if (data) {
            return data.map((item) => {
                return (
                    <div className={BlackholeBlockDeta_ls.nodeaddressblock}>
                        <Link
                            to={{
                                pathname: `/AccountDetail`,
                                state: item,
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {item}
                        </Link>
                    </div>
                );
            });
        }
    }
    function BlockChaininputnumberonclick(e) {
        let data = document.getElementById('BlockChaininputnumber').value;
        if (e.keyCode == 13) {
            if (Number(data) != NaN) {
                setPagenumber(Number(data));
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
    return (
        <>
            <div className={BlackholeBlockDeta_ls.BlackholeBlockDetaBox}>
                <div className={BlackholeBlockDeta_ls.title}>
                    Blackhole Block Details
                    <SearchBox />
                </div>
                <div className={BlackholeBlockDeta_ls.Rewarderdatabox}>
                    {rewarderblock(rewarderdata.validators)}
                    <div
                        className={
                            BlackholeBlockDeta_ls.Rewarderdatabox_blockts
                        }
                    ></div>
                </div>
                <div
                    className={
                        BlackholeBlockDeta_ls.SNFTDetailsBox_titleData_buttonBox
                    }
                >
                    {transactionmetadata == 0 ? (
                        <div
                            className={
                                BlackholeBlockDeta_ls.SNFTDetailsBox_titleData_buttonBox_Transactionhistory1
                            }
                            onClick={transactionmeta.bind(this, 0)}
                        >
                            Node Address
                        </div>
                    ) : (
                        <div
                            className={
                                BlackholeBlockDeta_ls.SNFTDetailsBox_titleData_buttonBox_Transactionhistory2
                            }
                        >
                            Node Address
                        </div>
                    )}
                    {transactionmetadata == 1 ? (
                        <div
                            className={
                                BlackholeBlockDeta_ls.SNFTDetailsBox_titleData_buttonBox_metaData1
                            }
                            onClick={transactionmeta.bind(this, 1)}
                        >
                            Transaction
                        </div>
                    ) : (
                        <div
                            className={
                                BlackholeBlockDeta_ls.SNFTDetailsBox_titleData_buttonBox_metaData2
                            }
                        >
                            Transaction
                        </div>
                    )}
                </div>

                {transactionmetadata == 1 ? (
                    <div className={BlackholeBlockDeta_ls.tablebox}>
                        <div className={BlackholeBlockDeta_ls.table}>
                            <div className={BlackholeBlockDeta_ls.table_data}>
                                {nodeaddressdata(rewarderdata.proposers)}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className={BlackholeBlockDeta_ls.BlockDetailsBox_table}
                        id="BlockDetailsTable"
                    >
                        <p
                            className={
                                BlackholeBlockDeta_ls.BlockDetailsBox_table_title
                            }
                        >
                            Transactions List
                        </p>
                        <Table
                            columns={columns}
                            dataSource={soloblocktransactiondata.transactions}
                            pagination={false}
                        />
                        <div
                            className={
                                BlackholeBlockDeta_ls.BlockDetailsBox_Pagination
                            }
                            id="BlockDetailsBoxPagination"
                        >
                            <Pagination
                                defaultCurrent={1}
                                total={soloblocktransactiondata.total}
                                onChange={onChange}
                                showSizeChanger={false}
                                current={pagenumber}
                            />
                            <div
                                className={
                                    BlackholeBlockDeta_ls.BlockDetailsBox_Pagination_d
                                }
                            >
                                10/Page
                            </div>
                            <span
                                className={
                                    BlackholeBlockDeta_ls.BlockDetailsBox_Pagination_span1
                                }
                            >
                                To
                            </span>
                            <input
                                id="BlockDetailsinputnumber"
                                className={
                                    BlackholeBlockDeta_ls.BlockDetailsBox_Pagination_input
                                }
                                onKeyDown={BlockDetailsinputnumberonclick}
                            />
                            <span
                                className={
                                    BlackholeBlockDeta_ls.BlockDetailsBox_Pagination_span2
                                }
                            >
                                Page
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
