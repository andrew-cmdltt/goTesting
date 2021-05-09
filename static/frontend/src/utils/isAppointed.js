export function isAppointed(appointedTests, test_id, user_id) {
    let isAppointed = false
    
    for (let i = 0; i < appointedTests.length; i++) {
        for (let key in appointedTests[i]) {
            if (appointedTests[i]['ntestkey'] === test_id && appointedTests[i]['ndolzhnostkey'] === user_id) {
                isAppointed = true
                break
            }
        }
    }
    return isAppointed

}