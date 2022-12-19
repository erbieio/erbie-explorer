import styles from './index.less';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HeaderApp from '../components/HeaderApp/HeaderApp';
import HomePageApp from './HomePageApp/HomePageApp';
import FooterApp from '../components/FooterApp/FooterApp';
import React, { useState, useEffect, useContext } from 'react';
import {Helmet} from 'umi'
const params = window.location.search;
export default function IndexPage(props) {
  useEffect(() => {
    console.log(window.location.pathname);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (props.location.pathname != '/') {
      var i = 0
      var highestTimeoutId = setTimeout(";");
      for (var i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
      }
    }
    
  }, [props.location.pathname]);
  const getDevice = () => {
    let agent = navigator.userAgent.toLowerCase();
    // message.error(agent);
    let result = {
      device: (function () {
        if (/windows/.test(agent)) {
          return 'pc';
        } else if (/iphone|ipod/.test(agent) && /mobile/.test(agent)) {
          return 'mobilemove';
        } else if (/ipad/.test(agent) && /mobile/.test(agent)) {
          return 'mobilemove';
        } else if (/android/.test(agent)) {
          return 'mobile';
        } else if (/linux/.test(agent)) {
          return 'pc';
        } else if (/mac/.test(agent)) {
          return 'pc';
        } else {
          return 'pc';
        }
      })(),
    };
    return result;
  };
  return (
    <>
      <Helmet encodeSpecialCharacters={false}>
        <meta charSet="utf-8" />
        <title>
        Wormholes Blockchain Explorer
        </title>
        <link rel="shortcut ico" href="../assets/images/logo.ico" type='images/ico' />
        <script type="text/javascript" src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=b7zlNRGt9jMR0MrCk3tGldiREpd5Wi6Q"></script>
      </Helmet>
      {
        getDevice().device == 'pc' 
          ?
          <div className={
            window.location.hash == '#/'
            ?
              styles.IndexPageBox
              :
              window.location.hash == '#/BlockChain/BlockDetails'
                ||
                window.location.hash == '#/NFT/NFTDetails'
                ||
                window.location.hash == '#/SNFT/SNFTDetails'
                ||
                window.location.hash == '#/Exchange/ExchangeDetails'
                ||
                window.location.hash.split("/")[1] == 'TradeDetail'
                ||
                window.location.hash.split("/")[1] == 'AccountDetail'
                ||
                window.location.hash == '#/ComingSoon404'
                ?
                styles.IndexPageBox1
                :
                styles.IndexPageBox2
          }>
            <Header></Header>
            <div className={styles.IndexPageBox_d}>
                {
                window.location.hash == '#/BlockChain'
                  || window.location.hash == '#/NFT'
                  || window.location.hash == '#/SNFT'
                  || window.location.hash == '#/Exchange'
                  || window.location.hash == '#/Trade'
                  || window.location.hash == '#/ranking'
                  || window.location.hash == '#/Validator'
                  ?
                  <img className={styles.IndexPageBox_img} src={require('../assets/images/HomePage/4.png')} />
                  :
                  ''
                }
              {props.children}
            </div>
            <Footer></Footer>
            {
              window.location.hash == '#/'
                ?
                <img className={styles.indexBoximg} src={require('../assets/images/HomePage/back.png')} />
                :
                ''
            }
            
          </div>
          :
          <div className={styles.IndexPageBoxApp}>
            <HeaderApp />
            <div className={styles.IndexPageBox_d}>
              {
                window.location.hash == '#/'
                  ?
                  <HomePageApp />
                  :
                  props.children
              }
            </div>
            <FooterApp />
            {
              window.location.hash == '#/'
                ?
                <img className={styles.indexBoximgphone} src={require('../assets/images/HomePageApp/phone.png')} />
                :
                ''
            }
            
          </div>
      }
      
    </>
  );
}
