import SearchBox_le from './SearchBox.less';
import { GoTriangleDown } from 'react-icons/go';
import { BsSearch } from 'react-icons/bs';
import { Select, message } from 'antd';
import { history } from 'umi';
export default function SearchBox() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    //搜索按钮
    function homepageinputclick() {
        // location.reload()
        let data = document.getElementById('homepageinput').value;
        console.log(data);
        if (data) {
            if (
                Number(data) == data &&
                data.slice(0, 2) != '0x' &&
                data.slice(0, 2) != '0X'
            ) {
                localStorage.setItem('blocktext', JSON.stringify(data));
                //  location.reload()
                // 区块
                history.push({
                    pathname: '/NullPage',
                    state: {
                        blockid: data,
                    },
                });
            } else if (
                (data.slice(0, 2) == '0x' || data.slice(0, 2) == '0X') &&
                data.length == 42
            ) {
                //账户详情
                history.push({
                    pathname: `/AccountDetail/${data}`,
                    state: data,
                });
            } else if (
                (data.slice(0, 2) == '0x' || data.slice(0, 2) == '0X') &&
                data.length == 66
            ) {
                //交易hash
                history.push({
                    pathname: `/TradeDetail/${data}`,
                    state: data,
                });
            }
        } else {
            message.error('Cannot be empty！');
        }
    }
    return (
        <>
            <div className={SearchBox_le.SearchBox}>
                <div
                    className={SearchBox_le.SearchBox_SearchBox_inputBox}
                    id="SearchBoxselect"
                >
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
                        className={
                            SearchBox_le.SearchBox_SearchBox_inputBox_select
                        }
                    >
                        <Option value="AllFilters">All Filters</Option>
                    </Select>
                    <input
                        placeholder="Search by Address / Txn Hash / Block / Token"
                        className={
                            SearchBox_le.SearchBox_SearchBox_inputBox_input
                        }
                        id="homepageinput"
                        autocomplete="off"
                    />
                </div>
                <div
                    className={SearchBox_le.SearchBox_Search}
                    onClick={homepageinputclick}
                >
                    <BsSearch />
                </div>
            </div>
        </>
    );
}
