export function authValidate(state) {
    if (!state.cidentificator) {
        state.errors.cidentificator = "Заполните это поле!"
    } else {
        if (!state.cidentificator.match(/^[-!"';_,«»()≡ а-яА-Яa-zA-Z0-9]*$/i)) {
            state.errors.cidentificator = "Введите корректные данные!"
        } else {
            state.errors.cidentificator = ""
        }
    }

    if (!state.cpassword) {
        state.errors.cpassword = "Заполните это поле!"
    } else {
        if (!state.cpassword.match(/^[-!"';_,«»()≡ а-яА-Яa-zA-Z0-9]*$/i)) {
            state.errors.cpassword = "Введите корректные данные!"
        } else {
            state.errors.cpassword = ""
        }
    }

    return state.errors
}