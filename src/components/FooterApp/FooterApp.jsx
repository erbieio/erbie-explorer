import FooterApp_ls from './FooterApp.less';
import { Tooltip, Button, message, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { history, Link } from 'umi';
export default function FooterApp() {
    function ErbieOfficialWebsite() {
        window.open('https://www.erbie.io');
    }
    function comingsoon() {
        message.warning('Coming Soon');
    }

    function ErbieWallet() {
        window.open('https://www.erbie.io/docs/wallet/');
    }
    //twitter跳转
    function twitter() {
        window.open('https://twitter.com/ErbieChain');
    }
    //Youtube
    function Youtube() {
        window.open('https://www.youtube.com/channel/UCB3-3LhjxsZk-vm47qwydgg');
    }
    //github
    function github() {
        window.open('https://github.com/erbieio/');
    }
    //discord跳转
    function discord() {
        window.open('https://discord.com/invite/N4ksH6tqRX');
    }
    //medium跳转
    function medium() {
        window.open('https://medium.erbie.io/');
    }
    //Telegram
    function Telegram() {
        window.open('https://t.me/erbieofficial');
    }
    //ins
    function ins() {
        window.open('https://www.instagram.com/erbiechain/');
    }
    return (
        <>
            <div className={FooterApp_ls.FooterAppbox}>
                <div className={FooterApp_ls.FooterAppBox_line}></div>
                <div className={FooterApp_ls.FooterAppBox_center}>
                    <p className={FooterApp_ls.FooterAppBox_title}>
                        Powered by Erbie
                    </p>
                    <p className={FooterApp_ls.FooterAppBox_text}>
                        Erbie Scan is a Block Explorer and Analytics Platform
                        for Erbie
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
                        <ul className={FooterApp_ls.FooterBox_textBox_right_ul}>
                            <li
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_lititle
                                }
                            >
                                About US
                            </li>

                            <li
                                onClick={ErbieWallet}
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                Limino & Tutorial
                            </li>
                            <li
                                onClick={ErbieOfficialWebsite}
                                className={
                                    FooterApp_ls.FooterBox_textBox_right_ul_li
                                }
                            >
                                Erbie Website
                            </li>
                        </ul>
                    </div>
                    <p className={FooterApp_ls.FooterBox_bootomtext}>
                        Copyright © 2022 - Erbie
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
