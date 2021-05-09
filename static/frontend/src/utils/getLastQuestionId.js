export function getLastQuestionId(questions) {
    for (let i = 0; i < questions.length; i++) {
        return questions[questions.length - 1]['nkey']
    }
}