import MapBs_ls2 from './MapBs2.less';
/* eslint-disable no-eval */
import React, { useState, useEffect } from 'react';
import { Flow } from '@antv/l7plot';
import {
    locations,
    lastmsg,
    onlineAddr,
} from '../../api/request_data/block_request';
export default function MapBs2() {
    const [textbs, setTextbs] = useState(0);

    //地图数据
    const [mapdata, setMapdata] = useState([]);
    const [mapdatadetailed, setMapdatadetailed] = useState([]);
    const [colordata, setColordata] = useState(4);
    const [colordata2, setColordata2] = useState(6);
    const [colordata3, setColordata3] = useState(8);
    const [colordata4, setColordata4] = useState(2);
    const [timedata, setTimedata] = useState(0);
    //线
    const [linecolor, setLinecolor] = useState(0);
    const [linedata, setLinedata] = useState([]);
    //在线验证者
    const [validatoronline, setValidatoronline] = useState([]);
    //在线验证者下标
    const [subscript, setSubscript] = useState([]);
    //不在线验证者下标
    const [nosubscript, setNosubscript] = useState([]);

    //地图数据查询
    const locations_q = async () => {
        const data = await locations();
        //console.log('地图数据查询');
        //console.log(data);
        if (data) {
            setMapdatadetailed(data);
        }
    };
    const onlineAddr_q = async (item) => {
        const data = await onlineAddr(item);
        if (data) {
            setValidatoronline(data.addrs);
        }
        //console.log('验证者在线查询');
        //console.log(data);
    };
    //地图fromto数据查询
    const lastmsg_q = async () => {
        const data = await lastmsg();
        //console.log('地图fromto数据查询');
        //console.log(data);
        //console.log(mapdatadetailed);
        // let text = []
        if (mapdatadetailed && data) {
            let text = data;
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < mapdatadetailed.length; j++) {
                    if (data[i].from == mapdatadetailed[j].proxy) {
                        text[i].from = [
                            mapdatadetailed[j].longitude,
                            mapdatadetailed[j].latitude,
                        ];
                    }
                }
            }
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < mapdatadetailed.length; j++) {
                    if (data[i].to == mapdatadetailed[j].proxy) {
                        text[i].to = [
                            mapdatadetailed[j].longitude,
                            mapdatadetailed[j].latitude,
                        ];
                    }
                }
            }
            let linedata = [];
            linedata.push(text[0]);
            for (let b = 0; b < text.length; b++) {
                let count = 0;
                for (let a = 0; a < linedata.length; a++) {
                    if (
                        linedata[a].from[0] === text[b].from[0] &&
                        linedata[a].from[1] === text[b].from[1] &&
                        linedata[a].to[0] === text[b].to[0] &&
                        linedata[a].to[1] === text[b].to[1]
                    ) {
                        count++;
                    }
                }
                if (count == 0) {
                    linedata.push(text[b]);
                }
            }
            //console.log(linedata);
            setLinedata(linedata);
        }
        if (data == null) {
            let text = [];
            // text.push({ from: [20.3522, 48.8566], to: [-74.006, 40.7128] });
            // text.push({ from: [60.3522, 48.8566], to: [-74.006, 40.7128] });
            setLinedata(text);
        }
    };
    useEffect(() => {
        locations_q();
        onlineAddr_q();
    }, []);
    useEffect(() => {
        if (validatoronline.length != 0 && mapdatadetailed.length != 0) {
            //console.log(validatoronline);
            //console.log(mapdatadetailed);
            let text1 = [];
            for (let i = 0; i < validatoronline.length; i++) {
                for (let k = 0; k < mapdatadetailed.length; k++) {
                    if (validatoronline[i] == mapdatadetailed[k].proxy) {
                        text1.push(mapdatadetailed[k]);
                    }
                }
            }
            //console.log(text1);
            let text = [];
            let mapdzx = [];
            let mapdbzx = [];
            for (let i = 0; i < mapdatadetailed.length; i++) {
                let arry1 = [];
                let judge = true;
                if (i != 0) {
                    for (let j = 0; j < text.length; j++) {
                        if (
                            text[j][0] == mapdatadetailed[i].longitude &&
                            text[j][1] == mapdatadetailed[i].latitude
                        ) {
                            judge = false;
                        }
                    }
                    if (judge == true) {
                        arry1.push(mapdatadetailed[i].longitude);
                        arry1.push(mapdatadetailed[i].latitude);
                        text.push(arry1);
                        for (let k = 0; k < text1.length; k++) {
                            if (
                                text1[k].address == mapdatadetailed[i].address
                            ) {
                                mapdzx.push(text.length - 1);
                            }
                        }
                    }
                } else {
                    arry1.push(mapdatadetailed[i].longitude);
                    arry1.push(mapdatadetailed[i].latitude);
                    text.push(arry1);
                    for (let k = 0; k < text1.length; k++) {
                        if (text1[k].address == mapdatadetailed[i].address) {
                            mapdzx.push(text.length - 1);
                        }
                    }
                }
            }
            for (let i = 0; i < text.length; i++) {
                mapdbzx.push(i);
            }
            let mathjs = 0;
            let mapdbzxBS = [];
            for (let i = 0; i < mapdbzx.length; i++) {
                for (let k = 0; k < mapdzx.length; k++) {
                    if (mapdbzx[i] != mapdzx[k]) {
                        mathjs++;
                    }
                }
                if (mathjs == mapdzx.length) {
                    mapdbzxBS.push(mapdbzx[i]);
                }
                mathjs = 0;
            }

            //console.log(mapdzx);
            //console.log(mapdbzx);
            //console.log(mapdbzxBS);
            //console.log(text);
            setMapdata(text);
            setSubscript(mapdzx);
            setNosubscript(mapdbzxBS);
        }
    }, [validatoronline, mapdatadetailed]);
    useEffect(() => {
        if (mapdatadetailed.length != 0) {
            lastmsg_q();
        }
    }, [mapdatadetailed]);
    fetch('https://gw.alipayobjects.com/os/antfincdn/SIybYh6xr1/arc.json')
        .then((response) => response.json())
        .then((data) => {
            new Flow('container', {
                map: {
                    type: 'amap',
                    center: [116.3956, 39.9392],
                    pitch: 0,
                    style: 'amap://styles/darkblue',
                    zoom: 0.5,
                    token: 'e00bfb2fbdcfc81541c479269ebf53ec',
                    viewMode: '2D',
                    showLabel: false,
                    logoVisible: false,
                },
                source: {
                    data: data,
                    parser: {
                        type: 'json',
                        x: 'x1',
                        y: 'y1',
                        x1: 'x',
                        y1: 'y',
                    },
                },
                autoFit: true,
                shape: 'arc',
                size: 1.5,
                color: {
                    field: 'count',
                    value: ['rgba(1,124,247,0.9)', 'rgba(230,129,28,0.9)'],
                    scale: { type: 'quantize' },
                },
                style: {
                    opacity: 0.8,
                    segmentNumber: 60,
                },
                animate: {
                    interval: 2,
                    trailLength: 1,
                    duration: 2,
                },
                radiation: {
                    color: 'white',
                    size: 30,
                },
                label: {
                    visible: true,
                    field: 'count',
                    style: {
                        fill: '#000',
                        opacity: 0.8,
                        fontSize: 10,
                        stroke: '#fff',
                        strokeWidth: 2,
                        textAllowOverlap: false,
                        padding: [5, 5],
                        textOffset: [0, 35],
                    },
                },
                zoom: {
                    position: 'bottomright',
                },
                scale: {
                    position: 'bottomright',
                },
                layerMenu: {
                    position: 'topright',
                },
                legend: {
                    position: 'bottomleft',
                },
            });
        });

    return (
        <>
            <div id="container" className={MapBs_ls2.MapBsBox}></div>
        </>
    );
}
