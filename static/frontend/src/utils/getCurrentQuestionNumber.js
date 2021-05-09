export function getCurrentQuestionNumber(questions, nkey) {
    for(let i = 0; i < questions.length; i++) {
        for (let key in questions[i]) {
            if (questions[i]['nkey'] === nkey) {
                return i + 1
            }
        }
    }
}