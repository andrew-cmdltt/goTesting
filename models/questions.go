package models

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

type Question struct {
	Nkey           	int    `json:"nkey"`
	Ntestnumber 	int    `json:"ntestnumber"`
	Cquestion       string `json:"cquestion"`
	Canswer1  		string `json:"canswer1"`
	Canswer2  		string `json:"canswer2"`
	Canswer3  		string `json:"canswer3"`
	Canswer4  		string `json:"canswer4"`
	Canswer5  		string `json:"canswer5"`
	Canswer6  		string `json:"canswer6"`
	Nw1				int `json:"nw1"`
	Nw2				int `json:"nw2"`
	Nw3				int `json:"nw3"`
	Nw4				int `json:"nw4"`
	Nw5				int `json:"nw5"`
	Nw6				int `json:"nw6"`
}

var questions []Question
var question Question

func GetQuestions(r *http.Request) []Question {
	params := mux.Vars(r)

	if params["nkey"] != "" {
		db.Raw("SELECT * FROM tests_questions WHERE ntestnumber = ?",
			params["nkey"]).Scan(&questions)
		params["nkey"] = ""
	} else {
		db.Raw("SELECT * FROM tests_questions").Scan(&questions)
	}

	return questions
}

func GetQuestion(nkey string) Question {
	db.Raw("SELECT * FROM tests_questions WHERE nkey = ?", nkey).Scan(&question)
	return question
}

func DeleteQuestion(nkey string) {
	db.Exec("DELETE FROM tests_questions WHERE nkey = ?", nkey)
}

func AddQuestion(r *http.Request) Question {
	_ = json.NewDecoder(r.Body).Decode(&question)

	db.Exec("INSERT INTO tests_questions" +
		"(ntestnumber, cquestion, " +
		"nw1, nw2, nw3, nw4, nw5, nw6, " +
		"canswer1, canswer2," +
		"canswer3, canswer4, canswer5, canswer6)" +
		"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		question.Ntestnumber,
		question.Cquestion,
		question.Nw1,
		question.Nw2,
		question.Nw3,
		question.Nw4,
		question.Nw5,
		question.Nw6,
		question.Canswer1,
		question.Canswer2,
		question.Canswer3,
		question.Canswer4,
		question.Canswer5,
		question.Canswer6)
	db.Raw("SELECT last_value as nkey FROM tests_questions_nkey_seq").Scan(&question)

	return question
}

func UpdateQuestion(r *http.Request) Question {
	_ = json.NewDecoder(r.Body).Decode(&question)
	params := mux.Vars(r)

	db.Exec("UPDATE tests_questions SET " +
		"cquestion = ?, " +
		"nw1 = ?, " +
		"nw2 = ?, " +
		"nw3 = ?, " +
		"nw4 = ?, " +
		"nw5 = ?, " +
		"nw6 = ?, " +
		"canswer1 = ?, " +
		"canswer2 = ?, " +
		"canswer3 = ?, " +
		"canswer4 = ?, " +
		"canswer5 = ?, " +
		"canswer6 = ? " +
		"WHERE nkey = ?",
		question.Cquestion,
		question.Nw1,
		question.Nw2,
		question.Nw3,
		question.Nw4,
		question.Nw5,
		question.Nw6,
		question.Canswer1,
		question.Canswer2,
		question.Canswer3,
		question.Canswer4,
		question.Canswer5,
		question.Canswer6,
		params["nkey"])

	return question
}
