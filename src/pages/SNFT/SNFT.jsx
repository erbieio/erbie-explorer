import SNFT_ls from './SNFT.less';
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
export default function SNFT() {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(16);
    //总数
    const [totaldata, setTotaldata] = useState({});
    //snft
    const [snftdata, setSnftdata] = useState({});
    // 全部下拉框显示隐藏
    const [optionborderdis, setOptionborderdis] = useState('none');
    let L0 = 0.03;
    let L1 = 0.143;
    let L2 = 0.271;
    let L3 = 0.65;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, data) => (
                <Link
                    to={{
                        pathname: '/SNFT/SNFTDetails',
                        state: { snftid: data.address, snftmata: data },
                    }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {text}
                </Link>
            ),
            ellipsis: true,
            width: '120px',
        },
        {
            title: 'Level',
            dataIndex: 'address',
            key: 'address',
            render: (text) => (
                <span>
                    {text.length == 42 ? (
                        <span className={SNFT_ls.SNFTBox_tablelevelsnft}>
                            Level 0
                        </span>
                    ) : text.length == 41 ? (
                        <span className={SNFT_ls.SNFTBox_tablelevelnft}>
                            Level 1
                        </span>
                    ) : text.length == 40 ? (
                        <span className={SNFT_ls.SNFTBox_tablelevelCollection}>
                            Level 2
                        </span>
                    ) : text.length == 39 ? (
                        <span className={SNFT_ls.SNFTBox_tablelevelPeriod}>
                            Level 3
                        </span>
                    ) : (
                        ' '
                    )}
                </span>
            ),
            ellipsis: true,
            width: '160px',
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
            width: '250px',
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
            ellipsis: true,
            width: '250px',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetail/${text}`, state: text }}
                    style={{ color: '#7AA4FF', fontFamily: 'CustomFontMedium' }}
                >
                    {ellipsis(text)}
                </Link>
            ),
        },
        {
            title: 'S-NFT Creator',
            key: 'creator',
            dataIndex: 'creator',
            ellipsis: true,
            width: '250px',
            render: (text, data) =>
                text == '0x0000000000000000000000000000000000000000' ? (
                    'Official S-NFT'
                ) : (
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
                        {text}
                    </Link>
                ),
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
                <span>{parseInt('0x' + text.slice(4, text.length - 3))}</span>
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

    return (
        <>
            <div className={SNFT_ls.SNFTBox}>
                {/* 头部三块数据 */}
                <div className={SNFT_ls.SNFTBox_headerTitle}>
                    <div className={SNFT_ls.SNFTBox_headerTitle_d}>
                        <div className={SNFT_ls.SNFTBox_headerTitle_d_left}>
                            <p
                                className={
                                    SNFT_ls.SNFTBox_headerTitle_d_left_data
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
                                    SNFT_ls.SNFTBox_headerTitle_d_left_name
                                }
                            >
                                S-NFT Transaction Volume (ERB)
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/SNFT/SNFT1.png')}
                        />
                    </div>
                    <div className={SNFT_ls.SNFTBox_headerTitle_d}>
                        <div className={SNFT_ls.SNFTBox_headerTitle_d_left}>
                            <p
                                className={
                                    SNFT_ls.SNFTBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalSNFTTx || 0}
                            </p>
                            <p
                                className={
                                    SNFT_ls.SNFTBox_headerTitle_d_left_name
                                }
                            >
                                Total S-NFT Transactions
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/SNFT/SNFT2.png')}
                        />
                    </div>
                    <div className={SNFT_ls.SNFTBox_headerTitle_d}>
                        <div className={SNFT_ls.SNFTBox_headerTitle_d_left}>
                            <p
                                className={
                                    SNFT_ls.SNFTBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalSNFTCreator || 0}
                            </p>
                            <p
                                className={
                                    SNFT_ls.SNFTBox_headerTitle_d_left_name
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
                <div className={SNFT_ls.SNFTBox_center}>
                    <p className={SNFT_ls.SNFTBox_center_exchange}>
                        Base Exchange Rate：1 S-NFT L0 = 0.03 ERB
                    </p>
                    <div className={SNFT_ls.SNFTBox_center_title}>
                        <div className={SNFT_ls.SNFTBox_center_title_left}>
                            <span
                                className={
                                    SNFT_ls.SNFTBox_center_title_left_span
                                }
                            >
                                ERB Exchange Rate Increases{' '}
                                <span>
                                    {(((0.143 - 0.03) / 0.03) * 100).toFixed(2)}
                                    %
                                </span>{' '}
                                from Level 0 to 1
                            </span>
                            <span
                                className={
                                    SNFT_ls.SNFTBox_center_title_left_span
                                }
                            >
                                <span>903%</span> from Level 0 to 2
                            </span>
                            <span
                                className={
                                    SNFT_ls.SNFTBox_center_title_left_span
                                }
                            >
                                <span>2166%</span> from Level 0 to 3
                            </span>
                        </div>
                    </div>
                    <p className={SNFT_ls.SNFTBoxOverallCollectionStatus}>
                        Overall Collection Status
                    </p>
                    <div style={{ width: '800px' }} id="Progress">
                        <Progress
                            percent={
                                totaldata.totalSNFT
                                    ? (
                                          ((totaldata.totalSNFT % 4096) /
                                              4096) *
                                          100
                                      ).toFixed(2)
                                    : 0
                            }
                            status="active"
                            strokeWidth={12}
                            trailColor="#424253"
                            strokeColor={{
                                '0%': '#F065E2',
                                '100%': '#3748FA',
                            }}
                        />
                    </div>
                    <div className={SNFT_ls.SNFTBox_center_box}>
                        <img
                            src={require('../../assets/images/SNFT/synthesis.png')}
                        />
                        <p className={SNFT_ls.SNFTBox_center_box_text}>
                            <span>S-NFT L0：{L0}ERB</span>
                            <svg
                                width="69px"
                                height="62px"
                                viewBox="0 0 69 62"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xlink="http://www.w3.org/1999/xlink"
                            >
                                <title>箭头3</title>
                                <defs>
                                    <radialGradient
                                        cx="93.2197335%"
                                        cy="0%"
                                        fx="93.2197335%"
                                        fy="0%"
                                        r="142.986012%"
                                        gradientTransform="translate(0.932197,0.000000),scale(1.000000,0.622711),rotate(103.383208),translate(-0.932197,-0.000000)"
                                        id="radialGradient-1"
                                    >
                                        <stop
                                            stop-color="#FDF132"
                                            offset="0%"
                                        ></stop>
                                        <stop
                                            stop-color="#F62380"
                                            offset="100%"
                                        ></stop>
                                    </radialGradient>
                                    <polygon
                                        id="path-2"
                                        points="8.82738146e-18 2.46558931e-18 9.09698997 14.1866667 8.82738146e-18 28 17.4358974 14.1866667"
                                    ></polygon>
                                    <filter
                                        x="-132.0%"
                                        y="-85.5%"
                                        width="333.5%"
                                        height="270.5%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-3"
                                    >
                                        <feMorphology
                                            radius="1"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="shadowSpreadOuter1"
                                        ></feMorphology>
                                        <feOffset
                                            dx="0"
                                            dy="0"
                                            in="shadowSpreadOuter1"
                                            result="shadowOffsetOuter1"
                                        ></feOffset>
                                        <feGaussianBlur
                                            stdDeviation="4.5"
                                            in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"
                                        ></feGaussianBlur>
                                        <feColorMatrix
                                            values="0 0 0 0 0.996078431   0 0 0 0 0.309803922   0 0 0 0 0.654901961  0 0 0 1 0"
                                            type="matrix"
                                            in="shadowBlurOuter1"
                                        ></feColorMatrix>
                                    </filter>
                                    <radialGradient
                                        cx="93.2197335%"
                                        cy="0%"
                                        fx="93.2197335%"
                                        fy="0%"
                                        r="152.525749%"
                                        gradientTransform="translate(0.932197,0.000000),scale(1.000000,0.581771),rotate(102.532064),translate(-0.932197,-0.000000)"
                                        id="radialGradient-4"
                                    >
                                        <stop
                                            stop-color="#FDF132"
                                            offset="0%"
                                        ></stop>
                                        <stop
                                            stop-color="#F62380"
                                            offset="100%"
                                        ></stop>
                                    </radialGradient>
                                    <polygon
                                        id="path-5"
                                        points="19.4871795 5.18518519 24.8383501 14.1175309 19.4871795 22.8148148 29.7435897 14.1175309"
                                    ></polygon>
                                    <filter
                                        x="-198.5%"
                                        y="-124.0%"
                                        width="446.2%"
                                        height="347.3%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-6"
                                    >
                                        <feGaussianBlur
                                            stdDeviation="1.02564103 0"
                                            in="SourceGraphic"
                                        ></feGaussianBlur>
                                    </filter>
                                    <filter
                                        x="-252.1%"
                                        y="-155.2%"
                                        width="553.4%"
                                        height="409.7%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-7"
                                    >
                                        <feMorphology
                                            radius="1"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="shadowSpreadOuter1"
                                        ></feMorphology>
                                        <feOffset
                                            dx="0"
                                            dy="0"
                                            in="shadowSpreadOuter1"
                                            result="shadowOffsetOuter1"
                                        ></feOffset>
                                        <feGaussianBlur
                                            stdDeviation="4.5"
                                            in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"
                                        ></feGaussianBlur>
                                        <feColorMatrix
                                            values="0 0 0 0 0.996078431   0 0 0 0 0.309803922   0 0 0 0 0.654901961  0 0 0 1 0"
                                            type="matrix"
                                            in="shadowBlurOuter1"
                                        ></feColorMatrix>
                                    </filter>
                                    <radialGradient
                                        cx="93.2197335%"
                                        cy="0%"
                                        fx="93.2197335%"
                                        fy="0%"
                                        r="143.988621%"
                                        gradientTransform="translate(0.932197,0.000000),scale(1.000000,0.618132),rotate(103.288305),translate(-0.932197,-0.000000)"
                                        id="radialGradient-8"
                                    >
                                        <stop
                                            stop-color="#FDF132"
                                            offset="0%"
                                        ></stop>
                                        <stop
                                            stop-color="#F62380"
                                            offset="100%"
                                        ></stop>
                                    </radialGradient>
                                    <polygon
                                        id="path-9"
                                        points="34.8717949 10.3703704 37.5473802 14.5738272 34.8717949 18.6666667 40 14.5738272"
                                    ></polygon>
                                    <filter
                                        x="-461.1%"
                                        y="-296.8%"
                                        width="918.6%"
                                        height="692.0%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-10"
                                    >
                                        <feGaussianBlur
                                            stdDeviation="2.05128205 0"
                                            in="SourceGraphic"
                                        ></feGaussianBlur>
                                    </filter>
                                    <filter
                                        x="-568.4%"
                                        y="-363.1%"
                                        width="1133.1%"
                                        height="824.6%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-11"
                                    >
                                        <feMorphology
                                            radius="1"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="shadowSpreadOuter1"
                                        ></feMorphology>
                                        <feOffset
                                            dx="0"
                                            dy="0"
                                            in="shadowSpreadOuter1"
                                            result="shadowOffsetOuter1"
                                        ></feOffset>
                                        <feGaussianBlur
                                            stdDeviation="4.5"
                                            in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"
                                        ></feGaussianBlur>
                                        <feColorMatrix
                                            values="0 0 0 0 0.996078431   0 0 0 0 0.309803922   0 0 0 0 0.654901961  0 0 0 1 0"
                                            type="matrix"
                                            in="shadowBlurOuter1"
                                        ></feColorMatrix>
                                    </filter>
                                </defs>
                                <g
                                    id="英文版"
                                    stroke="none"
                                    stroke-width="1"
                                    fill="none"
                                    fill-rule="evenodd"
                                >
                                    <g
                                        id="SNFT"
                                        transform="translate(-1041.000000, -800.000000)"
                                    >
                                        <g
                                            id="编组-3"
                                            transform="translate(100.000000, 573.000000)"
                                        >
                                            <g
                                                id="编组"
                                                transform="translate(19.500000, 241.000000)"
                                            >
                                                <g transform="translate(937.500000, 3.000000)">
                                                    <g id="路径-11">
                                                        <use
                                                            fill="black"
                                                            fill-opacity="1"
                                                            filter="url(#filter-3)"
                                                            href="#path-2"
                                                        ></use>
                                                        <use
                                                            fill="url(#radialGradient-1)"
                                                            fill-rule="evenodd"
                                                            href="#path-2"
                                                        ></use>
                                                    </g>
                                                    <g
                                                        id="路径-11备份"
                                                        filter="url(#filter-6)"
                                                    >
                                                        <use
                                                            fill="black"
                                                            fill-opacity="1"
                                                            filter="url(#filter-7)"
                                                            href="#path-5"
                                                        ></use>
                                                        <use
                                                            fill="url(#radialGradient-4)"
                                                            fill-rule="evenodd"
                                                            href="#path-5"
                                                        ></use>
                                                    </g>
                                                    <g
                                                        id="路径-11备份-2"
                                                        filter="url(#filter-10)"
                                                    >
                                                        <use
                                                            fill="black"
                                                            fill-opacity="1"
                                                            filter="url(#filter-11)"
                                                            href="#path-9"
                                                        ></use>
                                                        <use
                                                            fill="url(#radialGradient-8)"
                                                            fill-rule="evenodd"
                                                            href="#path-9"
                                                        ></use>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>

                            <span
                                className={SNFT_ls.SNFTBox_center_box_textspan}
                            >
                                Bonus：{(L1 * 16 - L0 * 16).toFixed(2)}ERB
                            </span>
                            <svg
                                width="69px"
                                height="62px"
                                viewBox="0 0 69 62"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xlink="http://www.w3.org/1999/xlink"
                            >
                                <title>箭头3</title>
                                <defs>
                                    <radialGradient
                                        cx="93.2197335%"
                                        cy="0%"
                                        fx="93.2197335%"
                                        fy="0%"
                                        r="142.986012%"
                                        gradientTransform="translate(0.932197,0.000000),scale(1.000000,0.622711),rotate(103.383208),translate(-0.932197,-0.000000)"
                                        id="radialGradient-1"
                                    >
                                        <stop
                                            stop-color="#FDF132"
                                            offset="0%"
                                        ></stop>
                                        <stop
                                            stop-color="#F62380"
                                            offset="100%"
                                        ></stop>
                                    </radialGradient>
                                    <polygon
                                        id="path-2"
                                        points="8.82738146e-18 2.46558931e-18 9.09698997 14.1866667 8.82738146e-18 28 17.4358974 14.1866667"
                                    ></polygon>
                                    <filter
                                        x="-132.0%"
                                        y="-85.5%"
                                        width="333.5%"
                                        height="270.5%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-3"
                                    >
                                        <feMorphology
                                            radius="1"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="shadowSpreadOuter1"
                                        ></feMorphology>
                                        <feOffset
                                            dx="0"
                                            dy="0"
                                            in="shadowSpreadOuter1"
                                            result="shadowOffsetOuter1"
                                        ></feOffset>
                                        <feGaussianBlur
                                            stdDeviation="4.5"
                                            in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"
                                        ></feGaussianBlur>
                                        <feColorMatrix
                                            values="0 0 0 0 0.996078431   0 0 0 0 0.309803922   0 0 0 0 0.654901961  0 0 0 1 0"
                                            type="matrix"
                                            in="shadowBlurOuter1"
                                        ></feColorMatrix>
                                    </filter>
                                    <radialGradient
                                        cx="93.2197335%"
                                        cy="0%"
                                        fx="93.2197335%"
                                        fy="0%"
                                        r="152.525749%"
                                        gradientTransform="translate(0.932197,0.000000),scale(1.000000,0.581771),rotate(102.532064),translate(-0.932197,-0.000000)"
                                        id="radialGradient-4"
                                    >
                                        <stop
                                            stop-color="#FDF132"
                                            offset="0%"
                                        ></stop>
                                        <stop
                                            stop-color="#F62380"
                                            offset="100%"
                                        ></stop>
                                    </radialGradient>
                                    <polygon
                                        id="path-5"
                                        points="19.4871795 5.18518519 24.8383501 14.1175309 19.4871795 22.8148148 29.7435897 14.1175309"
                                    ></polygon>
                                    <filter
                                        x="-198.5%"
                                        y="-124.0%"
                                        width="446.2%"
                                        height="347.3%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-6"
                                    >
                                        <feGaussianBlur
                                            stdDeviation="1.02564103 0"
                                            in="SourceGraphic"
                                        ></feGaussianBlur>
                                    </filter>
                                    <filter
                                        x="-252.1%"
                                        y="-155.2%"
                                        width="553.4%"
                                        height="409.7%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-7"
                                    >
                                        <feMorphology
                                            radius="1"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="shadowSpreadOuter1"
                                        ></feMorphology>
                                        <feOffset
                                            dx="0"
                                            dy="0"
                                            in="shadowSpreadOuter1"
                                            result="shadowOffsetOuter1"
                                        ></feOffset>
                                        <feGaussianBlur
                                            stdDeviation="4.5"
                                            in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"
                                        ></feGaussianBlur>
                                        <feColorMatrix
                                            values="0 0 0 0 0.996078431   0 0 0 0 0.309803922   0 0 0 0 0.654901961  0 0 0 1 0"
                                            type="matrix"
                                            in="shadowBlurOuter1"
                                        ></feColorMatrix>
                                    </filter>
                                    <radialGradient
                                        cx="93.2197335%"
                                        cy="0%"
                                        fx="93.2197335%"
                                        fy="0%"
                                        r="143.988621%"
                                        gradientTransform="translate(0.932197,0.000000),scale(1.000000,0.618132),rotate(103.288305),translate(-0.932197,-0.000000)"
                                        id="radialGradient-8"
                                    >
                                        <stop
                                            stop-color="#FDF132"
                                            offset="0%"
                                        ></stop>
                                        <stop
                                            stop-color="#F62380"
                                            offset="100%"
                                        ></stop>
                                    </radialGradient>
                                    <polygon
                                        id="path-9"
                                        points="34.8717949 10.3703704 37.5473802 14.5738272 34.8717949 18.6666667 40 14.5738272"
                                    ></polygon>
                                    <filter
                                        x="-461.1%"
                                        y="-296.8%"
                                        width="918.6%"
                                        height="692.0%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-10"
                                    >
                                        <feGaussianBlur
                                            stdDeviation="2.05128205 0"
                                            in="SourceGraphic"
                                        ></feGaussianBlur>
                                    </filter>
                                    <filter
                                        x="-568.4%"
                                        y="-363.1%"
                                        width="1133.1%"
                                        height="824.6%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-11"
                                    >
                                        <feMorphology
                                            radius="1"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="shadowSpreadOuter1"
                                        ></feMorphology>
                                        <feOffset
                                            dx="0"
                                            dy="0"
                                            in="shadowSpreadOuter1"
                                            result="shadowOffsetOuter1"
                                        ></feOffset>
                                        <feGaussianBlur
                                            stdDeviation="4.5"
                                            in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"
                                        ></feGaussianBlur>
                                        <feColorMatrix
                                            values="0 0 0 0 0.996078431   0 0 0 0 0.309803922   0 0 0 0 0.654901961  0 0 0 1 0"
                                            type="matrix"
                                            in="shadowBlurOuter1"
                                        ></feColorMatrix>
                                    </filter>
                                </defs>
                                <g
                                    id="英文版"
                                    stroke="none"
                                    stroke-width="1"
                                    fill="none"
                                    fill-rule="evenodd"
                                >
                                    <g
                                        id="SNFT"
                                        transform="translate(-1041.000000, -800.000000)"
                                    >
                                        <g
                                            id="编组-3"
                                            transform="translate(100.000000, 573.000000)"
                                        >
                                            <g
                                                id="编组"
                                                transform="translate(19.500000, 241.000000)"
                                            >
                                                <g transform="translate(937.500000, 3.000000)">
                                                    <g id="路径-11">
                                                        <use
                                                            fill="black"
                                                            fill-opacity="1"
                                                            filter="url(#filter-3)"
                                                            href="#path-2"
                                                        ></use>
                                                        <use
                                                            fill="url(#radialGradient-1)"
                                                            fill-rule="evenodd"
                                                            href="#path-2"
                                                        ></use>
                                                    </g>
                                                    <g
                                                        id="路径-11备份"
                                                        filter="url(#filter-6)"
                                                    >
                                                        <use
                                                            fill="black"
                                                            fill-opacity="1"
                                                            filter="url(#filter-7)"
                                                            href="#path-5"
                                                        ></use>
                                                        <use
                                                            fill="url(#radialGradient-4)"
                                                            fill-rule="evenodd"
                                                            href="#path-5"
                                                        ></use>
                                                    </g>
                                                    <g
                                                        id="路径-11备份-2"
                                                        filter="url(#filter-10)"
                                                    >
                                                        <use
                                                            fill="black"
                                                            fill-opacity="1"
                                                            filter="url(#filter-11)"
                                                            href="#path-9"
                                                        ></use>
                                                        <use
                                                            fill="url(#radialGradient-8)"
                                                            fill-rule="evenodd"
                                                            href="#path-9"
                                                        ></use>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span
                                className={SNFT_ls.SNFTBox_center_box_textspan}
                            >
                                Bonus：
                                {(L2 * 16 * 16 - L1 * 16 * 16).toFixed(2)}ERB
                            </span>
                            <svg
                                width="69px"
                                height="62px"
                                viewBox="0 0 69 62"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xlink="http://www.w3.org/1999/xlink"
                            >
                                <title>箭头3</title>
                                <defs>
                                    <radialGradient
                                        cx="93.2197335%"
                                        cy="0%"
                                        fx="93.2197335%"
                                        fy="0%"
                                        r="142.986012%"
                                        gradientTransform="translate(0.932197,0.000000),scale(1.000000,0.622711),rotate(103.383208),translate(-0.932197,-0.000000)"
                                        id="radialGradient-1"
                                    >
                                        <stop
                                            stop-color="#FDF132"
                                            offset="0%"
                                        ></stop>
                                        <stop
                                            stop-color="#F62380"
                                            offset="100%"
                                        ></stop>
                                    </radialGradient>
                                    <polygon
                                        id="path-2"
                                        points="8.82738146e-18 2.46558931e-18 9.09698997 14.1866667 8.82738146e-18 28 17.4358974 14.1866667"
                                    ></polygon>
                                    <filter
                                        x="-132.0%"
                                        y="-85.5%"
                                        width="333.5%"
                                        height="270.5%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-3"
                                    >
                                        <feMorphology
                                            radius="1"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="shadowSpreadOuter1"
                                        ></feMorphology>
                                        <feOffset
                                            dx="0"
                                            dy="0"
                                            in="shadowSpreadOuter1"
                                            result="shadowOffsetOuter1"
                                        ></feOffset>
                                        <feGaussianBlur
                                            stdDeviation="4.5"
                                            in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"
                                        ></feGaussianBlur>
                                        <feColorMatrix
                                            values="0 0 0 0 0.996078431   0 0 0 0 0.309803922   0 0 0 0 0.654901961  0 0 0 1 0"
                                            type="matrix"
                                            in="shadowBlurOuter1"
                                        ></feColorMatrix>
                                    </filter>
                                    <radialGradient
                                        cx="93.2197335%"
                                        cy="0%"
                                        fx="93.2197335%"
                                        fy="0%"
                                        r="152.525749%"
                                        gradientTransform="translate(0.932197,0.000000),scale(1.000000,0.581771),rotate(102.532064),translate(-0.932197,-0.000000)"
                                        id="radialGradient-4"
                                    >
                                        <stop
                                            stop-color="#FDF132"
                                            offset="0%"
                                        ></stop>
                                        <stop
                                            stop-color="#F62380"
                                            offset="100%"
                                        ></stop>
                                    </radialGradient>
                                    <polygon
                                        id="path-5"
                                        points="19.4871795 5.18518519 24.8383501 14.1175309 19.4871795 22.8148148 29.7435897 14.1175309"
                                    ></polygon>
                                    <filter
                                        x="-198.5%"
                                        y="-124.0%"
                                        width="446.2%"
                                        height="347.3%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-6"
                                    >
                                        <feGaussianBlur
                                            stdDeviation="1.02564103 0"
                                            in="SourceGraphic"
                                        ></feGaussianBlur>
                                    </filter>
                                    <filter
                                        x="-252.1%"
                                        y="-155.2%"
                                        width="553.4%"
                                        height="409.7%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-7"
                                    >
                                        <feMorphology
                                            radius="1"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="shadowSpreadOuter1"
                                        ></feMorphology>
                                        <feOffset
                                            dx="0"
                                            dy="0"
                                            in="shadowSpreadOuter1"
                                            result="shadowOffsetOuter1"
                                        ></feOffset>
                                        <feGaussianBlur
                                            stdDeviation="4.5"
                                            in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"
                                        ></feGaussianBlur>
                                        <feColorMatrix
                                            values="0 0 0 0 0.996078431   0 0 0 0 0.309803922   0 0 0 0 0.654901961  0 0 0 1 0"
                                            type="matrix"
                                            in="shadowBlurOuter1"
                                        ></feColorMatrix>
                                    </filter>
                                    <radialGradient
                                        cx="93.2197335%"
                                        cy="0%"
                                        fx="93.2197335%"
                                        fy="0%"
                                        r="143.988621%"
                                        gradientTransform="translate(0.932197,0.000000),scale(1.000000,0.618132),rotate(103.288305),translate(-0.932197,-0.000000)"
                                        id="radialGradient-8"
                                    >
                                        <stop
                                            stop-color="#FDF132"
                                            offset="0%"
                                        ></stop>
                                        <stop
                                            stop-color="#F62380"
                                            offset="100%"
                                        ></stop>
                                    </radialGradient>
                                    <polygon
                                        id="path-9"
                                        points="34.8717949 10.3703704 37.5473802 14.5738272 34.8717949 18.6666667 40 14.5738272"
                                    ></polygon>
                                    <filter
                                        x="-461.1%"
                                        y="-296.8%"
                                        width="918.6%"
                                        height="692.0%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-10"
                                    >
                                        <feGaussianBlur
                                            stdDeviation="2.05128205 0"
                                            in="SourceGraphic"
                                        ></feGaussianBlur>
                                    </filter>
                                    <filter
                                        x="-568.4%"
                                        y="-363.1%"
                                        width="1133.1%"
                                        height="824.6%"
                                        filterUnits="objectBoundingBox"
                                        id="filter-11"
                                    >
                                        <feMorphology
                                            radius="1"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="shadowSpreadOuter1"
                                        ></feMorphology>
                                        <feOffset
                                            dx="0"
                                            dy="0"
                                            in="shadowSpreadOuter1"
                                            result="shadowOffsetOuter1"
                                        ></feOffset>
                                        <feGaussianBlur
                                            stdDeviation="4.5"
                                            in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"
                                        ></feGaussianBlur>
                                        <feColorMatrix
                                            values="0 0 0 0 0.996078431   0 0 0 0 0.309803922   0 0 0 0 0.654901961  0 0 0 1 0"
                                            type="matrix"
                                            in="shadowBlurOuter1"
                                        ></feColorMatrix>
                                    </filter>
                                </defs>
                                <g
                                    id="英文版"
                                    stroke="none"
                                    stroke-width="1"
                                    fill="none"
                                    fill-rule="evenodd"
                                >
                                    <g
                                        id="SNFT"
                                        transform="translate(-1041.000000, -800.000000)"
                                    >
                                        <g
                                            id="编组-3"
                                            transform="translate(100.000000, 573.000000)"
                                        >
                                            <g
                                                id="编组"
                                                transform="translate(19.500000, 241.000000)"
                                            >
                                                <g transform="translate(937.500000, 3.000000)">
                                                    <g id="路径-11">
                                                        <use
                                                            fill="black"
                                                            fill-opacity="1"
                                                            filter="url(#filter-3)"
                                                            href="#path-2"
                                                        ></use>
                                                        <use
                                                            fill="url(#radialGradient-1)"
                                                            fill-rule="evenodd"
                                                            href="#path-2"
                                                        ></use>
                                                    </g>
                                                    <g
                                                        id="路径-11备份"
                                                        filter="url(#filter-6)"
                                                    >
                                                        <use
                                                            fill="black"
                                                            fill-opacity="1"
                                                            filter="url(#filter-7)"
                                                            href="#path-5"
                                                        ></use>
                                                        <use
                                                            fill="url(#radialGradient-4)"
                                                            fill-rule="evenodd"
                                                            href="#path-5"
                                                        ></use>
                                                    </g>
                                                    <g
                                                        id="路径-11备份-2"
                                                        filter="url(#filter-10)"
                                                    >
                                                        <use
                                                            fill="black"
                                                            fill-opacity="1"
                                                            filter="url(#filter-11)"
                                                            href="#path-9"
                                                        ></use>
                                                        <use
                                                            fill="url(#radialGradient-8)"
                                                            fill-rule="evenodd"
                                                            href="#path-9"
                                                        ></use>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span
                                className={SNFT_ls.SNFTBox_center_box_textspan}
                            >
                                Bonus：
                                {(
                                    L3 * 16 * 16 * 16 -
                                    L2 * 16 * 16 * 16
                                ).toFixed(2)}
                                ERB
                            </span>
                        </p>
                    </div>
                    <div className={SNFT_ls.SNFTBox_center_boxtitle}>
                        <div className={SNFT_ls.SNFTBox_center_boxtitle_d1}>
                            16 * L0 will be composed to S-NFT L1
                        </div>
                        <div className={SNFT_ls.SNFTBox_center_boxtitle_d2}>
                            16 * L1 will be composed to S-NFT L2
                        </div>
                        <div className={SNFT_ls.SNFTBox_center_boxtitle_d3}>
                            16 * L2 will be composed to S-NFT L3
                        </div>
                    </div>
                </div>
                {/* 表格 */}
                <div className={SNFT_ls.SNFTBox_table} id="SNFTTable">
                    <p className={SNFT_ls.SNFTBox_table_title}>S-NFT</p>
                    <Table
                        columns={columns}
                        dataSource={snftdata.nfts}
                        pagination={false}
                    />
                    <div
                        className={SNFT_ls.SNFTBox_Pagination}
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
                        <div className={SNFT_ls.SNFTBox_Pagination_d}>
                            16/Page
                        </div>
                        <span className={SNFT_ls.SNFTBox_Pagination_span1}>
                            To
                        </span>
                        <input
                            id="SNFTinputnumber"
                            className={SNFT_ls.SNFTBox_Pagination_input}
                            onKeyDown={SNFTinputnumberonclick}
                        />
                        <span className={SNFT_ls.SNFTBox_Pagination_span2}>
                            Page
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
