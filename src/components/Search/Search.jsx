import Search_ls from './Search.less';
import { BsSearch } from 'react-icons/bs';
import { GoTriangleDown } from 'react-icons/go';
import { Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
const { Option } = Select;
export default function Search() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <div className={Search_ls.SearchBox}>
                <div className={Search_ls.SearchBox_inputBox}>
                    <Select
                        defaultValue="AllFilters"
                        onChange={handleChange}
                        suffixIcon={
                            <>
                                <GoTriangleDown
                                    style={{
                                        color: '#ffffff',
                                        fontSize: '18px',
                                    }}
                                />
                            </>
                        }
                        className={Search_ls.SearchBox_inputBox_select}
                    >
                        <Option value="AllFilters">All Filters</Option>
                    </Select>
                    <input
                        placeholder="Search by Address / Txn Hash / Block / Token"
                        className={Search_ls.SearchBox_inputBox_input}
                    />
                </div>
                <div className={Search_ls.Search}>
                    <BsSearch />
                </div>
            </div>
        </>
    );
}
