import HomePage_ls from './HomePage.less';
import MapChart from '../Map/Map';
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
} from 'antd';
import { Link, history } from 'umi';
import moment from 'moment';
import TestPage from '../TestPage/TestPage';
import React, { useState, useEffect } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { BsSearch } from 'react-icons/bs';
import Icon, {
    DownOutlined,
    UpOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import {
    digitalreduction,
    timestamp,
    stagenumber,
    getBit,
    stagenumberbs,
} from '../../utils/methods/Methods';
import {
    erbprice,
    total,
    epoch,
    block,
    rewardperson,
    homepagechart,
    blockrewardperson,
    onlineAddr,
    snftimageaddress,
} from '../../api/request_data/block_request';
import { utils } from 'ethers';
import imgmr from '../../assets/images/HomePage/mr.png';
const { Option } = Select;
export default function HomePage() {
    const handleChange = (value) => {};
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
    const [multiple, setMultiple] = useState(0.16);
    //在线验证者
    const [validatoronline, setValidatoronline] = useState(0);
    // nft图片
    const [nftimage, setNftimage] = useState('');
    let L0 = 0.03;
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
        onlineAddr_q();
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
    };
    //验证者在线查询
    const onlineAddr_q = async (item) => {
        const data = await onlineAddr(item);
        if (data) {
            setValidatoronline(data);
        }
    };
    //查询erb价格
    const erbprice_q = async () => {
        const data = await erbprice();
        if (data) {
            setErbpricedata(data);
        }
    };
    //总数查询
    const total_q = async () => {
        const data = await total();
        if (data) {
            setTotaldata(data);
        }
    };
    //系统NFT周期查询
    const epoch_q = async () => {
        const data = await epoch();
        if (data) {
            setEpochdata(data);
            hexToStringbs(data.meta_url, data);
        }
    };
    // 图片查询
    const snftimageaddress_q = async (item) => {
        const data = await snftimageaddress(item);
        if (data) {
            if (data.code == 200) {
                setNftimage('ipfs/' + data.data);
            } else {
                setNftimage(imgmr);
            }
        }
    };
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
    };
    //折线图查询
    const homepagechart_q = async () => {
        const data = await homepagechart();
        if (data) {
            setHomepagechartdata(data);
        }
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
                        className={HomePage_ls.HomePageBox_homepageimg}
                        src={item ? item.img_url : ''}
                    />
                );
            });
        }
    }
    function hexToStringbs(str, item) {
        if (str.slice(0, 2) == '0x') {
            var val = '',
                len = str.length / 2;
            for (var i = 0; i < len; i++) {
                val += String.fromCharCode(parseInt(str.substr(i * 2, 2), 16));
            }
            try {
                let text = 0;
                for (
                    let i = 0;
                    i <
                    Object.keys(JSON.parse(val.slice(1, val.length))).length;
                    i++
                ) {
                    if (
                        Object.keys(JSON.parse(val.slice(1, val.length)))[i] ==
                            'prompt' ||
                        Object.keys(JSON.parse(val.slice(1, val.length)))[i] ==
                            'randomNumber'
                    ) {
                        text++;
                    }
                }
                //console.log(text);
                if (text == 2) {
                    // ai
                    let pth = item.id;
                    for (let i = 0; i < 42 - item.id.length; i++) {
                        pth.concat('0');
                    }
                    //console.log(pth);
                    snftimageaddress_q(pth);
                } else {
                    //console.log('=======' + val.meta_url);
                    setNftimage(JSON.parse(val.slice(1, val.length)).meta_url);
                }
            } catch (error) {
                setNftimage(imgmr);
            }
        } else if (str.slice(0, 6) == '/ipfs/') {
            setNftimage(str);
        } else {
            setNftimage(imgmr);
        }
    }
    //BlockProducer奖励人判断
    function BlockProducer() {
        for (let i = 0; i < rewardpersondata.length; i++) {
            if (rewardpersondata[i].identity == 1) {
                // console.log(rewardpersondata[i]);
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
                            HomePage_ls.tableblocklistselectbox_Validator_box
                        }
                    >
                        <img
                            src={require('../../assets/images/HomePage/Validator.png')}
                        />
                        <Link
                            to={{
                                pathname: `/AccountDetail`,
                                state: item.address,
                            }}
                            className={
                                HomePage_ls.tableblocklistselectbox_Validator_box_p
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
        // console.log(data);
        if (data) {
            return data.map((item) => {
                return (
                    <div
                        className={
                            HomePage_ls.tableblocklistselectbox_Exchange_box
                        }
                    >
                        <img
                            src={require('../../assets/images/HomePage/Marketplace.png')}
                        />
                        <Link
                            to={{
                                pathname: `/AccountDetail`,
                                state: item.address,
                            }}
                            className={
                                HomePage_ls.tableblocklistselectbox_Exchange_box_p
                            }
                        >
                            {item.address.slice(0, 3) +
                                '...' +
                                item.address.slice(38, 42)}
                        </Link>
                        <span>#{item.block_number}</span>
                    </div>
                );
            });
        }
    }
    //Exchangesnft组件
    function Exchangesnftzj(data) {
        // console.log(data);
        if (data) {
            return data.map((item) => {
                return (
                    <div
                        className={
                            HomePage_ls.tableblocklistselectbox_Exchangesnft_box
                        }
                    >
                        <div
                            className={
                                HomePage_ls.tableblocklistselectbox_Exchangesnft_boxd
                            }
                        >
                            {item.snft.slice(0, 3) +
                                '...' +
                                item.snft.slice(24, 42)}
                        </div>
                        <Tooltip
                            title="This is the address of this SNFT.The No.39 number of the address shows the stage number of the SNFT synthesis.The  No.40 number of the address shows the collection number of the SNFT synthesis.The No.41 number of the address shows the SNFT number of  the SNFT synthesis.The NO.42 number of the address shows the synthesis number of the SNFT synthesis."
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
        // console.log(data);
        if (data) {
            return data.map((item, index) => {
                return (
                    <div className={HomePage_ls.tableblocklistbox}>
                        <div
                            className={HomePage_ls.tableblocklisttitbox}
                            style={{
                                backgroundColor:
                                    index % 2 == 0 ? '#FFFFFF10' : '#FFFFFF20',
                            }}
                        >
                            <div className={HomePage_ls.tableblocklistdatabox}>
                                <Link
                                    className={
                                        HomePage_ls.tableblocklistdatanumber
                                    }
                                    style={{
                                        color: '#16ADFF',
                                        cursor: 'pointer',
                                        fontWeight: '400',
                                    }}
                                    to={{
                                        pathname: '/BlockDetails',
                                        state: { blockid: item.number },
                                    }}
                                >
                                    {item.number}
                                </Link>

                                <Link
                                    className={
                                        HomePage_ls.tableblocklistdataminer
                                    }
                                    style={{
                                        color: '#16ADFF',
                                        cursor: 'pointer',
                                        fontWeight: '400',
                                    }}
                                    to={{
                                        pathname: `/AccountDetail`,
                                        state: item.miner,
                                    }}
                                >
                                    {item.miner
                                        ? item.miner.slice(0, 15) +
                                          '...' +
                                          item.miner.slice(25, 42)
                                        : ''}
                                </Link>
                                <p
                                    className={HomePage_ls.tableblocklistdata}
                                    style={{ width: '150px' }}
                                >
                                    {item.totalTransaction}
                                </p>
                                <p
                                    className={HomePage_ls.tableblocklistdata}
                                    style={{ width: '200px' }}
                                >
                                    {timestamp(item.timestamp)}
                                </p>
                                <p className={HomePage_ls.tableblocklistdatat}>
                                    {item.size} Bytes
                                </p>
                            </div>
                            {}
                            <p
                                onClick={tablearrowclick.bind(
                                    this,
                                    index,
                                    item,
                                )}
                                className={HomePage_ls.tableblocklistarrowp}
                            >
                                <DownOutlined
                                    className={
                                        HomePage_ls.tableblocklistarrow +
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
                                HomePage_ls.tableblocklistselectbox + `${index}`
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
                                    HomePage_ls.tableblocklistselectbox_div
                                }
                            >
                                <div
                                    className={
                                        HomePage_ls.tableblocklistselectbox_BlockProducer
                                    }
                                >
                                    <img
                                        src={require('../../assets/images/HomePage/Proposal.png')}
                                    />
                                    <Link
                                        className={
                                            HomePage_ls.tableblocklistselectbox_BlockProducer_p
                                        }
                                        to={{
                                            pathname: `/AccountDetail`,
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
                                                  BlockProducer().amount || 0,
                                              )
                                            : 0}{' '}
                                        ERB
                                    </span>
                                </div>
                                <div
                                    className={
                                        HomePage_ls.tableblocklistselectbox_Validator
                                    }
                                >
                                    {Validatorzj(Validator())}
                                </div>
                                <div
                                    className={
                                        HomePage_ls.tableblocklistselectbox_Exchange
                                    }
                                >
                                    {Exchangezj(Exchange())}
                                </div>
                                <div
                                    className={
                                        HomePage_ls.tableblocklistselectbox_Exchangesnft
                                    }
                                >
                                    {Exchangesnftzj(Exchange())}
                                </div>
                            </div>
                        </div>
                    </div>
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
                .height == '276px'
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
            )[0].style.height = '276px';
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
        let data = document.getElementById('homepageinput').value;
        if (data) {
            if (
                Number(data) == data &&
                data.slice(0, 2) != '0x' &&
                data.slice(0, 2) != '0X'
            ) {
                // 区块
                history.push({
                    pathname: '/NullPage',
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
                    pathname: `/AccountDetail`,
                    state: data,
                });
            } else if (
                (data.slice(0, 2) == '0x' || data.slice(0, 2) == '0X') &&
                data.length == 66
            ) {
                //交易hash
                history.push({
                    pathname: `/TradeDetail`,
                    state: data,
                });
            }
        } else {
            message.error('Cannot be empty！');
        }
    }
    return (
        <>
            <div className={HomePage_ls.HomePageBox}>
                <div className={HomePage_ls.titlebox}>
                    <img
                        src={require('../../assets/images/HomePage/titleimg.png')}
                    />
                    <p className={HomePage_ls.titlebox_name}>Search</p>
                    <div
                        className={
                            HomePage_ls.HomePageBox_SearchBox_search_bottomBox
                        }
                        id="HomePageselect"
                    >
                        <input
                            className={
                                HomePage_ls.HomePageBox_SearchBox_search_bottomBox_input
                            }
                            id="homepageinput"
                            autocomplete="off"
                            placeholder="Search by Address / Txn Hash / Block / Token"
                        />
                        <CloseOutlined
                            className={
                                HomePage_ls.HomePageBox_SearchBox_search_bottomBox_button
                            }
                            onClick={() => {
                                document.getElementById('homepageinput').value =
                                    '';
                            }}
                        />
                        <BsSearch
                            className={
                                HomePage_ls.HomePageBox_SearchBox_search_bottomBox_button
                            }
                            onClick={homepageinputclick}
                        />
                    </div>
                    <div className={HomePage_ls.titlebox_databox}>
                        <div className={HomePage_ls.titlebox_databox_d}>
                            <p className={HomePage_ls.titlebox_databox_d_data}>
                                {totaldata.totalPledge
                                    ? Number(
                                          utils.formatEther(
                                              totaldata.totalPledge,
                                          ),
                                      ).toFixed(2)
                                    : 0}
                            </p>
                            <p className={HomePage_ls.titlebox_databox_d_name}>
                                Total Staking
                            </p>
                        </div>
                        <div className={HomePage_ls.titlebox_databox_d}>
                            <p className={HomePage_ls.titlebox_databox_d_data}>
                                {totaldata.totalTransaction || '0'}
                            </p>
                            <p className={HomePage_ls.titlebox_databox_d_name}>
                                Total Transactions
                            </p>
                        </div>
                        <div className={HomePage_ls.titlebox_databox_d2}>
                            <p className={HomePage_ls.titlebox_databox_d_data}>
                                {parseInt(totaldata.rewardSNFTCount) || '0'}
                            </p>
                            <p className={HomePage_ls.titlebox_databox_d_name}>
                                Total SNFT Rewards
                            </p>
                        </div>
                        <div className={HomePage_ls.titlebox_databox_d2}>
                            <p className={HomePage_ls.titlebox_databox_d_data}>
                                {Math.floor(
                                    totaldata.rewardCoinCount * multiple * 100,
                                ) / 100 || '0'}
                            </p>
                            <p className={HomePage_ls.titlebox_databox_d_name}>
                                Total ERB Rewards
                            </p>
                        </div>
                    </div>
                </div>
                {/* 地图 */}
                <div className={HomePage_ls.mapbox} id="pcmap">
                    {window.location.pathname == '/' ? <MapChart /> : ''}

                    <div className={HomePage_ls.mapboxz}>
                        <div className={HomePage_ls.mapboxz_center}>
                            <div className={HomePage_ls.mapboxz_onlinenodes}>
                                <p className={HomePage_ls.mapboxz_d_name}>
                                    Online Nodes
                                </p>
                                <p className={HomePage_ls.mapboxz_d_data}>
                                    {validatoronline.onlineNode4h || 0}
                                </p>
                            </div>
                            <div className={HomePage_ls.mapboxz_d}>
                                <p className={HomePage_ls.mapboxz_d_name}>
                                    Online Validators
                                </p>
                                <p className={HomePage_ls.mapboxz_d_data}>
                                    {validatoronline.count || 0}/
                                    {totaldata.totalValidator || 0}
                                </p>
                                <div
                                    className={
                                        HomePage_ls.HomePageBox_centerBox_leftbox_snftBox_d2_table_progressBox
                                    }
                                    id="homepageProgress"
                                >
                                    <Progress
                                        percent={
                                            validatoronline.count &&
                                            totaldata.totalValidator
                                                ? (
                                                      (validatoronline.count /
                                                          totaldata.totalValidator) *
                                                      100
                                                  ).toFixed(2)
                                                : 0
                                        }
                                        status="active"
                                        strokeColor="#75FBFF"
                                        strokeWidth={5.8}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <Link to={{ pathname: '/TestPage', state: '' }} style={{width:'20px',height:'15px',border:'1px solid red'}}>
                        Go
                        </Link> */}
                    </div>
                </div>
                <div className={HomePage_ls.MarketplacesBox}>
                    <div className={HomePage_ls.MarketplacesBox_center}>
                        <p className={HomePage_ls.MarketplacesBox_center_title}>
                            STAKER INFORMATION
                        </p>
                        <div className={HomePage_ls.MarketplacesBox_databox}>
                            <div
                                className={
                                    HomePage_ls.MarketplacesBox_databox_left
                                }
                            >
                                <p
                                    className={
                                        HomePage_ls.MarketplacesBox_databox_left_name
                                    }
                                >
                                    Staker Number
                                </p>
                                <p
                                    className={
                                        HomePage_ls.MarketplacesBox_databox_left_data
                                    }
                                >
                                    {totaldata.totalStaker || 0}
                                </p>
                            </div>
                            <div
                                className={
                                    HomePage_ls.MarketplacesBox_databox_right
                                }
                            >
                                <div
                                    className={
                                        HomePage_ls.MarketplacesBox_databox_right_cbox
                                    }
                                >
                                    <div
                                        className={
                                            HomePage_ls.MarketplacesBox_databox_right_cboxblock
                                        }
                                    >
                                        <div
                                            className={
                                                HomePage_ls.MarketplacesBox_databox_rightd4
                                            }
                                        >
                                            <p
                                                className={
                                                    HomePage_ls.MarketplacesBox_databox_rightd1_name
                                                }
                                            >
                                                Total Staking ERBs
                                            </p>
                                            <p
                                                className={
                                                    HomePage_ls.MarketplacesBox_databox_rightd1_data
                                                }
                                            >
                                                {totaldata.totalPledge
                                                    ? Number(
                                                          utils.formatEther(
                                                              String(
                                                                  totaldata.totalPledge,
                                                              ),
                                                          ),
                                                      ).toFixed(2)
                                                    : 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={
                                        HomePage_ls.MarketplacesBox_databox_right_cbox
                                    }
                                >
                                    <div
                                        className={
                                            HomePage_ls.MarketplacesBox_databox_right_cboxblock
                                        }
                                    >
                                        <div
                                            className={
                                                HomePage_ls.MarketplacesBox_databox_rightd2
                                            }
                                        >
                                            <p
                                                className={
                                                    HomePage_ls.MarketplacesBox_databox_rightd1_name
                                                }
                                            >
                                                Total SNFT Rewards
                                            </p>
                                            <p
                                                className={
                                                    HomePage_ls.MarketplacesBox_databox_rightd1_data
                                                }
                                            >
                                                {totaldata.rewardSNFTCount || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={
                                        HomePage_ls.MarketplacesBox_databox_right_cbox
                                    }
                                >
                                    <div
                                        className={
                                            HomePage_ls.MarketplacesBox_databox_right_cboxblock
                                        }
                                    >
                                        <div
                                            className={
                                                HomePage_ls.MarketplacesBox_databox_rightd1
                                            }
                                        >
                                            <p
                                                className={
                                                    HomePage_ls.MarketplacesBox_databox_rightd1_name
                                                }
                                            >
                                                Total SNFT Transactions
                                            </p>
                                            <p
                                                className={
                                                    HomePage_ls.MarketplacesBox_databox_rightd1_data
                                                }
                                            >
                                                {totaldata.totalSNFTTx || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={
                                        HomePage_ls.MarketplacesBox_databox_right_cbox
                                    }
                                >
                                    <div
                                        className={
                                            HomePage_ls.MarketplacesBox_databox_right_cboxblock
                                        }
                                    >
                                        <div
                                            className={
                                                HomePage_ls.MarketplacesBox_databox_rightd3
                                            }
                                        >
                                            <p
                                                className={
                                                    HomePage_ls.MarketplacesBox_databox_rightd1_name
                                                }
                                            >
                                                Total SNFT Conversions
                                            </p>
                                            <p
                                                className={
                                                    HomePage_ls.MarketplacesBox_databox_rightd1_data
                                                }
                                            >
                                                {totaldata.totalRecycle || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={HomePage_ls.BlockINFORMATIONbox}>
                    <div className={HomePage_ls.BlockINFORMATIONbox_center}>
                        <p className={HomePage_ls.BlockINFORMATIONbox_leftname}>
                            BLOCK INFORMATION
                        </p>
                        <div
                            className={HomePage_ls.BlockINFORMATIONbox_leftbox}
                        >
                            <div>
                                <img
                                    src={require('../../assets/images/HomePage/icon1.png')}
                                />
                                <p
                                    className={
                                        HomePage_ls.BlockINFORMATIONbox_leftboxname
                                    }
                                >
                                    Block Height
                                </p>
                                <span
                                    className={
                                        HomePage_ls.BlockINFORMATIONbox_leftboxdata
                                    }
                                >
                                    {totaldata.totalBlock - 1 || 0}
                                </span>
                            </div>
                            <div>
                                <img
                                    src={require('../../assets/images/HomePage/icon2.png')}
                                />
                                <p
                                    className={
                                        HomePage_ls.BlockINFORMATIONbox_leftboxname
                                    }
                                >
                                    Block Time
                                </p>
                                <span
                                    className={
                                        HomePage_ls.BlockINFORMATIONbox_leftboxdata
                                    }
                                >
                                    {totaldata.avgBlockTime || 0} ms
                                </span>
                            </div>
                            <div>
                                <img
                                    src={require('../../assets/images/HomePage/icon3.png')}
                                />
                                <p
                                    className={
                                        HomePage_ls.BlockINFORMATIONbox_leftboxname
                                    }
                                >
                                    Total Rewards
                                </p>
                                <span
                                    className={
                                        HomePage_ls.BlockINFORMATIONbox_leftboxdata
                                    }
                                >
                                    {(
                                        Math.floor(
                                            totaldata.rewardCoinCount *
                                                multiple *
                                                100,
                                        ) /
                                            100 +
                                        parseInt(totaldata.rewardSNFTCount) * L0
                                    ).toFixed(2)}{' '}
                                    ERB
                                </span>
                            </div>
                            <div>
                                <img
                                    src={require('../../assets/images/HomePage/icon4.png')}
                                />
                                <p
                                    className={
                                        HomePage_ls.BlockINFORMATIONbox_leftboxname
                                    }
                                >
                                    Number of Blackhole Block
                                </p>
                                <span
                                    className={
                                        HomePage_ls.BlockINFORMATIONbox_leftboxdata
                                    }
                                >
                                    {totaldata.totalBlackHole || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={HomePage_ls.BlockINFORMATIONCURRENTbox}>
                    <div className={HomePage_ls.BlockINFORMATIONbox_right}>
                        <p
                            className={
                                HomePage_ls.BlockINFORMATIONbox_right_name
                            }
                        >
                            CURRENT SNFT TRANSACTION INFORMATION
                        </p>
                        <div
                            className={HomePage_ls.BlockINFORMATIONbox_right_d}
                        >
                            <p
                                className={
                                    HomePage_ls.BlockINFORMATIONbox_right_title
                                }
                            >
                                Time of Current Period
                            </p>
                            <p
                                className={
                                    HomePage_ls.BlockINFORMATIONbox_right_data
                                }
                            >
                                {epochdata.timestamp
                                    ? new Date(
                                          epochdata.timestamp * 1000,
                                      ).getFullYear() +
                                      '/' +
                                      (new Date(
                                          epochdata.timestamp * 1000,
                                      ).getMonth() +
                                          1) +
                                      '/' +
                                      new Date(
                                          epochdata.timestamp * 1000,
                                      ).getDate()
                                    : '0/0/0'}
                            </p>
                        </div>
                        <div
                            className={HomePage_ls.BlockINFORMATIONbox_right_d}
                        >
                            <p
                                className={
                                    HomePage_ls.BlockINFORMATIONbox_right_title
                                }
                            >
                                SNFT Period
                            </p>
                            <p
                                className={
                                    HomePage_ls.BlockINFORMATIONbox_right_data
                                }
                            >
                                {epochdata.id ? stagenumberbs(epochdata.id) : 0}
                            </p>
                        </div>
                        <div
                            className={
                                HomePage_ls.BlockINFORMATIONbox_right_dlong
                            }
                        >
                            <p
                                className={
                                    HomePage_ls.BlockINFORMATIONbox_right_title
                                }
                            >
                                SNFT Creator
                            </p>
                            {epochdata.creator ==
                                '0x0000000000000000000000000000000000000000' ||
                            Object.keys(epochdata).length == 0 ? (
                                <p
                                    className={
                                        HomePage_ls.BlockINFORMATIONbox_right_dataaddress
                                    }
                                    style={{ color: '#ffffff' }}
                                >
                                    Official SNFT
                                </p>
                            ) : (
                                <Link
                                    to={{
                                        pathname: `/AccountDetail`,
                                        state: epochdata.creator,
                                    }}
                                    className={
                                        HomePage_ls.BlockINFORMATIONbox_right_dataaddress
                                    }
                                >
                                    {/* {epochdata.creator ? (epochdata.creator).slice(0, 3) + '...' + (epochdata.creator).slice(38, 42) : ''} Marketplace */}
                                    {epochdata.creator}
                                </Link>
                            )}
                        </div>
                        <div
                            className={
                                HomePage_ls.BlockINFORMATIONbox_rightimgbox
                            }
                        >
                            {/* {homepageimg(epochdata.collections)} */}
                            <img
                                src={nftimage}
                                onError={() => {
                                    setNftimage(imgmr);
                                }}
                                style={{ width: '314px' }}
                            />
                        </div>
                    </div>
                </div>
                <div className={HomePage_ls.Blockrewardbox}>
                    <div className={HomePage_ls.Blockrewardbox_center}>
                        <div className={HomePage_ls.Blockrewardbox_titlebox}>
                            <p className={HomePage_ls.Blockrewardbox_title}>
                                BLOCK LIST
                            </p>
                            <div className={HomePage_ls.Blockrewardbox_namebox}>
                                <p
                                    className={
                                        HomePage_ls.Blockrewardbox_nameboxp
                                    }
                                    style={{ width: '200px' }}
                                >
                                    Block Height
                                </p>
                                <p
                                    className={
                                        HomePage_ls.Blockrewardbox_nameboxp
                                    }
                                    style={{ width: '350px' }}
                                >
                                    Proposer
                                </p>
                                <p
                                    className={
                                        HomePage_ls.Blockrewardbox_nameboxp
                                    }
                                    style={{ width: '150px' }}
                                >
                                    TXN
                                </p>
                                <p
                                    className={
                                        HomePage_ls.Blockrewardbox_nameboxp
                                    }
                                    style={{ width: '200px' }}
                                >
                                    Age
                                </p>
                                <p
                                    className={
                                        HomePage_ls.Blockrewardbox_nameboxtp
                                    }
                                    style={{ width: '200px' }}
                                >
                                    Block Size
                                </p>
                            </div>
                        </div>
                        {tableblocklist(blockdata.blocks)}
                    </div>
                    <div className={HomePage_ls.Blockrewardbox_button_cbox}>
                        <div
                            className={HomePage_ls.Blockrewardbox_button_cblcok}
                        >
                            <Link
                                to={{ pathname: '/BlockChain', state: '' }}
                                className={HomePage_ls.Blockrewardbox_button}
                            >
                                View More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
