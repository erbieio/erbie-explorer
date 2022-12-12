import HomePageApp_ls from './HomePageApp.less';
import MapChart from '../Map/Map';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import {
    Select,
    Space,
    Table,
    Tag,
    Avatar,
    List,
    Progress,
    Spin,
    message,
    Tooltip,
    Dropdown,
    Badge,
} from 'antd';
import { GoTriangleDown } from 'react-icons/go';
import PubSub from 'pubsub-js';
import Icon, { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
    digitalreduction,
    timestamp,
    stagenumber,
} from '../../utils/methods/Methods';
import {
    erbprice,
    total,
    epoch,
    block,
    rewardperson,
    homepagechart,
    blockrewardperson,
} from '../../api/request_data/block_request';
import { BsSearch } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import { Link, history } from 'umi';
import { utils } from 'ethers';
const { Option } = Select;
export default function HomePageApp() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    //erb价格
    const [erbpricedata, setErbpricedata] = useState({});
    //总数
    const [totaldata, setTotaldata] = useState({});
    //系统NFT周期
    const [epochdata, setEpochdata] = useState({});
    //区块
    const [blockdata, setBlockdata] = useState({});
    //奖励人
    const [rewardpersondata, setRewardpersondata] = useState([]);
    //折线图
    const [homepagechartdata, setHomepagechartdata] = useState({});
    //折线图
    const [marketplacesdata, setMarketplacesdata] = useState([]);
    //最高区块
    const [bigheightblock, setBigheightblock] = useState(0);
    //倍数
    const [multiple, setMultiple] = useState(0.11);
    //区块分页
    let pagedata = {
        page: 1,
        page_size: 14,
    };
    useEffect(() => {
        erbprice_q();
        total_q();
        epoch_q();
        block_q(pagedata);
        homepagechart_q();
        // rewardperson_q()
    }, []);
    useEffect(() => {
        let time = new Date();
        let year = time.getFullYear();
        if (bigheightblock == 1) {
            let dre = 0.11;
            for (let i = 0; i < year - 2022; i++) {
                dre = dre * 0.88;
            }
            setMultiple(dre);
        }
    }, [bigheightblock]);
    //区块查询
    const block_q = async (item) => {
        const data = await block(item);
        if (data) {
            setBlockdata(data);
            setBigheightblock(data.blocks[0].number);
        }
        console.log('区块查询');
        console.log(data);
    };
    // useEffect(() => {
    //     console.log(blockdata);
    //     if (blockdata.blocks) {
    //         blockrewardperson_q(blockdata.blocks[0].number)
    //     }
    // },[blockdata])
    //查询erb价格
    const erbprice_q = async () => {
        const data = await erbprice();
        if (data) {
            setErbpricedata(data);
        }
        console.log(data);
    };
    //总数查询
    const total_q = async () => {
        const data = await total();
        console.log('总数查询');
        console.log(data);
        if (data) {
            setTotaldata(data);
        }
    };
    //系统NFT周期查询
    const epoch_q = async () => {
        const data = await epoch();
        if (data) {
            setEpochdata(data);
        }
        console.log('系统NFT周期查询');
        console.log(data);
    };
    //奖励人查询
    // const rewardperson_q = async () => {
    //     const data = await rewardperson();
    //     if (data) {
    //         if (data.rewards != null) {
    //             setRewardpersondata(data.rewards)
    //         } else {
    //             setRewardpersondata('')
    //         }

    //     }
    //     console.log('奖励人查询');
    //    console.log(data);
    // }
    //最新区块奖励人查询
    const blockrewardperson_q = async (item) => {
        const data = await blockrewardperson(item);
        let text = [];
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].identity == 1) {
                    text.push(data[i]);
                }
            }
            for (let i = 0; i < data.length; i++) {
                if (data[i].identity == 2) {
                    text.push(data[i]);
                }
            }
            for (let i = 0; i < data.length; i++) {
                if (data[i].identity == 3) {
                    text.push(data[i]);
                }
            }
            if (data != null) {
                setRewardpersondata(text);
            } else {
                setRewardpersondata('');
            }
        }
        console.log('最新区块奖励人查询');
        console.log(data);
    };
    //折线图查询
    const homepagechart_q = async () => {
        const data = await homepagechart();
        console.log(data);
        if (data) {
            setHomepagechartdata(data);
        }
        console.log('折线图查询');
        console.log(data);
        let text = [
            {
                index: 0,
                num: 0,
            },
            {
                index: 1,
                num: 0,
            },
            {
                index: 2,
                num: 0,
            },
            {
                index: 3,
                num: 0,
            },
            {
                index: 4,
                num: 0,
            },
            {
                index: 5,
                num: 0,
            },
            {
                index: 6,
                num: 0,
            },
            {
                index: 7,
                num: 0,
            },
            {
                index: 8,
                num: 0,
            },
            {
                index: 9,
                num: 0,
            },
            {
                index: 10,
                num: 0,
            },
            {
                index: 11,
                num: 0,
            },
            {
                index: 12,
                num: 0,
            },
            {
                index: 13,
                num: 0,
            },
            {
                index: 14,
                num: 0,
            },
            {
                index: 15,
                num: 0,
            },
            {
                index: 16,
                num: 0,
            },
            {
                index: 17,
                num: 0,
            },
            {
                index: 18,
                num: 0,
            },
            {
                index: 19,
                num: 0,
            },
            {
                index: 20,
                num: 0,
            },
            {
                index: 21,
                num: 0,
            },
            {
                index: 22,
                num: 0,
            },
            {
                index: 23,
                num: 0,
            },
        ];
        if (data) {
            if (data.exchangers) {
                for (let i = 0; i < text.length; i++) {
                    for (let j = 0; j < data.exchangers.length; j++) {
                        if (text[i].index == data.exchangers[j].index) {
                            text[i] = data.exchangers[j];
                        }
                    }
                }
                setMarketplacesdata(text);
            }
        } else {
            setMarketplacesdata(text);
        }
    };
    function homepageimg(data) {
        if (data) {
            return data.map((item) => {
                return (
                    <img
                        className={HomePageApp_ls.HomePageBox_homepageimg}
                        src={item ? item.img_url : ''}
                    />
                );
            });
        }
    }
    //BlockProducer奖励人判断
    function BlockProducer() {
        for (let i = 0; i < rewardpersondata.length; i++) {
            if (rewardpersondata[i].identity == 1) {
                return rewardpersondata[i];
            }
        }
    }
    //Validator奖励人判断
    function Validator() {
        let text = [];
        for (let i = 0; i < rewardpersondata.length; i++) {
            if (rewardpersondata[i].identity == 2) {
                text.push(rewardpersondata[i]);
            }
        }
        return text;
    }
    //Exchange奖励人判断
    function Exchange() {
        let text = [];
        for (let i = 0; i < rewardpersondata.length; i++) {
            if (rewardpersondata[i].identity == 3) {
                text.push(rewardpersondata[i]);
            }
        }
        return text;
    }
    //Validator组件
    function Validatorzj(data) {
        if (data) {
            return data.map((item) => {
                return (
                    <div
                        className={
                            HomePageApp_ls.tableblocklistselectbox_Validator_box
                        }
                    >
                        <img
                            src={require('../../assets/images/HomePage/Validator.svg')}
                        />
                        <Link
                            to={{
                                pathname: `/AccountDetail/${item.address}`,
                                state: item.address,
                            }}
                            className={
                                HomePageApp_ls.tableblocklistselectbox_Validator_box_p
                            }
                        >
                            {item.address.slice(0, 3) +
                                '...' +
                                item.address.slice(38, 42)}
                        </Link>
                        <span>
                            {item.amount ? utils.formatEther(item.amount) : 0}{' '}
                            ERB
                        </span>
                    </div>
                );
            });
        }
    }
    //Exchange组件
    function Exchangezj(data) {
        if (data) {
            return data.map((item) => {
                return (
                    <div
                        className={
                            HomePageApp_ls.tableblocklistselectbox_Exchange_box
                        }
                    >
                        <img
                            src={require('../../assets/images/HomePage/Marketplace.svg')}
                        />
                        <Link
                            to={{
                                pathname: `/AccountDetail/${item.address}`,
                                state: item.address,
                            }}
                            className={
                                HomePageApp_ls.tableblocklistselectbox_Exchange_box_p
                            }
                        >
                            {item.address.slice(0, 3) +
                                '...' +
                                item.address.slice(38, 42)}
                        </Link>
                        <span>#{item.block_number}</span>
                        <div
                            className={
                                HomePageApp_ls.tableblocklistselectbox_Exchangesnft_box
                            }
                        >
                            <div
                                className={
                                    HomePageApp_ls.tableblocklistselectbox_Exchangesnft_boxd
                                }
                            >
                                {item.snft.slice(0, 3) +
                                    '...' +
                                    item.snft.slice(24, 42)}
                            </div>
                            <Tooltip
                                title="This is the address of this S-NFT.The No.39 number of the address shows the stage number of the S-NFT fragment.The  No.40 number of the address shows the collection number of the S-NFT fragment.The No.41 number of the address shows the S-NFT number of  the S-NFT fragment.The NO.42 number of the address shows the fragment number of the S-NFT fragment."
                                color="#00000040"
                            >
                                <img
                                    src={require('../../assets/SVG/question-circle.svg')}
                                />
                            </Tooltip>
                        </div>
                    </div>
                );
            });
        }
    }
    //Exchangesnft组件
    function Exchangesnftzj(data) {
        console.log(data);
        if (data) {
            return data.map((item) => {
                return (
                    <div
                        className={
                            HomePageApp_ls.tableblocklistselectbox_Exchangesnft_box
                        }
                    >
                        <div
                            className={
                                HomePageApp_ls.tableblocklistselectbox_Exchangesnft_boxd
                            }
                        >
                            {item.snft.slice(0, 3) +
                                '...' +
                                item.snft.slice(24, 42)}
                        </div>
                        <Tooltip
                            title="This is the address of this S-NFT.The No.39 number of the address shows the stage number of the S-NFT fragment.The  No.40 number of the address shows the collection number of the S-NFT fragment.The No.41 number of the address shows the S-NFT number of  the S-NFT fragment.The NO.42 number of the address shows the fragment number of the S-NFT fragment."
                            color="#00000040"
                        >
                            <img
                                src={require('../../assets/SVG/question-circle.svg')}
                            />
                        </Tooltip>
                    </div>
                );
            });
        }
    }
    //BLOCK LIST 表格组件
    function tableblocklist(data) {
        if (data) {
            return data.map((item, index) => {
                return (
                    <div className={HomePageApp_ls.tableblocklistbox}>
                        <div
                            className={HomePageApp_ls.tableblocklisttitbox}
                            style={{
                                backgroundColor:
                                    index % 2 == 0 ? '#FFFFFF10' : '#FFFFFF20',
                            }}
                        >
                            <div
                                className={HomePageApp_ls.tableblocklistdatabox}
                            >
                                <Link
                                    className={
                                        HomePageApp_ls.tableblocklistdatanumber
                                    }
                                    style={{
                                        color: '#16ADFF',
                                        cursor: 'pointer',
                                        fontWeight: '400',
                                    }}
                                    to={{
                                        pathname: '/BlockChain/BlockDetails',
                                        state: { blockid: item.number },
                                    }}
                                >
                                    {item.number}
                                </Link>
                                <Link
                                    className={
                                        HomePageApp_ls.tableblocklistdataminer
                                    }
                                    style={{
                                        color: '#16ADFF',
                                        cursor: 'pointer',
                                        fontWeight: '400',
                                    }}
                                    to={{
                                        pathname: `/AccountDetail/${item.miner}`,
                                        state: item.miner,
                                    }}
                                >
                                    {item.miner
                                        ? item.miner.slice(0, 3) +
                                          '...' +
                                          item.miner.slice(38, 42)
                                        : ''}
                                </Link>
                                <p
                                    className={
                                        HomePageApp_ls.tableblocklistdata
                                    }
                                >
                                    {item.totalTransaction}
                                </p>
                                <p
                                    className={
                                        HomePageApp_ls.tableblocklistdata
                                    }
                                    style={{ width: '130px' }}
                                >
                                    {timestamp(item.timestamp)}
                                </p>
                                <p
                                    className={
                                        HomePageApp_ls.tableblocklistdatat
                                    }
                                    style={{ width: '105px' }}
                                >
                                    {item.size} Bytes
                                </p>
                            </div>
                        </div>
                        <div
                            className={
                                HomePageApp_ls.tableblocklistselectbox +
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
                                    HomePageApp_ls.tableblocklistselectbox_div
                                }
                            >
                                <div
                                    className={
                                        HomePageApp_ls.tableblocklistselectbox_BlockProducer
                                    }
                                >
                                    <img
                                        src={require('../../assets/images/HomePage/Proposal.svg')}
                                    />
                                    <Link
                                        className={
                                            HomePageApp_ls.tableblocklistselectbox_BlockProducer_p
                                        }
                                        to={{
                                            pathname: `/AccountDetail/${
                                                BlockProducer()
                                                    ? BlockProducer().address
                                                    : '0'
                                            }`,
                                            state: BlockProducer()
                                                ? BlockProducer().address
                                                : '0',
                                        }}
                                    >
                                        {BlockProducer()
                                            ? BlockProducer().address.slice(
                                                  0,
                                                  3,
                                              ) +
                                              '...' +
                                              BlockProducer().address.slice(
                                                  38,
                                                  42,
                                              )
                                            : '0'}
                                    </Link>
                                    <span>
                                        {BlockProducer()
                                            ? utils.formatEther(
                                                  BlockProducer().amount,
                                              )
                                            : 0}{' '}
                                        ERB
                                    </span>
                                </div>
                                <div
                                    className={
                                        HomePageApp_ls.tableblocklistselectbox_Validator
                                    }
                                >
                                    {Validatorzj(Validator())}
                                </div>
                                <div
                                    className={
                                        HomePageApp_ls.tableblocklistselectbox_Exchange
                                    }
                                >
                                    {Exchangezj(Exchange())}
                                </div>
                                {/* <div className={HomePageApp_ls.tableblocklistselectbox_Exchangesnft}>
                                {
                                    Exchangesnftzj(Exchange())
                                }
                            </div> */}
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }
    //箭头循环
    function arrow(data) {
        if (data) {
            return data.map((item, index) => {
                return (
                    <>
                        <p
                            onClick={tablearrowclick.bind(this, index, item)}
                            className={HomePageApp_ls.tableblocklistarrowp}
                        >
                            <DownOutlined
                                className={
                                    HomePageApp_ls.tableblocklistarrow +
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
                        <div
                            className={
                                HomePageApp_ls.tableblocklistselectbox +
                                `div${index}`
                            }
                            style={{
                                height: '0px',
                                transition: 'all 0.3s',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        ></div>
                    </>
                );
            });
        }
    }
    //表格箭头点击
    function tablearrowclick(index, data) {
        blockrewardperson_q(data.number);
        if (
            document.getElementsByClassName(`undefined${index}`)[0].style
                .height == '0px'
        ) {
            for (let i = 0; i < blockdata.blocks.length; i++) {
                document.getElementsByClassName(
                    `undefined${i}`,
                )[0].style.height = '0px';
            }
        }
        if (
            document.getElementsByClassName(`undefined${index}`)[0].style
                .height == '420px'
        ) {
            document.getElementsByClassName(
                `undefined${index}`,
            )[0].style.height = '0px';
        } else if (
            document.getElementsByClassName(`undefined${index}`)[0].style
                .height == '0px'
        ) {
            document.getElementsByClassName(
                `undefined${index}`,
            )[0].style.height = '420px';
        }
        if (
            document.getElementsByClassName(`undefineddiv${index}`)[0].style
                .height == '0px'
        ) {
            for (let i = 0; i < blockdata.blocks.length; i++) {
                document.getElementsByClassName(
                    `undefineddiv${i}`,
                )[0].style.height = '0px';
            }
        }
        if (
            document.getElementsByClassName(`undefineddiv${index}`)[0].style
                .height == '420px'
        ) {
            document.getElementsByClassName(
                `undefineddiv${index}`,
            )[0].style.height = '0px';
        } else if (
            document.getElementsByClassName(`undefineddiv${index}`)[0].style
                .height == '0px'
        ) {
            document.getElementsByClassName(
                `undefineddiv${index}`,
            )[0].style.height = '420px';
        }
        if (
            document.getElementsByClassName(`undefinedicon${index}`)[0].style
                .transform == 'rotate(0deg)'
        ) {
            for (let i = 0; i < blockdata.blocks.length; i++) {
                document.getElementsByClassName(
                    `undefinedicon${i}`,
                )[0].style.transform = 'rotate(0deg)';
            }
        }
        if (
            document.getElementsByClassName(`undefinedicon${index}`)[0].style
                .transform == 'rotate(180deg)'
        ) {
            document.getElementsByClassName(
                `undefinedicon${index}`,
            )[0].style.transform = 'rotate(0deg)';
        } else if (
            document.getElementsByClassName(`undefinedicon${index}`)[0].style
                .transform == 'rotate(0deg)'
        ) {
            document.getElementsByClassName(
                `undefinedicon${index}`,
            )[0].style.transform = 'rotate(180deg)';
        }
    }
    //搜索按钮
    function homepageinputclick() {
        let data = document.getElementById('homepageinputapp').value || 0;
        console.log(data);
        if (data) {
            if (
                Number(data) == data &&
                data.slice(0, 2) != '0x' &&
                data.slice(0, 2) != '0X'
            ) {
                // 区块
                history.push({
                    pathname: '/BlockChain/BlockDetails',
                    state: {
                        blockid: data,
                    },
                });
            } else if (
                (data.slice(0, 2) == '0x' || data.slice(0, 2) == '0X') &&
                data.length == 42
            ) {
                //账户详情
                history.push({
                    pathname: `/AccountDetail/${data}`,
                    state: data,
                });
            } else if (
                (data.slice(0, 2) == '0x' || data.slice(0, 2) == '0X') &&
                data.length == 66
            ) {
                //交易hash
                history.push({
                    pathname: `/TradeDetail/${data}`,
                    state: data,
                });
            }
        } else {
            message.error('Cannot be empty！');
        }
    }
    //导航收缩
    function pubsubclick() {
        PubSub.publish('pubsubNavigationdata', {
            Navigationicon: 0,
            Navigationheight: '0px',
        });
    }
    return (
        <>
            <div
                className={HomePageApp_ls.HomePageAppbox}
                onClick={pubsubclick}
            >
                <div className={HomePageApp_ls.HomePageAppbox_titlebox}>
                    <div
                        className={
                            HomePageApp_ls.HomePageAppbox_titlebox_center
                        }
                    >
                        <p
                            className={
                                HomePageApp_ls.HomePageAppbox_titlebox_title
                            }
                        >
                            Search
                        </p>
                        <div
                            className={
                                HomePageApp_ls.HomePageBox_SearchBox_search_bottomBox
                            }
                            id="HomePageselectapp"
                        >
                            <div
                                className={HomePageApp_ls.HomePageBox_inputbox}
                            >
                                <input
                                    className={
                                        HomePageApp_ls.HomePageBox_SearchBox_search_bottomBox_input
                                    }
                                    id="homepageinputapp"
                                    placeholder="Search by Address / Txn Hash / Block / Token"
                                />
                                <BsSearch
                                    className={
                                        HomePageApp_ls.HomePageBox_SearchBox_search_bottomBox_button
                                    }
                                    onClick={homepageinputclick}
                                />
                            </div>
                            <div
                                className={
                                    HomePageApp_ls.HomePageBox_titledatabox
                                }
                            >
                                <div
                                    className={
                                        HomePageApp_ls.HomePageBox_titledatabox_d1
                                    }
                                >
                                    <p
                                        className={
                                            HomePageApp_ls.titlebox_databox_d_data
                                        }
                                    >
                                        {Number(
                                            utils.formatEther(
                                                totaldata.totalPledge || '0',
                                            ),
                                        ).toFixed(2)}
                                    </p>
                                    <p
                                        className={
                                            HomePageApp_ls.titlebox_databox_d_name
                                        }
                                    >
                                        Total staking
                                    </p>
                                </div>
                                <div
                                    className={
                                        HomePageApp_ls.HomePageBox_titledatabox_d1
                                    }
                                >
                                    <p
                                        className={
                                            HomePageApp_ls.titlebox_databox_d_data
                                        }
                                    >
                                        {totaldata.totalTransaction}
                                    </p>
                                    <p
                                        className={
                                            HomePageApp_ls.titlebox_databox_d_name
                                        }
                                    >
                                        Total Transactions
                                    </p>
                                </div>
                                <div
                                    className={
                                        HomePageApp_ls.HomePageBox_titledatabox_d2
                                    }
                                >
                                    <p
                                        className={
                                            HomePageApp_ls.titlebox_databox_d_data
                                        }
                                    >
                                        {parseInt(totaldata.rewardSNFTCount)}
                                    </p>
                                    <p
                                        className={
                                            HomePageApp_ls.titlebox_databox_d_name
                                        }
                                    >
                                        Total S-NFT Rewards
                                    </p>
                                </div>
                                <div
                                    className={
                                        HomePageApp_ls.HomePageBox_titledatabox_d2
                                    }
                                >
                                    <p
                                        className={
                                            HomePageApp_ls.titlebox_databox_d_data
                                        }
                                    >
                                        {Math.floor(
                                            totaldata.rewardCoinCount *
                                                multiple *
                                                100,
                                        ) / 100}
                                    </p>
                                    <p
                                        className={
                                            HomePageApp_ls.titlebox_databox_d_name
                                        }
                                    >
                                        Total ERB Rewards
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 地图 */}
                <div
                    className={HomePageApp_ls.HomePageAppbox_mapbox}
                    id="appmap"
                >
                    <MapChart />
                    <div className={HomePageApp_ls.mapboxz}>
                        <div className={HomePageApp_ls.mapboxz_center}>
                            <div className={HomePageApp_ls.mapboxz_d}>
                                <p className={HomePageApp_ls.mapboxz_d_name}>
                                    Online Rate
                                </p>
                                <p className={HomePageApp_ls.mapboxz_d_data}>
                                    {totaldata.totalValidatorOnline}/
                                    {totaldata.totalValidator}
                                </p>
                                <div
                                    className={
                                        HomePageApp_ls.HomePageBox_centerBox_leftbox_snftBox_d2_table_progressBox
                                    }
                                    id="homepageProgressapp"
                                >
                                    <Progress
                                        percent={(
                                            (totaldata.totalValidatorOnline /
                                                totaldata.totalValidator) *
                                            100
                                        ).toFixed(2)}
                                        status="active"
                                        strokeColor="#75FBFF"
                                        strokeWidth={2}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p
                    className={
                        HomePageApp_ls.HomePageAppbox_MARKETPLACEINFORMAT
                    }
                >
                    MARKETPLACE INFORMATION
                </p>
                <div className={HomePageApp_ls.HomePageAppbox_Mdatabox}>
                    <div className={HomePageApp_ls.HomePageAppbox_Mdatabox_d1}>
                        <p
                            className={
                                HomePageApp_ls.MarketplacesBox_databox_left_name
                            }
                        >
                            Number of Marketplaces
                        </p>
                        <p
                            className={
                                HomePageApp_ls.MarketplacesBox_databox_left_data
                            }
                        >
                            {totaldata.totalExchanger}
                        </p>
                    </div>
                    <div className={HomePageApp_ls.HomePageAppbox_Mdatabox_d2}>
                        <p
                            className={
                                HomePageApp_ls.MarketplacesBox_databox_rightd1_name
                            }
                        >
                            Transaction Number
                        </p>
                        <p
                            className={
                                HomePageApp_ls.MarketplacesBox_databox_rightd1_data
                            }
                        >
                            {totaldata.totalExchangerTx}
                        </p>
                    </div>
                    <div className={HomePageApp_ls.HomePageAppbox_Mdatabox_d3}>
                        <p
                            className={
                                HomePageApp_ls.MarketplacesBox_databox_rightd1_name
                            }
                        >
                            NFT Collection Number
                        </p>
                        <p
                            className={
                                HomePageApp_ls.MarketplacesBox_databox_rightd1_data
                            }
                        >
                            {totaldata.totalNFTCollection}
                        </p>
                    </div>
                    <div className={HomePageApp_ls.HomePageAppbox_Mdatabox_d4}>
                        <p
                            className={
                                HomePageApp_ls.MarketplacesBox_databox_rightd1_name
                            }
                        >
                            NFT Numbers
                        </p>
                        <p
                            className={
                                HomePageApp_ls.MarketplacesBox_databox_rightd1_data
                            }
                        >
                            {totaldata.totalNFT}
                        </p>
                    </div>
                    <div className={HomePageApp_ls.HomePageAppbox_Mdatabox_d5}>
                        <p
                            className={
                                HomePageApp_ls.MarketplacesBox_databox_rightd1_name
                            }
                        >
                            Marketplaces Users
                        </p>
                        <p
                            className={
                                HomePageApp_ls.MarketplacesBox_databox_rightd1_data
                            }
                        >
                            {totaldata.totalAccount}
                        </p>
                    </div>
                </div>
                <p
                    className={
                        HomePageApp_ls.HomePageAppbox_MARKETPLACEINFORMAT
                    }
                >
                    BLOCK INFORMATION
                </p>
                <div className={HomePageApp_ls.HomePageAppbox_BLOCKbox}>
                    <div className={HomePageApp_ls.HomePageAppbox_BLOCKbox_d}>
                        <img
                            src={require('../../assets/images/HomePageApp/ICON／CPU／Normal.png')}
                        />
                        <p>Block Height</p>
                        <span>{totaldata.totalBlock - 1}</span>
                    </div>
                    <div className={HomePageApp_ls.HomePageAppbox_BLOCKbox_d}>
                        <img
                            src={require('../../assets/images/HomePageApp/ICON／Network／Normal.png')}
                        />
                        <p>Block Time</p>
                        <span>{totaldata.avgBlockTime} ms</span>
                    </div>
                    <div className={HomePageApp_ls.HomePageAppbox_BLOCKbox_d}>
                        <img
                            src={require('../../assets/images/HomePageApp/ICON／Hard Disk／Normal.png')}
                        />
                        <p>Total Rewards</p>
                        <span>
                            {((totaldata.totalBlock - 1) * 1.15).toFixed(2)} ERB
                        </span>
                    </div>
                    <div className={HomePageApp_ls.HomePageAppbox_BLOCKbox_d}>
                        <img
                            src={require('../../assets/images/HomePageApp/ICON／Free Memory／Normal.png')}
                        />
                        <p>Number of Blackhole Block</p>
                        <span>{totaldata.totalBlackHole}</span>
                    </div>
                </div>
                <p
                    className={
                        HomePageApp_ls.HomePageAppbox_MARKETPLACEINFORMAT
                    }
                >
                    CURRENT S-NFT VOTE INFORMATION
                </p>
                <div className={HomePageApp_ls.HomePageAppbox_nft}>
                    <p className={HomePageApp_ls.HomePageAppbox_nft_name}>
                        Time of Current Period
                    </p>
                    <p className={HomePageApp_ls.HomePageAppbox_nft_data}>
                        {new Date(epochdata.timestamp * 1000).getFullYear() +
                            '/' +
                            (new Date(epochdata.timestamp * 1000).getMonth() +
                                1) +
                            '/' +
                            new Date(epochdata.timestamp * 1000).getDate()}
                    </p>
                    <p className={HomePageApp_ls.HomePageAppbox_nft_name}>
                        S-NFT Weight
                    </p>
                    <p className={HomePageApp_ls.HomePageAppbox_nft_data}>
                        {epochdata.voteWeight}
                    </p>
                    <p className={HomePageApp_ls.HomePageAppbox_nft_name}>
                        S-NFT Creator
                    </p>
                    {epochdata.creator ==
                    '0x0000000000000000000000000000000000000000' ? (
                        <p
                            className={
                                HomePageApp_ls.BlockINFORMATIONbox_right_dataaddress
                            }
                            style={{ color: '#ffffff' }}
                        >
                            Official S-NFT
                        </p>
                    ) : (
                        <Link
                            to={{
                                pathname: '/Exchange/ExchangeDetails',
                                state: { exchangeid: epochdata.creator },
                            }}
                            className={
                                HomePageApp_ls.BlockINFORMATIONbox_right_dataaddress
                            }
                        >
                            {epochdata.creator
                                ? epochdata.creator.slice(0, 8) +
                                  '...' +
                                  epochdata.creator.slice(33, 42)
                                : ''}
                        </Link>
                    )}

                    <div
                        className={
                            HomePageApp_ls.BlockINFORMATIONbox_rightimgbox
                        }
                    >
                        {homepageimg(epochdata.collections)}
                    </div>
                </div>
                <div className={HomePageApp_ls.HomePageAppbox_tablebigbox}>
                    <div
                        className={HomePageApp_ls.HomePageAppbox_tablebox}
                        id="apptable"
                    >
                        <div className={HomePageApp_ls.Blockrewardbox_center}>
                            <div
                                className={
                                    HomePageApp_ls.Blockrewardbox_titlebox
                                }
                            >
                                <p
                                    className={
                                        HomePageApp_ls.Blockrewardbox_title
                                    }
                                >
                                    BLOCK LIST
                                </p>
                                <div
                                    className={
                                        HomePageApp_ls.Blockrewardbox_namebox
                                    }
                                >
                                    <p
                                        className={
                                            HomePageApp_ls.Blockrewardbox_nameboxp
                                        }
                                        style={{ width: '90px' }}
                                    >
                                        Block Height
                                    </p>
                                    <p
                                        className={
                                            HomePageApp_ls.Blockrewardbox_nameboxp
                                        }
                                        style={{ width: '90px' }}
                                    >
                                        Miner
                                    </p>
                                    <p
                                        className={
                                            HomePageApp_ls.Blockrewardbox_nameboxp
                                        }
                                        style={{ width: '90px' }}
                                    >
                                        TXN
                                    </p>
                                    <p
                                        className={
                                            HomePageApp_ls.Blockrewardbox_nameboxp
                                        }
                                        style={{ width: '130px' }}
                                    >
                                        Age
                                    </p>
                                    <p
                                        className={
                                            HomePageApp_ls.Blockrewardbox_nameboxtp
                                        }
                                        style={{ width: '100px' }}
                                    >
                                        Block Size
                                    </p>
                                </div>
                            </div>
                            {tableblocklist(blockdata.blocks)}
                        </div>
                    </div>
                    <div className={HomePageApp_ls.Blockrewardbox_Occlusion}>
                        {arrow(blockdata.blocks)}
                    </div>
                </div>
                <Link
                    to={{ pathname: '/BlockChain', state: '' }}
                    className={HomePageApp_ls.Blockrewardbox_button}
                >
                    View More
                </Link>
            </div>
        </>
    );
}
