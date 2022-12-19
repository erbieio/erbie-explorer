import Ranking_ls from './RankingApp.less';
import { Radio, Tooltip, Avatar, Button } from 'antd';
import { useState, useEffect } from 'react';
import first from '../../assets/images/Ranking/first.png';
import second from '../../assets/images/Ranking/second.png';
import thred from '../../assets/images/Ranking/thred.png';
import market from '../../assets/images/Ranking/market.png';
import snft from '../../assets/images/Ranking/snft.png';
import nft from '../../assets/images/Ranking/nft.png';
// import { history } from '../../.umi/core/history';
import { encode, decode } from 'js-base64';
import {
    rankingExchanger,
    rankingSnft,
    rankingNft,
} from '../../api/request_data/Ranking_request';
import { Link, history } from 'umi';
// let rankMoney = [];
// let SNFTMoney = [];
// let NFTMoney = [];
function b64Encode(str) {
    return btoa(encodeURIComponent(str));
}

// 解码
function b64Decode(str) {
    return decodeURIComponent(atob(str));
}
export default function Ranking() {
    const [params, setParams] = useState({ page: 1, page_size: 20 });
    const [SNFTparams, setSNFTParams] = useState({ page: 1, page_size: 20 });
    const [NFTparams, setNFTParams] = useState({ page: 1, page_size: 20 });
    const [exchangeData, updata] = useState([]);
    const [SNFTData, SNFTupdata] = useState([]);
    const [NFTData, NFTupdata] = useState([]);
    const [menuList, setMenuList] = useState([
        {
            name: 'Marketplace Rankings',
            select: true,
        },
        {
            name: 'SNFT Rankings',
            select: false,
        },
        {
            name: 'NFT Rankings',
            select: false,
        },
    ]);
    let [rankMoney, updatarankMoney] = useState([]);
    let [SNFTMoney, SNFTupdataSNFTMoney] = useState([]);
    let [NFTMoney, NFTupdataNFTMoney] = useState([]);
    let [exchangeDatanum, updataexchangeDatanum] = useState(1);
    let [SNFTDatanum, SNFTupdataSNFTDatanum] = useState(1);
    let [NFTDatanum, NFTupdataNFTDatanum] = useState(1);
    let RankingExchangeBoxUl;
    let RankingSNFTBoxUl;
    let RankingNFTBoxUl;
    const [height, setHeight] = useState('39px');
    const onLoad = () => {
        document.getElementById(
            'contentIFrame',
        ).contentWindow.document.body.style.height = '39px';
        document.getElementById(
            'contentIFrame',
        ).contentWindow.document.body.style.width = '39px';
    };
    useEffect(() => {
        RankingExchangeBoxUl = document.getElementById('RankingExchangeBoxUl');
        console.log(RankingExchangeBoxUl);
        RankingExchangeBoxUl.addEventListener('scroll', handleScroll);
        let didCancel = false;
        (async () => {
            const res = await rankingExchanger(params);
            // updata(res);
            if (!didCancel && res && res.exchangers) {
                let exchangers = [...res.exchangers];
                // exchangers = exchangers.map((item) => {
                //     try {
                // item.name = decode(item.name);
                //         return item;
                //     } catch {
                //         return item;
                //     }
                // });
                rankMoney.push(...exchangers);
                let rankExchange = Array.from(new Set(rankMoney));
                console.log(rankExchange);
                updata(rankExchange);
            }
        })();
        return () => {
            didCancel = true;
            RankingExchangeBoxUl.removeEventListener('scroll', handleScroll);
            // setStart(false)
        };
    }, [params]);
    const handleScroll = (event) => {
        //scroll height
        let clientHeight = RankingExchangeBoxUl.clientHeight; //clientHeight
        let scrollTop = RankingExchangeBoxUl.scrollTop; //scrollTop
        let scrollHeight = RankingExchangeBoxUl.scrollHeight; //scrollHeight
        if (clientHeight + scrollTop == scrollHeight) {
            exchangeDatanum++;
            updataexchangeDatanum(exchangeDatanum);
            setParams({ page: exchangeDatanum, page_size: 10 });
        }
    };
    useEffect(() => {
        RankingSNFTBoxUl = document.getElementById('RankingSNFTBoxUl');
        console.log(RankingSNFTBoxUl);
        RankingSNFTBoxUl.addEventListener('scroll', SNFThandleScroll);
        let didCancel = false;
        (async () => {
            const res = await rankingSnft(SNFTparams);
            if (!didCancel && res && res.nfts) {
                SNFTMoney.push(...res.nfts);
                let rankExchange = Array.from(new Set(SNFTMoney));
                SNFTupdata(rankExchange);
            }
        })();
        return () => {
            didCancel = true;
            RankingSNFTBoxUl.removeEventListener('scroll', SNFThandleScroll);
            // setStart(false)
        };
    }, [SNFTparams]);
    const SNFThandleScroll = (event) => {
        console.log('SNFT');
        //scroll height
        let clientHeight = RankingSNFTBoxUl.clientHeight; //clientHeight
        let scrollTop = RankingSNFTBoxUl.scrollTop; //scrollTop
        let scrollHeight = RankingSNFTBoxUl.scrollHeight; //scrollHeight
        if (clientHeight + scrollTop == scrollHeight) {
            SNFTDatanum++;
            SNFTupdataSNFTDatanum(SNFTDatanum);
            setSNFTParams({ page: SNFTDatanum, page_size: 10 });
            // console.log({limit:size,pageNo:exchangeDatanum,page_size:10})
        }
    };
    useEffect(() => {
        let data = document.getElementById('contentIFrame');
        console.log(data);
        // data.style.width = "39px";
        // data.style.height = "39px";
        RankingNFTBoxUl = document.getElementById('RankingNFTBoxUl');
        console.log(RankingNFTBoxUl);
        RankingNFTBoxUl.addEventListener('scroll', NFThandleScroll);
        let didCancel = false;
        (async () => {
            const res = await rankingNft(NFTparams);
            if (!didCancel && res && res.nfts) {
                NFTMoney.push(...res.nfts);
                let rankExchange = Array.from(new Set(NFTMoney));
                NFTupdata(rankExchange);
                // console.log(NFTMoney)
            }
        })();
        return () => {
            didCancel = true;
            RankingNFTBoxUl.removeEventListener('scroll', NFThandleScroll);
            // setStart(false)
        };
    }, [NFTparams]);
    const NFThandleScroll = (event) => {
        //scroll height
        let clientHeight = RankingNFTBoxUl.clientHeight; //clientHeight
        let scrollTop = RankingNFTBoxUl.scrollTop; //scrollTop
        let scrollHeight = RankingNFTBoxUl.scrollHeight; //scrollHeight
        if (clientHeight + scrollTop == scrollHeight) {
            NFTDatanum++;
            NFTupdataNFTDatanum(NFTDatanum);
            setNFTParams({ page: NFTDatanum, page_size: 10 });
            // console.log({limit:size,pageNo:NFTDatanum,page_size:10})
        }
    };
    // useEffect(() => {
    //     if (menuList[0].select) {
    //         RankingExchangeBoxUl = document.getElementById('RankingExchangeBoxUl');
    //         console.log(RankingExchangeBoxUl);
    //         RankingExchangeBoxUl.addEventListener('scroll', handleScroll);
    //     }
    //     if (menuList[1].select) {
    //         RankingSNFTBoxUl = document.getElementById('RankingSNFTBoxUl');
    //         console.log(RankingSNFTBoxUl);
    //         RankingSNFTBoxUl.addEventListener('scroll', SNFThandleScroll);
    //     }
    //     if (menuList[2].select) {
    //         RankingNFTBoxUl = document.getElementById('RankingNFTBoxUl');
    //         console.log(RankingNFTBoxUl);
    //         RankingNFTBoxUl.addEventListener('scroll', NFThandleScroll);
    //     }
    // }, [menuList]);
    function handleClick(e) {
        if (e == 'Ranking') {
            history.push('/ranking');
        } else if (e == 'exchangeRanking') {
            history.push('/exchangeRanking');
        } else if (e == 'SNFTRanking') {
            history.push('/SNFTRanking');
        } else if (e == 'NFTRanking') {
            history.push('/NFTRanking');
        }
    }
    function cancalHex18(hex) {
        if (hex) {
            return hex / 1000000000000000000;
        } else {
            return 0;
        }
    }
    return (
        <>
            <div className={Ranking_ls.RankingBox}>
                <div
                    className={Ranking_ls.RankingExchangeBox}
                    id={'RankingExchangeBox'}
                    style={menuList[0].select ? {} : { display: 'none' }}
                >
                    <div
                        className={Ranking_ls.RankingTop}
                        style={{ backgroundImage: `url(${market})` }}
                    >
                        <div className={Ranking_ls.RankingExchangeTitle}>
                            <ul>
                                Marketplace
                                <br />
                                Rankings
                            </ul>
                        </div>
                        <div className={Ranking_ls.RankingNFTButton}>
                            {menuList.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={
                                            item.select == true
                                                ? Ranking_ls.listButtonSel
                                                : Ranking_ls.listButton
                                        }
                                        onClick={() => {
                                            let newList = [...menuList];
                                            newList.forEach((item) => {
                                                item.select = false;
                                            });
                                            newList[index].select = true;
                                            setMenuList(newList);
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div
                        className={Ranking_ls.RankingExchangeBoxUl}
                        id={'RankingExchangeBoxUl'}
                    >
                        {exchangeData.map((person, index) => (
                            <Link
                                to={{
                                    pathname: '/ExchangeApp/ExchangeDetailsApp',
                                    state: {
                                        exchangeid: person.address,
                                    },
                                }}
                                style={{ color: 'white' }}
                            >
                                <ul
                                    key={index}
                                    className={
                                        Ranking_ls.RankingExchangeBoxCard
                                    }
                                >
                                    {Number(index + 1) == 1 ? (
                                        <img src={first} />
                                    ) : Number(index + 1) == 2 ? (
                                        <img src={second} />
                                    ) : Number(index + 1) == 3 ? (
                                        <img src={thred} />
                                    ) : (
                                        <span>{Number(index + 1)}</span>
                                    )}

                                    {/*<Avatar*/}
                                    {/*    src="https://joeschmoe.io/api/v1/random"*/}
                                    {/*    shape={'circle'}*/}
                                    {/*    style={{*/}
                                    {/*        background: '#979797',*/}
                                    {/*        margin: '0 16px 0 5px',*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                    <li>
                                        <p title={person.name}>{person.name}</p>
                                        <p
                                            title={cancalHex18(
                                                person.tx_amount,
                                            )}
                                        >
                                            {cancalHex18(person.tx_amount)}
                                        </p>
                                    </li>
                                </ul>
                            </Link>
                        ))}
                    </div>
                    {/*<div className={Ranking_ls.BottomButton}>*/}
                    {/*    <Button*/}
                    {/*        onClick={handleClick.bind(this, 'exchangeRanking')}*/}
                    {/*    >*/}
                    {/*        查看更多*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>
                <div
                    className={Ranking_ls.RankingSNFTBox}
                    id={'RankingSNFTBox'}
                    style={menuList[1].select ? {} : { display: 'none' }}
                >
                    <div
                        className={Ranking_ls.RankingTop}
                        style={{ backgroundImage: `url(${snft})` }}
                    >
                        <div className={Ranking_ls.RankingSNFTTitle}>
                            <ul>
                                S-NFT
                                <br />
                                Rankings
                            </ul>
                        </div>
                        <div className={Ranking_ls.RankingNFTButton}>
                            {menuList.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={
                                            item.select == true
                                                ? Ranking_ls.listButtonSel
                                                : Ranking_ls.listButton
                                        }
                                        onClick={() => {
                                            let newList = [...menuList];
                                            newList.forEach((item) => {
                                                item.select = false;
                                            });
                                            newList[index].select = true;
                                            console.log(newList);
                                            setMenuList(newList);
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div
                        className={Ranking_ls.RankingSNFTBoxUl}
                        id={'RankingSNFTBoxUl'}
                    >
                        {SNFTData.map((person, index) => (
                            <Link
                                to={{
                                    pathname: '/SNFTApp/SNFTDetailsApp',
                                    state: {
                                        snftid: person.address,
                                        snftmata: person,
                                    },
                                }}
                                style={{ color: 'white' }}
                            >
                                <ul
                                    key={index}
                                    className={Ranking_ls.RankingSNFTBoxCard}
                                >
                                    {Number(index + 1) == 1 ? (
                                        <img
                                            className={Ranking_ls.award}
                                            src={first}
                                        />
                                    ) : Number(index + 1) == 2 ? (
                                        <img
                                            className={Ranking_ls.award}
                                            src={second}
                                        />
                                    ) : Number(index + 1) == 3 ? (
                                        <img
                                            className={Ranking_ls.award}
                                            src={thred}
                                        />
                                    ) : (
                                        <span>{Number(index + 1)}</span>
                                    )}
                                    <Avatar
                                        src={person.source_url}
                                        shape={'circle'}
                                        style={{
                                            background: '#979797',
                                            height: '24px',
                                            width: '24px',
                                            marginTop: '6px',
                                        }}
                                    />
                                    <li>
                                        <p title={person.name}>{person.name}</p>
                                        <p
                                            title={cancalHex18(
                                                person.tx_amount,
                                            )}
                                        >
                                            {cancalHex18(person.tx_amount)}
                                        </p>
                                    </li>
                                </ul>
                            </Link>
                        ))}
                    </div>
                    {/*<div className={Ranking_ls.BottomButton}>*/}
                    {/*    <Button onClick={handleClick.bind(this, 'SNFTRanking')}>*/}
                    {/*        查看更多*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>
                <div
                    className={Ranking_ls.RankingNFTBox}
                    id={'RankingNFTBox'}
                    style={menuList[2].select ? {} : { display: 'none' }}
                >
                    <div
                        className={Ranking_ls.RankingTop}
                        style={{ backgroundImage: `url(${nft})` }}
                    >
                        <div className={Ranking_ls.RankingNFTTitle}>
                            <ul>
                                NFT
                                <br />
                                Rankings
                            </ul>
                        </div>
                        <div className={Ranking_ls.RankingNFTButton}>
                            {menuList.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={
                                            item.select == true
                                                ? Ranking_ls.listButtonSel
                                                : Ranking_ls.listButton
                                        }
                                        onClick={() => {
                                            let newList = [...menuList];
                                            newList.forEach((item) => {
                                                item.select = false;
                                            });
                                            newList[index].select = true;
                                            console.log(newList);
                                            setMenuList(newList);
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div
                        className={Ranking_ls.RankingNFTBoxUl}
                        id={'RankingNFTBoxUl'}
                    >
                        {NFTData.map((person, index) => (
                            <Link
                                to={{
                                    pathname: '/NFTApp/NFTDetailsApp',
                                    state: { nftid: person },
                                }}
                                style={{ color: 'white' }}
                            >
                                <ul
                                    key={index}
                                    className={Ranking_ls.RankingNFTBoxCard}
                                >
                                    {Number(index + 1) == 1 ? (
                                        <img
                                            className={Ranking_ls.award}
                                            src={first}
                                        />
                                    ) : Number(index + 1) == 2 ? (
                                        <img
                                            className={Ranking_ls.award}
                                            src={second}
                                        />
                                    ) : Number(index + 1) == 3 ? (
                                        <img
                                            className={Ranking_ls.award}
                                            src={thred}
                                        />
                                    ) : (
                                        <span>{Number(index + 1)}</span>
                                    )}
                                    <Avatar
                                        src={person.source_url}
                                        shape={'circle'}
                                        style={{
                                            background: '#979797',
                                            height: '24px',
                                            width: '24px',
                                            marginTop: '6px',
                                        }}
                                    >
                                        {person.category == 'Music'
                                            ? 'Audio'
                                            : 'Video'}
                                    </Avatar>
                                    {/*<iframe*/}
                                    {/*    style={{width:"39px",height:"39px"}}*/}
                                    {/*    src={person.source_url}*/}
                                    {/*    scrolling={'no'} border={'0'} frameBorder={'no'} framespacing={'0'}*/}
                                    {/*    allowFullScreen={'true'}*/}
                                    {/*    onLoad={onLoad}*/}
                                    {/*    id={"contentIFrame"}*/}
                                    {/*/>*/}

                                    <li>
                                        <p title={person.name}>{person.name}</p>
                                        <p
                                            title={cancalHex18(
                                                person.tx_amount,
                                            )}
                                        >
                                            {cancalHex18(person.tx_amount)}
                                        </p>
                                    </li>
                                </ul>
                            </Link>
                        ))}
                    </div>
                    {/*<div className={Ranking_ls.BottomButton}>*/}
                    {/*    <Button onClick={handleClick.bind(this, 'NFTRanking')}>*/}
                    {/*        查看更多*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
}
