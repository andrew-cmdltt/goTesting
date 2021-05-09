package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"goTestingV2/models"
	"net/http"
)

func GetOrganizations(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	organizations := models.GetOrganizations()

	json.NewEncoder(w).Encode(organizations)
}

func GetOrganization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	organization := models.GetOrganization(params["nelementkey"])

	json.NewEncoder(w).Encode(organization)
}

func DeleteOrganization(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	models.DeleteOrganization(params["nelementkey"])

	json.NewEncoder(w).Encode(http.StatusOK)
}

func AddOrganization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	err, organization := models.AddOrganization(r)

	if err != nil {
		json.NewEncoder(w).Encode(err)

	} else {
		json.NewEncoder(w).Encode(organization)
	}

}

func UpdateOrganization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	err, organization := models.UpdateOrganization(r)

	if err != nil {
		json.NewEncoder(w).Encode(err)
	} else {
		json.NewEncoder(w).Encode(organization)
	}

}
