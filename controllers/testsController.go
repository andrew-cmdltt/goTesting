package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"goTesting/models"
	"net/http"
)


func GetTests(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	tests := models.GetTests()

	json.NewEncoder(w).Encode(tests)
}

func GetTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	test := models.GetTest(params["nkey"])

	json.NewEncoder(w).Encode(test)
}

func DeleteTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	models.DeleteTest(params["nkey"])

	json.NewEncoder(w).Encode(http.StatusOK)
}

func AddTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	err, test := models.AddTest(r)

	if err != nil {
		json.NewEncoder(w).Encode(err)
	} else {
		json.NewEncoder(w).Encode(test)
	}
}

func SearchTests(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	tests := models.SearchTests(r)

	json.NewEncoder(w).Encode(tests)
}

func UpdateTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	err, test := models.UpdateTest(r)

	if err != nil {
		json.NewEncoder(w).Encode(err)
	} else {
		json.NewEncoder(w).Encode(test)
	}
}

func ExportTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	test := models.ExportTest(params["nkey"])

	json.NewEncoder(w).Encode(test)
}

func ImportTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	test := models.ImportTest(r)

	json.NewEncoder(w).Encode(test)
}
