//格式化时间  date时间对象  fmt时间格式 如yyyy/MM/dd hh:mm:ss
const FmtTime = (date, fmt) => {
    var o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * @param {number} 预约天数
 * @returns 时间数组
 */
const pickerData = (dayNum = 7, time = '2000-01-01') => {
    Date.prototype.DateAdd = (interval, number) => {
        number = parseInt(number);
        let date = new Date(time.replace(/-/g, '/'));
        // let date = new Date(this.getTime());
        switch (interval) {
            case "y":
                date.setFullYear(date.getFullYear() + number);
                break;
            case "m":
                date.setMonth(date.getMonth() + number);
                break;
            case "d":
                date.setDate(date.getDate() + number);
                break;
            case "w":
                date.setDate(date.getDate() + 7 * number);
                break;
            case "h":
                date.setHours(date.getHours() + number);
                break;
            case "n":
                date.setMinutes(date.getMinutes() + number);
                break;
            case "s":
                date.setSeconds(date.getSeconds() + number);
                break;
            case "l":
                date.setMilliseconds(date.getMilliseconds() + number);
                break;
        }
        return date;
    }
    let dateList = [];
    let weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    for (let i = 0; i < dayNum; i++) {
        dateList.push({
            name: weekList[new Date().DateAdd('d', i).getDay()],
            date: FmtTime(new Date().DateAdd('d', i), 'MM-dd'),
            time: FmtTime(new Date().DateAdd('d', i), 'yyyy/MM/dd')
        })
    }
    return dateList;
}

export {
    FmtTime,
    pickerData
}