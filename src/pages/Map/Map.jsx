import React, { useState, useEffect } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Line,
} from 'react-simple-maps';
import { Tooltip } from 'antd';
import {
    locations,
    lastmsg,
    onlineAddr,
} from '../../api/request_data/block_request';
export default function MapChart() {
    const geoUrl = require('./features.json');
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
        // console.log('地图数据查询');
        // console.log(data);
        if (data) {
            setMapdatadetailed(data);
        }
    };
    const onlineAddr_q = async (item) => {
        const data = await onlineAddr(item);
        if (data) {
            setValidatoronline(data.addrs);
        }
        // console.log('验证者在线查询');
        // console.log(data);
    };
    //地图fromto数据查询
    const lastmsg_q = async () => {
        const data = await lastmsg();
        // console.log('地图fromto数据查询');
        console.log(data);
        // console.log(mapdatadetailed);
        // let text = []
        if (mapdatadetailed && data) {
            console.log(1111);
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
            // console.log(linedata);
            setLinedata(linedata);
        }
        if (data == null) {
            // let text = [];
            // console.log(222);
            // text.push({ from: [20.3522, 48.8566], to: [-74.006, 40.7128] });
            // text.push({ from: [60.3522, 48.8566], to: [-74.006, 40.7128] });
            // console.log(text);
            // setLinedata(text);
        }
    };
    useEffect(() => {
        locations_q();
        onlineAddr_q();
        console.log(window.location.hash);
    }, []);
    useEffect(() => {
        if (validatoronline.length != 0 && mapdatadetailed.length != 0) {
            // console.log(validatoronline);
            // console.log(mapdatadetailed);
            let text1 = [];
            for (let i = 0; i < validatoronline.length; i++) {
                for (let k = 0; k < mapdatadetailed.length; k++) {
                    if (validatoronline[i] == mapdatadetailed[k].proxy) {
                        text1.push(mapdatadetailed[k]);
                    }
                }
            }
            // console.log(text1);
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

            // console.log(mapdzx);
            // console.log(mapdbzx);
            // console.log(mapdbzxBS);
            // console.log(text);
            setMapdata(text);
            setSubscript(mapdzx);
            setNosubscript(mapdbzxBS);
        }
    }, [validatoronline, mapdatadetailed]);
    useEffect(() => {
        if (window.location.hash == '#/') {
            if (linedata.length != 0) {
                let arryline = [];
                for (
                    let i = 0;
                    i < document.getElementsByClassName('rsm-line').length;
                    i++
                ) {
                    arryline.push(
                        document
                            .getElementsByClassName('rsm-line')
                            [i].getAttribute('d'),
                    );
                }
                localStorage.setItem('rsmlinedata', JSON.stringify(arryline));
                if (
                    JSON.parse(localStorage.getItem('rsmlinedata')).length > 0
                ) {
                    for (
                        let j = 0;
                        j <
                        JSON.parse(localStorage.getItem('rsmlinedata')).length;
                        j++
                    ) {
                        let count = 0;
                        if (window.location.hash == '#/') {
                            setInterval(() => {
                                if (
                                    count <=
                                    JSON.parse(
                                        localStorage.getItem('rsmlinedata'),
                                    )[j].length
                                ) {
                                    if (
                                        JSON.parse(
                                            localStorage.getItem('rsmlinedata'),
                                        )[j][count] == 'L'
                                    ) {
                                        if (window.location.hash == '#/') {
                                            document
                                                .getElementsByClassName(
                                                    'rsm-line',
                                                )
                                                [j].getAttributeNode(
                                                    'd',
                                                ).value = JSON.parse(
                                                localStorage.getItem(
                                                    'rsmlinedata',
                                                ),
                                            )[j].slice(0, count);
                                        }
                                    }
                                    count++;
                                } else {
                                    if (window.location.hash == '#/') {
                                        document
                                            .getElementsByClassName('rsm-line')
                                            [j].getAttributeNode('d').value =
                                            ' ';
                                    }
                                    count = 0;
                                }
                            }, 1);
                        }
                    }
                }
            }
        }
    }, [linedata]);
    useEffect(() => {
        if (mapdatadetailed.length != 0) {
            lastmsg_q();
        }
    }, [mapdatadetailed]);
    useEffect(() => {
        let aa = setInterval(() => {
            if (colordata > 10 && colordata3 > 10) {
                setColordata(4);
                clearInterval(aa);
            } else if (colordata < 10) {
                setColordata(colordata + 0.2);
                clearInterval(aa);
            }
        }, 50);
    }, [colordata]);
    useEffect(() => {
        let bb = setInterval(() => {
            if (colordata2 > 10 && colordata > 10) {
                setColordata2(4);
                clearInterval(bb);
            } else if (colordata2 < 10) {
                setColordata2(colordata2 + 0.2);
                clearInterval(bb);
            }
        }, 50);
    }, [colordata2]);
    useEffect(() => {
        let cc = setInterval(() => {
            if (colordata3 > 10 && colordata2 > 10) {
                setColordata3(4);
                clearInterval(cc);
            } else if (colordata3 < 10) {
                setColordata3(colordata3 + 0.2);
                clearInterval(cc);
            }
        }, 50);
    }, [colordata3]);
    useEffect(() => {
        let dd = setInterval(() => {
            if (colordata4 > 10) {
                setColordata4(4);
                clearInterval(dd);
            } else if (colordata4 < 10) {
                setColordata4(colordata4 + 0.2);
                clearInterval(dd);
            }
        }, 50);
    }, [colordata4]);
    useEffect(() => {
        let t = setInterval(() => {
            if (timedata >= mapdata.length - 1) {
                clearInterval(t);
            } else {
                setTimedata(timedata + 1);
                clearInterval(t);
            }
        }, 10);
    }, [timedata]);
    useEffect(() => {
        let l = setInterval(() => {
            if (linecolor >= 10) {
                setLinecolor(0);
                clearInterval(l);
            } else {
                setLinecolor(linecolor + 1);
                clearInterval(l);
            }
        }, 100);
    }, [linecolor]);
    function markerz(data) {
        if (data) {
            return data.map((item, index) => {
                for (let i = 0; i < subscript.length; i++) {
                    if (subscript[i] == index) {
                        return (
                            <Marker coordinates={item}>
                                <>
                                    <g
                                        fill="none"
                                        stroke="#3BCFFF"
                                        strokeWidth="0.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        transform="translate(0, 0)"
                                    >
                                        <circle
                                            r={colordata}
                                            fill="#3BCFFF00"
                                        />
                                    </g>
                                    <g
                                        fill="none"
                                        stroke="#3BCFFF"
                                        strokeWidth="0.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        transform="translate(0, 0)"
                                    >
                                        <circle
                                            r={colordata2}
                                            fill="#3BCFFF00"
                                        />
                                    </g>
                                    <g
                                        fill="none"
                                        stroke="#3BCFFF"
                                        strokeWidth="0.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        transform="translate(0, 0)"
                                    >
                                        <circle
                                            r={colordata3}
                                            fill="#3BCFFF00"
                                        />
                                    </g>
                                    <g
                                        fill="none"
                                        stroke="#3BCFFF"
                                        strokeWidth="0.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        transform="translate(0, 0)"
                                    >
                                        <circle
                                            r={colordata4}
                                            fill="#3BCFFF00"
                                        />
                                    </g>
                                </>
                                <circle r={4} fill="#3BCFFF" />
                            </Marker>
                        );
                    }
                    if (nosubscript[i] == index) {
                        return (
                            <Marker coordinates={item}>
                                <>
                                    <g
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="0.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        transform="translate(0, 0)"
                                    >
                                        <circle
                                            r={colordata}
                                            fill="#ffffff00"
                                        />
                                    </g>
                                    <g
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="0.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        transform="translate(0, 0)"
                                    >
                                        <circle
                                            r={colordata2}
                                            fill="#ffffff00"
                                        />
                                    </g>
                                    <g
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="0.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        transform="translate(0, 0)"
                                    >
                                        <circle
                                            r={colordata3}
                                            fill="#ffffff00"
                                        />
                                    </g>
                                    <g
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="0.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        transform="translate(0, 0)"
                                    >
                                        <circle
                                            r={colordata4}
                                            fill="#ffffff00"
                                        />
                                    </g>
                                </>
                                <circle r={4} fill="#ffffff" />
                            </Marker>
                        );
                    }
                }
            });
        }
    }
    function markerline(data) {
        if (data) {
            return data.map((item, index) => {
                return (
                    <Line
                        from={item.from}
                        to={item.to}
                        stroke="#7CFC00"
                        strokeWidth={1}
                        strokeLinecap="round"
                    />
                );
            });
        }
    }
    return (
        <ComposableMap projection="geoMercator">
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#65619C"
                            stroke="#00000000"
                        />
                    ))
                }
            </Geographies>
            {markerz(mapdata)}
            <g>
                {/* <Line
                    from={[20.3522, 48.8566]}
                    to={[-74.006, 40.7128]}
                    stroke='#3BCFFF'
                    strokeWidth={1}
                    strokeLinecap="round"
                />
                <Line
                    from={[60.3522, 48.8566]}
                    to={[-74.006, 40.7128]}
                    stroke='#3BCFFF'
                    strokeWidth={1}
                    strokeLinecap="round"
                /> */}
                {markerline(linedata)}
            </g>
        </ComposableMap>
    );
}
