import BlackholeBlockDetaApp_ls from './BlackholeBlockDetaApp.less';
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
export default function BlackholeBlockDetaApp(props) {
    const [pagenumber, setPagenumber] = useState(1);
    //单个区块
    const [rewarderdata, setRewarderdata] = useState({});
    const onChange = (data) => {
        console.log(data);
    };
    //单个区块查询
    const soloblock_q = async (item) => {
        const data = await soloblock(item);
        if (data) {
            setRewarderdata(data);
        }
        console.log('单个区块查询');
        console.log(data);
        let state = JSON.stringify(data);
        if (
            JSON.parse(state).useCache != undefined &&
            JSON.parse(state).useCache == false
        ) {
            comingsoon404();
        }
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
        if (data) {
            return data.map((item) => {
                return (
                    <div
                        className={
                            BlackholeBlockDetaApp_ls.Rewarderdatabox_block
                        }
                    >
                        <p
                            className={
                                BlackholeBlockDetaApp_ls.Rewarderdatabox_block_title
                            }
                        >
                            Penalty Address
                        </p>
                        <Link
                            to={{
                                pathname: `/AccountDetailApp/${item.address}`,
                                state: item.address,
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                            className={
                                BlackholeBlockDetaApp_ls.Rewarderdatabox_block_address
                            }
                        >
                            {ellipsis(item.address)}
                        </Link>
                        <div
                            className={
                                BlackholeBlockDetaApp_ls.Rewarderdatabox_block_bottom
                            }
                        >
                            <div>
                                <p>Penalty Weight</p>
                                <span>10</span>
                            </div>
                            <div>
                                <p>Weight</p>
                                <span>{item.weight}</span>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }
    function nodeaddressdata(data) {
        if (data) {
            return data.map((item) => {
                return (
                    <div className={BlackholeBlockDetaApp_ls.nodeaddressblock}>
                        <Link
                            to={{
                                pathname: `/AccountDetailApp/${item}`,
                                state: item,
                            }}
                            style={{
                                color: '#7AA4FF',
                                fontFamily: 'CustomFontMedium',
                            }}
                        >
                            {ellipsis(item)}
                        </Link>
                    </div>
                );
            });
        }
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
            <div className={BlackholeBlockDetaApp_ls.BlackholeBlockDetaAppBox}>
                <div className={BlackholeBlockDetaApp_ls.title}>
                Blackhole Block Details
                </div>
                <div className={BlackholeBlockDetaApp_ls.Rewarderdatabox}>
                    {rewarderblock(rewarderdata.validators)}
                    <div
                        className={
                            BlackholeBlockDetaApp_ls.Rewarderdatabox_blockts
                        }
                    ></div>
                </div>
                <div className={BlackholeBlockDetaApp_ls.tablebox}>
                    <div className={BlackholeBlockDetaApp_ls.table}>
                        <p className={BlackholeBlockDetaApp_ls.table_title}>
                            Node Address
                        </p>
                        <div className={BlackholeBlockDetaApp_ls.table_data}>
                            {nodeaddressdata(rewarderdata.proposers)}
                        </div>
                        {/* <div
                        className={
                            BlackholeBlockDetaApp_ls.BlockDetailsBox_Pagination
                        }
                        id="BlackholeBlockDetaAppPagination"
                    >
                        <Pagination
                            defaultCurrent={1}
                            total={rewarderdata.proposers?rewarderdata.proposers.length:0}
                            onChange={onChange}
                            showSizeChanger={false}
                            current={pagenumber}
                        />
                        <div
                            className={
                                BlackholeBlockDetaApp_ls.BlockDetailsBox_Pagination_d
                            }
                        >
                            30/Page
                        </div>
                        <span
                            className={
                                BlackholeBlockDetaApp_ls.BlockDetailsBox_Pagination_span1
                            }
                        >
                            To
                        </span>
                        <input
                            id="BlockChaininputnumber"
                            className={
                                BlackholeBlockDetaApp_ls.BlockDetailsBox_Pagination_input
                            }
                            onKeyDown={BlockChaininputnumberonclick}
                        />
                        <span
                            className={
                                BlackholeBlockDetaApp_ls.BlockDetailsBox_Pagination_span2
                            }
                        >
                            Page
                        </span>
                    </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
