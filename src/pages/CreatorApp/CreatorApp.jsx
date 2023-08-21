import CreatorApp_ls from './CreatorApp.less';
import { Chart, Interval, getTheme } from 'bizcharts';
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
export default function CreatorApp() {
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
    //creator分页
    let pagedata = {
        page: pagenumber,
        page_size: pagenumbersize,
        order: Orderdata,
    };
    //creator查询
    const creator_q = async (item) => {
        const data = await creator(item);
        //console.log(data);
        if (data) {
            setCreatordata(data);
        }
    };
    //总数查询
    const total_q = async () => {
        const data = await total();
        //console.log(data);
        if (data) {
            setTotaldata(data);
        }
    };
    //系统NFT周期查询
    const epoch_q = async () => {
        const data = await epoch();
        //console.log(data);
        if (data) {
            setEpochdata(data);
        }
    };
    function getBit(value) {
        const reg = /([0-9]+\.[0-9]{2})[0-9]*/;
        let str = value.toString();
        str = str.replace(reg, '$1');
        //console.log(str);
        return str;
    }
    //柱状图查询
    const creatorHistogram_q = async () => {
        const data = await creatorHistogram();
        //console.log(data);
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
            //console.log(text);
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
                    to={{ pathname: `/AccountDetailApp`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
        },
        {
            title: () => (
                <div className={CreatorApp_ls.tablexbox2}>
                    <span>Period</span>
                    <Tooltip
                        placement="bottom"
                        title={() => {
                            return (
                                <div
                                    className={CreatorApp_ls.tablexbox2_Period}
                                >
                                    <p>
                                        SNFT Grades Are LO, L1, L2, And L3 From
                                        The Lowest To The Highest. YouCan
                                        Synthesize It To Higher Levels For
                                        Higher Revenue.
                                    </p>
                                    <p>The Rules Are As Below:</p>
                                    <p>
                                        16 Specifc SNFT LO Synthesizes A Unique
                                        SNFT L1.
                                    </p>
                                    <p>
                                        16 Specifc SNFT L1 Synthesizes A Unique
                                        SNFT L2.
                                    </p>
                                    <p>
                                        16 Specifc SNFT L2 Synthesizes A Unique
                                        SNFT L3.{' '}
                                    </p>
                                    <p>
                                        The Blue Number Indicates The SNFT LO
                                        Position Number In An SNFT L1.
                                    </p>
                                    <p>
                                        The Green Number Indicates The Position
                                        Number Of SNFT L1In An SNFT L2.
                                    </p>
                                    <p>
                                        The Yellow Number Indicates The SNFT L2
                                        Position Number In An SNFT L3.
                                    </p>
                                    <p>
                                        The Red Number Refers To The Position
                                        Number Of An SNFT L3.
                                    </p>
                                </div>
                            );
                        }}
                        color="#4D4D55"
                    >
                        <span className={CreatorApp_ls.tablexbox2_icon}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip>
                </div>
            ),
            dataIndex: 'lastEpoch',
            key: 'lastEpoch',
            render: (text) => (
                <span className={CreatorApp_ls.table_redblock}>
                    {parseInt('0x' + text.slice(4, text.length))}
                </span>
            ),
            width: '100px',
        },
        {
            title: () => (
                <div className={CreatorApp_ls.tablexbox2}>
                    <span>Block Height</span>
                    <Tooltip
                        title={() => {
                            return (
                                <div
                                    className={CreatorApp_ls.tablexbox2_Period}
                                >
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
                        <span className={CreatorApp_ls.tablexbox2_icon}>
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
                <div className={CreatorApp_ls.tablexbox}>
                    TXN Time
                    {stakevaluecolor == 0 ? (
                        <div className={CreatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : stakevaluecolor == 1 ? (
                        <div className={CreatorApp_ls.tablex}>
                            <CaretUpOutlined
                                onClick={StakeValue.bind(this, 1)}
                                style={{ color: '#7AA4FF' }}
                            />
                            <CaretDownOutlined
                                onClick={StakeValue.bind(this, 2)}
                            />
                        </div>
                    ) : (
                        <div className={CreatorApp_ls.tablex}>
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
                <div className={CreatorApp_ls.tablexbox2}>
                    <span>Number of elected</span>
                    <Tooltip
                        title={() => {
                            return (
                                <div
                                    className={CreatorApp_ls.tablexbox2_Period}
                                >
                                    <p>
                                        The number of times user been creator.
                                    </p>
                                </div>
                            );
                        }}
                        color="#4D4D55"
                    >
                        <span className={CreatorApp_ls.tablexbox2_icon}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip>
                </div>
            ),
            dataIndex: 'count',
            key: 'count',
            render: (text) => <span>{text}</span>,
            width: '200px',
        },
        {
            title: () => (
                <div className={CreatorApp_ls.tablexbox2}>
                    <span>Total royalty profits</span>
                    <Tooltip
                        title={() => {
                            return (
                                <div
                                    className={CreatorApp_ls.tablexbox2_Period}
                                >
                                    <p>
                                        Creators will get 10% oftotal
                                        transaction amount as royalty.
                                    </p>
                                </div>
                            );
                        }}
                        color="#4D4D55"
                    >
                        <span className={CreatorApp_ls.tablexbox2_icon}>
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
    return (
        <>
            <div className={CreatorApp_ls.CreatorBox}>
                <div className={CreatorApp_ls.CreatorBox_center}>
                    <div className={CreatorApp_ls.CreatorBox_titlebox}>
                        <div className={CreatorApp_ls.CreatorBox_titlebox_left}>
                            <div
                                className={
                                    CreatorApp_ls.CreatorBox_titlebox_left_1
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
                                    CreatorApp_ls.CreatorBox_titlebox_left_1
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
                            <div
                                className={
                                    CreatorApp_ls.CreatorBox_titlebox_left_2
                                }
                            >
                                <div>
                                    <p>
                                        {totaldata.totalProfit
                                            ? Number(
                                                  utils.formatEther(
                                                      totaldata.totalProfit,
                                                  ),
                                              ).toFixed(2)
                                            : 0}
                                    </p>
                                    <span>Total profits</span>
                                </div>
                                <img
                                    src={require('../../assets/images/CreatorApp/Slice 834.png')}
                                />
                            </div>
                        </div>
                        <div
                            className={
                                CreatorApp_ls.CreatorBox_titlebox_right_titlebox
                            }
                        >
                            <p
                                className={
                                    CreatorApp_ls.CreatorBox_titlebox_right_title
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
                                    CreatorApp_ls.CreatorBox_titlebox_right_title
                                }
                            >
                                Total profits of creators
                            </p>
                            <div
                                className={
                                    CreatorApp_ls.CreatorBox_titlebox_right_block
                                }
                            >
                                <Chart
                                    width={320}
                                    height={150}
                                    autoFit
                                    animate={false}
                                    data={histogramdata}
                                >
                                    <Interval
                                        position="index*data"
                                        color="#FD4BA5"
                                    />
                                    {/* <Tooltip shared /> */}
                                </Chart>
                            </div>
                        </div>
                    </div>
                    {/* 表格 */}
                    <div className={CreatorApp_ls.tablebox}>
                        <div
                            className={CreatorApp_ls.CreatorBox_table}
                            id="CreatorTableApp"
                        >
                            <p className={CreatorApp_ls.CreatorBox_table_title}>
                                CREATOR INFORMATION
                            </p>
                            <Table
                                columns={columns}
                                dataSource={creatordata.creators}
                                pagination={false}
                            />
                            <div
                                className={CreatorApp_ls.CreatorBox_Pagination}
                                id="CreatorBoxPagination"
                            >
                                <Pagination
                                    defaultCurrent={1}
                                    total={creatordata.total}
                                    onChange={onChange}
                                    showSizeChanger={false}
                                    current={pagenumber}
                                />
                                <div
                                    className={
                                        CreatorApp_ls.CreatorBox_Pagination_d
                                    }
                                >
                                    10/Page
                                </div>
                                <span
                                    className={
                                        CreatorApp_ls.CreatorBox_Pagination_span1
                                    }
                                >
                                    To
                                </span>
                                <input
                                    id="Creatorinputnumber"
                                    className={
                                        CreatorApp_ls.CreatorBox_Pagination_input
                                    }
                                    onKeyDown={Creatorinputnumberonclick}
                                />
                                <span
                                    className={
                                        CreatorApp_ls.CreatorBox_Pagination_span2
                                    }
                                >
                                    Page
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
