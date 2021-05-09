export function getQuestionIdByTitle(questions, title) {
    for (let i = 0; i< questions.length; i++) {
        for (let key in questions[i]) {
            if (questions[i]['cquestion'] === title) {
                return questions[i]['nkey']
            }
        }
    }
    return '0'
}