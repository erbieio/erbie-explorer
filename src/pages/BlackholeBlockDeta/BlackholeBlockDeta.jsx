import BlackholeBlockDeta_ls from './BlackholeBlockDeta.less';
import SearchBox from '../../components/SearchBox/SearchBox';
import { Space, Table, Tag, Pagination, Progress } from 'antd';
import { Link } from 'umi';
import { soloblock } from '../../api/request_data/block_request';
import { utils } from 'ethers';
import moment from 'moment';
import { history } from 'umi';
import { timestamp, ellipsis } from '../../utils/methods/Methods';
import React, { useState, useEffect } from 'react';
import { map } from '@antv/util';
export default function BlackholeBlockDeta(props) {
    const [pagenumber, setPagenumber] = useState(1);
    //单个区块
    const [soloblockdata, setSoloblockdata] = useState({});
    let rewarderdata = {
        proposers: [
            '0x00000000000000000000000000000000000000',
            '0x00000000000000000000000000000000000000',
            '0x00000000000000000000000000000000000000',
            '0x00000000000000000000000000000000000000',
            '0x00000000000000000000000000000000000000',
        ],
        validators: [
            {
                address: '0x00000000000000000000000000000000000000',
                weight: 29,
            },
            {
                address: '0x00000000000000000000000000000000000000',
                weight: 29,
            },
            {
                address: '0x00000000000000000000000000000000000000',
                weight: 29,
            },
            {
                address: '0x00000000000000000000000000000000000000',
                weight: 29,
            },
            {
                address: '0x00000000000000000000000000000000000000',
                weight: 29,
            },
            {
                address: '0x00000000000000000000000000000000000000',
                weight: 29,
            },
            {
                address: '0x00000000000000000000000000000000000000',
                weight: 29,
            },
            {
                address: '0x00000000000000000000000000000000000000',
                weight: 29,
            },
            {
                address: '0x00000000000000000000000000000000000000',
                weight: 29,
            },
            {
                address: '0x00000000000000000000000000000000000000',
                weight: 29,
            },
            {
                address: '0x00000000000000000000000000000000000000',
                weight: 29,
            },
        ],
    };
    const onChange = (data) => {
        console.log(data);
    };
    //单个区块查询
    const soloblock_q = async (item) => {
        const data = await soloblock(item);
        if (data) {
            setSoloblockdata(data);
        }
        console.log('单个区块查询');
        console.log(data);
        let state = JSON.stringify(data);
        // if (
        //     JSON.parse(state).useCache != undefined &&
        //     JSON.parse(state).useCache == false
        // ) {
        //     comingsoon404();
        // }
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
    }, []);
    useEffect(() => {
        soloblock_q(JSON.parse(localStorage.getItem('blocktext')));
    }, [JSON.parse(localStorage.getItem('blocktext'))]);
    //404

    function comingsoon404() {
        props.history.push('/NoSearchResults');
    }
    function rewarderblock(data) {
        return data.map((item) => {
            return (
                <div className={BlackholeBlockDeta_ls.Rewarderdatabox_block}>
                    <p
                        className={
                            BlackholeBlockDeta_ls.Rewarderdatabox_block_title
                        }
                    >
                        Penalty Address
                    </p>
                    <p
                        className={
                            BlackholeBlockDeta_ls.Rewarderdatabox_block_address
                        }
                    >
                        {ellipsis(item.address)}
                    </p>
                    <div
                        className={
                            BlackholeBlockDeta_ls.Rewarderdatabox_block_bottom
                        }
                    >
                        <div>
                            <p>Penalty Points</p>
                            <span>10</span>
                        </div>
                        <div>
                            <p>Current Credibility</p>
                            <span>{item.weight}</span>
                        </div>
                    </div>
                </div>
            );
        });
    }
    function nodeaddressdata(data) {
        return data.map((item) => {
            return (
                <div className={BlackholeBlockDeta_ls.nodeaddressblock}>
                    {item}
                </div>
            );
        });
    }
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
            <div className={BlackholeBlockDeta_ls.BlackholeBlockDetaBox}>
                <div className={BlackholeBlockDeta_ls.title}>
                    Blackhole Block Deta
                    <SearchBox />
                </div>
                <div className={BlackholeBlockDeta_ls.Rewarderdatabox}>
                    {rewarderblock(rewarderdata.validators)}
                    <div
                        className={
                            BlackholeBlockDeta_ls.Rewarderdatabox_blockts
                        }
                    ></div>
                </div>
                <div className={BlackholeBlockDeta_ls.table}>
                    <p className={BlackholeBlockDeta_ls.table_title}>
                        Node Address
                    </p>
                    <div className={BlackholeBlockDeta_ls.table_data}>
                        {nodeaddressdata(rewarderdata.proposers)}
                    </div>
                    <div
                        className={
                            BlackholeBlockDeta_ls.BlockDetailsBox_Pagination
                        }
                        id="BlackholeBlockDetaPagination"
                    >
                        <Pagination
                            defaultCurrent={1}
                            total={rewarderdata.proposers.length}
                            onChange={onChange}
                            showSizeChanger={false}
                            current={pagenumber}
                        />
                        <div
                            className={
                                BlackholeBlockDeta_ls.BlockDetailsBox_Pagination_d
                            }
                        >
                            30/Page
                        </div>
                        <span
                            className={
                                BlackholeBlockDeta_ls.BlockDetailsBox_Pagination_span1
                            }
                        >
                            To
                        </span>
                        <input
                            id="BlockChaininputnumber"
                            className={
                                BlackholeBlockDeta_ls.BlockDetailsBox_Pagination_input
                            }
                            onKeyDown={BlockChaininputnumberonclick}
                        />
                        <span
                            className={
                                BlackholeBlockDeta_ls.BlockDetailsBox_Pagination_span2
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
