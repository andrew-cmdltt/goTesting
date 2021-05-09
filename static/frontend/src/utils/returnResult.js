export function returnResult(got_balls, max_balls) {
    let result = Math.round(got_balls * 100 / max_balls);
    if (result === 0) {
        return ["progress-bar bg-danger", "100%", result]
    } else {
        return ["progress-bar", result + "%", result]
    }
}