export function getFirstQuestionId(questions) {
    for (let i = 0; i < questions.length; i++) {
        return questions[0]['nkey']
    }
}