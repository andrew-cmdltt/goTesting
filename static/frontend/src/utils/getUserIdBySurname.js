export function getUserIdBySurname(users, cuserfamilyname) {
    console.log(users)
    for (let i = 0; i< users.length; i++) {
        for (let key in users[i]) {
            if (users[i]['cuserfamilyname'] === cuserfamilyname) {
    			console.log(users[i]['nuserkey'])
                return users[i]['nuserkey']
            }
        }
    }
    return '0'
}