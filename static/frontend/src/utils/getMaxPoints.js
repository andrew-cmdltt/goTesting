export function getMaxPoints(questions) {
    let maxPoints = 0
    let points = 0
    for (let i = 0; i < questions.length; i++) {
        for (let key in questions[i]) {
            points = [
                questions[i]['nw1'],
                questions[i]['nw2'],
                questions[i]['nw3'],
                questions[i]['nw4'],
                questions[i]['nw5'],
                questions[i]['nw6']
            ].reduce((partial_sum, a) => partial_sum + a, 0)
            maxPoints += points
            break
        }
    }
    return maxPoints
}