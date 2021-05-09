export function getPassTime(date_start, date_end) {
    let atime = new Date(date_start);
    let btime = new Date(date_end);
    let diff = btime - atime
    diff = new Date(diff);
    let h = diff.getUTCHours()
    let i = diff.getMinutes();
    let s = diff.getSeconds();
    h = (h < 10) ? '0' + h: h;
    i = (i < 10) ? '0' + i : i;
    s = (s < 10) ? '0' + s : s;
    return [h, i, s].join(':')

}