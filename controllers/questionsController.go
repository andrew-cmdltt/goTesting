package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"goTesting/models"
	"net/http"
)

func GetQuestions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	questions := models.GetQuestions(r)

	json.NewEncoder(w).Encode(questions)
}

func GetQuestion(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	question := models.GetQuestion(params["nkey"])

	json.NewEncoder(w).Encode(question)
}

func DeleteQuestion(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	models.DeleteQuestion(params["nkey"])

	json.NewEncoder(w).Encode(http.StatusOK)
}

func AddQuestion(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	question := models.AddQuestion(r)

	json.NewEncoder(w).Encode(question)
}

func UpdateQuestion(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	question := models.UpdateQuestion(r)

	json.NewEncoder(w).Encode(question)
}
