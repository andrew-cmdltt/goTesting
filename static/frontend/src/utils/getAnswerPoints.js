export function getAnswerPoints(answer) {
    return [
        answer.ans1,
        answer.ans2,
        answer.ans3,
        answer.ans4,
        answer.ans5,
        answer.ans6,
        answer.ans7,
        answer.ans8,
        answer.ans9,
    ].reduce((partial_sum, a) => partial_sum + a, 0)
}