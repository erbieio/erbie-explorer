import exchangeRanking_ls from './ExchangeRanking.less';
import { Radio, Tooltip, Avatar, Button, Table, ConfigProvider } from 'antd';
const { Column, ColumnGroup } = Table;
import { useState } from 'react';
import first from '../../assets/images/Ranking/first.png';
import second from '../../assets/images/Ranking/second.png';
import thred from '../../assets/images/Ranking/thred.png';
import zhCN from 'antd/es/locale/zh_CN';
export default function HomePage() {
    const data1 = [];
    const data2 = [];
    const [size, setSize] = useState('allTranslation');
    const [data3, updata] = useState(data1);
    const onChangeExchange = (e) => {
        setSize(e.target.value);
        e.target.value == 'allTranslation'
            ? updata(data1)
            : e.target.value == '30Day'
            ? updata(data2)
            : '';
    };
    const [pageOption, setPageOption] = useState({
        pageNo: 1, //当前页为1
        pageSize: 22, //一页22行
    });
    const paginationProps = {
        current: pageOption.pageNo,
        pageSize: pageOption.pageSize,
        showQuickJumper: true,
        defaultCurrent: 1,
        // total:530,
        onChange: (current, size) => paginationChange(current, size),
    };

    const paginationChange = async (current, size) => {
        //前面用到useState
        setPageOption({
            pageNo: current, //当前所在页面
            pageSize: size, //一页有几行
        });
    };
    return (
        <>
            <div className={exchangeRanking_ls.RankingBox}>
                <div className={exchangeRanking_ls.RankingExchangeBox}>
                    <div className={exchangeRanking_ls.RankingExchangeTitle}>
                        <ul>交易所排行</ul>
                        <div
                            className={exchangeRanking_ls.RankingExchangeButton}
                        >
                            <Radio.Group
                                value={size}
                                onChange={onChangeExchange}
                                className={
                                    exchangeRanking_ls.RankingExchangeButtonGroup
                                }
                                style={{
                                    marginBottom: 24,
                                }}
                            >
                                <Radio.Button value="allTranslation">
                                    总交易额
                                </Radio.Button>
                                <Radio.Button value="30Day">
                                    30天内
                                </Radio.Button>
                                <Radio.Button value="7Day">7天内</Radio.Button>
                                <Radio.Button value="24Hour">
                                    24H内
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>

                    <div>
                        <ConfigProvider locale={zhCN}>
                            <Table
                                id="exchangeTable"
                                style={{ minHeight: 300 }}
                                dataSource={data3}
                                pagination={paginationProps}
                            >
                                <Column
                                    title="排名"
                                    dataIndex="name"
                                    key="name"
                                    align="center"
                                    width={80}
                                    render={(tags, aa, index) => (
                                        <>
                                            {Number(
                                                `${
                                                    (pageOption.pageNo - 1) *
                                                        pageOption.pageSize +
                                                    (index + 1)
                                                }`,
                                            ) == 1 ? (
                                                <img src={first} />
                                            ) : Number(
                                                  `${
                                                      (pageOption.pageNo - 1) *
                                                          pageOption.pageSize +
                                                      (index + 1)
                                                  }`,
                                              ) == 2 ? (
                                                <img src={second} />
                                            ) : Number(
                                                  `${
                                                      (pageOption.pageNo - 1) *
                                                          pageOption.pageSize +
                                                      (index + 1)
                                                  }`,
                                              ) == 3 ? (
                                                <img src={thred} />
                                            ) : (
                                                <span>{`${
                                                    (pageOption.pageNo - 1) *
                                                        pageOption.pageSize +
                                                    (index + 1)
                                                }`}</span>
                                            )}
                                        </>
                                    )}
                                />
                                <Column
                                    title={'名称'}
                                    align="left"
                                    dataIndex="name"
                                    key="name"
                                    width={300}
                                    showSorterTooltip={true}
                                    onCell={function () {
                                        return {
                                            style: {
                                                maxWidth: 220,
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                cursor: 'pointer',
                                                color: '#7AA4FF',
                                            },
                                        };
                                    }}
                                    render={(tags, aa, index) => (
                                        <>
                                            {
                                                <Avatar
                                                    src="https://joeschmoe.io/api/v1/random"
                                                    shape={'circle'}
                                                    style={{
                                                        background: '#979797',
                                                        margin: '0 16px 0 5px',
                                                    }}
                                                />
                                            }
                                            <Tooltip
                                                placement="topLeft"
                                                title={tags}
                                            >
                                                {
                                                    <span
                                                        className={
                                                            exchangeRanking_ls.tableName
                                                        }
                                                    >
                                                        {tags}
                                                    </span>
                                                }
                                            </Tooltip>
                                        </>
                                    )}
                                />
                                <Column
                                    title={'交易额(ERB)'}
                                    align="right"
                                    width={220}
                                    dataIndex="ERB"
                                    key="ERB"
                                    showSorterTooltip={true}
                                    onCell={function () {
                                        return {
                                            style: {
                                                maxWidth: 220,
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            },
                                        };
                                    }}
                                ></Column>
                                <Column
                                    title={'交易量'}
                                    align="right"
                                    width={220}
                                    dataIndex="ERB"
                                    key="ERB"
                                    showSorterTooltip={true}
                                    onCell={function () {
                                        return {
                                            style: {
                                                maxWidth: 220,
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            },
                                        };
                                    }}
                                />
                                <Column
                                    title={'创建者'}
                                    align="left"
                                    dataIndex="name"
                                    key="name"
                                    showSorterTooltip={true}
                                    onCell={function () {
                                        return {
                                            style: {
                                                maxWidth: 300,
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                cursor: 'pointer',
                                                color: '#7AA4FF',
                                            },
                                        };
                                    }}
                                    render={(tags, aa, index) => (
                                        <>
                                            <Tooltip
                                                placement="topLeft"
                                                title={tags}
                                            >
                                                {
                                                    <span
                                                        className={
                                                            exchangeRanking_ls.tableName
                                                        }
                                                    >
                                                        {tags}
                                                    </span>
                                                }
                                            </Tooltip>
                                        </>
                                    )}
                                ></Column>
                            </Table>
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        </>
    );
}
