import Footer_ls from './Footer.less';
import { Tooltip, Button, message, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { history, Link } from 'umi';
export default function Footer() {
    function AboutErbieBlockchain() {
        window.open('https://www.wormholes.com/docs/Overview');
    }
    function ErbieOfficialWebsite() {
        window.open('https://www.wormholes.com');
    }
    function comingsoon() {
        message.warning('Coming Soon');
    }
    function OneClickNFTMarketplace() {
        window.open('https://www.limino.com/#/bourse');
    }
    function ErbieWallet() {
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
            <div className={Footer_ls.FooterBox}>
                <div className={Footer_ls.FooterBox_line}></div>
                <div className={Footer_ls.FooterBox_textBox}>
                    <div className={Footer_ls.FooterBox_textBox_left}>
                        <p className={Footer_ls.FooterBox_textBox_left_p1}>
                            Powered by Erbie
                        </p>
                        <p className={Footer_ls.FooterBox_textBox_left_p2}>
                            Erbie Scan is a Block Explorer and Analytics
                            Platform for Erbie
                        </p>
                        <div
                            className={Footer_ls.FooterBox_textBox_left_imgbox}
                        >
                            <Tooltip title="Blockchain Twitter">
                                <div
                                    onClick={twitter}
                                    className={
                                        Footer_ls.FooterBox_textBox_left_img1
                                    }
                                />
                            </Tooltip>
                            {/* <Tooltip title="NFT Twitter">
                                <img className={Footer_ls.FooterBox_textBox_left_img} src={require('../../assets/images/Footer/NFT twitter.png')} /> 
                            </Tooltip> */}
                            <Tooltip title="Instagram">
                                <div
                                    onClick={ins}
                                    className={
                                        Footer_ls.FooterBox_textBox_left_img3
                                    }
                                />
                            </Tooltip>
                            <Tooltip title="Discord">
                                <div
                                    onClick={discord}
                                    className={
                                        Footer_ls.FooterBox_textBox_left_img4
                                    }
                                />
                            </Tooltip>
                            <Tooltip title="Telegram">
                                <div
                                    onClick={Telegram}
                                    className={
                                        Footer_ls.FooterBox_textBox_left_img5
                                    }
                                />
                            </Tooltip>
                            <Tooltip title="Github">
                                <div
                                    onClick={github}
                                    className={
                                        Footer_ls.FooterBox_textBox_left_img6
                                    }
                                />
                            </Tooltip>
                            <Tooltip title="Medium">
                                <div
                                    onClick={medium}
                                    className={
                                        Footer_ls.FooterBox_textBox_left_img7
                                    }
                                />
                            </Tooltip>
                            <Tooltip title="YouTube">
                                <div
                                    onClick={Youtube}
                                    className={
                                        Footer_ls.FooterBox_textBox_left_img8
                                    }
                                />
                            </Tooltip>
                        </div>
                        <p className={Footer_ls.FooterBox_textBox_left_p3}>
                            Copyright © 2022 - Erbie
                        </p>
                    </div>
                    <div className={Footer_ls.FooterBox_textBox_right}>
                        {/* <ul className={Footer_ls.FooterBox_textBox_right_ul}>
                            <li
                                className={
                                    Footer_ls.FooterBox_textBox_right_ul_lititle
                                }
                            >
                                About Us
                            </li>
                            <li
                                onClick={AboutErbieBlockchain}
                                className={
                                    Footer_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                About Erbie Blockchain
                            </li>
                            
                        </ul> */}
                        {/* <ul className={Footer_ls.FooterBox_textBox_right_ul}>
                            <li
                                className={
                                    Footer_ls.FooterBox_textBox_right_ul_lititle
                                }
                            >
                                Erbie Applications
                            </li>
                            <li
                                onClick={NFTMarketplaceTutorial}
                                className={
                                    Footer_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                NFT Marketplace Tutorial
                            </li>
                            <li
                                onClick={OneClickNFTMarketplace}
                                className={
                                    Footer_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                One-Click NFT Marketplace
                            </li>
                        </ul> */}
                        <ul className={Footer_ls.FooterBox_textBox_right_ul}>
                            <li
                                className={
                                    Footer_ls.FooterBox_textBox_right_ul_lititle
                                }
                            >
                                About US
                            </li>
                            {/* <li
                                onClick={wiki}
                                className={
                                    Footer_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                Erbie Technology Wiki
                            </li> */}
                            {/* <li onClick={download} className={Footer_ls.FooterBox_textBox_right_ul_li}>
                            Erbie Whitepaper
                            </li> */}
                            <li
                                onClick={ErbieWallet}
                                className={
                                    Footer_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                Limino & Tutorial
                            </li>
                            <li
                                onClick={ErbieOfficialWebsite}
                                className={
                                    Footer_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                Erbie Website
                            </li>
                        </ul>
                    </div>
                    <div className={Footer_ls.FooterBox_bottomlinkblock}>
                        <Link
                            className={Footer_ls.FooterBox_textBox_right_ul_li}
                            to={{ pathname: '/PrivacyNotice', state: '' }}
                        >
                            Privacy Notice
                        </Link>
                        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <Link
                            className={Footer_ls.FooterBox_textBox_right_ul_li}
                            to={{ pathname: '/TermsOfService', state: '' }}
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
