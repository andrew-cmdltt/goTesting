export function getTestIdByTitle(tests, title) {
    for (let i = 0; i< tests.length; i++) {
        for (let key in tests[i]) {
            if (tests[i]['ctestname'] === title) {
                return tests[i]['test_id']
            }
        }
    }
    return '0'
}