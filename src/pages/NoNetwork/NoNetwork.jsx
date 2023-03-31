import NoNetwork_ls from './NoNetwork.less';
import { Select, message } from 'antd';
import { GoTriangleDown } from 'react-icons/go';
import { BsSearch } from 'react-icons/bs';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { history, Link } from 'umi';
const { Option } = Select;
export default function NoNetwork() {
    return (
        <>
            <div className={NoNetwork_ls.NoNetworkBox}>
                <img
                    className={NoNetwork_ls.NoNetworkBox_img}
                    src={require('../../assets/images/HomePage/Slice 881.png')}
                />
                <p className={NoNetwork_ls.NoNetworkBox_text}>
                    Can't open start page
                </p>
                <p className={NoNetwork_ls.NoNetworkBox_text2}>
                    Something went wrong. Try again later or orcontact us{' '}
                    <span>support@wormholes.com</span>
                </p>
                <Link
                    to={{ pathname: '/', state: '' }}
                    className={NoNetwork_ls.NoNetworkBox_button}
                >
                    Back home
                </Link>
            </div>
        </>
    );
}
