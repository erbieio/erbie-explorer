import MapBs_ls from './MapBs.less';
/* eslint-disable no-eval */
import React, { useState, useEffect } from 'react';
import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import {
    locations,
    lastmsg,
    onlineAddr,
} from '../../api/request_data/block_request';

export default function MapBs() {
    const geoUrl = require('./features.json');
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
    //地图图层
    const scene = new Scene({
        id: 'map',
        map: new GaodeMap({
            pitch: 40,
            center: [40, 40.16797],
            style: 'amap://styles/darkblue',
            zoom: 1,
            token: 'e00bfb2fbdcfc81541c479269ebf53ec',
            viewMode: '3D',
            showLabel: false,
            logoVisible: false,
            preserveDrawingBuffer: true,
        }),
    });
    //地图数据查询
    const locations_q = async () => {
        const data = await locations();
        console.log('地图数据查询');
        console.log(data);
        if (data) {
            setMapdatadetailed(data);
        }
    };
    const onlineAddr_q = async () => {
        const data = await onlineAddr();
        console.log('验证者在线查询');
        console.log(data);
        if (data) {
            setValidatoronline(data.addrs);
        }
    };
    //地图fromto数据查询
    const lastmsg_q = async () => {
        const data = await lastmsg();
        console.log('地图fromto数据查询');
        console.log(data);
        console.log(mapdatadetailed);
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
            console.log(linedata);
            setLinedata(linedata);
        }
        if (data == null) {
            let text = [];
            // text.push({ from: [20.3522, 48.8566], to: [-74.006, 40.7128] });
            // text.push({ from: [60.3522, 48.8566], to: [-74.006, 40.7128] });
            setLinedata(text);
        }
    };
    useEffect(() => {}, []);
    useEffect(() => {
        if (validatoronline.length != 0 && mapdatadetailed.length != 0) {
            console.log(validatoronline);
            console.log(mapdatadetailed);
            let text1 = [];
            for (let i = 0; i < validatoronline.length; i++) {
                for (let k = 0; k < mapdatadetailed.length; k++) {
                    if (validatoronline[i] == mapdatadetailed[k].proxy) {
                        text1.push(mapdatadetailed[k]);
                    }
                }
            }
            console.log(text1);
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

            console.log(mapdzx);
            console.log(mapdbzx);
            console.log(mapdbzxBS);
            console.log(text);
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

    // const scene = new Scene({
    //     id: 'map',
    //     map: new GaodeMap({
    //         pitch: 40,
    //         center: [40, 40.16797],
    //         style: 'dark',
    //         zoom: 2.5,
    //     }),
    // });
    // http://192.168.12.16:8080/#/MapBs
    scene.addImage('plane', require('../../assets/SVG/jiantou.svg'));

    scene.on('loaded', () => {
        Promise.all([locations(), onlineAddr()])
            .then(([data1, data2]) => {
                console.log('所有坐标');
                console.log(data1);
                console.log('在线者地址');
                console.log(data2.addrs);

                for (let i = 0; i < data1.length; i++) {
                    let count = 0;
                    for (let j = 0; j < data2.addrs.length; j++) {
                        if (data1[i].proxy == data2.addrs[j]) {
                            count++;
                        }
                    }
                    if (count > 0) {
                        data1[i].online = 1;
                    } else {
                        data1[i].online = 0;
                    }
                }
                console.log(data1);

                let dian = [
                    {
                        longitude: 2.1971,
                        latitude: 48.7855,
                    },
                ];
                let line = [
                    { from: '20.3522, 48.8566', to: '-74.006, 40.7128' },
                    { from: '60.3522, 48.8566', to: '-74.006, 40.7128' },
                    {
                        from: '104.195397, 35.86166',
                        to: '100.992541, 15.870032',
                    },
                    {
                        from: '104.195397, 35.86166',
                        to: '114.727669, 4.535277',
                    },
                    {
                        from: '104.195397, 35.86166',
                        to: '9.501785, 56.26392',
                    },
                ];
                const dotData = eval(data1);
                // @ts-ignore
                const flydata = eval(line).map((item) => {
                    // @ts-ignore
                    const latlng1 = item.from.split(',').map((e) => {
                        return e * 1;
                    });
                    // @ts-ignore
                    const latlng2 = item.to.split(',').map((e) => {
                        return e * 1;
                    });
                    return { coord: [latlng1, latlng2] };
                });
                const dotPoint = new PointLayer()
                    .source(dotData, {
                        parser: {
                            type: 'json',
                            x: 'longitude',
                            y: 'latitude',
                        },
                    })
                    .shape('circle')
                    .color('#ffed11')
                    .animate(true)
                    .size(20);
                const flyLine = new LineLayer({ blend: 'normal' })
                    .source(flydata, {
                        parser: {
                            type: 'json',
                            coordinates: 'coord',
                        },
                    })
                    .color('#ff6b34')
                    .texture('plane')
                    .shape('arc')
                    .size(15)
                    .animate({
                        duration: 1,
                        interval: 0.2,
                        trailLength: 0.05,
                    })
                    .style({
                        textureBlend: 'replace',
                        lineTexture: true, // 开启线的贴图功能
                        iconStep: 10, // 设置贴图纹理的间距
                    });

                const flyLine2 = new LineLayer()
                    .source(flydata, {
                        parser: {
                            type: 'json',
                            coordinates: 'coord',
                        },
                    })
                    .color('#ff6b34')
                    .shape('arc')
                    .size(1)
                    .style({
                        lineType: 'dash',
                        dashArray: [5, 5],
                        opacity: 0.5,
                    });
                scene.addLayer(dotPoint);
                scene.addLayer(flyLine2);
                scene.addLayer(flyLine);

                return [];
            })
            .then(([]) => {});
        // -----------------------------------------------
    });
    return (
        <>
            <div className={MapBs_ls.MapBsBox}>
                <div id="map" className={MapBs_ls.MapBsBox_map}></div>
            </div>
        </>
    );
}
