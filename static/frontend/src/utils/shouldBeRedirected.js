export function shouldBeRedirected(state, testsLength) {
    let isRedirected = state.isRedirected
    let beginTestLength = state.beginTestLength
    if (isRedirected && beginTestLength !== testsLength) {
        return true
    }
}