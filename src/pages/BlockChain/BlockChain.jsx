import BlockChain_ls from './BlockChain.less';
import { Space, Table, Tag, Pagination } from 'antd';
import { Link } from 'umi';
import {
    erbprice,
    total,
    epoch,
    block,
    rewardperson,
} from '../../api/request_data/block_request';
import { timestamp, ellipsis } from '../../utils/methods/Methods';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
export default function BlockChain() {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    //区块
    const [blockdata, setBlockdata] = useState({});
    //总数
    const [totaldata, setTotaldata] = useState({});
    //最高区块
    const [bigheightblock, setBigheightblock] = useState(0);
    //倍数
    const [multiple, setMultiple] = useState(0.11);
    const columns = [
        {
            title: 'Block Height',
            dataIndex: 'number',
            key: 'number',
            render: (text, data) =>
                data.number != 0 ? (
                    <Link
                        to={{
                            pathname: '/BlockChain/BlockDetails',
                            state: { blockid: text },
                        }}
                        style={{ color: '#7AA4FF' }}
                    >
                        {text}
                    </Link>
                ) : (
                    '-'
                ),
        },
        {
            title: 'Miner',
            dataIndex: 'miner',
            key: 'miner',
            render: (text, data) =>
                data.number != 0 ? (
                    <Link
                        to={{ pathname: `/AccountDetail/${text}`, state: text }}
                        style={{ color: '#7AA4FF' }}
                    >
                        {ellipsis(text)}
                    </Link>
                ) : (
                    '-'
                ),
        },
        {
            title: 'TXN',
            dataIndex: 'totalTransaction',
            key: 'totalTransaction',
            render: (text, data) => (data.number != 0 ? <>{text}</> : '-'),
        },
        {
            title: 'Creation Time',
            key: 'timestamp',
            dataIndex: 'timestamp',
            render: (text, data) =>
                data.number != 0 ? (
                    <span>
                        {moment(parseInt(text) * 1000).format(
                            'YYYY-MM-DD HH:mm:ss',
                        )}
                    </span>
                ) : (
                    '-'
                ),
            ellipsis: true,
        },
        {
            title: 'Gas Used',
            key: 'gasUsed',
            dataIndex: 'gasUsed',
            render: (text, data) => (data.number != 0 ? <>{text}</> : '-'),
        },
        {
            title: 'Gas Limit',
            key: 'gasLimit',
            dataIndex: 'gasLimit',
            render: (text, data) => (data.number != 0 ? <>{text}</> : '-'),
        },
        {
            title: 'Block Size',
            key: 'size',
            dataIndex: 'size',
            render: (text, data) =>
                data.number != 0 ? <span>{text} Bytes</span> : '-',
        },
    ];

    const onChange = (data) => {
        setPagenumber(data);
    };
    //区块分页
    let pagedata = {
        page: pagenumber,
        page_size: pagenumbersize,
    };
    useEffect(() => {
        block_q(pagedata);
        total_q();
    }, []);
    useEffect(() => {
        console.log(pagenumber);
        block_q(pagedata);
    }, [pagenumber]);
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
    //总数查询
    const total_q = async () => {
        const data = await total();
        console.log('总数查询');
        console.log(data);
        if (data) {
            setTotaldata(data);
        }
    };
    function BlockChaininputnumberonclick(e) {
        let data = document.getElementById('BlockChaininputnumber').value;
        if (e.keyCode == 13) {
            if (Number(data) != NaN) {
                setPagenumber(Number(data));
            }
        }
    }
    return (
        <>
            <div className={BlockChain_ls.BlockChainBox}>
                {/* 头部三块数据 */}
                <div className={BlockChain_ls.BlockChainBox_headerTitle}>
                    <div className={BlockChain_ls.BlockChainBox_headerTitle_d}>
                        <div
                            className={
                                BlockChain_ls.BlockChainBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    BlockChain_ls.BlockChainBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalBlock - 1 || 0}
                            </p>
                            <p
                                className={
                                    BlockChain_ls.BlockChainBox_headerTitle_d_left_name
                                }
                            >
                                Block Height
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/BlockChain/blockchain1.png')}
                        />
                    </div>
                    <div className={BlockChain_ls.BlockChainBox_headerTitle_d}>
                        <div
                            className={
                                BlockChain_ls.BlockChainBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    BlockChain_ls.BlockChainBox_headerTitle_d_left_data
                                }
                            >
                                {parseInt(totaldata.rewardSNFTCount) || 0}
                            </p>
                            <p
                                className={
                                    BlockChain_ls.BlockChainBox_headerTitle_d_left_name
                                }
                            >
                                Total S-NFT Rewards
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/BlockChain/blockchain2.png')}
                        />
                    </div>
                    <div className={BlockChain_ls.BlockChainBox_headerTitle_d}>
                        <div
                            className={
                                BlockChain_ls.BlockChainBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    BlockChain_ls.BlockChainBox_headerTitle_d_left_data
                                }
                            >
                                {Math.floor(
                                    totaldata.rewardCoinCount * multiple * 100,
                                ) / 100 || 0}
                            </p>
                            <p
                                className={
                                    BlockChain_ls.BlockChainBox_headerTitle_d_left_name
                                }
                            >
                                Total ERB Rewards
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/BlockChain/blockchain3.png')}
                        />
                    </div>
                </div>
                {/* 表格 */}
                <div
                    className={BlockChain_ls.BlockChainBox_table}
                    id="BlockChainTable"
                >
                    <p className={BlockChain_ls.BlockChainBox_table_title}>
                        BLOCK INFORMATION
                    </p>
                    <Table
                        columns={columns}
                        dataSource={blockdata.blocks}
                        pagination={false}
                    />
                    <div
                        className={BlockChain_ls.BlockChainBox_Pagination}
                        id="BlockChainBoxPagination"
                    >
                        <Pagination
                            defaultCurrent={1}
                            total={blockdata.total}
                            onChange={onChange}
                            showSizeChanger={false}
                            current={pagenumber}
                        />
                        <div
                            className={BlockChain_ls.BlockChainBox_Pagination_d}
                        >
                            10/Page
                        </div>
                        <span
                            className={
                                BlockChain_ls.BlockChainBox_Pagination_span1
                            }
                        >
                            To
                        </span>
                        <input
                            id="BlockChaininputnumber"
                            className={
                                BlockChain_ls.BlockChainBox_Pagination_input
                            }
                            onKeyDown={BlockChaininputnumberonclick}
                        />
                        <span
                            className={
                                BlockChain_ls.BlockChainBox_Pagination_span2
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
