export function getAddedTestId(tests) {
    tests = tests.sort(function (obj1, obj2) {
        if (obj1.nkey < obj2.nkey) return -1;
        if (obj1.nkey > obj2.nkey) return 1;
        return 0;
    })
    return tests[tests.length-1]['test_id']

}