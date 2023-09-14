import BlockDetails_ls from './BlockDetails.less';
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
    hexCharCodeToStr,
} from '../../utils/methods/Methods';
import React, { useState, useEffect } from 'react';
export default function BlockDetails(props) {
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
                    {moment(parseInt(soloblockdata.timestamp) * 1000).format(
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
    //区块奖励人查询
    const blockrewardperson_q = async (item) => {
        const data = await blockrewardperson(item);
        if (data) {
            setBlockrewardpersondata(data);
        }
    };
    //404
    function comingsoon404() {
        history.push('/NoSearchResults');
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
                                pathname: `/AccountDetail`,
                                state: item.address,
                            }}
                            className={
                                BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                            }
                            style={{ paddingLeft: '11px' }}
                        >
                            {item.address}
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
                                pathname: `/AccountDetail`,
                                state: item.address,
                            }}
                            className={
                                BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                            }
                            style={{ paddingLeft: '11px' }}
                        >
                            {item.address}
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
                        return (
                            <p
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                                }
                                style={{ color: '#fff' }}
                            >
                                {item.proxy ||
                                    '0x0000000000000000000000000000000000000000'}
                                &nbsp;&nbsp;
                                <img
                                    style={{ width: '16px', height: '16px' }}
                                    src={require('../../assets/images/BlockChain/Proposer.png')}
                                />
                            </p>
                        );
                    } else {
                        return (
                            <Link
                                to={{
                                    pathname: `/AccountDetail`,
                                    state: item.proxy,
                                }}
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                                }
                            >
                                {item.proxy}
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
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                                }
                                style={{ color: '#fff' }}
                            >
                                {item.proxy ||
                                    '0x0000000000000000000000000000000000000000'}
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
                                    pathname: `/AccountDetail`,
                                    state: item.proxy,
                                }}
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                                }
                            >
                                {item.proxy}
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
                                pathname: `/AccountDetail`,
                                state: item.address,
                            }}
                            className={
                                BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_verificationData
                            }
                            style={{
                                display: 'inline',
                                borderRight: '1px solid #ffffff',
                                padding: '0 10px',
                            }}
                        >
                            {item.address
                                ? item.address.slice(0, 3) +
                                  '...' +
                                  item.address.slice(38, 42)
                                : ''}
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
        localStorage.setItem(
            'blocktext',
            JSON.stringify(JSON.parse(localStorage.getItem('blocktext')) - 1),
        );
        history.push({
            pathname: '/NullPage',
            state: {
                blockid: JSON.parse(localStorage.getItem('blocktext')),
            },
        });
    }
    return (
        <>
            <div className={BlockDetails_ls.BlockDetailsBox}>
                <div className={BlockDetails_ls.BlockDetailsBox_titlebox}>
                    <div className={BlockDetails_ls.BlockDetailsBox_title}>
                        Block Details
                        <p className={BlockDetails_ls.BlockDetailsBox_blockid}>
                            #{JSON.parse(localStorage.getItem('blocktext'))}
                        </p>
                    </div>

                    <div className={BlockDetails_ls.BlockDetailsBox_databox}>
                        <div
                            className={
                                BlockDetails_ls.BlockDetailsBox_databox_left
                            }
                        >
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_name
                                    }
                                    style={{ width: '150px' }}
                                >
                                    Block Generation Time
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data
                                    }
                                    style={{ cursor: 'auto' }}
                                >
                                    {timestamp(soloblockdata.timestamp)}
                                </div>
                            </div>
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_name
                                    }
                                    style={{ width: '150px' }}
                                >
                                    Parent Hash
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data
                                    }
                                    style={{ color: '#7AA4FF' }}
                                >
                                    <span
                                        style={{
                                            color: '#7AA4FF',
                                            cursor: 'pointer',
                                        }}
                                        onClick={fatherblock}
                                    >
                                        {soloblockdata.parentHash}
                                    </span>
                                </div>
                            </div>
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_name
                                    }
                                    style={{ width: '150px' }}
                                >
                                    Gas Used
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data
                                    }
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '310px',
                                        cursor: 'auto',
                                    }}
                                >
                                    {soloblockdata.gasUsed}(
                                    {soloblockdata.gasUsed /
                                        soloblockdata.gasLimit}
                                    %)
                                    <div
                                        style={{ width: '263px' }}
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
                        </div>
                        <div
                            className={
                                BlockDetails_ls.BlockDetailsBox_databox_right
                            }
                        >
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_name
                                    }
                                >
                                    Block Size
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data
                                    }
                                    style={{ cursor: 'auto' }}
                                >
                                    {soloblockdata.size} bytes
                                </div>
                            </div>
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_name
                                    }
                                >
                                    Gas Price
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data
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
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_name
                                    }
                                >
                                    Gas Limit
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data
                                    }
                                    style={{ cursor: 'auto' }}
                                >
                                    {soloblockdata.gasLimit}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={BlockDetails_ls.BlockDetailsBox_titlebox}>
                    <div className={BlockDetails_ls.BlockDetailsBox_databox}>
                        <div
                            className={
                                BlockDetails_ls.BlockDetailsBox_databox_left
                            }
                        >
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_name
                                    }
                                    style={{ width: '150px' }}
                                >
                                    Proposer
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data
                                    }
                                    style={{ color: '#7AA4FF' }}
                                >
                                    <div
                                        className={
                                            BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box
                                        }
                                    >
                                        <div
                                            className={
                                                BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_verification1
                                            }
                                            style={{ cursor: 'auto' }}
                                        >
                                            Proposer
                                        </div>
                                        <div
                                            className={
                                                BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_data
                                            }
                                        >
                                            {blockmaker(blockrewardpersondata)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse
                                }
                                style={{ marginTop: '-40px' }}
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_name
                                    }
                                    style={{ width: '150px' }}
                                >
                                    Reward
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data
                                    }
                                    style={{ color: '#7AA4FF', cursor: 'auto' }}
                                >
                                    <div
                                        className={
                                            BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box
                                        }
                                    >
                                        <div
                                            className={
                                                BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_verification2
                                            }
                                            style={{ cursor: 'auto' }}
                                        >
                                            Validator
                                        </div>
                                        <div
                                            className={
                                                BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_data
                                            }
                                        >
                                            {verifier(blockrewardpersondata)}
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box
                                        }
                                    >
                                        <div
                                            className={
                                                BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_verification3
                                            }
                                            style={{ cursor: 'auto' }}
                                        >
                                            Staker
                                        </div>
                                        <div
                                            className={
                                                BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_data
                                            }
                                            style={{ marginLeft: '5px' }}
                                        >
                                            {exchange(blockrewardpersondata)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={
                                BlockDetails_ls.BlockDetailsBox_databox_right
                            }
                        >
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_left_transverse
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_name
                                    }
                                >
                                    Delegated Accounts
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data
                                    }
                                    style={{ color: '#7AA4FF' }}
                                >
                                    <div
                                        className={
                                            BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box
                                        }
                                    >
                                        <div
                                            className={
                                                BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data_box_data
                                            }
                                            style={{ width: '400px' }}
                                        >
                                            {blockmakeraddress(
                                                blockrewardpersondata,
                                            )}
                                            {verifieraddress(
                                                blockrewardpersondata,
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={BlockDetails_ls.BlockDetailsBox_table}
                    id="BlockDetailsTable"
                >
                    <p className={BlockDetails_ls.BlockDetailsBox_table_title}>
                        Transactions List
                    </p>
                    <Table
                        columns={columns}
                        dataSource={soloblocktransactiondata.transactions}
                        pagination={false}
                    />
                    <div
                        className={BlockDetails_ls.BlockDetailsBox_Pagination}
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
                                BlockDetails_ls.BlockDetailsBox_Pagination_d
                            }
                        >
                            10/Page
                        </div>
                        <span
                            className={
                                BlockDetails_ls.BlockDetailsBox_Pagination_span1
                            }
                        >
                            To
                        </span>
                        <input
                            id="BlockDetailsinputnumber"
                            className={
                                BlockDetails_ls.BlockDetailsBox_Pagination_input
                            }
                            onKeyDown={BlockDetailsinputnumberonclick}
                        />
                        <span
                            className={
                                BlockDetails_ls.BlockDetailsBox_Pagination_span2
                            }
                        >
                            Page
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
