import FooterApp_ls from './FooterApp.less';
import { Tooltip, Button, message, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { history, Link } from 'umi';
export default function FooterApp() {
    function AboutWormholesBlockchain() {
        window.open('https://www.wormholes.com/docs/Overview');
    }
    function WormholesOfficialWebsite() {
        window.open('https://www.wormholes.com');
    }
    function comingsoon() {
        message.warning('Coming Soon');
    }
    function OneClickNFTMarketplace() {
        window.open('https://www.limino.com/#/bourse');
    }
    function WormholesWallet() {
        window.open('https://www.wormholes.com/docs/wallet/');
    }
    //NFTMarketplaceTutorial
    function NFTMarketplaceTutorial() {
        window.open('https://www.wormholes.com/docs/WormholesExchange/');
    }
    //wiki
    function wiki() {
        window.open('https://www.wormholes.com/docs/#/');
    }
    //twitter跳转
    function twitter() {
        window.open('https://twitter.com/WormholesChain');
    }
    //NFTMarketplaceTutorial
    function NFTMarketplaceTutorial() {
        window.open('https://www.wormholes.com/docs/WormholesExchange/');
    }
    //Youtube
    function Youtube() {
        window.open('https://www.youtube.com/channel/UCB3-3LhjxsZk-vm47qwydgg');
    }
    //ins
    function ins() {
        window.open('https://www.instagram.com/wormholeschain/');
    }
    //github
    function github() {
        window.open('https://github.com/wormholes-org');
    }
    //discord跳转
    function discord() {
        window.open('https://discord.gg/N4ksH6tqRX');
    }
    //medium跳转
    function medium() {
        window.open('https://medium.com/wormholeschain-network');
    }
    //Telegram
    function Telegram() {
        window.open('https://t.me/wormholesofficial');
    }
    return (
        <>
            <div className={FooterApp_ls.FooterAppbox}>
                <div className={FooterApp_ls.FooterAppBox_line}></div>
                <div className={FooterApp_ls.FooterAppBox_center}>
                    <p className={FooterApp_ls.FooterAppBox_title}>
                        Powered by Wormholes
                    </p>
                    <p className={FooterApp_ls.FooterAppBox_text}>
                        Wormholes Scan is a Block Explorer and Analytics
                        Platform for Wormholes
                    </p>
                    <div className={FooterApp_ls.FooterBox_textBox_left_imgbox}>
                        <Tooltip title="Blockchain Twitter">
                            <div
                                onClick={twitter}
                                className={
                                    FooterApp_ls.FooterBox_textBox_left_img1
                                }
                            />
                        </Tooltip>
                        {/* <Tooltip title="NFT Twitter">
                            <img className={FooterApp_ls.FooterBox_textBox_left_img} src={require('../../assets/images/Footer/NFT twitter.png')} /> 
                        </Tooltip> */}
                        <Tooltip title="Instagram">
                            <div
                                onClick={ins}
                                className={
                                    FooterApp_ls.FooterBox_textBox_left_img3
                                }
                            />
                        </Tooltip>
                        <Tooltip title="Discord">
                            <div
                                onClick={discord}
                                className={
                                    FooterApp_ls.FooterBox_textBox_left_img4
                                }
                            />
                        </Tooltip>
                        <Tooltip title="Telegram">
                            <div
                                onClick={Telegram}
                                className={
                                    FooterApp_ls.FooterBox_textBox_left_img5
                                }
                            />
                        </Tooltip>
                        <Tooltip title="Github">
                            <div
                                onClick={github}
                                className={
                                    FooterApp_ls.FooterBox_textBox_left_img6
                                }
                            />
                        </Tooltip>
                        <Tooltip title="Medium">
                            <div
                                onClick={medium}
                                className={
                                    FooterApp_ls.FooterBox_textBox_left_img7
                                }
                            />
                        </Tooltip>
                        <Tooltip title="YouTube">
                            <div
                                onClick={Youtube}
                                className={
                                    FooterApp_ls.FooterBox_textBox_left_img8
                                }
                            />
                        </Tooltip>
                    </div>
                    <div className={FooterApp_ls.FooterBox_textBox_right}>
                        {/* <ul className={FooterApp_ls.FooterBox_textBox_right_ul}>
                            <li
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_lititle
                                }
                            >
                                About Us
                            </li>
                            <li
                                onClick={AboutWormholesBlockchain}
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                About Wormholes Blockchain
                            </li>
                            
                        </ul> */}
                        {/* <ul className={FooterApp_ls.FooterBox_textBox_right_ul}>
                            <li
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_lititle
                                }
                            >
                                Wormholes Applications
                            </li>
                            <li
                                onClick={NFTMarketplaceTutorial}
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                NFT Marketplace Tutorial
                            </li>
                            <li
                                onClick={OneClickNFTMarketplace}
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                One-Click NFT Marketplace
                            </li>
                        </ul> */}
                        <ul className={FooterApp_ls.FooterBox_textBox_right_ul}>
                            <li
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_lititle
                                }
                            >
                                About US
                            </li>
                            {/* <li
                                onClick={wiki}
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                Wormholes Technology Wiki
                            </li> */}
                            {/* <li onClick={download} className={FooterApp_ls.FooterBox_textBox_right_ul_li}>
                            Wormholes Whitepaper
                            </li> */}
                            <li
                                onClick={WormholesWallet}
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                Limino & Tutorial
                            </li>
                            <li
                                onClick={WormholesOfficialWebsite}
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                Wormholes Official Website
                            </li>
                        </ul>
                    </div>
                    <p className={FooterApp_ls.FooterBox_bootomtext}>
                        Copyright © 2022 - Wormholes
                    </p>
                    <p className={FooterApp_ls.FooterBox_bootomtext2}>
                        <Link
                            to={{ pathname: '/PrivacyNoticeApp', state: '' }}
                            className={FooterApp_ls.FooterBox_bootomlink}
                        >
                            Privacy Notice
                        </Link>
                        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <Link
                            to={{ pathname: '/TermsOfServiceApp', state: '' }}
                            className={FooterApp_ls.FooterBox_bootomlink}
                        >
                            Terms of Service
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
