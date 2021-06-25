export function getLabelName(keyName) {
    switch (keyName) {
        case "cidentificator":
            return "Логин"
        case "cpassword":
            return "Пароль"
        default:
            return ""
    }
}