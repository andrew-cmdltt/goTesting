export function getQuestionPoints(questions, id) {
    let points
    for (let i = 0; i < questions.length; i++) {
        for (let key in questions[i]) {
            if (questions[i]['nkey'] === id) {
                points = [
                    questions[i]['nw1'],
                    questions[i]['nw2'],
                    questions[i]['nw3'],
                    questions[i]['nw4'],
                    questions[i]['nw5'],
                    questions[i]['nw6']
                ].reduce((partial_sum, a) => partial_sum + a, 0)
            }
        }
    }
    return points
}