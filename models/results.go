package models

import (
	"encoding/json"
	"net/http"
)

type Result struct {
	TESTNAME 		string `json:"testname"`
	FIO 			string `json:"fio"`
	DateStart 		string 	`json:"date_start"`
	DateEnd			string `json:"date_end"`
	POLLBALLS 		string `json:"pollballs"`
	MAXBALLS		string `json:"maxballs"`
	TEST			int	   `json:"test"`
	USER			string     `json:"user"`
}

var results []Result
var result Result

func GetResults() []Result {
	if authUser.User.Nusertypekey == 533 {
		db.Raw("select min(t.ctestname) as testName, " +
			"concat(min(u.cuserfamilyname), ' ', min(u.cuserfirstname), ' ', min(u.cusersurname)) as fio, " +
			"min(ta.testDate) as dateStart, max(ta.testDate) as dateEnd, " +
			"sum(COALESCE(ta.ans1, 0)) + sum(COALESCE(ta.ans2, 0)) + sum(COALESCE(ta.ans3, 0)) + " +
			"sum(COALESCE(ta.ans4, 0)) + sum(COALESCE(ta.ans5, 0)) + sum(COALESCE(ta.ans6, 0)) + sum(COALESCE(ta.ans7, 0)) + " +
			"sum(COALESCE(ta.ans8, 0)) + sum(COALESCE(ta.ans9, 0)) + sum(COALESCE(ta.ans10, 0)) as pollBalls, " +
			"sum(COALESCE(q.nw1, 0)) + " +
			"sum(COALESCE(q.nw2, 0)) + sum(COALESCE(q.nw3, 0)) + sum(COALESCE(q.nw4, 0)) + sum(COALESCE(q.nw5, 0)) + sum(COALESCE(q.nw6, 0)) + " +
			"sum(COALESCE(q.nw7, 0)) + sum(COALESCE(q.nw8, 0)) + sum(COALESCE(q.nw9, 0)) + sum(COALESCE(q.nw10, 0)) as maxBalls, " +
			"ta.ntestnumber as testKey, " +
			"ta.test_id " +
			"from tests_answers ta " +
			"inner join tests t on t.nkey = ta.ntestnumber " +
			"inner join users u on u.nuserkey = ta.nstaffkey " +
			"inner join tests_questions q on q.nkey = ta.question " +
			"group by ta.test_id, ta.ntestnumber " +
			"order by dateEnd desc").Scan(&results)
	} else {
		db.Raw("select min(t.ctestname) as testName, " +
			"concat(min(u.cuserfamilyname), ' ', min(u.cuserfirstname), ' ', min(u.cusersurname)) as fio, " +
			"min(ta.testDate) as dateStart, max(ta.testDate) as dateEnd, " +
			"sum(COALESCE(ta.ans1, 0)) + sum(COALESCE(ta.ans2, 0)) + sum(COALESCE(ta.ans3, 0)) + " +
			"sum(COALESCE(ta.ans4, 0)) + sum(COALESCE(ta.ans5, 0)) + sum(COALESCE(ta.ans6, 0)) + sum(COALESCE(ta.ans7, 0)) + " +
			"sum(COALESCE(ta.ans8, 0)) + sum(COALESCE(ta.ans9, 0)) + sum(COALESCE(ta.ans10, 0)) as pollBalls, " +
			"sum(COALESCE(q.nw1, 0)) + " +
			"sum(COALESCE(q.nw2, 0)) + sum(COALESCE(q.nw3, 0)) + sum(COALESCE(q.nw4, 0)) + sum(COALESCE(q.nw5, 0)) + sum(COALESCE(q.nw6, 0)) + " +
			"sum(COALESCE(q.nw7, 0)) + sum(COALESCE(q.nw8, 0)) + sum(COALESCE(q.nw9, 0)) + sum(COALESCE(q.nw10, 0)) as maxBalls, " +
			"ta.ntestnumber as testKey, " +
			"ta.test_id " +
			"from tests_answers ta " +
			"inner join tests t on t.nkey = ta.ntestnumber " +
			"inner join users u on u.nuserkey = ta.nstaffkey " +
			"inner join tests_questions q on q.nkey = ta.question " +
			"where " +
			"(u.norganizationkey = ? and nusertypekey = 531) " +
			"or (nusertypekey = 532 and u.norganizationkey = ?) " +
			"group by ta.test_id, ta.ntestnumber " +
			"order by dateEnd desc",
			authUser.User.Norganizationkey,
			authUser.User.Norganizationkey).Scan(&results)
	}

	return results
}

