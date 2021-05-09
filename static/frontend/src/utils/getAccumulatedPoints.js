export function getAccumulatedPoints(answers, test_id, user_id) {
    let accumulatedPoints = 0
    let points = 0
    for (let i = 0; i < answers.length; i++) {
        for (let key in answers[i]) {
            if (answers[i]['nstaffkey'] === user_id && answers[i]['test_id'] === test_id) {
                points = [
                    answers[i]['ans1'],
                    answers[i]['ans2'],
                    answers[i]['ans3'],
                    answers[i]['ans4'],
                    answers[i]['ans5'],
                    answers[i]['ans6']
                ].reduce((partial_sum, a) => partial_sum + a, 0)
                accumulatedPoints += points
                break
            }
        }
    }
    return accumulatedPoints
}