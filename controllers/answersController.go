package controllers

import (
	"encoding/json"
	"goTesting/models"
	"net/http"
)

func GetAnswers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	answers := models.GetAnswers(r)

	json.NewEncoder(w).Encode(answers)
}

func AddAnswer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	answer := models.AddAnswer(r)

	json.NewEncoder(w).Encode(answer)
}

func SearchAnswers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	answers := models.SearchAnswers(r)

	json.NewEncoder(w).Encode(answers)
}