func SearchResults(r *http.Request) []Result {
	_ = json.NewDecoder(r.Body).Decode(&result)

	if authUser.User.Nusertypekey == 533 {
		db.Raw("select min(t.ctestname) as testName, " +
			"concat(min(u.cuserfamilyname), ' ', min(u.cuserfirstname), ' ', min(u.cusersurname)) as fio, " +
			"min(ta.testDate) as dateStart, max(ta.testDate) as dateEnd, " +
			"sum(COALESCE(ta.ans1, 0)) + sum(COALESCE(ta.ans2, 0)) + sum(COALESCE(ta.ans3, 0)) + " +
			"sum(COALESCE(ta.ans4, 0)) + sum(COALESCE(ta.ans5, 0)) + sum(COALESCE(ta.ans6, 0)) + sum(COALESCE(ta.ans7, 0)) + " +
			"sum(COALESCE(ta.ans8, 0)) + sum(COALESCE(ta.ans9, 0)) + sum(COALESCE(ta.ans10, 0)) as pollBalls, " +
			"sum(COALESCE(q.nw1, 0)) + " +
			"sum(COALESCE(q.nw2, 0)) + sum(COALESCE(q.nw3, 0)) + sum(COALESCE(q.nw4, 0)) + sum(COALESCE(q.nw5, 0)) + sum(COALESCE(q.nw6, 0)) + " +
			"sum(COALESCE(q.nw7, 0)) + sum(COALESCE(q.nw8, 0)) + sum(COALESCE(q.nw9, 0)) + sum(COALESCE(q.nw10, 0)) as maxBalls, " +
			"ta.ntestnumber as testKey, " +
			"ta.test_id " +
			"from tests_answers ta " +
			"inner join tests t on t.nkey = ta.ntestnumber " +
			"inner join users u on u.nuserkey = ta.nstaffkey " +
			"inner join tests_questions q on q.nkey = ta.question " +
			"where " +
			"ta.test_id = ? " +
			"or " +
			"u.cuserfamilyname = ? " +
			"or " +
			"(ta.testDate >= ? and ta.testDate <= ?) " +
			"group by ta.test_id, ta.ntestnumber " +
			"order by dateEnd desc",
			result.TEST, result.USER, result.DateEnd, result.DateEnd).Scan(&results)
	} else {
		db.Raw("select min(t.ctestname) as testName, " +
			"concat(min(u.cuserfamilyname), ' ', min(u.cuserfirstname), ' ', min(u.cusersurname)) as fio, " +
			"min(ta.testDate) as dateStart, max(ta.testDate) as dateEnd, " +
			"sum(COALESCE(ta.ans1, 0)) + sum(COALESCE(ta.ans2, 0)) + sum(COALESCE(ta.ans3, 0)) + " +
			"sum(COALESCE(ta.ans4, 0)) + sum(COALESCE(ta.ans5, 0)) + sum(COALESCE(ta.ans6, 0)) + sum(COALESCE(ta.ans7, 0)) + " +
			"sum(COALESCE(ta.ans8, 0)) + sum(COALESCE(ta.ans9, 0)) + sum(COALESCE(ta.ans10, 0)) as pollBalls, " +
			"sum(COALESCE(q.nw1, 0)) + " +
			"sum(COALESCE(q.nw2, 0)) + sum(COALESCE(q.nw3, 0)) + sum(COALESCE(q.nw4, 0)) + sum(COALESCE(q.nw5, 0)) + sum(COALESCE(q.nw6, 0)) + " +
			"sum(COALESCE(q.nw7, 0)) + sum(COALESCE(q.nw8, 0)) + sum(COALESCE(q.nw9, 0)) + sum(COALESCE(q.nw10, 0)) as maxBalls, " +
			"ta.ntestnumber as testKey, " +
			"ta.test_id " +
			"from tests_answers ta " +
			"inner join tests t on t.nkey = ta.ntestnumber " +
			"inner join users u on u.nuserkey = ta.nstaffkey " +
			"inner join tests_questions q on q.nkey = ta.question " +
			"where " +
			"(u.norganizationkey = ? and nusertypekey = 531) or (nusertypekey = 532 and u.norganizationkey = ?) " +
			"and " +
			"ta.test_id = ? " +
			"or " +
			"(u.norganizationkey = ? and nusertypekey = 531) or (nusertypekey = 532 and u.norganizationkey = ?) " +
			"and " +
			"u.cuserfamilyname = ? " +
			"or " +
			"(u.norganizationkey = ? and nusertypekey = 531) or (nusertypekey = 532 and u.norganizationkey = ?) " +
			"or " +
			"(ta.testDate >= ? and ta.testDate <= ?) " +
			"group by ta.test_id, ta.ntestnumber " +
			"order by dateEnd desc",
			authUser.User.Norganizationkey, authUser.User.Norganizationkey,
			result.TEST,
			authUser.User.Norganizationkey, authUser.User.Norganizationkey,
			result.USER,
			authUser.User.Norganizationkey, authUser.User.Norganizationkey,
			result.DateStart,
			result.DateEnd).Scan(&results)
	}

	return results
}
