package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"goTestingV2/models"
	"net/http"
)

func GetCourses(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	courses := models.GetCourses()

	json.NewEncoder(w).Encode(courses)
}

func GetCourse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	course := models.GetCourse(params["id"])

	json.NewEncoder(w).Encode(course)
}

func DeleteCourse(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	models.DeleteCourse(params["id"])

	json.NewEncoder(w).Encode(http.StatusOK)
}

func AddCourse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	err, course := models.AddCourse(r)

	if err != nil {
		json.NewEncoder(w).Encode(err)
	} else {
		json.NewEncoder(w).Encode(course)
	}
	fmt.Print(course)
}

func UpdateCourse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	err, course := models.UpdateCourse(r)

	if err != nil {
		json.NewEncoder(w).Encode(err)
	} else {
		json.NewEncoder(w).Encode(course)
	}

}
