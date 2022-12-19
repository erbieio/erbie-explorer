import ValidatorApp_ls from './ValidatorApp.less';
import { Space, Table, Tag, Pagination } from 'antd';
import { Link } from 'umi';
import {
    erbprice,
    total,
    epoch,
    validators,
    rewardperson,
} from '../../api/request_data/block_request';
import { timestamp, ellipsis } from '../../utils/methods/Methods';
import moment from 'moment';
import { utils } from 'ethers';
import React, { useState, useEffect } from 'react';
export default function ValidatorApp() {
    const [pagenumber, setPagenumber] = useState(1);
    const [pagenumbersize, setPagenumbersize] = useState(10);
    //Validator
    const [validatordata, setValidatordata] = useState([]);
    //总数
    const [totaldata, setTotaldata] = useState({});
    const columns = [
        {
            title: 'Validator',
            dataIndex: 'address',
            key: 'address',
            render: (text, data) => (
                <Link
                    to={{ pathname: `/AccountDetailApp/${text}`, state: text }}
                    style={{ color: '#7AA4FF',fontFamily:'CustomFontMedium'  }}
                >
                    {ellipsis(text)}
                </Link>
            ),
            ellipsis: true,
        },
        {
            title: 'Staking Numbers(ERB)',
            dataIndex: 'amount',
            key: 'amount',
            render: (text, data) => (
                <span>
                    {text
                        ? Number(utils.formatEther(String(text))).toFixed(2)
                        : 0}
                </span>
            ),
            ellipsis: true,
        },
        {
            title: 'Total Rewards(ERB)',
            dataIndex: 'reward',
            key: 'reward',
            render: (text, data) => (
                <>
                    {text
                        ? Number(utils.formatEther(String(text))).toFixed(2)
                        : 0}
                </>
            ),
        },
        {
            title: 'Time',
            key: 'timestamp',
            dataIndex: 'timestamp',
            render: (text, data) => (
                <span>
                    {moment(parseInt(text) * 1000).format(
                        'YYYY-MM-DD HH:mm:ss',
                    )}
                </span>
            ),
            ellipsis: true,
        },
        {
            title: 'Last Attestation Block Height',
            key: 'last_number',
            dataIndex: 'last_number',
            render: (text, data) => (
                <Link
                    to={{
                        pathname: '/BlockChainApp/BlockDetailsApp',
                        state: { blockid: text },
                    }}
                    style={{ color: '#7AA4FF',fontFamily:'CustomFontMedium'  }}
                >
                    {text}
                </Link>
            ),
            width: '200px',
        },
        {
            title: 'Online Weight',
            key: 'weight',
            dataIndex: 'weight',
            render: (text, data) => <>{text}</>,
        },
    ];

    const onChange = (data) => {
        setPagenumber(data);
    };
    //Validator分页
    let pagedata = {
        page: pagenumber,
        page_size: pagenumbersize,
    };
    useEffect(() => {
        validators_q(pagedata);
        total_q();
    }, []);
    useEffect(() => {
        validators_q(pagedata);
    }, [pagenumber]);
    //Validator查询
    const validators_q = async (item) => {
        const data = await validators(item);
        if (data) {
            setValidatordata(data);
        }
        console.log('Validator查询');
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
    function Validatorinputnumberonclick(e) {
        let data = document.getElementById('Validatorinputnumber').value;
        if (e.keyCode == 13) {
            if (Number(data) != NaN) {
                setPagenumber(Number(data));
            }
        }
    }
    return (
        <>
            <div className={ValidatorApp_ls.ValidatorBox}>
                {/* 头部三块数据 */}
                <div className={ValidatorApp_ls.ValidatorBox_headerTitle}>
                    <div className={ValidatorApp_ls.ValidatorBox_headerTitle_d}>
                        <div
                            className={
                                ValidatorApp_ls.ValidatorBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    ValidatorApp_ls.ValidatorBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalValidator || 0}
                            </p>
                            <p
                                className={
                                    ValidatorApp_ls.ValidatorBox_headerTitle_d_left_name
                                }
                            >
                                Validator Numbers
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/ValidatorApp/1.png')}
                        />
                    </div>
                    <div className={ValidatorApp_ls.ValidatorBox_headerTitle_d}>
                        <div
                            className={
                                ValidatorApp_ls.ValidatorBox_headerTitle_d_left
                            }
                        >
                            <p
                                className={
                                    ValidatorApp_ls.ValidatorBox_headerTitle_d_left_data
                                }
                            >
                                {totaldata.totalValidatorPledge
                                    ? Number(
                                          utils.formatEther(
                                              String(
                                                  totaldata.totalValidatorPledge,
                                              ),
                                          ),
                                      ).toFixed(2)
                                    : 0}
                            </p>
                            <p
                                className={
                                    ValidatorApp_ls.ValidatorBox_headerTitle_d_left_name
                                }
                            >
                                Total Staking ERBs
                            </p>
                        </div>
                        <img
                            src={require('../../assets/images/ValidatorApp/2.png')}
                        />
                    </div>
                </div>
                {/* 表格 */}
                <div className={ValidatorApp_ls.tableBox}>
                    <div
                        className={ValidatorApp_ls.ValidatorBox_table}
                        id="ValidatorTableApp"
                    >
                        <p className={ValidatorApp_ls.ValidatorBox_table_title}>
                            VALIDATOR INFORMATION
                        </p>
                        <Table
                            columns={columns}
                            dataSource={validatordata}
                            pagination={false}
                        />
                        <div
                            className={ValidatorApp_ls.ValidatorBox_Pagination}
                            id="ValidatorBoxPagination"
                        >
                            <Pagination
                                defaultCurrent={1}
                                total={totaldata.totalValidator}
                                onChange={onChange}
                                showSizeChanger={false}
                                current={pagenumber}
                            />
                            <div
                                className={
                                    ValidatorApp_ls.ValidatorBox_Pagination_d
                                }
                            >
                                10/Page
                            </div>
                            <span
                                className={
                                    ValidatorApp_ls.ValidatorBox_Pagination_span1
                                }
                            >
                                To
                            </span>
                            <input
                                id="Validatorinputnumber"
                                className={
                                    ValidatorApp_ls.ValidatorBox_Pagination_input
                                }
                                onKeyDown={Validatorinputnumberonclick}
                            />
                            <span
                                className={
                                    ValidatorApp_ls.ValidatorBox_Pagination_span2
                                }
                            >
                                Page
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
