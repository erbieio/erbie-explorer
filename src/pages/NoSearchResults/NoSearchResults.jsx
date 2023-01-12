import ComingSoon404_ls from './NoSearchResults.less'
import { Select, message } from 'antd';
import { GoTriangleDown } from 'react-icons/go';
import { BsSearch } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
const { Option } = Select;
export default function NoSearchResults() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    //搜索按钮
    function homepageinputclick() {
        let data = document.getElementById('homepageinput').value
        console.log(data.length);
        if (data) {
            if (Number(data) == data && data.slice(0,2) != '0x' && data.slice(0,2) != '0X') {
                // 区块
                history.push({
                    pathname: '/NullPage',
                    state: {
                        blockid: data,
                    },
                })
            } else if ((data.slice(0,2) == '0x' || data.slice(0,2) == '0X') && data.length == 42) {
                //账户详情
                history.push({
                    pathname: `/AccountDetail/${data}`,
                    state: data,
                })
            } else if ((data.slice(0,2) == '0x' || data.slice(0,2) == '0X') && data.length == 66) {
                //交易hash
                history.push({
                    pathname: `/TradeDetail/${data}`,
                    state: data
                })
            }
        } else {
            message.error('Cannot be empty！');
        }

    }
    return (
        <>
            <div className={ComingSoon404_ls.ComingSoon404Box}>
                
                <img
                    className={ComingSoon404_ls.ComingSoon404Box_img}
                    src={require('../../assets/images/HomePage/404.png')}
                />
                <p className={ComingSoon404_ls.ComingSoon404Box_text}>
                Search not found
                </p>
                <p className={ComingSoon404_ls.ComingSoon404Box_text2}>
                Oops! The search string you entered was: “xxxxxx” Sorry! This is an invalid search string.
                </p>
                <div className={ComingSoon404_ls.HeaderBox_SearchBox}>
                    <div className={ComingSoon404_ls.HeaderBox_SearchBox_inputBox} id='headerselect'>
                        {/* <Select
                            defaultValue="AllFilters"
                            onChange={handleChange}
                            suffixIcon={
                                <>
                                    <GoTriangleDown style={{color:'#ffffff',fontSize:'18px'}} />
                                </>
                            }
                            className={ComingSoon404_ls.HeaderBox_SearchBox_inputBox_select}
                            >
                                <Option value="AllFilters">All Filters</Option>
                        </Select> */}
                        <input placeholder='Search by Address / Txn Hash / Block / Token' className={ComingSoon404_ls.HeaderBox_SearchBox_inputBox_input} id='homepageinput' />
                    </div>
                    <div className={ComingSoon404_ls.HeaderBox_Search} onClick={homepageinputclick}>
                        <BsSearch/>
                    </div>
                </div>
            </div>
        </>
    )
}
