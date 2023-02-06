import NullPage_ls from './NullPage.less';
import { soloblock } from '../../api/request_data/block_request';
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
export default function NullPage(props) {
    //单个区块查询
    const soloblock_q = async (item) => {
        const data = await soloblock(item);
        console.log('单个区块查询');
        console.log(data);
        let state = JSON.stringify(data);
        if (
            JSON.parse(state).useCache != undefined &&
            JSON.parse(state).useCache == false
        ) {
            comingsoon404();
        }
        if (data) {
            if (data.miner == '0x0000000000000000000000000000000000000000') {
                history.push({
                    pathname: '/BlockChain/BlackholeBlockDeta',
                    state: {
                        blockid: JSON.parse(localStorage.getItem('blocktext')),
                    },
                });
            } else {
                history.push({
                    pathname: '/BlockChain/BlockDetails',
                    state: {
                        blockid: JSON.parse(localStorage.getItem('blocktext')),
                    },
                });
            }
        }
    };
    useEffect(() => {
        if (props.location.state != undefined) {
            localStorage.setItem(
                'blocktext',
                JSON.stringify(props.location.state.blockid),
            );
        }
        soloblock_q(JSON.parse(localStorage.getItem('blocktext')));
    }, []);
    //404
    function comingsoon404() {
        history.push('/NoSearchResults');
    }
    return (
        <>
            <div></div>
        </>
    );
}