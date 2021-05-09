export function addTestValidate(state) {
    let cmessageErr = state.cmessage.match(/^[-!"';,«»()≡ а-яА-Яa-zA-Z0-9]*$/i)
    let ctestnameErr = state.ctestname.match(/^[-!"';,«»()≡ а-яА-Яa-zA-Z0-9]*$/i)

    if (state.cmessage && state.ctestname) {
        if (state.cmessage.length >= 5 && state.cmessage.length < 255) {
            if (state.ctestname.length >= 5 && state.ctestname.length < 255) {
                if (cmessageErr && ctestnameErr) {
                    return true
                }
            }
        }
    } else {
        return false
    }
}