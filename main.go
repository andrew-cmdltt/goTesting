package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"goTesting/controllers"
	"html/template"
	"log"
	"net/http"
	"os"
)

func main() {
	r := mux.NewRouter()
	http.Handle("/api/", r)
	http.Handle("/static/", http.StripPrefix("/static", http.FileServer(http.Dir("./static/"))))
	http.HandleFunc("/", mainPage)

	// coursers
	r.HandleFunc("/api/courses/", controllers.GetCourses).Methods("GET")
	r.HandleFunc("/api/courses/", controllers.AddCourse).Methods("POST")
	r.HandleFunc("/api/course/{id}/", controllers.GetCourse).Methods("GET")
	r.HandleFunc("/api/course/{id}/", controllers.DeleteCourse).Methods("DELETE")
	r.HandleFunc("/api/course/{id}/", controllers.UpdateCourse).Methods("PUT")

	// organizations
	r.HandleFunc("/api/organizations/", controllers.GetOrganizations).Methods("GET")
	r.HandleFunc("/api/organizations/", controllers.AddOrganization).Methods("POST")
	r.HandleFunc("/api/organization/{nelementkey}/", controllers.GetOrganization).Methods("GET")
	r.HandleFunc("/api/organization/{nelementkey}/", controllers.DeleteOrganization).Methods("DELETE")
	r.HandleFunc("/api/organization/{nelementkey}/", controllers.UpdateOrganization).Methods("PUT")

	// users
	r.HandleFunc("/api/users/", controllers.GetUsers).Methods("GET")
	r.HandleFunc("/api/users/", controllers.AddUser).Methods("POST")
	r.HandleFunc("/api/user/{nuserkey}/", controllers.GetUser).Methods("GET")
	r.HandleFunc("/api/user/{nuserkey}/", controllers.DeleteUser).Methods("DELETE")
	r.HandleFunc("/api/user/{nuserkey}/", controllers.UpdateUser).Methods("PUT")
	r.HandleFunc("/api/auth/login/", controllers.Login).Methods("POST")
	r.HandleFunc("/api/auth/logout/", controllers.Logout).Methods("GET")

	e := godotenv.Load() //Загрузить файл .env
	if e != nil {
		fmt.Print(e)
	}

	port := os.Getenv("PORT")

	println("Server is started on port:", port)
	err := http.ListenAndServe(port, nil)

	if err != nil {
		log.Fatal("ListenAndServe", err)
	}
}

func mainPage(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("static/frontend/templates/frontend/index.html")

	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	if err := tmpl.Execute(w, nil); err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
}
