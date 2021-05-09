package models

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

type Answer struct {
	Question 		int `json:"question"`
	Nkey 			int `json:"nkey"`
	Nstaffkey 		int `json:"nstaffkey"`
	Ntestnumber 	int `json:"ntestnumber"`
	TESTID 			int `json:"test_id"`
	Testdate 		string `json:"testdate"`
	Testtime 		string `json:"testtime"`
	Ans1 			int `json:"ans1"`
	Ans2 			int `json:"ans2"`
	Ans3 			int `json:"ans3"`
	Ans4 			int `json:"ans4"`
	Ans5 			int `json:"ans5"`
	Ans6 			int `json:"ans6"`
	Ans7			int `json:"ans7"`
	Ans8 			int `json:"ans8"`
	Ans9 			int `json:"ans9"`
	Ans10 			int `json:"ans10"`
	Nw1 			int `json:"nw1"`
	Nw2 			int `json:"nw2"`
	Nw3 			int `json:"nw3"`
	Nw4 			int `json:"nw4"`
	Nw5 			int `json:"nw5"`
	Nw6 			int `json:"nw6"`
	Nw7				int `json:"nw7"`
	Nw8 			int `json:"nw8"`
	Nw9 			int `json:"nw9"`
	Nw10 			int `json:"nw10"`
	FIO 			string `json:"fio"`
	TESTNAME 		string `json:"testname"`

}

var answers []Answer
var answer Answer

func GetAnswers(r *http.Request) []Answer {

	db := GetDB()

	params := mux.Vars(r)

	if params["nkey"] != "" {
		db.Raw("SELECT * FROM tests_answers WHERE ntestnumber = ?",
			params["nkey"]).Scan(&answers)
		params["nkey"] = ""

	} else {
		authUser := GetAuthUser()
		if authUser.User.Nusertypekey == 533 {
			db.Raw("" +
				"select " +
				"ta.nkey, " +
				"ta.question, " +
				"concat(u.cuserfamilyname, ' ', u.cuserfirstname, ' ', u.cusersurname) as fio, " +
				"t.ctestname as testName, " +
				"ta.testDate, " +
				"ta.test_id, " +
				"ta.ntestnumber, " +
				"ta.nstaffkey, " +
				"q.nw1, q.nw2, q.nw3, q.nw4, q.nw5, q.nw6, q.nw7, q.nw8, q.nw9, q.nw10, " +
				"ta.ans1, ta.ans2, ta.ans3, ta.ans4, ta.ans5, ta.ans6, ta.ans7, ta.ans8, ta.ans9, ta.ans10 " +
				"from tests_answers ta " +
				"inner join tests_questions q on q.nkey = ta.question " +
				"inner join users u on u.nuserkey = ta.nstaffkey " +
				"inner join tests t on t.nkey = q.ntestnumber " +
				"order by ta.testDate desc").Scan(&answers)
		} else {
			db.Raw("" +
				"select " +
				"ta.nkey, " +
				"ta.question, " +
				"concat(u.cuserfamilyname, ' ', u.cuserfirstname, ' ', u.cusersurname) as fio, " +
				"t.ctestname as testName, " +
				"ta.testDate, " +
				"ta.test_id, " +
				"ta.ntestnumber, " +
				"ta.nstaffkey, " +
				"q.nw1, q.nw2, q.nw3, q.nw4, q.nw5, q.nw6, q.nw7, q.nw8, q.nw9, q.nw10, " +
				"ta.ans1, ta.ans2, ta.ans3, ta.ans4, ta.ans5, ta.ans6, ta.ans7, ta.ans8, ta.ans9, ta.ans10 " +
				"from tests_answers ta " +
				"inner join tests_questions q on q.nkey = ta.question " +
				"inner join users u on u.nuserkey = ta.nstaffkey " +
				"inner join tests t on t.nkey = q.ntestnumber " +
				"where " +
				"(u.norganizationkey = ? and nusertypekey = 531) " +
				"or (nusertypekey = 532 and u.norganizationkey = ?) " +
				"order by ta.testDate desc",
				authUser.User.Norganizationkey,
				authUser.User.Norganizationkey).Scan(&answers)
		}
	}
	return answers
}

