import ComingSoon404_ls from './NoSearchResults.less';
import { Select, message } from 'antd';
import { GoTriangleDown } from 'react-icons/go';
import { BsSearch } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import { history, Link } from 'umi';
const { Option } = Select;
export default function NoSearchResults() {
    return (
        <>
            <div className={ComingSoon404_ls.ComingSoon404Box}>
                <img
                    className={ComingSoon404_ls.ComingSoon404Box_img}
                    src={require('../../assets/images/HomePage/Slice 880.png')}
                />
                <p className={ComingSoon404_ls.ComingSoon404Box_text}>
                    This page is lost
                </p>
                <p className={ComingSoon404_ls.ComingSoon404Box_text2}>
                    We've explored deep and wide,but we can't fnd the page you
                    were looking for
                </p>
                <Link
                    to={{ pathname: '/', state: '' }}
                    className={ComingSoon404_ls.ComingSoon404Box_button}
                >
                    Back home
                </Link>
            </div>
        </>
    );
}
