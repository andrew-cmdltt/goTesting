export function getStartQuestionId(questions) {
    for(let i = 0; i < questions.length; i++) {
        if (i === 0) {
            return questions[0]['nkey']
        }
    }
}