export function getDateEnd(answers, test_id, user_id) {
    let dateStart
    for (let i = 0; i < answers.length; i++) {
        for (let key in answers[i]) {
            if (answers[i]['nstaffkey'] === user_id && answers[i]['test_id'] === test_id) {
                dateStart = answers[i]['testdate']
            }
        }
    }
    return dateStart
}