package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"goTestingV2/models"
	"goTestingV2/utils"
	"net/http"
)

var mySigningKey = []byte("yy11yy11yu")

func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	users := models.GetUsers()

	json.NewEncoder(w).Encode(users)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	user := models.GetUser(params["nuserkey"])

	json.NewEncoder(w).Encode(user)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	models.DeleteUser(params["nuserkey"])

	json.NewEncoder(w).Encode(http.StatusOK)
}

func AddUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	user := models.AddUser(r)

	json.NewEncoder(w).Encode(user)
}

func SearchUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	users := models.SearchUsers(r)

	json.NewEncoder(w).Encode(users)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	user := models.UpdateUser(r)

	json.NewEncoder(w).Encode(user)
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	authUser, message := models.Login(r, mySigningKey)

	if message != "" {
		utils.Respond(w, utils.Message(false, message))
	} else {
		json.NewEncoder(w).Encode(authUser)
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {
	models.Logout()
}


