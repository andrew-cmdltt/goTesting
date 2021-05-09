export function setZeroToNotIndicated(params) {
    for (let i = 0; i < params.length; i++) {
        if (params[i] === '') {
            params[i] = '0'
        }
    }
    return params.join('/')
}