export function getTestId(answers) {
    let testId
    answers.sort(function(obj1, obj2) {
        // Сортировка по возрастанию
        return obj1.nkey-obj2.nkey;
    });
    for (let i = 0; i < answers.length; i++) {
        testId = answers[answers.length - 1]['test_id']
    }
    return testId + 1
}