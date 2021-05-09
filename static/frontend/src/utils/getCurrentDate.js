export function getCurrentDate() {
    const date = new Date()
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let hh = date.getHours()
    let ii = date.getMinutes()
    let ss = date.getSeconds()

    let yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + ii + ':' + ss;
}