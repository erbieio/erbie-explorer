import NullPageApp_ls from './NullPageApp.less'
import {
    soloblock
} from '../../api/request_data/block_request';
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
export default function NullPageApp(props){
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
        if(data){
            if(data.miner == '0x0000000000000000000000000000000000000000'){
                history.push({
                    pathname: '/BlockChainApp/BlackholeBlockDetaApp',
                    state: {
                        blockid: JSON.parse(localStorage.getItem('blocktext')),
                    },
                });
            }else{
                history.push({
                    pathname: '/BlockChainApp/BlockDetailsApp',
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
    return(
        <>
            <div>

            </div>
        </>
    )
}