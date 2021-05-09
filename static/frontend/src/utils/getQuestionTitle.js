export function getQuestionTitle(questions, id) {
    console.log(questions)
    for (let i = 0; i < questions.length; i++) {
        for (let key in questions[i]) {
            if (questions[i]['nkey'] === id) {
                return questions[i]['cquestion']
            }
        }
    }
}