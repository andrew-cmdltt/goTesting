package controllers

import (
	"encoding/json"
	"goTesting/models"
	"net/http"
)

func GetResults(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	results := models.GetResults()

	json.NewEncoder(w).Encode(results)
}

func SearchResults(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	results := models.SearchResults(r)

	json.NewEncoder(w).Encode(results)
}

