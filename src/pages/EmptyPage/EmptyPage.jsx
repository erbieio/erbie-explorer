import EmptyPage_ls from './EmptyPage.less';
import { Select, message } from 'antd';
import { GoTriangleDown } from 'react-icons/go';
import { BsSearch } from 'react-icons/bs';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { history, Link } from 'umi';
const { Option } = Select;
export default function EmptyPage() {
    const [timedata, setTimedata] = useState('');
    useEffect(() => {
        let newDate = moment().format('YYYY-MM-DD HH:mm:ss');
        // console.log(newDate);
        setTimedata(newDate);
    }, []);
    return (
        <>
            <div className={EmptyPage_ls.EmptyPageBox}>
                <img
                    className={EmptyPage_ls.EmptyPageBox_img}
                    src={require('../../assets/images/HomePage/Slice 879.png')}
                />
                <p className={EmptyPage_ls.EmptyPageBox_text}>
                    Please wait while we try to adapt
                </p>
                <p className={EmptyPage_ls.EmptyPageBox_text2}>
                    Please wait a moment: TypeError Cannot read property
                    'chain'of undefned <span>{timedata}</span> Server
                    reactRender
                </p>
                <Link
                    to={{ pathname: '/', state: '' }}
                    className={EmptyPage_ls.EmptyPageBox_button}
                >
                    Back home
                </Link>
            </div>
        </>
    );
}
