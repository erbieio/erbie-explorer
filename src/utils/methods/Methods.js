import moment from 'moment';
// 数字缩减
export function digitalreduction(data) {
    console.log(data);
  if (String(data).length < 4) {
    return String(data);
  } else if (String(data).length >= 4 && String(data).length < 7) {
    return String(data).slice(0, String(data).length - 3) + '.' + String(data).slice(String(data).length - 3, String(data).length - 1) + ' K';
  } else if (String(data).length >= 7 && String(data).length < 10) {
    return String(data).slice(0, String(data).length - 6) + '.' + String(data).slice(String(data).length - 6, String(data).length - 4) + ' M';
  } else if (String(data).length >= 10) {
    return String(data).slice(0, String(data).length - 9) + '.' + String(data).slice(String(data).length - 9, String(data).length - 7) + ' B';
  }
}

//多久之前
export function timestamp(data) {
  let t = (new Date(moment().format('YYYY-MM-DD HH:mm:ss')).getTime()) / 1000
  // console.log(t);
  let difference = 0
  if (data) {
    if (t < data) {
      difference = data - t
      if (difference<60) {
        return difference +' Seconds Ago'
      } else if (difference >= 60 && difference < 3600) {
        return Math.ceil(difference/60) +' Minutes Ago'
      } else if (difference >= 3600 && difference < 86400) {
        return Math.ceil(difference/3600) +' Hours Ago'
      } else if (difference >= 86400 && difference < 604800) {
        return Math.ceil(difference/86400) +' Day Ago'
      } else if (difference >= 604800 && difference < 2592000) {
        return Math.ceil(difference/604800) +' Week Ago'
      } else if (difference >= 2592000 && difference < 31536000) {
        return Math.ceil(difference/2592000) +' Month Ago'
      } else if (difference >= 31536000) {
        return Math.ceil(difference/31536000) +' Year Ago'
      } 
    } else {
      difference = t - data
      if (difference<60) {
        return difference +' Seconds Ago'
      } else if (difference >= 60 && difference < 3600) {
        return Math.ceil(difference/60) +' Minutes Ago'
      } else if (difference >= 3600 && difference < 86400) {
        return Math.ceil(difference/3600) +' Hours Ago'
      } else if (difference >= 86400 && difference < 604800) {
        return Math.ceil(difference/86400) +' Day Ago'
      } else if (difference >= 604800 && difference < 2592000) {
        return Math.ceil(difference/604800) +' Week Ago'
      } else if (difference >= 2592000 && difference < 31536000) {
        return Math.ceil(difference/2592000) +' Month Ago'
      } else if (difference >= 31536000) {
        return Math.ceil(difference/31536000) +' Year Ago'
      } 
    }
  }
  
  
}
//期数判断
export function stagenumber(data) {
  if (data) {
      for (let i = 0; i < data.length;i++){
          if (data[i] == 0) {
              if (i == data.length-1) {
                  return 0
              }
          } else {
              return Number(parseInt((data).slice(i, 39),16));
          }
      }
  }

}
export function ellipsis(data) {
  if (data) {
    return data.slice(0,6) + '...' + data.slice(data.length-6,data.length)
  }
}
export function ellipsisthree(data) {
  if (data) {
    return data.slice(0,3) + '...' + data.slice(data.length-3,data.length)
  }
}