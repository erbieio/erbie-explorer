import SNFTApp_ls from './SNFTApp.less';
import { Space, Table, Tag, Pagination, Progress } from 'antd';
import moment from 'moment';
import {
    erbprice,
    total,
    epoch,
    block,
    rewardperson,
    nft,
    snft,
} from '../../api/request_data/block_request';
import { CaretDownOutlined } from '@ant-design/icons';
import {
    Chart,
    Interval,
    Axis,
    Tooltip,
    Coordinate,
    Legend,
    View,
    Annotation,
    getTheme,
} from 'bizcharts';
import { utils } from 'ethers';
import { Link } from 'umi';
import React, { useState, useEffect } from 'react';
import { timestamp, ellipsis } from '../../utils/methods/Methods';
export default function SNFTApp() {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(16);
    //总数
    const [totaldata, setTotaldata] = useState({});
    //snft
    const [snftdata, setSnftdata] = useState({});
    // 全部下拉框显示隐藏
    const [optionborderdis, setOptionborderdis] = useState('none');
    const [magnificationdata, setMagnificationdata] = useState(0);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, data) => (
                <Link
                    to={{
                        pathname: '/SNFTApp/SNFTDetailsApp',
                        state: { snftid: data.address, snftmata: data },
                    }}
                    style={{ color: '#7AA4FF' ,fontFamily:'CustomFontMedium'}}
                >
                    {text}
                </Link>
            ),
            ellipsis: true,
        },
        {
            title: 'Level',
            dataIndex: 'address',
            key: 'address',
            render: (text) => (
                <span>
                    {text.length == 42 ? (
                        <span className={SNFTApp_ls.SNFTBox_tablelevelsnft}>
                            Level 0
                        </span>
                    ) : text.length == 41 ? (
                        <span className={SNFTApp_ls.SNFTBox_tablelevelnft}>
                            Level 1
                        </span>
                    ) : text.length == 40 ? (
                        <span
                            className={SNFTApp_ls.SNFTBox_tablelevelCollection}
                        >
                            Level 2
                        </span>
                    ) : text.length == 39 ? (
                        <span className={SNFTApp_ls.SNFTBox_tablelevelPeriod}>
                            Level 3
                        </span>
                    ) : (
                        ' '
                    )}
                </span>
            ),
            ellipsis: true,
        },
        {
            title: 'Creation Time',
            dataIndex: 'reward_at',
            key: 'reward_at',
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
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
            ellipsis: true,
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetailApp/${text}`, state: text }}
                    style={{ color: '#7AA4FF',fontFamily:'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
            width:'150px'
        },
        {
            title: 'S-NFT Creator',
            key: 'creator',
            dataIndex: 'creator',
            ellipsis: true,
            render: (text, data) =>
                text == '0x0000000000000000000000000000000000000000' ? (
                    'Official S-NFT'
                ) : (
                    <Link
                        to={{
                            pathname: `/ExchangeApp/ExchangeDetailsApp`,
                            state: { exchangeid: text },
                        }}
                        style={{ color: '#7AA4FF',fontFamily:'CustomFontMedium' }}
                    >
                        {ellipsis(text)}
                    </Link>
                ),
                width:'150px'
        },
        {
            title: 'L1',
            key: 'address',
            dataIndex: 'address',
            render: (text, data) => (
                <span>
                    {parseInt(
                        '0x' + text.slice(text.length - 2, text.length - 1),
                    ) + 1}
                </span>
            ),
            ellipsis: true,
        },
        {
            title: 'L2',
            key: 'address',
            dataIndex: 'address',
            render: (text, data) => (
                <span>
                    {parseInt(
                        '0x' + text.slice(text.length - 3, text.length - 2),
                    ) + 1}
                </span>
            ),
            ellipsis: true,
        },
        {
            title: 'L3',
            key: 'address',
            dataIndex: 'address',
            render: (text, data) => (
                <span>
                    {parseInt(
                        '0x' + text.slice(text.length - 4, text.length - 3),
                    )}
                </span>
            ),
            ellipsis: true,
        },
    ];
    const onChange = (data) => {
        setPagenumber(data);
    };
    //snft分页
    let pagedata = {
        collection_id: '',
        owner: '',
        page: pagenumber,
        page_size: pagenumbersize,
    };
    useEffect(() => {
        total_q();
        snft_q(pagedata);
    }, []);
    useEffect(() => {
        snft_q(pagedata);
    }, [pagenumber]);
    //snft查询
    const snft_q = async (item) => {
        const data = await snft(item);
        console.log('snft查询');
        console.log(data);
        if (data) {
            setSnftdata(data);
        }
    };
    const total_q = async () => {
        const data = await total();
        console.log('总数查询');
        console.log(data);
        if (data) {
            setTotaldata(data);
        }
    };
    function SNFTinputnumberonclick(e) {
        let data = document.getElementById('SNFTinputnumber').value;
        if (e.keyCode == 13) {
            if (Number(data) != NaN) {
                setPagenumber(Number(data));
            }
        }
    }
    function optionborderover() {
        setOptionborderdis('block');
    }
    function optionborderout() {
        setOptionborderdis('none');
    }
    function magnificationclick() {
        if (magnificationdata == 0) {
            setMagnificationdata(1);
        } else {
            setMagnificationdata(0);
        }
    }
    return (
        <>
            <div className={SNFTApp_ls.SNFTBox}>
                {/* 头部三块数据 */}
                <div className={SNFTApp_ls.SNFTBox_headerTitle}>
                    <div className={SNFTApp_ls.SNFTBox_headerTitle_d}>
                        <div className={SNFTApp_ls.SNFTBox_headerTitle_d_left}>
                            <p
                                className={
                                    SNFTApp_ls.SNFTBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalSNFTAmount
                                    ? utils.formatEther(
                                          totaldata.totalSNFTAmount,
                                      )
                                    : 0}
                                {/* {totaldata.totalSNFTAmount} */}
                            </p>
                            <p
                                className={
                                    SNFTApp_ls.SNFTBox_headerTitle_d_left_name
                                }
                            >
                                S-NFT Transaction Volume (ERB)
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/SNFT/SNFT1.png')}
                        />
                    </div>
                    <div className={SNFTApp_ls.SNFTBox_headerTitle_d}>
                        <div className={SNFTApp_ls.SNFTBox_headerTitle_d_left}>
                            <p
                                className={
                                    SNFTApp_ls.SNFTBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalSNFTTx || 0}
                            </p>
                            <p
                                className={
                                    SNFTApp_ls.SNFTBox_headerTitle_d_left_name
                                }
                            >
                                Total S-NFT Transactions
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/SNFT/SNFT2.png')}
                        />
                    </div>
                    <div className={SNFTApp_ls.SNFTBox_headerTitle_d}>
                        <div className={SNFTApp_ls.SNFTBox_headerTitle_d_left}>
                            <p
                                className={
                                    SNFTApp_ls.SNFTBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalSNFTCreator || 0}
                            </p>
                            <p
                                className={
                                    SNFTApp_ls.SNFTBox_headerTitle_d_left_name
                                }
                            >
                                Total of S-NFT Creators
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/SNFT/SNFT3.png')}
                        />
                    </div>
                </div>
                <div className={SNFTApp_ls.SNFTBox_center}>
                    <p className={SNFTApp_ls.SNFTBox_center_exchange}>
                        Base Exchange Rate：1 S-NFT L0 = 0.095 ERB
                    </p>
                    <div
                        className={SNFTApp_ls.SNFTBox_magnification}
                        onClick={magnificationclick}
                    >
                        View composite magnification
                        <div
                            className={SNFTApp_ls.SNFTBox_center_titlebox}
                            style={{ opacity: magnificationdata }}
                        >
                            <div className={SNFTApp_ls.SNFTBox_center_title}>
                                <div
                                    className={
                                        SNFTApp_ls.SNFTBox_center_title_left
                                    }
                                >
                                    <p
                                        className={
                                            SNFTApp_ls.SNFTBox_center_title_left_span
                                        }
                                    >
                                        ERB Exchange Rate Increases
                                    </p>
                                    <p
                                        className={
                                            SNFTApp_ls.SNFTBox_center_title_left_span
                                        }
                                        style={{ marginLeft: '15px' }}
                                    >
                                        <span>50%</span> from Level 0 to 1
                                    </p>
                                    <p
                                        className={
                                            SNFTApp_ls.SNFTBox_center_title_left_span
                                        }
                                        style={{ marginLeft: '15px' }}
                                    >
                                        <span>90%</span> from Level 1 to 2
                                    </p>
                                    <p
                                        className={
                                            SNFTApp_ls.SNFTBox_center_title_left_span
                                        }
                                        style={{ marginLeft: '15px' }}
                                    >
                                        <span>140%</span> from Level 2 to 3
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className={SNFTApp_ls.SNFTBoxOverallCollectionStatus}>
                        Overall Collection Status
                    </p>
                    <div style={{ width: '330px' }} id="Progress">
                        <Progress
                            percent={(
                                ((totaldata.totalSNFT % 4096) / 4096) *
                                100
                            ).toFixed(2)||0}
                            status="active"
                            strokeWidth={12}
                            trailColor="#424253"
                            strokeColor={{
                                '0%': '#F065E2',
                                '100%': '#3748FA',
                            }}
                        />
                    </div>
                    <div className={SNFTApp_ls.SNFTBox_center_box}>
                        <img
                            src={require('../../assets/images/SNFTApp/synthesis.png')}
                            className={SNFTApp_ls.SNFTBox_center_boximg}
                        />
                        <p className={SNFTApp_ls.SNFTBox_center_box_text}>
                            <span>
                                S-NFT L0
                                <br />
                                0.095ERB
                            </span>
                            <img
                                src={require('../../assets/images/SNFT/jt.png')}
                            />
                            <span
                                className={
                                    SNFTApp_ls.SNFTBox_center_box_textspan
                                }
                            >
                                Bonus
                                <br />
                                0.76ERB
                            </span>
                            <img
                                src={require('../../assets/images/SNFT/jt.png')}
                            />
                            <span
                                className={
                                    SNFTApp_ls.SNFTBox_center_box_textspan
                                }
                            >
                                Bonus
                                <br />
                                40.0ERB
                            </span>
                            <img
                                src={require('../../assets/images/SNFT/jt.png')}
                            />
                            <span
                                className={
                                    SNFTApp_ls.SNFTBox_center_box_textspan
                                }
                            >
                                Bonus
                                <br />
                                2272ERB
                            </span>
                        </p>
                    </div>
                    <div className={SNFTApp_ls.SNFTBox_center_boxtitle}>
                        <div className={SNFTApp_ls.SNFTBox_center_boxtitle_d1}>
                            16 * L0 will be composed to S-NFT L1
                        </div>
                        <div className={SNFTApp_ls.SNFTBox_center_boxtitle_d2}>
                            16 * L1 will be composed to S-NFT L2
                        </div>
                        <div className={SNFTApp_ls.SNFTBox_center_boxtitle_d3}>
                            16 * L2 will be composed to S-NFT L3
                        </div>
                    </div>
                </div>
                {/* 表格 */}
                <div className={SNFTApp_ls.tableApp}>
                    <div className={SNFTApp_ls.SNFTBox_table} id="SNFTTableApp">
                        <p className={SNFTApp_ls.SNFTBox_table_title}>S-NFT</p>
                        <Table
                            columns={columns}
                            dataSource={snftdata.nfts}
                            pagination={false}
                        />
                        <div
                            className={SNFTApp_ls.SNFTBox_Pagination}
                            id="SNFTBoxPagination"
                        >
                            <Pagination
                                defaultCurrent={1}
                                total={snftdata.total}
                                onChange={onChange}
                                pageSize={pagenumbersize}
                                showSizeChanger={false}
                                current={pagenumber}
                            />
                            <div className={SNFTApp_ls.SNFTBox_Pagination_d}>
                                16/Page
                            </div>
                            <span
                                className={SNFTApp_ls.SNFTBox_Pagination_span1}
                            >
                                To
                            </span>
                            <input
                                id="SNFTinputnumber"
                                className={SNFTApp_ls.SNFTBox_Pagination_input}
                                onKeyDown={SNFTinputnumberonclick}
                            />
                            <span
                                className={SNFTApp_ls.SNFTBox_Pagination_span2}
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
