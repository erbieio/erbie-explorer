import moment from 'moment';
const deal = require('../../assets/json/dealType.json');
const { dealType } = deal;
// 数字缩减
export function digitalreduction(data) {
    //console.log(data);
    if (String(data).length < 4) {
        return String(data);
    } else if (String(data).length >= 4 && String(data).length < 7) {
        return (
            String(data).slice(0, String(data).length - 3) +
            '.' +
            String(data).slice(
                String(data).length - 3,
                String(data).length - 1,
            ) +
            ' K'
        );
    } else if (String(data).length >= 7 && String(data).length < 10) {
        return (
            String(data).slice(0, String(data).length - 6) +
            '.' +
            String(data).slice(
                String(data).length - 6,
                String(data).length - 4,
            ) +
            ' M'
        );
    } else if (String(data).length >= 10) {
        return (
            String(data).slice(0, String(data).length - 9) +
            '.' +
            String(data).slice(
                String(data).length - 9,
                String(data).length - 7,
            ) +
            ' B'
        );
    }
}

//多久之前
export function timestamp(data) {
    let t = new Date(moment().format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000;
    // //console.log(t);
    let difference = 0;
    if (data) {
        if (t < data) {
            return moment(parseInt(data) * 1000).format('YYYY-MM-DD HH:mm:ss');
        } else {
            difference = t - data;
            if (difference < 60) {
                return difference * 1000 + ' ms ago';
            } else if (difference >= 60 && difference < 3600) {
                return Math.ceil(difference / 60) + ' min ago';
            } else if (difference >= 3600 && difference < 86400) {
                return Math.ceil(difference / 3600) + ' h ago';
            } else if (difference >= 86400 && difference < 604800) {
                return Math.ceil(difference / 86400) + ' d ago';
            } else if (difference >= 604800 && difference < 2592000) {
                return Math.ceil(difference / 604800) + ' w ago';
            } else if (difference >= 2592000 && difference < 31536000) {
                return Math.ceil(difference / 2592000) + ' m ago';
            } else if (difference >= 31536000) {
                return Math.ceil(difference / 31536000) + ' y ago';
            }
        }
    }
}
//期数判断
export function stagenumber(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i] == 0) {
                if (i == data.length - 1) {
                    return 0;
                }
            } else {
                return Number(parseInt(data.slice(i, 39), 16));
            }
        }
    }
}
export function stagenumberbs(data) {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i] == 0) {
                if (i == data.length - 1) {
                    return 0;
                }
            } else {
                return Number(parseInt(data.slice(3, 39), 16));
            }
        }
    }
}
export function ellipsis(data) {
    if (data) {
        return (
            data.slice(0, 6) + '...' + data.slice(data.length - 6, data.length)
        );
    }
}
export function ellipsisfour(data) {
    if (data) {
        return (
            data.slice(0, 4) + '...' + data.slice(data.length - 4, data.length)
        );
    }
}
export function ellipsisthree(data) {
    if (data) {
        return (
            data.slice(0, 3) + '...' + data.slice(data.length - 3, data.length)
        );
    }
}
//交易类型
export function hexCharCodeToStr(hexCharCodeStr) {
    if (hexCharCodeStr) {
        // //console.log(hexCharCodeStr)
        var trimedStr = hexCharCodeStr.trim();
        if (trimedStr === '0x') {
            return 'Transfer';
        }
        var rawStr =
            trimedStr.substr(0, 2).toLowerCase() === '0x'
                ? trimedStr.substr(2)
                : trimedStr;
        var len = rawStr.length;
        if (len % 2 !== 0) {
            // alert("Illegal Format ASCII Code!");
            return '';
        }
        var curCharCode;
        var resultStr = [];
        for (var i = 0; i < len; i = i + 2) {
            curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
            resultStr.push(String.fromCharCode(curCharCode));
        }
        let StrTran = resultStr.join('');
        if (StrTran.substring(0, StrTran.indexOf(':')) !== 'erbie') {
            return 'Contract Based Transaction';
        } else {
            let obj = JSON.parse(StrTran.substring(6));
            dealType.forEach((item) => {
                obj.type === item.type ? (obj.name = item.name) : '';
            });
            return obj.name;
        }
    }
}
export function hexCharCodeToStrmath(data) {
    if (data) {
        let text;
        dealType.forEach((item) => {
            data == item.type ? (text = item.name) : '';
        });
        return text;
    }
}
//保留两位小数
export function getBit(value) {
    const reg = /([0-9]+\.[0-9]{2})[0-9]*/;
    let str = value.toString();
    str = str.replace(reg, '$1');
    //console.log(str);
    return str;
}

export function hexToString(str) {
    if (str.slice(0, 2) == '0x') {
        var val = '',
            len = str.length / 2;
        for (var i = 0; i < len; i++) {
            val += String.fromCharCode(parseInt(str.substr(i * 2, 2), 16));
        }
        let text = 0;
        for (
            let i = 0;
            i < Object.keys(JSON.parse(val.slice(1, val.length))).length;
            i++
        ) {
            if (
                Object.keys(JSON.parse(val.slice(1, val.length)))[i] ==
                    'prompt' ||
                Object.keys(JSON.parse(val.slice(1, val.length)))[i] ==
                    'randomNumber'
            ) {
                text++;
            }
        }
        //console.log(text);
        if (text == 2) {
            return 1;
        } else {
            return 2;
        }
    } else {
        return 2;
    }
}

//url参数获取
export function parseUrlParams(url) {
    const params = {};
    if (!url || url === '' || typeof url !== 'string') {
        return params;
    }
    const paramsStr = url.split('?')[1];
    if (!paramsStr) {
        return params;
    }
    let str = paramsStr;
    const paramsArr = str.replace(/&|=/g, ' ').split(' ');
    for (let i = 0; i < paramsArr.length / 2; i++) {
        const value = paramsArr[i * 2 + 1];
        params[paramsArr[i * 2]] =
            value === 'true' ? true : value === 'false' ? false : value;
    }
    //console.log(params);
    return params;
}

export function getDevice() {
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
}