func AddAnswer(r *http.Request) Answer {
	_ = json.NewDecoder(r.Body).Decode(&answer)

	db.Exec("" +
		"INSERT INTO tests_answers " +
		"(nstaffkey, question, ntestnumber, testdate, test_id, ans1, ans2, ans3, ans4, ans5, ans6) " +
		"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ",
		answer.Nstaffkey,
		answer.Question,
		answer.Ntestnumber,
		answer.Testdate,
		answer.TESTID,
		answer.Ans1,
		answer.Ans2,
		answer.Ans3,
		answer.Ans4,
		answer.Ans5,
		answer.Ans6)

	db.Raw("SELECT last_value as nkey FROM tests_answers_nkey_seq").Scan(&answer)
	return answer
}

func SearchAnswers(r *http.Request) []Answer {
	_ = json.NewDecoder(r.Body).Decode(&answer)

	if authUser.User.Nusertypekey == 533 {
		db.Raw(
			"select " +
			"ta.nkey, " +
			"ta.question, " +
			"concat(u.cuserfamilyname, ' ', u.cuserfirstname, ' ', u.cusersurname) as fio, " +
			"t.ctestname as testName, " +
			"ta.testDate, " +
			"q.nw1, q.nw2, q.nw3, q.nw4, q.nw5, q.nw6, q.nw7, q.nw8, q.nw9, q.nw10, " +
			"ta.ans1, ta.ans2, ta.ans3, ta.ans4, ta.ans5, ta.ans6, ta.ans7, ta.ans8, ta.ans9, ta.ans10 " +
			"from tests_answers ta " +
			"inner join tests_questions q on q.nkey = ta.question " +
			"inner join users u on u.nuserkey = ta.nstaffkey " +
			"inner join tests t on t.nkey = q.ntestnumber " +
			"where " +
			"question = ? " +
			"or ta.nstaffkey = ? " +
			"or ta.ntestnumber = ? " +
			"or (ta.testDate >= ? and ta.testDate <= ?)",
			answer.Question,
			answer.Nstaffkey,
			answer.Ntestnumber,
			answer.Testtime,
			answer.Testdate).Scan(&answers)
	} else {
		db.Raw("select " +
			"ta.nkey, " +
			"ta.question, " +
			"concat(u.cuserfamilyname, ' ', u.cuserfirstname, ' ', u.cusersurname) as fio, "+
			"t.ctestname as testName, " +
			"ta.testDate, " +
			"q.nw1, q.nw2, q.nw3, q.nw4, q.nw5, q.nw6, q.nw7, q.nw8, q.nw9, q.nw10, " +
			"ta.ans1, ta.ans2, ta.ans3, ta.ans4, ta.ans5, ta.ans6, ta.ans7, ta.ans8, ta.ans9, ta.ans10 " +
			"from tests_answers ta " +
			"inner join tests_questions q on q.nkey = ta.question " +
			"inner join users u on u.nuserkey = ta.nstaffkey " +
			"inner join tests t on t.nkey = q.ntestnumber " +
			"where " +
			"(u.norganizationkey = ? and nusertypekey = 531) or (nusertypekey = 532 and u.norganizationkey = ?) " +
			"and ta.nstaffkey = ? " +
			"or " +
			"(u.norganizationkey = ? and nusertypekey = 531) or (nusertypekey = 532 and u.norganizationkey = ?) " +
			"and " +
			"ta.ntestnumber = ? " +
			"or " +
			"(u.norganizationkey = ? and nusertypekey = 531) or (nusertypekey = 532 and u.norganizationkey = ?) " +
			"or " +
			"(ta.testDate >= ? and ta.testDate <= ?)",
			authUser.User.Norganizationkey, authUser.User.Norganizationkey,
			answer.Nstaffkey,
			authUser.User.Norganizationkey, authUser.User.Norganizationkey,
			answer.Ntestnumber,
			authUser.User.Norganizationkey, authUser.User.Norganizationkey,
			answer.Testtime, answer.Testdate).Scan(&answers)
	}

	return answers
}