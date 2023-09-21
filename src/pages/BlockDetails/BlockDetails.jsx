import BlockDetails_ls from './BlockDetails.less';
import VirtualList from 'rc-virtual-list';
import {
    Space,
    Table,
    Tag,
    Pagination,
    Progress,
    Avatar,
    List,
    message,
} from 'antd';
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
    slashings,
} from '../../api/request_data/block_request';
import { utils } from 'ethers';
import moment from 'moment';
import { history } from 'umi';
import SearchBox from '../../components/SearchBox/SearchBox';
import {
    timestamp,
    ellipsis,
    hexCharCodeToStr,
    ellipsisdata,
} from '../../utils/methods/Methods';
import { DownOutlined } from '@ant-design/icons';
import React, { useState, useEffect, SyntheticEvent } from 'react';
export default function BlockDetails(props) {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    const [blackpagenumber, setBlackpagenumber] = useState(1);
    const [blackpagenumbersize, setBlackpagenumbersize] = useState(10);
    const [blackpagenumberpunish, setBlackpagenumberpunish] = useState(1);
    const [blackpagenumbersizepunish, setBlackpagenumbersizepunish] =
        useState(10);
    const [blackpagenumberpunish2, setBlackpagenumberpunish2] = useState(1);
    const [blackpagenumbersizepunish2, setBlackpagenumbersizepunish2] =
        useState(10);
    const [blockaddressdata, setBlockaddressdata] = useState('');
    //单个区块
    const [soloblockdata, setSoloblockdata] = useState({});
    //黑洞区块
    const [blackblockdata, setBlackblockdata] = useState([]);
    //惩罚区块
    const [punishdata, setPunishdata] = useState([]);
    const [punishdata2, setPunishdata2] = useState([]);
    //单个区块交易
    const [soloblocktransactiondata, setSoloblocktransactiondata] = useState(
        {},
    );
    //区块奖励人
    const [blockrewardpersondata, setBlockrewardpersondata] = useState([]);
    const ContainerHeight = 320;
    const onScroll = (e) => {
        if (
            e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
            ContainerHeight
        ) {
            let text = blackpagenumber + 1;
            setBlackpagenumber(text);
        }
    };
    const ContainerHeight2 = 320;
    const onScroll2 = (e) => {
        if (
            e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
            ContainerHeight2
        ) {
            let text = blackpagenumberpunish + 1;
            setBlackpagenumberpunish(text);
        }
    };
    const onScroll3 = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === 140) {
            let text = blackpagenumberpunish2 + 1;
            setBlackpagenumberpunish2(text);
        }
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
    //黑洞块
    let bloackblockdata = {
        page: blackpagenumber,
        page_size: blackpagenumbersize,
        address: '',
        number:
            props.location.state != undefined
                ? props.location.state.blockid
                : JSON.parse(localStorage.getItem('blocktext')),
        reason: '1',
    };
    //惩罚块
    let punish = {
        page: blackpagenumberpunish,
        page_size: blackpagenumbersizepunish,
        address: '',
        number:
            props.location.state != undefined
                ? props.location.state.blockid
                : JSON.parse(localStorage.getItem('blocktext')),
        reason: '2',
    };
    //惩罚块2
    let punish2 = {
        page: blackpagenumberpunish2,
        page_size: blackpagenumbersizepunish2,
        address: '',
        number:
            props.location.state != undefined
                ? props.location.state.blockid
                : JSON.parse(localStorage.getItem('blocktext')),
        reason: blockaddressdata,
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
        slashings_q(bloackblockdata);
    }, [blackpagenumber]);
    useEffect(() => {
        slashings_q2(punish);
    }, [blackpagenumberpunish]);
    useEffect(() => {
        slashings_q3(punish2);
    }, [blockaddressdata]);
    useEffect(() => {
        slashings_q3(punish2);
    }, [blackpagenumberpunish2]);
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
            if (data.miner == '0x0000000000000000000000000000000000000000') {
                slashings_q(bloackblockdata);
            }
            if (data.proof != undefined) {
                slashings_q2(punish);
            }
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
            console.log(data);
            setSoloblocktransactiondata(data);
        }
    };
    //区块奖励人查询
    const blockrewardperson_q = async (item) => {
        const data = await blockrewardperson(item);
        if (data) {
            console.log(data);
            setBlockrewardpersondata(data);
        }
    };
    const slashings_q = async (item) => {
        const data = await slashings(item);
        if (data) {
            console.log(data);
            if (data.data.length > 0) {
                setBlackblockdata(blackblockdata.concat(data.data));
            }
        }
    };
    const slashings_q2 = async (item) => {
        const data = await slashings(item);
        if (data) {
            console.log(data);
            if (data.data.length > 0) {
                setPunishdata(punishdata.concat(data.data));
            }
        }
    };
    const slashings_q3 = async (item) => {
        const data = await slashings(item);
        if (data) {
            console.log(data);
            if (data.data.length > 0) {
                setPunishdata2(punishdata2.concat(data.data));
            }
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
            if (data.length > 0) {
                let text = 0;
                for (let i = 0; i < data.length; i++) {
                    text = text + data[i].gasPrice;
                }
                return text / data.length;
            } else {
                return 0;
            }
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
    // 黑洞块nodeaddress
    function blacknodeaddress(item) {
        if (item && item.length > 0) {
            return item.map((data) => {
                return (
                    <div className={BlockDetails_ls.blacknodeaddressdata}>
                        <Link
                            to={{
                                pathname: `/AccountDetail`,
                                state: data,
                            }}
                            style={{ color: '#7AA4FF' }}
                        >
                            {ellipsisdata(data, 10, 5)}
                        </Link>
                    </div>
                );
            });
        }
    }
    // 惩罚块详情
    function punishaddress(item) {
        if (item && item.length > 0) {
            return item.map((data) => {
                return (
                    <div className={BlockDetails_ls.punishaddressdata}>
                        <span>{data}</span>
                    </div>
                );
            });
        }
    }
    function punishdetails(item) {
        if (item && item.length > 0) {
            return item.map((data) => {
                return (
                    <p className={BlockDetails_ls.punishdetailsbox}>
                        <p className={BlockDetails_ls.punishdetailsbox_name}>
                            <Link
                                to={{
                                    pathname: `/AccountDetail`,
                                    state: data.address,
                                }}
                                style={{ color: '#7AA4FF' }}
                            >
                                {ellipsisdata(data.address, 3, 4)}
                            </Link>
                        </p>
                        <p className={BlockDetails_ls.punishdetailsbox_text}>
                            {data.amount
                                ? Number(
                                      utils.formatEther(String(data.amount)),
                                  ).toFixed(2)
                                : 0}
                        </p>
                    </p>
                );
            });
        }
    }
    function icononclick(data, add) {
        if (
            document.getElementById(`icon${data}`).style.transform ==
            'rotate(180deg)'
        ) {
            for (let i = 0; i < punishdata.length; i++) {
                if (document.getElementById(`icon${i}`) != undefined) {
                    document.getElementById(`icon${i}`).style.transform =
                        'rotate(0deg)';
                }
            }
        } else {
            for (let i = 0; i < punishdata.length; i++) {
                if (document.getElementById(`icon${i}`) != undefined) {
                    document.getElementById(`icon${i}`).style.transform =
                        'rotate(0deg)';
                }
            }
            document.getElementById(`icon${data}`).style.transform =
                'rotate(180deg)';
        }

        if (document.getElementById(`box${data}`).style.height == '184px') {
            for (let i = 0; i < punishdata.length; i++) {
                if (document.getElementById(`box${i}`) != undefined) {
                    document.getElementById(`box${i}`).style.height = '0px';
                }
            }
        } else {
            for (let i = 0; i < punishdata.length; i++) {
                if (document.getElementById(`box${i}`) != undefined) {
                    document.getElementById(`box${i}`).style.height = '0px';
                }
            }
            document.getElementById(`box${data}`).style.height = '184px';
        }
        setBlockaddressdata(add);
    }

    return (
        <>
            <div className={BlockDetails_ls.BlockDetailsBox}>
                {/* Block Details */}
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
                                    Gas Used
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_left_transverse_data
                                    }
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        // width: '310px',
                                        cursor: 'auto',
                                    }}
                                >
                                    {soloblockdata.gasUsed}(
                                    {soloblockdata.gasUsed /
                                        soloblockdata.gasLimit}
                                    %)&nbsp;&nbsp;
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
                {/* Reward List */}
                {blockrewardpersondata.length > 0 ? (
                    <div className={BlockDetails_ls.BlockDetailsBox_titlebox}>
                        <div className={BlockDetails_ls.BlockDetailsBox_title}>
                            Reward List
                        </div>
                        <div
                            className={BlockDetails_ls.BlockDetailsBox_databox}
                        >
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
                                                {blockmaker(
                                                    blockrewardpersondata,
                                                )}
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
                                        style={{
                                            color: '#7AA4FF',
                                            cursor: 'auto',
                                        }}
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
                                                {verifier(
                                                    blockrewardpersondata,
                                                )}
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
                                                {exchange(
                                                    blockrewardpersondata,
                                                )}
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
                ) : (
                    ''
                )}

                {/* Blackhole Block Details */}
                {soloblockdata.miner ==
                '0x0000000000000000000000000000000000000000' ? (
                    <div className={BlockDetails_ls.BlockDetailsBox_titleboxbs}>
                        <div className={BlockDetails_ls.BlockDetailsBox_title}>
                            Blackhole Block Details
                        </div>
                        <div
                            className={BlockDetails_ls.BlockDetailsBox_databox}
                        >
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_Blackholeleft
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_Blackholeleft_title
                                    }
                                >
                                    <div>Penalty Address</div>
                                    <div>Penalty Weight</div>
                                    <div>Current Weight</div>
                                </div>
                                <List>
                                    <VirtualList
                                        data={blackblockdata}
                                        height={ContainerHeight}
                                        itemHeight={40}
                                        itemKey="email"
                                        onScroll={onScroll}
                                    >
                                        {(item) => (
                                            <div
                                                className={
                                                    BlockDetails_ls.BlockDetailsBox_databox_Blackholeleft_data
                                                }
                                            >
                                                <div>
                                                    <Link
                                                        to={{
                                                            pathname: `/AccountDetail`,
                                                            state: item.address,
                                                        }}
                                                        style={{
                                                            color: '#7AA4FF',
                                                        }}
                                                    >
                                                        {ellipsisdata(
                                                            item.address,
                                                            3,
                                                            4,
                                                        )}
                                                    </Link>
                                                </div>
                                                <div>
                                                    {item.weight == '70'
                                                        ? '0'
                                                        : '20'}
                                                </div>
                                                <div>{item.weight}</div>
                                            </div>
                                        )}
                                    </VirtualList>
                                </List>
                            </div>
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_Blackholeright
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_Blackholeright_title
                                    }
                                >
                                    Node Address
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_Blackholeright_databox
                                    }
                                >
                                    <div
                                        className={
                                            BlockDetails_ls.BlockDetailsBox_databox_Blackholeright_data
                                        }
                                    >
                                        {blacknodeaddress(
                                            soloblockdata.proposers,
                                        )}
                                        {soloblockdata.proposers % 3 == 2 ? (
                                            <div
                                                className={
                                                    BlockDetails_ls.blacknodeaddressdata
                                                }
                                            ></div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {soloblockdata.proof != undefined ? (
                    <div className={BlockDetails_ls.BlockDetailsBox_titleboxbs}>
                        <div className={BlockDetails_ls.BlockDetailsBox_title}>
                            Punishment Details
                        </div>
                        <div
                            className={BlockDetails_ls.BlockDetailsBox_databox}
                        >
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_PunishmentDetailsleft
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_PunishmentDetailsleft_title
                                    }
                                >
                                    <div>Address</div>
                                    <div>Amount</div>
                                    <div>Type</div>
                                    <div></div>
                                </div>
                                <List>
                                    <VirtualList
                                        data={punishdata}
                                        height={ContainerHeight2}
                                        // itemHeight={40}
                                        itemKey="email"
                                        onScroll={onScroll2}
                                        id="VirtualList"
                                    >
                                        {(item, index) => (
                                            <div
                                                className={
                                                    BlockDetails_ls.BlockDetailsBox_databox_Blackholeleft_data
                                                }
                                            >
                                                <div>
                                                    <Link
                                                        to={{
                                                            pathname: `/AccountDetail`,
                                                            state: item.address,
                                                        }}
                                                        style={{
                                                            color: '#7AA4FF',
                                                        }}
                                                    >
                                                        {ellipsisdata(
                                                            item.address,
                                                            10,
                                                            5,
                                                        )}
                                                    </Link>
                                                </div>
                                                <div>
                                                    {item.amount
                                                        ? Number(
                                                              utils.formatEther(
                                                                  String(
                                                                      item.amount,
                                                                  ),
                                                              ),
                                                          ).toFixed(2)
                                                        : 0}
                                                </div>
                                                <div>Multi-signatures</div>
                                                <div
                                                    id={`icon${index}`}
                                                    onClick={icononclick.bind(
                                                        this,
                                                        index,
                                                        item.address,
                                                    )}
                                                    style={{
                                                        transform:
                                                            'rotate(0deg)',
                                                    }}
                                                >
                                                    <DownOutlined />
                                                </div>
                                                <div
                                                    className={
                                                        BlockDetails_ls.BlockDetailsBox_Blackholeleft_textbox
                                                    }
                                                    id={`box${index}`}
                                                    style={{ height: '0px' }}
                                                >
                                                    <div
                                                        className={
                                                            BlockDetails_ls.BlockDetailsBox_Blackholeleft_textbox_title
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                BlockDetails_ls.BlockDetailsBox_Blackholeleft_textbox_title_d
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    BlockDetails_ls.BlockDetailsBox_Blackholeleft_textbox_title_span
                                                                }
                                                            >
                                                                Address
                                                            </span>
                                                            <span
                                                                className={
                                                                    BlockDetails_ls.BlockDetailsBox_Blackholeleft_textbox_title_span
                                                                }
                                                            >
                                                                Amount
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={
                                                                BlockDetails_ls.BlockDetailsBox_Blackholeleft_textbox_title_d
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    BlockDetails_ls.BlockDetailsBox_Blackholeleft_textbox_title_span
                                                                }
                                                            >
                                                                Address
                                                            </span>
                                                            <span
                                                                className={
                                                                    BlockDetails_ls.BlockDetailsBox_Blackholeleft_textbox_title_span
                                                                }
                                                            >
                                                                Amount
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            BlockDetails_ls.BlockDetailsBox_Blackholeleft_textbox_smbox
                                                        }
                                                        onScroll={onScroll3}
                                                    >
                                                        <div
                                                            className={
                                                                BlockDetails_ls.BlockDetailsBox_Blackholeleft_textbox_bigbox
                                                            }
                                                        >
                                                            {punishdetails(
                                                                punishdata2,
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </VirtualList>
                                </List>
                            </div>
                            <div
                                className={
                                    BlockDetails_ls.BlockDetailsBox_databox_PunishmentDetailsright
                                }
                            >
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_Blackholeright_title
                                    }
                                >
                                    Punished Hash List
                                </div>
                                <div
                                    className={
                                        BlockDetails_ls.BlockDetailsBox_databox_Blackholeright_databox
                                    }
                                >
                                    <div
                                        className={
                                            BlockDetails_ls.BlockDetailsBox_databox_Blackholeright_data
                                        }
                                    >
                                        {punishaddress(soloblockdata.proof)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}

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
