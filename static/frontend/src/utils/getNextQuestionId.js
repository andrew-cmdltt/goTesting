export function getNextQuestionId(questions, nkey) {
    let nextQuestionId = 0
    for(let i = 0; i < questions.length; i++) {
        for (let key in questions[i]) {
            if (questions[i]['nkey'] === nkey) {
                try {
                    nextQuestionId = questions[i + 1]['nkey']
                } catch (e) {
                    nextQuestionId = questions[i]['nkey']
                }
                break
            }
        }
    }
    return nextQuestionId
}