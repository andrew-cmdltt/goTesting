export function getTestTitle(tests, test_id) {
    console.log('tests')
    console.log(tests)
    console.log('test_id')
    console.log(test_id)
    for (let i = 0; i < tests.length; i++) {
        for (let key in tests[i]) {
            if (tests[i]['nkey'] === test_id) {
                return tests[i]['ctestname']
            }
        }
    }
}