export function getUserFullName(users, user_id) {
    let fullName
    for (let i = 0; i < users.length; i++) {
        for (let key in users[i]) {
            if (users[i]['nuserkey'] === user_id) {
                fullName = [
                    users[i]['cuserfamilyname'],
                    users[i]['cuserfirstname'],
                    users[i]['cusersurname'],
                ]
                return fullName.join(' ')
            }
        }
    }
}