export function getTextFieldType(keyName) {
    switch (keyName) {
        case "cidentificator":
            return "login"
        case "cpassword":
            return "password"
        case "birth_date":
        case "start_date":
        case "expiry_date":
            return "date"
        default:
            return "text"
    }
}