package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"goTesting/models"
	"net/http"
)

func GetStaffTests(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	staffTests := models.GetStaffTests()

	json.NewEncoder(w).Encode(staffTests)
}

func GetStaffTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	staffTest := models.GetStaffTest(params["nkey"])

	json.NewEncoder(w).Encode(staffTest)
}

func DeleteStaffTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	models.DeleteStaffTest(params["nkey"])

	json.NewEncoder(w).Encode(http.StatusOK)
}

func AddStaffTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	staffTest := models.AddStaffTest(r)

	json.NewEncoder(w).Encode(staffTest)
}