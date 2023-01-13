import BlockDetailsApp_ls from './BlockDetailsApp.less';
import { Space, Table, Tag, Pagination, Progress } from 'antd';
import { Link } from 'umi';
import {
    erbprice,
    total,
    epoch,
    block,
    rewardperson,
    soloblock,
    soloblocktransaction,
    blockrewardperson,
} from '../../api/request_data/block_request';
import { utils } from 'ethers';
import moment from 'moment';
import { history } from 'umi';
import SearchBox from '../../components/SearchBox/SearchBox';
import {
    timestamp,
    ellipsis,
    ellipsisthree,
    hexCharCodeToStr,
} from '../../utils/methods/Methods';
import React, { useState, useEffect } from 'react';
export default function BlockDetailsApp(props) {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    //单个区块
    const [soloblockdata, setSoloblockdata] = useState({});
    //单个区块交易
    const [soloblocktransactiondata, setSoloblocktransactiondata] = useState(
        {},
    );
    //区块奖励人
    const [blockrewardpersondata, setBlockrewardpersondata] = useState([]);
    //单个区块交易列表
    const columns = [
        {
            title: 'TXN Hash',
            dataIndex: 'hash',
            key: 'hash',
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
            dataIndex: 'aaa',
            key: 'aaa',
            render: (text) => (
                <span>
                    {moment(parseInt(soloblockdata.timestamp) * 1000).format(
                        'YYYY-MM-DD HH:mm:ss',
                    )}
                </span>
            ),
            width: '160px',
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
            ellipsis: true,
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
            ellipsis: true,
        },
        {
            title: 'Transaction Value',
            key: 'value',
            dataIndex: 'value',
            render: (text) => <span>{utils.formatEther(text)}</span>,
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
    useEffect(() => {
        if (props.location.state != undefined) {
            localStorage.setItem(
                'blocktext',
                JSON.stringify(props.location.state.blockid),
            );
        }
        console.log(JSON.parse(localStorage.getItem('blocktext')));
        soloblock_q(JSON.parse(localStorage.getItem('blocktext')));
        soloblocktransaction_q(pagedata);
        blockrewardperson_q(JSON.parse(localStorage.getItem('blocktext')));
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
        blockrewardperson_q(JSON.parse(localStorage.getItem('blocktext')));
    }, [JSON.parse(localStorage.getItem('blocktext'))]);
    //单个区块查询
    const soloblock_q = async (item) => {
        const data = await soloblock(item);
        if (data) {
            setSoloblockdata(data);
        }
        console.log('单个区块查询');
        console.log(data);
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
        console.log('单个区块交易列表查询');
        console.log(data);
    };
    //区块奖励人查询
    const blockrewardperson_q = async (item) => {
        const data = await blockrewardperson(item);
        if (data) {
            setBlockrewardpersondata(data);
        }
        console.log('区块奖励人查询');
        console.log(data);
    };
    //404
    function comingsoon404() {
        history.push('/NoSearchResultsApp');
    }
    function BlockDetailsinputnumberonclick(e) {
        let data = document.getElementById('BlockDetailsinputnumber').value;
        if (e.keyCode == 13) {
            if (Number(data) != NaN) {
                setPagenumber(Number(data));
            }
        }
    }
    //出块者
    function blockmaker(data) {
        if (data) {
            return data.map((item) => {
                if (item.identity == 1) {
                    return (
                        <Link
                            to={{
                                pathname: `/AccountDetailApp/${item.address}`,
                                state: item.address,
                            }}
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                            }
                        >
                            {ellipsis(item.address)}
                        </Link>
                    );
                }
            });
        }
    }
    //验证者
    function verifier(data) {
        if (data) {
            return data.map((item, index) => {
                if (item.identity == 2) {
                    return (
                        <Link
                            to={{
                                pathname: `/AccountDetailApp/${item.address}`,
                                state: item.address,
                            }}
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                            }
                        >
                            {ellipsisthree(item.address)} <span></span>
                        </Link>
                    );
                }
            });
        }
    }
    //出块者
    function blockmakeraddress(data) {
        if (data) {
            return data.map((item) => {
                if (item.identity == 1) {
                    if (
                        item.proxy ==
                            '0x0000000000000000000000000000000000000000' ||
                        item.proxy == null
                    ) {
                        console.log(1);
                        return (
                            <p
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                                }
                                style={{ color: '#fff' }}
                            >
                                {ellipsis(item.proxy) ||
                                    ellipsis(
                                        '0x0000000000000000000000000000000000000000',
                                    )}
                                &nbsp;&nbsp;
                                <img
                                    style={{ width: '16px', height: '16px' }}
                                    src={require('../../assets/images/BlockChain/Proposer.png')}
                                />
                            </p>
                        );
                    } else {
                        console.log(2);
                        return (
                            <Link
                                to={{
                                    pathname: `/AccountDetailApp/${item.proxy}`,
                                    state: item.proxy,
                                }}
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                                }
                            >
                                {ellipsis(item.proxy)}
                                &nbsp;&nbsp;
                                <img
                                    style={{ width: '16px', height: '16px' }}
                                    src={require('../../assets/images/BlockChain/Proposer.png')}
                                />
                            </Link>
                        );
                    }
                }
            });
        }
    }
    //验证者
    function verifieraddress(data) {
        if (data) {
            return data.map((item, index) => {
                if (item.identity == 2) {
                    if (
                        item.proxy ==
                            '0x0000000000000000000000000000000000000000' ||
                        item.proxy == null
                    ) {
                        return (
                            <p
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                                }
                                style={{ color: '#fff' }}
                            >
                                {ellipsis(item.proxy) ||
                                    ellipsis(
                                        '0x0000000000000000000000000000000000000000',
                                    )}
                                &nbsp;&nbsp;
                                <img
                                    style={{ width: '16px', height: '16px' }}
                                    src={require('../../assets/images/BlockChain/Validator.png')}
                                />
                            </p>
                        );
                    } else {
                        return (
                            <Link
                                to={{
                                    pathname: `/AccountDetailApp/${item.proxy}`,
                                    state: item.proxy,
                                }}
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                                }
                            >
                                {ellipsis(item.proxy)}
                                &nbsp;&nbsp;
                                <img
                                    style={{ width: '16px', height: '16px' }}
                                    src={require('../../assets/images/BlockChain/Validator.png')}
                                />
                            </Link>
                        );
                    }
                }
            });
        }
    }
    //交易所
    function exchange(data) {
        if (data) {
            return data.map((item) => {
                if (item.identity == 3) {
                    return (
                        <Link
                            to={{
                                pathname: `/AccountDetailApp/${item.address}`,
                                state: item.address,
                            }}
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                            }
                        >
                            {ellipsisthree(item.address)}
                            <span></span>
                        </Link>
                    );
                }
            });
        }
    }
    //燃料单价
    function gasusedlvsolo(data) {
        if (data) {
            let text = 0;
            for (let i = 0; i < data.length; i++) {
                text = text + data[i].gasPrice;
            }
            return text / data.length;
        } else {
            return 0;
        }
    }
    //燃料计算
    function gasusedlv(data) {
        console.log(data);
        if (data) {
            let text = 0;
            for (let i = 0; i < data.length; i++) {
                text = text + data[i].gasUsed * data[i].gasPrice;
            }
            return Number(utils.formatEther(text)).toFixed(8);
        } else {
            return 0;
        }
    }
    //父块
    function fatherblock() {
        console.log(JSON.parse(localStorage.getItem('blocktext')));
        localStorage.setItem(
            'blocktext',
            JSON.stringify(JSON.parse(localStorage.getItem('blocktext')) - 1),
        );
        history.push({
            pathname: '/NullPageApp',
            state: {
                blockid: JSON.parse(localStorage.getItem('blocktext')),
            },
        });
    }
    return (
        <>
            <div className={BlockDetailsApp_ls.BlockDetailsAppBox}>
                <div className={BlockDetailsApp_ls.BlockDetailsBox_title}>
                    Block Details
                </div>
                <p className={BlockDetailsApp_ls.BlockDetailsBox_blockid}>
                    #{JSON.parse(localStorage.getItem('blocktext'))}
                </p>
                <div className={BlockDetailsApp_ls.BlockDetailsBox_databox}>
                    <div
                        className={
                            BlockDetailsApp_ls.BlockDetailsBox_databox_left
                        }
                    >
                        <div
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse
                            }
                        >
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_name
                                }
                                style={{ width: '150px' }}
                            >
                                Block Generation Time
                            </div>
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data
                                }
                                style={{ cursor: 'auto' }}
                            >
                                {timestamp(soloblockdata.timestamp)}
                            </div>
                        </div>
                        <div
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse
                            }
                        >
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_name
                                }
                                style={{ width: '150px' }}
                            >
                                Parent Hash
                            </div>
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data
                                }
                                style={{ color: '#7AA4FF' }}
                            >
                                <span
                                    style={{ color: '#7AA4FF' }}
                                    onClick={fatherblock}
                                >
                                    {ellipsis(soloblockdata.parentHash)}
                                </span>
                            </div>
                        </div>
                        <div
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse
                            }
                        >
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_name
                                }
                                style={{ width: '150px' }}
                            >
                                Gas Used
                            </div>
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data
                                }
                                style={{
                                    // display: 'flex',
                                    // justifyContent: 'space-between',
                                    width: '230px',
                                    cursor: 'auto',
                                }}
                            >
                                <p>
                                    {soloblockdata.gasUsed || 0}(
                                    {soloblockdata.gasUsed /
                                        soloblockdata.gasLimit || 0}
                                    %)
                                </p>

                                <div
                                    style={{ width: '180px' }}
                                    id="progressbar"
                                >
                                    <Progress
                                        percent={
                                            soloblockdata.gasUsed &&
                                            soloblockdata.gasLimit
                                                ? (
                                                      soloblockdata.gasUsed /
                                                      soloblockdata.gasLimit
                                                  ).toFixed(2)
                                                : 0
                                        }
                                        status="active"
                                        strokeColor="#FE4FA7"
                                        strokeWidth={5.8}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse
                            }
                        >
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_name
                                }
                                style={{ width: '150px' }}
                            >
                                Proposer
                            </div>
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data
                                }
                                style={{ color: '#7AA4FF' }}
                            >
                                <div
                                    className={
                                        BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box
                                    }
                                >
                                    <div
                                        className={
                                            BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_verification1
                                        }
                                        style={{ cursor: 'auto' }}
                                    >
                                        Proposer
                                    </div>
                                    <div
                                        className={
                                            BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_data
                                        }
                                    >
                                        {blockmaker(blockrewardpersondata)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse
                            }
                            style={{ marginTop: '-40px' }}
                        >
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_name
                                }
                                style={{ width: '150px' }}
                            >
                                Reward
                            </div>
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data
                                }
                                style={{ color: '#7AA4FF', cursor: 'auto' }}
                            >
                                <div
                                    className={
                                        BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box
                                    }
                                >
                                    <div
                                        className={
                                            BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_verification2
                                        }
                                        style={{ cursor: 'auto' }}
                                    >
                                        Validator
                                    </div>
                                    <div
                                        className={
                                            BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_data
                                        }
                                    >
                                        {verifier(blockrewardpersondata)}
                                    </div>
                                </div>
                                <div
                                    className={
                                        BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box
                                    }
                                >
                                    <div
                                        className={
                                            BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_verification3
                                        }
                                        style={{ cursor: 'auto' }}
                                    >
                                        Marketplace
                                    </div>
                                    <div
                                        className={
                                            BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_data
                                        }
                                    >
                                        {exchange(blockrewardpersondata)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse
                            }
                        >
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_name
                                }
                            >
                                Block Size
                            </div>
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data
                                }
                                style={{ cursor: 'auto' }}
                            >
                                {soloblockdata.size} bytes
                            </div>
                        </div>
                        <div
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse
                            }
                        >
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_name
                                }
                            >
                                Gas Price
                            </div>
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data
                                }
                                style={{ cursor: 'auto' }}
                            >
                                {gasusedlvsolo(
                                    soloblocktransactiondata.transactions,
                                ) / 1000000000}{' '}
                                Gwei
                            </div>
                        </div>
                        <div
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse
                            }
                        >
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_name
                                }
                            >
                                Gas Limit
                            </div>
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data
                                }
                                style={{ cursor: 'auto' }}
                            >
                                {soloblockdata.gasLimit}
                            </div>
                        </div>
                        <div
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse
                            }
                        >
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_name
                                }
                            >
                                Delegated Accounts
                            </div>
                            <div
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data
                                }
                                style={{ color: '#7AA4FF' }}
                            >
                                <div
                                    className={
                                        BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box
                                    }
                                >
                                    <div
                                        className={
                                            BlockDetailsApp_ls.BlockDetailsBox_databox_left_transverse_data_box_data
                                        }
                                        style={{
                                            width: '380px',
                                            display: 'block',
                                        }}
                                    >
                                        {blockmakeraddress(
                                            blockrewardpersondata,
                                        )}
                                        {verifieraddress(blockrewardpersondata)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={BlockDetailsApp_ls.tableBox}>
                    <div
                        className={BlockDetailsApp_ls.BlockDetailsBox_table}
                        id="BlockDetailsTableApp"
                    >
                        <p
                            className={
                                BlockDetailsApp_ls.BlockDetailsBox_table_title
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
                                BlockDetailsApp_ls.BlockDetailsBox_Pagination
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
                                    BlockDetailsApp_ls.BlockDetailsBox_Pagination_d
                                }
                            >
                                10/Page
                            </div>
                            <span
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_Pagination_span1
                                }
                            >
                                To
                            </span>
                            <input
                                id="BlockDetailsinputnumber"
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_Pagination_input
                                }
                                onKeyDown={BlockDetailsinputnumberonclick}
                            />
                            <span
                                className={
                                    BlockDetailsApp_ls.BlockDetailsBox_Pagination_span2
                                }
                            >
                                Page
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
