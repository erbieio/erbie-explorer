import Creator_ls from './Creator.less';
import { Chart, Interval, getTheme, Tooltip as Tooltipbs } from 'bizcharts';
import { Space, Table, Tag, Pagination, Tooltip } from 'antd';
import { Link } from 'umi';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { timestamp, ellipsis } from '../../utils/methods/Methods';
import {
    CaretUpOutlined,
    CaretDownOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { utils } from 'ethers';
import {
    creator,
    total,
    creatorHistogram,
    epoch,
} from '../../api/request_data/block_request';
export default function Creator() {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    //Stake Value
    const [stakevaluecolor, setStakevaluecolor] = useState(0);
    //Total Collections
    const [totalcollectionscolor, setTotalcollectionscolor] = useState(0);
    // creator数据
    const [creatordata, setCreatordata] = useState({});
    //总数
    const [totaldata, setTotaldata] = useState({});
    //柱状图
    const [histogramdata, setHistogramdata] = useState([]);
    //系统NFT周期
    const [epochdata, setEpochdata] = useState({});
    const [Orderdata, setOrderdata] = useState('');
    const onChange = (data) => {
        setPagenumber(data);
    };
    const data = [
        { year: '23', sales: 12323 },
        { year: '24', sales: 51232 },
        { year: '25', sales: 6131 },
        { year: '26', sales: 36235 },
        { year: '27', sales: 41238 },
        { year: '28', sales: 3238 },
        { year: '29', sales: 6238 },
    ];
    //creator分页
    let pagedata = {
        page: pagenumber,
        page_size: pagenumbersize,
        order: Orderdata,
    };
    //creator查询
    const creator_q = async (item) => {
        const data = await creator(item);
        console.log(data);
        if (data) {
            setCreatordata(data);
        }
    };
    //总数查询
    const total_q = async () => {
        const data = await total();
        console.log(data);
        if (data) {
            setTotaldata(data);
        }
    };
    //系统NFT周期查询
    const epoch_q = async () => {
        const data = await epoch();
        console.log(data);
        if (data) {
            setEpochdata(data);
        }
    };
    function getBit(value) {
        const reg = /([0-9]+\.[0-9]{2})[0-9]*/;
        let str = value.toString();
        str = str.replace(reg, '$1');
        console.log(str);
        return str;
    }
    //柱状图查询
    const creatorHistogram_q = async () => {
        const data = await creatorHistogram();
        console.log(data);
        if (data) {
            let text = [];
            for (let i = 0; i < 7; i++) {
                if (data[i]) {
                    text.push({
                        data:
                            Number(getBit(utils.formatEther(data[i].profit))) +
                            Number(getBit(utils.formatEther(data[i].reward))),
                        index: String(i + 1),
                    });
                } else {
                    text.push({
                        data: 0,
                        index: String(i + 1),
                    });
                }
            }
            console.log(text);
            setHistogramdata(text);
        }
    };
    useEffect(() => {
        creator_q(pagedata);
        total_q();
        creatorHistogram_q();
        epoch_q();
    }, []);
    useEffect(() => {
        creator_q(pagedata);
    }, [pagenumber]);
    useEffect(() => {
        creator_q(pagedata);
    }, [Orderdata]);
    function Creatorinputnumberonclick(e) {
        let data = document.getElementById('Creatorinputnumber').value;
        if (e.keyCode == 13) {
            if (Number(data) != NaN) {
                setPagenumber(Number(data));
            }
        }
    }
    const columns = [
        {
            title: 'Creator Address',
            dataIndex: 'address',
            key: 'address',
            render: (text) => (
                <Link
                    to={{ pathname: `/AccountDetail/${text}`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
        },
        {
            title: () => (
                <div className={Creator_ls.tablexbox2}>
                    <span>Period</span>
                    <Tooltip
                        placement="bottom"
                        title={() => {
                            return (
                                <div className={Creator_ls.tablexbox2_Period}>
                                    <p>
                                        S-NFT Grades Are LO, L1, L2, And L3 From
                                        The Lowest To The Highest. YouCan
                                        Synthesize It To Higher Levels For
                                        Higher Revenue.
                                    </p>
                                    <p>The Rules Are As Below:</p>
                                    <p>
                                        16 Specifc S-NFT LO Synthesizes A Unique
                                        S-NFT L1.
                                    </p>
                                    <p>
                                        16 Specifc S-NFT L1 Synthesizes A Unique
                                        S-NFT L2.
                                    </p>
                                    <p>
                                        16 Specifc S-NFT L2 Synthesizes A Unique
                                        S-NFT L3.{' '}
                                    </p>
                                    <p>
                                        The Blue Number Indicates The S-NFT LO
                                        Position Number In An S-NFT L1.
                                    </p>
                                    <p>
                                        The Green Number Indicates The Position
                                        Number Of S-NFT L1In An S-NFT L2.
                                    </p>
                                    <p>
                                        The Yellow Number Indicates The S-NFT L2
                                        Position Number In An S-NFT L3.
                                    </p>
                                    <p>
                                        The Red Number Refers To The Position
                                        Number Of An S-NFT L3.
                                    </p>
                                </div>
                            );
                        }}
                        color="#4D4D55"
                    >
                        <span className={Creator_ls.tablexbox2_icon}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip>
                </div>
            ),
            dataIndex: 'lastEpoch',
            key: 'lastEpoch',
            render: (text) => (
                <span className={Creator_ls.table_redblock}>
                    {parseInt('0x' + text.slice(4, text.length)) + 1}
                </span>
            ),
            width: '100px',
        },
        {
            title: () => (
                <div className={Creator_ls.tablexbox2}>
                    <span>Block Height</span>
                    <Tooltip
                        title={() => {
                            return (
                                <div className={Creator_ls.tablexbox2_Period}>
                                    <p>
                                        The lastest block height that user been
                                        CreatorEvery creators' block height is
                                        different.
                                    </p>
                                </div>
                            );
                        }}
                        color="#4D4D55"
                    >
                        <span className={Creator_ls.tablexbox2_icon}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip>
                </div>
            ),
            dataIndex: 'lastNumber',
            key: 'lastNumber',
            render: (text) => <span>{text}</span>,
        },
        {
            title: () => (
                <div className={Creator_ls.tablexbox}>
                    TXN Time
                    {stakevaluecolor == 0 ? (
                        <div className={Creator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : stakevaluecolor == 1 ? (
                        <div className={Creator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Creator_ls.tablex}>
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
            dataIndex: 'lastTime',
            key: 'lastTime',
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
            title: () => (
                <div className={Creator_ls.tablexbox2}>
                    <span>Times</span>
                    <Tooltip
                        title={() => {
                            return (
                                <div className={Creator_ls.tablexbox2_Period}>
                                    <p>
                                        The number of times user been creator.
                                    </p>
                                </div>
                            );
                        }}
                        color="#4D4D55"
                    >
                        <span className={Creator_ls.tablexbox2_icon}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip>
                </div>
            ),
            dataIndex: 'count',
            key: 'count',
            render: (text) => <span>{text}</span>,
            width: '100px',
        },
        {
            title: () => (
                <div className={Creator_ls.tablexbox2}>
                    <span>Total direct rewards</span>
                    <Tooltip
                        title={() => {
                            return (
                                <div className={Creator_ls.tablexbox2_Period}>
                                    <p>
                                        The direct rewards creator got by being
                                        creator.
                                    </p>
                                </div>
                            );
                        }}
                        color="#4D4D55"
                    >
                        <span className={Creator_ls.tablexbox2_icon}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip>
                </div>
            ),
            dataIndex: 'reward',
            key: 'reward',
            render: (text, data) => (
                <span>
                    {text ? Number(utils.formatEther(text)).toFixed(4) : 0}{' '}
                    {data.address ==
                    '0x0000000000000000000000000000000000000000'
                        ? '(Burned)'
                        : ''}
                </span>
            ),
            width: '190px',
            ellipsis: true,
        },
        {
            title: () => (
                <div className={Creator_ls.tablexbox}>
                    Period created times
                    {totalcollectionscolor == 0 ? (
                        <div className={Creator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                            />
                        </div>
                    ) : totalcollectionscolor == 1 ? (
                        <div className={Creator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={Creator_ls.tablex}>
                            <CaretUpOutlined
                                onClick={TotalCollections.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={TotalCollections.bind(this, 2)}
                                style={{ color: '#7AA4FF' }}
                            />
                        </div>
                    )}
                </div>
            ),
            dataIndex: 'count',
            key: 'count',
            render: (text) => <span>{text}</span>,
            width: '200px',
        },
        {
            title: () => (
                <div className={Creator_ls.tablexbox2}>
                    <span>Total royalty profits</span>
                    <Tooltip
                        title={() => {
                            return (
                                <div className={Creator_ls.tablexbox2_Period}>
                                    <p>
                                        Creators will get 10% oftotal
                                        transaction amount as royalty.
                                    </p>
                                </div>
                            );
                        }}
                        color="#4D4D55"
                    >
                        <span className={Creator_ls.tablexbox2_icon}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip>
                </div>
            ),
            dataIndex: 'profit',
            key: 'profit',
            render: (text, data) => (
                <span>
                    {text ? Number(utils.formatEther(text)).toFixed(2) : 0}{' '}
                    {data.address ==
                    '0x0000000000000000000000000000000000000000'
                        ? '(Burned)'
                        : ''}
                </span>
            ),
            width: '190px',
            ellipsis: true,
        },
    ];
    //Stake Value 排序
    function StakeValue(text) {
        setTotalcollectionscolor(0);
        if (text == 1) {
            if (stakevaluecolor == 1) {
                setStakevaluecolor(0);
                setOrderdata('');
            } else {
                setStakevaluecolor(1);
                setOrderdata('last_time ASC');
            }
        } else {
            if (stakevaluecolor == 2) {
                setStakevaluecolor(0);
                setOrderdata('');
            } else {
                setStakevaluecolor(2);
                setOrderdata('last_time DESC');
            }
        }
    }
    //Total Collections 排序
    function TotalCollections(text) {
        setStakevaluecolor(0);
        if (text == 1) {
            if (totalcollectionscolor == 1) {
                setTotalcollectionscolor(0);
                setOrderdata('');
            } else {
                setTotalcollectionscolor(1);
                setOrderdata('count ASC');
            }
        } else {
            if (totalcollectionscolor == 2) {
                setTotalcollectionscolor(0);
                setOrderdata('');
            } else {
                setTotalcollectionscolor(2);
                setOrderdata('count DESC');
            }
        }
    }
    return (
        <>
            <div className={Creator_ls.CreatorBox}>
                <div className={Creator_ls.CreatorBox_center}>
                    <div className={Creator_ls.CreatorBox_titlebox}>
                        <div className={Creator_ls.CreatorBox_titlebox_left}>
                            <div
                                className={
                                    Creator_ls.CreatorBox_titlebox_left_1
                                }
                            >
                                <div>
                                    <p>{totaldata.totalCreator}</p>
                                    <span>Total amount of creators</span>
                                </div>
                                <img
                                    src={require('../../assets/images/Creator/Slice 6.png')}
                                />
                            </div>
                            <div
                                className={
                                    Creator_ls.CreatorBox_titlebox_left_2
                                }
                            >
                                <p>
                                    {epochdata.weightAmount &&
                                    epochdata.weightValue
                                        ? Number(
                                              epochdata.weightAmount *
                                                  utils.formatEther(
                                                      epochdata.weightValue,
                                                  ),
                                          ).toFixed(2)
                                        : 0}
                                </p>
                                <span>Creator weight of current period</span>
                                <img
                                    src={require('../../assets/images/Creator/Slice 834.png')}
                                />
                            </div>
                            <div
                                className={
                                    Creator_ls.CreatorBox_titlebox_left_3
                                }
                            >
                                <div>
                                    <p>{totaldata.totalEpoch}</p>
                                    <span>Total periods</span>
                                </div>
                                <img
                                    src={require('../../assets/images/Creator/Slice 8.png')}
                                />
                            </div>
                        </div>
                        <div className={Creator_ls.CreatorBox_titlebox_right}>
                            <p
                                className={
                                    Creator_ls.CreatorBox_titlebox_right_title
                                }
                            >
                                {totaldata.totalProfit
                                    ? Number(
                                          utils.formatEther(
                                              totaldata.totalProfit,
                                          ),
                                      ).toFixed(2)
                                    : 0}{' '}
                                ERB
                            </p>
                            <p
                                className={
                                    Creator_ls.CreatorBox_titlebox_right_titletext
                                }
                            >
                                Total profits of creators
                            </p>
                            <div
                                className={
                                    Creator_ls.CreatorBox_titlebox_right_block
                                }
                            >
                                <Chart
                                    height={220}
                                    width={544}
                                    autoFit={true}
                                    animate={false}
                                    data={histogramdata}
                                >
                                    <Interval
                                        position="index*data"
                                        color="#FD4BA5"
                                    />
                                    <Tooltipbs shared />
                                </Chart>
                            </div>
                        </div>
                    </div>
                    {/* 表格 */}
                    <div
                        className={Creator_ls.CreatorBox_table}
                        id="CreatorTable"
                    >
                        <p className={Creator_ls.CreatorBox_table_title}>
                            CREATOR INFORMATION
                        </p>
                        <Table
                            columns={columns}
                            dataSource={creatordata.creators}
                            pagination={false}
                        />
                        <div
                            className={Creator_ls.CreatorBox_Pagination}
                            id="CreatorBoxPagination"
                        >
                            <Pagination
                                defaultCurrent={1}
                                total={creatordata.total}
                                onChange={onChange}
                                showSizeChanger={false}
                                current={pagenumber}
                            />
                            <div className={Creator_ls.CreatorBox_Pagination_d}>
                                10/Page
                            </div>
                            <span
                                className={
                                    Creator_ls.CreatorBox_Pagination_span1
                                }
                            >
                                To
                            </span>
                            <input
                                id="Creatorinputnumber"
                                className={
                                    Creator_ls.CreatorBox_Pagination_input
                                }
                                onKeyDown={Creatorinputnumberonclick}
                            />
                            <span
                                className={
                                    Creator_ls.CreatorBox_Pagination_span2
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
