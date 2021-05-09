export function setNotIndicated(params) {
    for (let i = 0; i < params.length; i++) {
        if (params[i] === '') {
            params[i] = 'не указано'
        }
    }
    return params.join('/')
}